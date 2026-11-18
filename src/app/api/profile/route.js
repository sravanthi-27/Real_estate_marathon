import { NextResponse } from 'next/server';
import { route, ok } from '@/server/http';
import { getProfileDashboard, logoutProfile } from '@/server/services/profiles';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => ok(await getProfileDashboard(req.cookies.get('rem-profile-session')?.value)), {
  bucket: 'profile-read',
  limit: 60,
});

export const POST = route(async (req) => {
  await logoutProfile(req.cookies.get('rem-profile-session')?.value);
  const response = NextResponse.json({ ok: true, data: { signedOut: true } });
  response.cookies.set('rem-profile-session', '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 });
  return response;
}, { bucket: 'profile-logout', limit: 30 });
