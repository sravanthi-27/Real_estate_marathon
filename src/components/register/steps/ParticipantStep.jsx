'use client';
import Field from '@/components/ui/form/Field';
import TextInput from '@/components/ui/form/TextInput';
import Select from '@/components/ui/form/Select';
import DatePicker from '@/components/ui/form/DatePicker';
import ChipGroup from '@/components/ui/form/ChipGroup';
import RadioCards from '@/components/ui/form/RadioCards';
import Checkbox from '@/components/ui/form/Checkbox';
import FileUpload from '@/components/ui/form/FileUpload';
import FormSection, { FieldGrid } from '@/components/ui/form/FormSection';
import { useRegistration } from '../RegistrationProvider';
import { BLOOD_GROUPS, CATEGORIES, EMERGENCY_RELATIONSHIPS, GENDERS, NATIONALITIES, STATES, TSHIRT_SIZES } from '@/config/registration';
import { ageFromDob } from '@/lib/utils';
import styles from './steps.module.css';

const digits = (v, max = 10) => v.replace(/\D/g, '').slice(0, max);

export default function ParticipantStep({ errors }) {
  const { data, update } = useRegistration();
  const p = data.personal;
  const set = (patch) => update('personal', patch);
  const age = ageFromDob(p.dob);

  return (
    <div>
      <h2 className={styles.title}>Participant Details</h2>
      <p className={styles.sub}>Tell us a little about yourself to get your official marathon bib ready.</p>

      <FormSection number={1} title="Personal details" note="Document must match your ID">
        <FieldGrid>
          <Field label="Full name (as per govt. photo ID)" required error={errors.fullName} htmlFor="fullName">
            <TextInput id="fullName" value={p.fullName} onChange={(v) => set({ fullName: v })} invalid={!!errors.fullName} autoComplete="name" />
          </Field>
          <Field label="Gender" required error={errors.gender}>
            <ChipGroup label="Gender" value={p.gender} onChange={(v) => set({ gender: v })} options={GENDERS} />
          </Field>
          <Field label="Date of birth" required error={errors.dob} htmlFor="dob">
            <DatePicker id="dob" value={p.dob} onChange={(v) => set({ dob: v })} invalid={!!errors.dob} />
          </Field>
          <Field label="Calculated age"><div className={styles.age}>{age === null ? '-' : `${age} years`}</div></Field>
          <Field label="Blood group" required error={errors.bloodGroup} htmlFor="bloodGroup">
            <Select id="bloodGroup" value={p.bloodGroup} onChange={(v) => set({ bloodGroup: v })} options={BLOOD_GROUPS} placeholder="Select blood group" invalid={!!errors.bloodGroup} />
          </Field>
          <Field label="Nationality" required error={errors.nationality} htmlFor="nationality">
            <Select id="nationality" value={p.nationality} onChange={(v) => set({ nationality: v })} options={NATIONALITIES} searchable searchPlaceholder="Search country..." invalid={!!errors.nationality} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection number={2} title="Official marathon kit & bib">
        <Field label="Running category" required error={errors.category}>
          <RadioCards label="Running category" columns={2} value={p.category} onChange={(v) => set({ category: v })} options={CATEGORIES.map((c) => ({ value: c.id, title: c.label, description: `Starts ${c.start}` }))} />
        </Field>
        <div style={{ height: '.9rem' }} />
        <FieldGrid cols={2}>
          <Field label="Running T-shirt size (Dri-Fit)" required error={errors.tshirtSize}>
            <ChipGroup label="T-shirt size" value={p.tshirtSize} onChange={(v) => set({ tshirtSize: v })} options={TSHIRT_SIZES} />
          </Field>
          <Field label="Preferred name on bib" error={errors.bibName} hint="Max 16 letters, optional" htmlFor="bibName">
            <TextInput id="bibName" value={p.bibName} maxLength={16} onChange={(v) => set({ bibName: v.toUpperCase() })} invalid={!!errors.bibName} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection number={3} title="Contact & residential address">
        <FieldGrid>
          <Field label="Mobile number" required error={errors.mobile} htmlFor="mobile">
            <TextInput id="mobile" prefix="+91" inputMode="numeric" value={p.mobile} onChange={(v) => set({ mobile: digits(v) })} invalid={!!errors.mobile} autoComplete="tel-national" />
          </Field>
          <Field label="Alternate mobile" error={errors.altMobile} htmlFor="altMobile">
            <TextInput id="altMobile" prefix="+91" inputMode="numeric" value={p.altMobile} onChange={(v) => set({ altMobile: digits(v) })} invalid={!!errors.altMobile} />
          </Field>
          <Field label="Email address" required error={errors.email} htmlFor="email">
            <TextInput id="email" type="email" value={p.email} onChange={(v) => set({ email: v })} invalid={!!errors.email} autoComplete="email" />
          </Field>
          <Field label="Flat / house / villa no." required error={errors.addressLine1} htmlFor="addressLine1">
            <TextInput id="addressLine1" value={p.addressLine1} onChange={(v) => set({ addressLine1: v })} invalid={!!errors.addressLine1} autoComplete="address-line1" />
          </Field>
          <Field label="Apartment / society name" error={errors.society} htmlFor="society">
            <TextInput id="society" value={p.society} onChange={(v) => set({ society: v })} />
          </Field>
          <Field label="Pincode" required error={errors.pincode} htmlFor="pincode">
            <TextInput id="pincode" inputMode="numeric" value={p.pincode} onChange={(v) => set({ pincode: digits(v, 6) })} invalid={!!errors.pincode} autoComplete="postal-code" />
          </Field>
          <Field label="City" required error={errors.city} htmlFor="city">
            <TextInput id="city" value={p.city} onChange={(v) => set({ city: v })} invalid={!!errors.city} autoComplete="address-level2" />
          </Field>
          <Field label="State" required error={errors.state} htmlFor="state">
            <Select id="state" value={p.state} onChange={(v) => set({ state: v })} options={STATES} searchable searchPlaceholder="Search state..." invalid={!!errors.state} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection number={4} title="Emergency contact" note="Reachable on race day">
        <FieldGrid>
          <Field label="Emergency contact name" required error={errors.emergencyName} htmlFor="emergencyName">
            <TextInput id="emergencyName" value={p.emergencyName} onChange={(v) => set({ emergencyName: v })} invalid={!!errors.emergencyName} />
          </Field>
          <Field label="Emergency mobile number" required error={errors.emergencyMobile} htmlFor="emergencyMobile">
            <TextInput id="emergencyMobile" prefix="+91" inputMode="numeric" value={p.emergencyMobile} onChange={(v) => set({ emergencyMobile: digits(v) })} invalid={!!errors.emergencyMobile} />
          </Field>
          <Field label="Relationship" required error={errors.emergencyRelationship} htmlFor="emergencyRelationship">
            <Select id="emergencyRelationship" value={p.emergencyRelationship} onChange={(v) => set({ emergencyRelationship: v })} options={EMERGENCY_RELATIONSHIPS} invalid={!!errors.emergencyRelationship} />
          </Field>
        </FieldGrid>
      </FormSection>

      <FormSection number={5} title="Upload photo & ID proof">
        <FieldGrid cols={2}>
          <Field error={errors.photoPath}>
            <FileUpload kind="photo" title="Participant passport photo" hint="JPG / PNG / WEBP, up to 3 MB" value={p.photoPath} fileName={p.photoName} invalid={!!errors.photoPath} onChange={(path, name) => set({ photoPath: path, photoName: name })} />
          </Field>
          <Field error={errors.idProofPath}>
            <FileUpload kind="id_proof" accept="image/jpeg,image/png,image/webp,application/pdf" title="Aadhaar / Driving licence / Passport" hint="Image or PDF, up to 5 MB" value={p.idProofPath} fileName={p.idProofName} invalid={!!errors.idProofPath} onChange={(path, name) => set({ idProofPath: path, idProofName: name })} />
          </Field>
        </FieldGrid>
      </FormSection>

      <Field error={errors.privacyAccepted}>
        <Checkbox id="privacy" checked={p.privacyAccepted} onChange={(v) => set({ privacyAccepted: v })}>
          <strong>Data privacy:</strong> Your photo and ID are used only for race verification and emergency purposes. They are stored securely and never shared with third parties.
        </Checkbox>
      </Field>
    </div>
  );
}
