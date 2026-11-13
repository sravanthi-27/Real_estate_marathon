import { route, ok, readJson } from '@/server/http';
import { verifyPayment } from '@/server/services/payments';

export const runtime = 'nodejs';

export const POST = route(async (req) => ok(await verifyPayment(await readJson(req))), { bucket: 'pay-verify', limit: 30 });
