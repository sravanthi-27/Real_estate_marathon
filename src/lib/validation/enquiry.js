import { z } from 'zod';

export const ENQUIRY_TYPES = ['contact', 'sponsor', 'expo_stall', 'volunteer', 'community_register', 'kit_sponsor', 'corporate_kit', 'merch_order'];

export const enquirySchema = z.object({
  type: z.enum(ENQUIRY_TYPES),
  name: z.string({ required_error: 'Please enter your name' }).trim().min(2, 'Please enter your name').max(120),
  email: z.string().trim().email('Enter a valid email').max(160).optional().or(z.literal('')),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number').optional().or(z.literal('')),
  organisation: z.string().trim().max(160).optional(),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().max(2000, 'Maximum 2000 characters').optional(),
  payload: z.record(z.union([z.string().max(500), z.number(), z.boolean(), z.array(z.any()).max(30)])).optional(),
  website: z.string().optional(), // honeypot - must stay empty
}).superRefine((data, ctx) => {
  if (data.type !== 'community_register' && !data.email) {
    ctx.addIssue({ code: 'custom', path: ['email'], message: 'Email is required' });
  }
});

export const newsletterSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).trim().email('Enter a valid email').max(160),
});
