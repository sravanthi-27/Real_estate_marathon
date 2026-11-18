import 'server-only';
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { z } from 'zod';
import { CATEGORIES } from '@/config/registration';
import { accountPasswordSchema } from '@/lib/validation/registration';
import { ApiError } from '../errors';
import { getAdminClient } from '../supabase';

const scrypt = promisify(scryptCallback);
const SESSION_DAYS = 30;
const loginSchema = z.object({
  email: z.string().trim().email().max(160),
  password: z.string().min(1).max(128),
});

function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

async function passwordHash(password, salt) {
  return (await scrypt(password, salt, 64)).toString('hex');
}

async function verifyPassword(password, salt, expectedHash) {
  const actual = Buffer.from(await passwordHash(password, salt), 'hex');
  const expected = Buffer.from(expectedHash, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

async function findProfileByEmail(email) {
  const { data, error } = await getAdminClient()
    .from('profiles')
    .select('id, email, full_name, password_salt, password_hash')
    .eq('email', email.toLowerCase())
    .maybeSingle();
  if (error) throw new ApiError(500, 'Could not load your profile. Please try again.', error);
  return data;
}

export async function createOrGetProfile({ email, fullName, password }) {
  accountPasswordSchema.parse(password);
  const normalizedEmail = email.toLowerCase();
  const existing = await findProfileByEmail(normalizedEmail);
  if (existing) {
    if (!(await verifyPassword(password, existing.password_salt, existing.password_hash))) {
      throw new ApiError(409, 'An account already exists for this email. Please log in to continue.');
    }
    return existing;
  }

  const salt = randomBytes(16).toString('hex');
  const password_hash = await passwordHash(password, salt);
  const { data, error } = await getAdminClient()
    .from('profiles')
    .insert({ email: normalizedEmail, full_name: fullName, password_salt: salt, password_hash })
    .select('id, email, full_name')
    .single();
  if (!error) return data;
  if (error.code === '23505') {
    const racedProfile = await findProfileByEmail(normalizedEmail);
    if (racedProfile && await verifyPassword(password, racedProfile.password_salt, racedProfile.password_hash)) return racedProfile;
    throw new ApiError(409, 'An account already exists for this email. Please log in to continue.');
  }
  throw new ApiError(500, 'Could not create your profile. Please try again.', error);
}

export async function loginProfile(input) {
  const { email, password } = loginSchema.parse(input);
  const profile = await findProfileByEmail(email.toLowerCase());
  if (!profile || !(await verifyPassword(password, profile.password_salt, profile.password_hash))) {
    throw new ApiError(401, 'Email or password is incorrect.');
  }

  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const { error } = await getAdminClient().from('profile_sessions').insert({
    profile_id: profile.id,
    token_hash: hashToken(token),
    expires_at: expiresAt,
  });
  if (error) throw new ApiError(500, 'Could not start your session. Please try again.', error);
  return { token, expiresAt };
}

async function getSessionProfile(token) {
  if (!token || token.length > 128) return null;
  const { data, error } = await getAdminClient()
    .from('profile_sessions')
    .select('expires_at, profiles(id, email, full_name)')
    .eq('token_hash', hashToken(token))
    .maybeSingle();
  if (error) throw new ApiError(500, 'Could not load your profile. Please try again.', error);
  if (!data || new Date(data.expires_at).getTime() <= Date.now()) return null;
  return data.profiles;
}

export async function getProfileDashboard(token) {
  const profile = await getSessionProfile(token);
  if (!profile) throw new ApiError(401, 'Please log in to view your profile.');

  const { data: registrations, error } = await getAdminClient()
    .from('registrations')
    .select('id, reference, status, full_name, category, tshirt_size, bib_name, bib_number, amount_paise, created_at, family_members(full_name, relationship, category, bib_number, tshirt_size)')
    .eq('email', profile.email)
    .order('created_at', { ascending: false });
  if (error) throw new ApiError(500, 'Could not load your registrations. Please try again.', error);

  return {
    profile: { name: profile.full_name, email: profile.email },
    registrations: (registrations || []).map((registration) => ({
      reference: registration.reference,
      status: registration.status,
      name: registration.full_name,
      category: CATEGORIES.find((category) => category.id === registration.category)?.label || registration.category,
      tshirtSize: registration.tshirt_size,
      bibName: registration.bib_name,
      bibNumber: registration.bib_number,
      amountPaise: registration.amount_paise,
      createdAt: registration.created_at,
      family: (registration.family_members || []).map((member) => ({
        name: member.full_name,
        relationship: member.relationship,
        category: CATEGORIES.find((category) => category.id === member.category)?.label || member.category,
        bibNumber: member.bib_number,
        tshirtSize: member.tshirt_size,
      })),
    })),
  };
}

export async function logoutProfile(token) {
  if (!token || token.length > 128) return;
  const { error } = await getAdminClient()
    .from('profile_sessions')
    .delete()
    .eq('token_hash', hashToken(token));
  if (error) throw new ApiError(500, 'Could not end your session. Please try again.', error);
}
