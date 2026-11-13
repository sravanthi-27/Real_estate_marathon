import 'server-only';
import { randomBytes } from 'crypto';

/** Demo provider: no real money. For development / staging only. */
export const demoProvider = {
  name: 'demo',
  async createOrder() {
    return { orderId: `demo_${randomBytes(8).toString('hex')}`, keyId: null };
  },
  async verify({ orderId, signature }) {
    return orderId.startsWith('demo_') && signature === 'demo';
  },
};
