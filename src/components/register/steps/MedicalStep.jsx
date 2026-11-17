'use client';
import Field from '@/components/ui/form/Field';
import TextInput from '@/components/ui/form/TextInput';
import Select from '@/components/ui/form/Select';
import ChipGroup from '@/components/ui/form/ChipGroup';
import RadioCards from '@/components/ui/form/RadioCards';
import FileUpload from '@/components/ui/form/FileUpload';
import { FieldGrid } from '@/components/ui/form/FormSection';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useRegistration } from '../RegistrationProvider';
import { EMERGENCY_RELATIONSHIPS, HEALTH_CHECKUPS } from '@/config/registration';
import styles from './steps.module.css';

const YES_NO = [{ value: 'no', title: 'No, none' }, { value: 'yes', title: 'Yes' }];
const digits = (v) => v.replace(/\D/g, '').slice(0, 10);

export default function MedicalStep({ errors, onBack, onContinue }) {
  const { data, update } = useRegistration();
  const m = data.medical;
  const p = data.personal;
  const set = (patch) => update('medical', patch);
  const setPersonal = (patch) => update('personal', patch);

  return (
    <div className={styles.medicalStep}>
      <header className={styles.medicalIntro}>
        <h2 className={styles.title}>Medical &amp; Safety Details <small>(mandatory)</small></h2>
        <p>Provide emergency contact and clinical details so our on-course medical team can provide appropriate care and safety.</p>
      </header>

      <aside className={styles.medicalBanner}>
        <span className={styles.medicalBannerIcon}><Icon name="ambulance" size={17} /></span>
        <div className={styles.medicalBannerContent}>
          <div className={styles.medicalBannerHeading}>
            <strong>On-track paramedic dispatch network</strong>
            <span>24/7 medical assistance</span>
          </div>
          <p>Your blood group, conditions, and critical disclosures help our medical team respond safely. Your details are shared only with authorized medical personnel for emergency care.</p>
        </div>
        <span className={styles.medicalBannerTag}>Race-day support</span>
      </aside>

      <section className={styles.medicalSection}>
        <header className={styles.medicalSectionHead}>
          <span className={styles.medicalSectionNumber}>01</span>
          <h3>Critical medical conditions &amp; disclosures</h3>
          <span className={styles.medicalRequired}>Mandatory</span>
        </header>
        <div className={styles.medicalQuestion}>
          <Field label="Do you have any registered or known pre-existing medical condition?" required error={errors.hasCondition}>
            <RadioCards label="Pre-existing medical condition" columns={2} value={m.hasCondition} onChange={(v) => set({ hasCondition: v })} options={YES_NO} />
          </Field>
          {m.hasCondition === 'yes' && (
            <Field label="Specify medical history, allergies, triggers or medications" required error={errors.conditionDetails} htmlFor="cond">
              <TextInput id="cond" multiline value={m.conditionDetails} onChange={(v) => set({ conditionDetails: v })} invalid={!!errors.conditionDetails} placeholder="e.g. Mild exercise-induced asthma (carries personal inhaler)" />
            </Field>
          )}
        </div>
        <div className={styles.medicalQuestion}>
          <Field label="Are you currently taking any regular prescription medication?" required error={errors.onMedication}>
            <RadioCards label="Regular prescription medication" columns={2} value={m.onMedication} onChange={(v) => set({ onMedication: v })} options={[{ value: 'no', title: 'No prescription medications' }, { value: 'yes', title: 'Yes, regular daily medication' }]} />
          </Field>
          {m.onMedication === 'yes' && (
            <Field label="List your medication" required error={errors.medicationDetails} htmlFor="meds">
              <TextInput id="meds" multiline value={m.medicationDetails} onChange={(v) => set({ medicationDetails: v })} invalid={!!errors.medicationDetails} placeholder="List medication and dosage" />
            </Field>
          )}
        </div>
      </section>

      <section className={styles.medicalSection}>
        <header className={styles.medicalSectionHead}>
          <span className={styles.medicalSectionNumber}>02</span>
          <h3>Emergency contact &amp; hospital details</h3>
          <span className={styles.medicalSectionNote}>Required for emergencies</span>
        </header>
        <FieldGrid>
          <Field label="Emergency contact full name" required error={errors.emergencyName} htmlFor="medical-emergency-name">
            <TextInput id="medical-emergency-name" value={p.emergencyName} onChange={(v) => setPersonal({ emergencyName: v })} autoComplete="name" />
          </Field>
          <Field label="Relationship to runner" required error={errors.emergencyRelationship} htmlFor="medical-emergency-relationship">
            <Select id="medical-emergency-relationship" value={p.emergencyRelationship} onChange={(v) => setPersonal({ emergencyRelationship: v })} options={EMERGENCY_RELATIONSHIPS} placeholder="Select relationship" invalid={!!errors.emergencyRelationship} />
          </Field>
          <Field label="Emergency contact mobile number" required error={errors.emergencyMobile} htmlFor="medical-emergency-mobile">
            <TextInput id="medical-emergency-mobile" prefix="+91" inputMode="numeric" value={p.emergencyMobile} onChange={(v) => setPersonal({ emergencyMobile: digits(v) })} autoComplete="tel-national" invalid={!!errors.emergencyMobile} />
          </Field>
          <Field label="Primary doctor / physician name (optional)" error={errors.physicianName} htmlFor="phys">
            <TextInput id="phys" value={m.physicianName} onChange={(v) => set({ physicianName: v })} />
          </Field>
          <Field label="Doctor contact number (optional)" error={errors.physicianMobile} htmlFor="physm">
            <TextInput id="physm" prefix="+91" inputMode="numeric" value={m.physicianMobile} onChange={(v) => set({ physicianMobile: digits(v) })} invalid={!!errors.physicianMobile} />
          </Field>
          <Field label="Preferred hospital / network (optional)" error={errors.hospital} htmlFor="hosp">
            <TextInput id="hosp" value={m.hospital} onChange={(v) => set({ hospital: v })} placeholder="Enter preferred hospital" />
          </Field>
        </FieldGrid>
      </section>

      <section className={styles.medicalSection}>
        <header className={styles.medicalSectionHead}>
          <span className={styles.medicalSectionNumber}>03</span>
          <h3>Blood group confirmation &amp; fitness clearance</h3>
          <span className={styles.medicalRequired}>Mandatory</span>
        </header>
        <div className={styles.medicalClearanceGrid}>
          <Field label="Primary runner blood group" required error={errors.bloodGroup}>
            <ChipGroup label="Primary runner blood group" value={p.bloodGroup} onChange={(v) => setPersonal({ bloodGroup: v })} options={['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']} />
          </Field>
          <Field label="Recent health checkup / fitness status" required error={errors.healthCheckup}>
            <RadioCards label="Fitness status" columns={2} value={m.healthCheckup} onChange={(v) => set({ healthCheckup: v })} options={HEALTH_CHECKUPS} />
          </Field>
        </div>
        <Field label="Medical fitness certificate upload (optional)" hint="Optional supporting document for your medical clearance." error={errors.fitnessCertificatePath}>
          <FileUpload kind="medical_certificate" accept="image/jpeg,image/png,image/webp,application/pdf" title="Drag & drop or click to browse" hint="PDF, JPG, PNG up to 5 MB" value={m.fitnessCertificatePath} fileName={m.fitnessCertificateName} onChange={(path, name) => set({ fitnessCertificatePath: path, fitnessCertificateName: name })} />
        </Field>
      </section>

      <footer className={styles.medicalFooter}>
        <Button variant="ghost" size="sm" onClick={onBack}><Icon name="chevron-left" size={14} /> Back (Step 3: Community)</Button>
        <span>Step 4 of 6 <i /> Autosaved</span>
        <Button size="sm" onClick={onContinue}>Save &amp; continue to running experience (Step 5) <Icon name="arrow-right" size={14} /></Button>
      </footer>
    </div>
  );
}
