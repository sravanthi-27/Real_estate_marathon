import 'server-only';
import { randomBytes, randomUUID } from 'crypto';
import { ApiError } from '../errors';
import { getAdminClient, STORAGE_BUCKET } from '../supabase';

const KINDS = {
  photo: { maxBytes: 3 * 1024 * 1024, types: ['image/jpeg', 'image/png', 'image/webp'] },
  id_proof: { maxBytes: 5 * 1024 * 1024, types: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'] },
  medical_certificate: { maxBytes: 5 * 1024 * 1024, types: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'] },
};
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'application/pdf': 'pdf' };

/** Confirms the real file type from its first bytes (do not trust the browser-supplied type). */
function sniff(buf) {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'image/jpeg';
  if (buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP') return 'image/webp';
  if (buf.slice(0, 4).toString() === '%PDF') return 'application/pdf';
  return null;
}

export async function saveUpload(kind, file) {
  const rule = KINDS[kind];
  if (!rule) throw new ApiError(400, 'Unknown upload type');
  if (!file || typeof file.arrayBuffer !== 'function') throw new ApiError(400, 'No file received');
  if (file.size > rule.maxBytes) throw new ApiError(413, `File is too large (max ${rule.maxBytes / 1024 / 1024} MB)`);

  const buffer = Buffer.from(await file.arrayBuffer());
  const type = sniff(buffer);
  if (!type || !rule.types.includes(type)) throw new ApiError(415, 'Unsupported file type');

  const path = `${randomUUID()}/${kind}-${randomBytes(5).toString('hex')}.${EXT[type]}`;
  const { error } = await getAdminClient().storage.from(STORAGE_BUCKET).upload(path, buffer, { contentType: type, upsert: false });
  if (error) throw new ApiError(500, 'Upload failed. Please try again.', error);
  return { path, name: file.name?.slice(0, 120) || 'file', size: file.size };
}
