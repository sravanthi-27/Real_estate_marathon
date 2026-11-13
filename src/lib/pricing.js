import { CATEGORIES } from '@/config/registration';

/** Edit prices here. Used by the review screen AND the server (server is the source of truth). */
export const PRICING = {
  baseFamilyPassPaise: 9900, // Rs 99 flat family squad pass
  includedFamilyMembers: 5, // members covered by the flat pass
  extraMemberPaise: 9900, // each member beyond the included count
  processingFeePaise: 0,
};

export function buildFees({ category, familyCount = 0 }) {
  const cat = CATEGORIES.find((c) => c.id === category);
  const extra = Math.max(0, familyCount - PRICING.includedFamilyMembers);
  const included = Math.min(familyCount, PRICING.includedFamilyMembers);
  const lines = [{ key: 'primary', label: `${cat ? cat.label : 'Runner'} - Family Squad Pass`, amountPaise: PRICING.baseFamilyPassPaise }];
  if (familyCount > 0) lines.push({ key: 'family', label: `Family members (${included})`, amountPaise: 0, note: 'Included' });
  if (extra > 0) lines.push({ key: 'extra', label: `Additional members (${extra})`, amountPaise: extra * PRICING.extraMemberPaise });
  lines.push({ key: 'processing', label: 'Processing fee', amountPaise: PRICING.processingFeePaise, note: PRICING.processingFeePaise ? '' : 'Free' });
  const totalPaise = lines.reduce((s, l) => s + l.amountPaise, 0);
  return { lines, totalPaise };
}
