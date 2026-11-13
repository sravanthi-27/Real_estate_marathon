import { route, ok, readJson } from '@/server/http';
import { createRegistration } from '@/server/services/registrations';

export const runtime = 'nodejs';

export const POST = route(async (req) => ok(await createRegistration(await readJson(req)), 201), { bucket: 'registrations', limit: 10 });
