import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getAdminClient } from '@/server/supabase';
import { PACER_GROUPS } from '@/config/registration';
import { EVENT, KIT_PICKUP, SITE } from '@/config/site';
import { createRegistrationReceiptPdf } from '@/lib/registrationReceiptPdf';
import { ApiError } from '../errors';
import { getPublicRegistration } from './registrations';

export async function createRegistrationReceipt(reference, token) {
  const registration = await getPublicRegistration(reference, token);
  if (registration.status !== 'confirmed' || !registration.payment?.paidAt) {
    throw new ApiError(409, 'The official receipt is available after payment is confirmed.');
  }

  const sb = getAdminClient();
  const { data: registrationDetails, error: registrationError } = await sb
    .from('registrations')
    .select('id, running')
    .eq('reference', reference)
    .eq('access_token', token)
    .single();
  if (registrationError) throw new ApiError(500, 'Could not load receipt details', registrationError);
  const { data: payment, error: paymentError } = await sb
    .from('payments')
    .select('amount_paise')
    .eq('registration_id', registrationDetails.id)
    .eq('status', 'paid')
    .order('paid_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (paymentError) throw new ApiError(500, 'Could not load payment receipt', paymentError);
  if (!payment) throw new ApiError(409, 'The official receipt is available after payment is confirmed.');

  registration.runner.pacerGroup = registrationDetails.running?.pacerGroup || '';
  registration.payment.amountPaise = payment.amount_paise;
  const logoBytes = await readFile(path.join(process.cwd(), 'public', 'images', 'logo.png'));
  return createRegistrationReceiptPdf(registration, { event: EVENT, kitPickup: KIT_PICKUP, site: SITE, pacerGroups: PACER_GROUPS, logoBytes });
}
