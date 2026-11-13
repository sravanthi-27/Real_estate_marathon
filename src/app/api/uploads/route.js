import { route, ok } from '@/server/http';
import { ApiError } from '@/server/errors';
import { saveUpload } from '@/server/services/uploads';

export const runtime = 'nodejs';

export const POST = route(async (req) => {
  const form = await req.formData().catch(() => { throw new ApiError(400, 'Invalid upload'); });
  return ok(await saveUpload(String(form.get('kind') || ''), form.get('file')), 201);
}, { bucket: 'uploads', limit: 20 });
