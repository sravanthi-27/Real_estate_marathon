import { route, ok, readJson } from '@/server/http';
import { subscribeNewsletter } from '@/server/services/enquiries';

export const runtime = 'nodejs';

export const POST = route(async (req) => ok(await subscribeNewsletter(await readJson(req))), { bucket: 'newsletter', limit: 6 });
