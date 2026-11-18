'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'rem-registration-v1';
/** Editing any of these invalidates an already-created (unpaid) registration. */
const PAYLOAD_SLICES = ['personal', 'family', 'community', 'medical', 'running'];

export const emptyRegistration = () => ({
  personal: {
    fullName: '', gender: '', dob: '', bloodGroup: '', nationality: 'IN', category: '', tshirtSize: '', bibName: '',
    mobile: '', altMobile: '', email: '', addressLine1: '', society: '', pincode: '', city: '', state: '',
    emergencyName: '', emergencyMobile: '', emergencyRelationship: '',
    photoPath: '', photoName: '', idProofPath: '', idProofName: '', privacyAccepted: false,
  },
  family: { members: [] },
  community: { skip: false, communityName: '', customCommunityName: '', tower: '', flatNumber: '', locality: '', state: '', pincode: '', propertyType: '', role: '', joinWhatsapp: true },
  medical: { hasCondition: '', conditionDetails: '', onMedication: '', medicationDetails: '', physicianName: '', physicianMobile: '', hospital: '', healthCheckup: '', fitnessCertificatePath: '', fitnessCertificateName: '' },
  running: { priorExperience: '', totalRuns: '', longestDistance: '', personalBest: '', lastRace: '', pacerGroup: '', club: '' },
  declarations: { medical: false, indemnity: false },
  paymentMethod: 'upi',
  bank: '',
  submission: null,
});

const Ctx = createContext(null);

/** Holds the whole multi-step form. Persisted in sessionStorage so a refresh does not lose progress. */
export function RegistrationProvider({ children }) {
  const [data, setData] = useState(emptyRegistration);
  const [account, setAccount] = useState({ password: '', confirmPassword: '' });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setData((d) => ({ ...d, ...JSON.parse(raw) }));
    } catch { /* ignore corrupted storage */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* storage full / blocked */ }
  }, [data, hydrated]);

  /** Merge a patch into an object slice (personal, family, ...). */
  const update = useCallback((slice, patch) => {
    setData((s) => {
      const next = { ...s, [slice]: { ...s[slice], ...patch } };
      if (PAYLOAD_SLICES.includes(slice)) next.submission = null;
      return next;
    });
  }, []);

  /** Set a top-level scalar (paymentMethod, bank, submission). */
  const setField = useCallback((key, value) => setData((s) => ({ ...s, [key]: value })), []);

  const reset = useCallback(() => {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setData(emptyRegistration());
    setAccount({ password: '', confirmPassword: '' });
  }, []);

  const value = useMemo(() => ({ data, update, setField, account, setAccount, reset, hydrated }), [data, update, setField, account, reset, hydrated]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRegistration() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useRegistration must be used inside <RegistrationProvider>');
  return ctx;
}
