import { route, ok } from '@/server/http';
import { ApiError } from '@/server/errors';
import { razorpayProvider } from '@/server/payments/razorpay';
import { confirmPaymentByOrder } from '@/server/services/payments';

export const runtime = 'nodejs';

/** Razorpay webhook: set URL to https://YOUR-DOMAIN/api/payments/webhook, events: payment.captured */
export const POST = route(async (req) => {
  const raw = await req.text();
  if (!razorpayProvider.verifyWebhook(raw, req.headers.get('x-razorpay-signature'))) throw new ApiError(401, 'Invalid signature');
  const event = JSON.parse(raw);
  const entity = event?.payload?.payment?.entity;
  if (event.event === 'payment.captured' && entity?.order_id) await confirmPaymentByOrder(entity.order_id, entity.id);
  return ok({ received: true });
});
