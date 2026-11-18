import { NextResponse } from 'next/server';
import { route, readJson } from '@/server/http';
import { loginProfile } from '@/server/services/profiles';

export const runtime = 'nodejs';

export const POST = route(async (req) => {
  const { token, expiresAt } = await loginProfile(await readJson(req));
  const response = NextResponse.json({ ok: true, data: { signedIn: true } });
  response.cookies.set('rem-profile-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(expiresAt),
  });
  return response;
}, { bucket: 'profile-login', limit: 10 });
