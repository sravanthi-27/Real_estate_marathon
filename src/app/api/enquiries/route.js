import { route, ok, readJson } from '@/server/http';
import { createEnquiry } from '@/server/services/enquiries';

export const runtime = 'nodejs';

export const POST = route(async (req) => ok(await createEnquiry(await readJson(req)), 201), { bucket: 'enquiries', limit: 6 });
