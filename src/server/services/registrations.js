import 'server-only';
import { ApiError } from '../errors';
import { getAdminClient } from '../supabase';
import { createRegistrationSchema } from '@/lib/validation/registration';
import { buildFees } from '@/lib/pricing';
import { CATEGORIES, COMMUNITY_OTHER } from '@/config/registration';

export async function createRegistration(input) {
  const data = createRegistrationSchema.parse(input);
  const { personal: p, family, community, medical, running, declarations } = data;
  const { totalPaise } = buildFees({ category: p.category, familyCount: family.members.length });

  const communityRecord = community.skip
    ? null
    : { ...community, communityName: community.communityName === COMMUNITY_OTHER ? community.customCommunityName : community.communityName };

  const sb = getAdminClient();
  const { data: reg, error } = await sb
    .from('registrations')
    .insert({
      full_name: p.fullName, gender: p.gender, date_of_birth: p.dob, blood_group: p.bloodGroup, nationality: p.nationality,
      category: p.category, tshirt_size: p.tshirtSize, bib_name: p.bibName || null,
      mobile: p.mobile, alt_mobile: p.altMobile || null, email: p.email.toLowerCase(),
      address_line1: p.addressLine1, society_name: p.society || null, pincode: p.pincode, city: p.city, state: p.state,
      emergency_name: p.emergencyName, emergency_mobile: p.emergencyMobile, emergency_relationship: p.emergencyRelationship,
      photo_path: p.photoPath, id_proof_path: p.idProofPath,
      community: communityRecord, medical, running,
      declarations: { ...declarations, acceptedAt: new Date().toISOString() },
      amount_paise: totalPaise,
    })
    .select('id, reference, access_token, amount_paise')
    .single();
  if (error) throw new ApiError(500, 'Could not create your registration. Please try again.', error);

  if (family.members.length) {
    const rows = family.members.map((m) => ({
      registration_id: reg.id, full_name: m.fullName, relationship: m.relationship, date_of_birth: m.dob,
      gender: m.gender, category: m.category, tshirt_size: m.tshirtSize, bib_name: m.bibName || null,
    }));
    const { error: famError } = await sb.from('family_members').insert(rows);
    if (famError) {
      await sb.from('registrations').delete().eq('id', reg.id); // keep data consistent
      throw new ApiError(500, 'Could not save family members. Please try again.', famError);
    }
  }
  return { id: reg.id, reference: reg.reference, token: reg.access_token, amountPaise: reg.amount_paise };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Public view of a registration - needs reference + secret token. Never returns medical data. */
export async function getPublicRegistration(reference, token) {
  if (!UUID.test(token || '') || !/^REM-\d{4}-\d{5}$/.test(reference || '')) throw new ApiError(404, 'Registration not found');
  const sb = getAdminClient();
  const { data: reg, error } = await sb
    .from('registrations')
    .select('id, reference, status, full_name, category, tshirt_size, bib_name, bib_number, email, mobile, society_name, community, amount_paise, created_at, family_members(id, full_name, relationship, category, bib_number, tshirt_size)')
    .eq('reference', reference)
    .eq('access_token', token)
    .maybeSingle();
  if (error) throw new ApiError(500, 'Could not load registration', error);
  if (!reg) throw new ApiError(404, 'Registration not found');

  const { data: payment } = await sb
    .from('payments')
    .select('method, provider_payment_id, amount_paise, paid_at')
    .eq('registration_id', reg.id).eq('status', 'paid')
    .order('paid_at', { ascending: false }).limit(1).maybeSingle();

  const cat = CATEGORIES.find((c) => c.id === reg.category);
  return {
    reference: reg.reference,
    status: reg.status,
    createdAt: reg.created_at,
    runner: {
      name: reg.full_name, email: reg.email, mobile: reg.mobile, category: cat?.label || reg.category,
      categoryShort: cat?.short || '', tshirtSize: reg.tshirt_size, bibName: reg.bib_name,
      bibNumber: reg.bib_number, wave: cat?.wave || '', startTime: cat?.start || '',
      community: reg.community?.communityName || reg.society_name || '',
    },
    family: (reg.family_members || []).map((m) => ({
      name: m.full_name, relationship: m.relationship, bibNumber: m.bib_number, tshirtSize: m.tshirt_size,
      category: CATEGORIES.find((c) => c.id === m.category)?.label || m.category,
    })),
    amountPaise: reg.amount_paise,
    payment: payment ? { method: payment.method, paymentId: payment.provider_payment_id, paidAt: payment.paid_at } : null,
  };
}
