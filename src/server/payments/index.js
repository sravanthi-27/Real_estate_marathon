import 'server-only';
import { demoProvider } from './demo';
import { razorpayProvider } from './razorpay';
import { ApiError } from '../errors';

const providers = { demo: demoProvider, razorpay: razorpayProvider };

export function getProvider(name) {
  const selected = name || process.env.PAYMENT_PROVIDER || (process.env.NODE_ENV === 'production' ? 'razorpay' : 'demo');
  if (selected === 'demo' && process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview') {
    throw new ApiError(503, 'Demo payments are disabled in production. Configure the Razorpay payment gateway.');
  }
  const p = providers[selected];
  if (!p) throw new ApiError(500, `Unknown payment provider: ${selected}`);
  return p;
}
