import 'server-only';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ApiError } from './errors';
import { enforceRateLimit } from './rateLimit';
import { issuesToErrors } from '@/lib/validation/utils';

export const ok = (data, status = 200) => NextResponse.json({ ok: true, data }, { status });

export function errorResponse(e) {
  if (e instanceof ZodError) {
    return NextResponse.json({ ok: false, error: 'Please check the highlighted fields.', fieldErrors: issuesToErrors(e.issues) }, { status: 422 });
  }
  if (e instanceof ApiError) {
    if (e.details) console.error(`[api] ${e.message}`, e.details);
    return NextResponse.json({ ok: false, error: e.message }, { status: e.status });
  }
  console.error('[api] Unexpected error', e);
  return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
}

/** Wraps a route handler: rate-limit + uniform error handling. */
export function route(handler, { bucket, limit = 20, windowMs = 10 * 60 * 1000 } = {}) {
  return async (req, ctx) => {
    try {
      if (bucket) enforceRateLimit(req, bucket, limit, windowMs);
      return await handler(req, ctx);
    } catch (e) {
      return errorResponse(e);
    }
  };
}

export async function readJson(req) {
  try {
    return await req.json();
  } catch {
    throw new ApiError(400, 'Invalid request body');
  }
}
