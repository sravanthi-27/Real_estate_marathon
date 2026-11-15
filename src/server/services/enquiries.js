import 'server-only';
import { ApiError } from '../errors';
import { getAdminClient } from '../supabase';
import { enquirySchema, newsletterSchema } from '@/lib/validation/enquiry';

export async function createEnquiry(input) {
  const d = enquirySchema.parse(input);
  if (d.website) return { id: null }; // honeypot hit: pretend success, store nothing
  const { data, error } = await getAdminClient().from('enquiries').insert({
    type: d.type, name: d.name, email: (d.email || '').toLowerCase(), phone: d.phone || null,
    organisation: d.organisation || null, subject: d.subject || null, message: d.message || null, payload: d.payload || {},
  }).select('id').single();
  if (error) throw new ApiError(500, 'Could not send your message. Please try again.', error);
  return { id: data.id };
}

export async function subscribeNewsletter(input) {
  const { email } = newsletterSchema.parse(input);
  const { error } = await getAdminClient().from('newsletter_subscribers').upsert({ email: email.toLowerCase() }, { onConflict: 'email', ignoreDuplicates: true });
  if (error) throw new ApiError(500, 'Could not subscribe. Please try again.', error);
  return { subscribed: true };
}
