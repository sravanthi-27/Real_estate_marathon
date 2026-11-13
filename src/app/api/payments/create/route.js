import { route, ok, readJson } from '@/server/http';
import { createPayment } from '@/server/services/payments';

export const runtime = 'nodejs';

export const POST = route(async (req) => ok(await createPayment(await readJson(req))), { bucket: 'pay-create', limit: 20 });
