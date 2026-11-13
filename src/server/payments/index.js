import 'server-only';
import { demoProvider } from './demo';
import { razorpayProvider } from './razorpay';
import { ApiError } from '../errors';

const providers = { demo: demoProvider, razorpay: razorpayProvider };

export function getProvider(name = process.env.PAYMENT_PROVIDER || 'demo') {
  const p = providers[name];
  if (!p) throw new ApiError(500, `Unknown payment provider: ${name}`);
  return p;
}
