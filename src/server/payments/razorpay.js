import 'server-only';
import { createHmac, timingSafeEqual } from 'crypto';
import { ApiError } from '../errors';

const API = 'https://api.razorpay.com/v1';

function creds() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) throw new ApiError(500, 'Payment gateway is not configured.');
  return { keyId, secret };
}

export function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

export const razorpayProvider = {
  name: 'razorpay',
  async createOrder({ amountPaise, reference, registrationId }) {
    const { keyId, secret } = creds();
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Basic ${Buffer.from(`${keyId}:${secret}`).toString('base64')}` },
      body: JSON.stringify({ amount: amountPaise, currency: 'INR', receipt: reference, notes: { registrationId } }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new ApiError(502, 'Could not start the payment. Please try again.', body);
    return { orderId: body.id, keyId };
  },
  async verify({ orderId, paymentId, signature }) {
    const { secret } = creds();
    const expected = createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex');
    return safeEqual(expected, signature);
  },
  verifyWebhook(rawBody, signature) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret || !signature) return false;
    return safeEqual(createHmac('sha256', secret).update(rawBody).digest('hex'), signature);
  },
};
