import 'server-only';
import { ApiError } from '../errors';
import { getAdminClient } from '../supabase';
import { getProvider } from '../payments';
import { paymentCreateSchema, paymentVerifySchema } from '@/lib/validation/registration';

async function loadOwnedRegistration(registrationId, token) {
  const { data, error } = await getAdminClient()
    .from('registrations').select('id, reference, status, amount_paise, access_token').eq('id', registrationId).maybeSingle();
  if (error) throw new ApiError(500, 'Could not load registration', error);
  if (!data || data.access_token !== token) throw new ApiError(404, 'Registration not found');
  return data;
}

export async function createPayment(input) {
  const { registrationId, token, method } = paymentCreateSchema.parse(input);
  const reg = await loadOwnedRegistration(registrationId, token);
  if (reg.status === 'confirmed') throw new ApiError(409, 'This registration is already paid.');

  const provider = getProvider();
  const order = await provider.createOrder({ amountPaise: reg.amount_paise, reference: reg.reference, registrationId: reg.id });
  const { error } = await getAdminClient().from('payments').insert({
    registration_id: reg.id, provider: provider.name, provider_order_id: order.orderId, method, amount_paise: reg.amount_paise, status: 'created',
  });
  if (error) throw new ApiError(500, 'Could not start the payment', error);

  return { provider: provider.name, orderId: order.orderId, keyId: order.keyId, amountPaise: reg.amount_paise, currency: 'INR', reference: reg.reference };
}

async function markPaid(payment, providerPaymentId) {
  const sb = getAdminClient();
  const { error } = await sb.from('payments')
    .update({ status: 'paid', provider_payment_id: providerPaymentId, paid_at: new Date().toISOString() })
    .eq('id', payment.id);
  if (error) throw new ApiError(500, 'Could not record payment', error);
  const { data: bib, error: rpcError } = await sb.rpc('finalize_registration', { p_id: payment.registration_id });
  if (rpcError) throw new ApiError(500, 'Payment received but confirmation failed. Please contact support.', rpcError);
  return { bibNumber: bib };
}

export async function verifyPayment(input) {
  const { registrationId, token, orderId, paymentId, signature } = paymentVerifySchema.parse(input);
  const reg = await loadOwnedRegistration(registrationId, token);
  const sb = getAdminClient();
  const { data: payment, error } = await sb.from('payments').select('*').eq('registration_id', reg.id).eq('provider_order_id', orderId).maybeSingle();
  if (error) throw new ApiError(500, 'Could not load payment', error);
  if (!payment) throw new ApiError(404, 'Payment not found');
  if (payment.status === 'paid') return { reference: reg.reference, alreadyPaid: true };

  const valid = await getProvider(payment.provider).verify({ orderId, paymentId, signature });
  if (!valid) {
    await sb.from('payments').update({ status: 'failed' }).eq('id', payment.id);
    throw new ApiError(400, 'Payment verification failed. If money was deducted, contact support with your reference.');
  }
  await markPaid(payment, paymentId);
  return { reference: reg.reference };
}

/** Called by the gateway webhook so a payment is confirmed even if the browser tab was closed. */
export async function confirmPaymentByOrder(orderId, providerPaymentId) {
  const sb = getAdminClient();
  const { data: payment } = await sb.from('payments').select('*').eq('provider_order_id', orderId).maybeSingle();
  if (!payment || payment.status === 'paid') return;
  await markPaid(payment, providerPaymentId);
}
