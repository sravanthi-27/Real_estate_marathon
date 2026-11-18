import { z } from 'zod';
import {
  BLOOD_GROUPS, CATEGORIES, COMMUNITIES, COMMUNITY_ROLES, COMMUNITY_OTHER, EMERGENCY_RELATIONSHIPS, FAMILY_RELATIONSHIPS,
  GENDERS, HEALTH_CHECKUPS, LONGEST_DISTANCES, NATIONALITIES, PACER_GROUPS, PROPERTY_TYPES, STATES, TSHIRT_SIZES,
} from '@/config/registration';
import { ageFromDob } from '@/lib/utils';

const values = (list) => list.map((o) => (typeof o === 'string' ? o : o.value));
const pick = (list, message) => z.enum(values(list), { errorMap: () => ({ message }) });
const text = (message, max = 160) => z.string({ required_error: message }).trim().min(1, message).max(max);
const optionalText = (max = 300) => z.string().trim().max(max).optional().or(z.literal(''));

const mobile = z.string({ required_error: 'Mobile number is required' }).trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number');
const optionalMobile = z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number').optional().or(z.literal(''));
const pincode = z.string({ required_error: 'Pincode is required' }).trim().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode');
const dob = z.string({ required_error: 'Date of birth is required' })
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Select a valid date of birth')
  .refine((v) => { const a = ageFromDob(v); return a !== null && a >= 0 && a <= 100; }, 'Select a valid date of birth');
const uploadPath = z.string({ required_error: 'Please upload this document' })
  .regex(/^[a-z0-9-]+\/[a-z_]+-[a-z0-9]+\.(jpg|jpeg|png|webp|pdf)$/i, 'Please upload this document');
const optionalUploadPath = uploadPath.optional().or(z.literal(''));
const bibName = z.string().trim().max(16, 'Maximum 16 characters').regex(/^[A-Za-z .]*$/, 'Letters only').optional().or(z.literal(''));

const minAgeIssue = (ctx, category, birth, path = ['dob']) => {
  const cat = CATEGORIES.find((c) => c.id === category);
  const age = ageFromDob(birth);
  if (cat && age !== null && age < cat.minAge) {
    ctx.addIssue({ code: 'custom', path, message: `Minimum age for ${cat.short} is ${cat.minAge} years` });
  }
};

const medicalContactFields = {
  bloodGroup: pick(BLOOD_GROUPS, 'Select blood group'),
  emergencyName: text('Emergency contact name is required', 100),
  emergencyMobile: mobile,
  emergencyRelationship: pick(EMERGENCY_RELATIONSHIPS, 'Select relationship'),
};

export const medicalContactSchema = z.object({ ...medicalContactFields, mobile }).superRefine((v, ctx) => {
  if (v.mobile && v.mobile === v.emergencyMobile) {
    ctx.addIssue({ code: 'custom', path: ['emergencyMobile'], message: 'Emergency contact must be a different number' });
  }
});

export const personalSchema = z.object({
  fullName: text('Full name is required', 100),
  gender: pick(GENDERS, 'Select gender'),
  dob,
  ...medicalContactFields,
  nationality: pick(NATIONALITIES, 'Select nationality'),
  category: pick(CATEGORIES.map((c) => c.id), 'Select a running category'),
  tshirtSize: pick(TSHIRT_SIZES, 'Select T-shirt size'),
  bibName,
  mobile,
  altMobile: optionalMobile,
  email: z.string({ required_error: 'Email is required' }).trim().email('Enter a valid email').max(160),
  addressLine1: text('Flat / house number is required', 200),
  society: optionalText(160),
  pincode,
  city: text('City is required', 80),
  state: pick(STATES, 'Select state'),
  photoPath: uploadPath,
  idProofPath: uploadPath,
  privacyAccepted: z.literal(true, { errorMap: () => ({ message: 'Please accept the data privacy statement' }) }),
}).superRefine((v, ctx) => {
  minAgeIssue(ctx, v.category, v.dob);
  if (v.mobile && v.mobile === v.emergencyMobile) ctx.addIssue({ code: 'custom', path: ['emergencyMobile'], message: 'Emergency contact must be a different number' });
});

export const familyMemberSchema = z.object({
  id: z.string().min(1),
  fullName: text('Full name is required', 100),
  relationship: pick(FAMILY_RELATIONSHIPS, 'Select relationship'),
  dob,
  gender: pick(GENDERS, 'Select gender'),
  category: pick(CATEGORIES.map((c) => c.id), 'Select a category'),
  tshirtSize: pick(TSHIRT_SIZES, 'Select T-shirt size'),
  bibName,
  photoPath: optionalUploadPath,
}).superRefine((v, ctx) => minAgeIssue(ctx, v.category, v.dob));

export const familySchema = z.object({ members: z.array(familyMemberSchema).max(8, 'You can add up to 8 family members') });

export const communitySchema = z.object({
  skip: z.boolean(),
  communityName: optionalText(160),
  customCommunityName: z.string().trim().max(160).optional(),
  tower: optionalText(60),
  flatNumber: z.string().trim().max(60).optional(),
  locality: z.string().trim().max(120).optional(),
  state: z.string().trim().max(60).optional(),
  pincode: z.string().trim().optional(),
  propertyType: z.string().optional(),
  role: z.string().optional(),
  joinWhatsapp: z.boolean().optional(),
}).superRefine((v, ctx) => {
  if (v.skip) return;
  const need = (key, msg) => { if (!v[key] || !String(v[key]).trim()) ctx.addIssue({ code: 'custom', path: [key], message: msg }); };
  need('communityName', 'Select your community');
  if (v.communityName && !values(COMMUNITIES).includes(v.communityName) && v.communityName !== COMMUNITY_OTHER) {
    ctx.addIssue({ code: 'custom', path: ['communityName'], message: 'Select a valid community' });
  }
  if (v.communityName === COMMUNITY_OTHER) need('customCommunityName', 'Enter your community name');
  if (v.state && !values(STATES).includes(v.state)) {
    ctx.addIssue({ code: 'custom', path: ['state'], message: 'Select a valid state' });
  }
  need('tower', 'Tower / block name is required');
  need('flatNumber', 'Flat / villa number is required');
  need('locality', 'Locality is required');
  need('state', 'Select state');
  if (!/^\d{6}$/.test(v.pincode || '')) ctx.addIssue({ code: 'custom', path: ['pincode'], message: 'Enter a valid 6-digit pincode' });
  if (!values(PROPERTY_TYPES).includes(v.propertyType)) ctx.addIssue({ code: 'custom', path: ['propertyType'], message: 'Select property type' });
  if (!values(COMMUNITY_ROLES).includes(v.role)) ctx.addIssue({ code: 'custom', path: ['role'], message: 'Select your role' });
});

const yesNo = z.enum(['yes', 'no'], { errorMap: () => ({ message: 'Please choose an option' }) });

export const medicalSchema = z.object({
  hasCondition: yesNo,
  conditionDetails: optionalText(500),
  onMedication: yesNo,
  medicationDetails: optionalText(500),
  physicianName: optionalText(100),
  physicianMobile: optionalMobile,
  hospital: optionalText(160),
  healthCheckup: pick(HEALTH_CHECKUPS, 'Select an option'),
  fitnessCertificatePath: optionalUploadPath,
}).superRefine((v, ctx) => {
  if (v.hasCondition === 'yes' && !v.conditionDetails?.trim()) ctx.addIssue({ code: 'custom', path: ['conditionDetails'], message: 'Please specify the condition' });
  if (v.onMedication === 'yes' && !v.medicationDetails?.trim()) ctx.addIssue({ code: 'custom', path: ['medicationDetails'], message: 'Please list your medication' });
});

export const runningSchema = z.object({
  priorExperience: yesNo,
  totalRuns: z.string().trim().regex(/^\d{0,4}$/, 'Enter a number').optional().or(z.literal('')),
  longestDistance: pick(LONGEST_DISTANCES, 'Select longest distance'),
  personalBest: optionalText(40),
  lastRace: optionalText(120),
  pacerGroup: pick(PACER_GROUPS, 'Select a pacer group'),
  club: optionalText(120),
});

export const declarationsSchema = z.object({
  medical: z.literal(true, { errorMap: () => ({ message: 'You must accept this declaration' }) }),
  indemnity: z.literal(true, { errorMap: () => ({ message: 'You must accept this declaration' }) }),
});

export const createRegistrationSchema = z.object({
  personal: personalSchema,
  family: familySchema,
  community: communitySchema,
  medical: medicalSchema,
  running: runningSchema,
  declarations: declarationsSchema,
});

export const accountPasswordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be 128 characters or fewer');

export const accountRegistrationSchema = createRegistrationSchema.extend({
  password: accountPasswordSchema,
});

/** Wizard step id -> which data slice it edits + its schema. */
export const STEP_SCHEMAS = {
  participant: { slice: 'personal', schema: personalSchema },
  family: { slice: 'family', schema: familySchema },
  community: { slice: 'community', schema: communitySchema },
  medical: { slice: 'medical', schema: medicalSchema },
  running: { slice: 'running', schema: runningSchema },
};

export const paymentCreateSchema = z.object({
  registrationId: z.string().uuid(),
  token: z.string().uuid(),
  method: z.enum(['upi', 'card', 'netbanking']),
});

export const paymentVerifySchema = z.object({
  registrationId: z.string().uuid(),
  token: z.string().uuid(),
  orderId: z.string().min(1).max(100),
  paymentId: z.string().min(1).max(100),
  signature: z.string().min(1).max(300),
});
