import { route, ok } from '@/server/http';
import { getPublicRegistration } from '@/server/services/registrations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req, { params }) => {
  const token = new URL(req.url).searchParams.get('token');
  return ok(await getPublicRegistration(params.reference, token));
}, { bucket: 'registration-read', limit: 60 });
