'use client';
import Field from '@/components/ui/form/Field';
import TextInput from '@/components/ui/form/TextInput';
import RadioCards from '@/components/ui/form/RadioCards';
import FileUpload from '@/components/ui/form/FileUpload';
import FormSection, { FieldGrid } from '@/components/ui/form/FormSection';
import Icon from '@/components/ui/Icon';
import { useRegistration } from '../RegistrationProvider';
import { HEALTH_CHECKUPS } from '@/config/registration';
import styles from './steps.module.css';

const YES_NO = [{ value: 'no', title: 'No, none' }, { value: 'yes', title: 'Yes' }];
const digits = (v) => v.replace(/\D/g, '').slice(0, 10);

export default function MedicalStep({ errors }) {
  const { data, update } = useRegistration();
  const m = data.medical;
  const set = (patch) => update('medical', patch);

  return (
    <div>
      <h2 className={styles.title}>Medical & Safety Details <small style={{ fontSize: '.6em', color: 'var(--color-danger)' }}>(mandatory)</small></h2>
      <p className={styles.sub}>Provide emergency contact and clinical details so our medical team can look after you on race day.</p>

      <div className={`${styles.banner} ${styles.green}`}>
        <Icon name="stethoscope" size={18} />
        <span><strong>On-track paramedic network.</strong> Your information is shared only with the medical team and used in case of an emergency.</span>
      </div>

      <FormSection number={1} title="Coverage: medical conditions & disclosures">
        <Field label="Do you have any registered or known pre-existing medical conditions?" required error={errors.hasCondition}>
          <RadioCards label="Pre-existing condition" columns={2} value={m.hasCondition} onChange={(v) => set({ hasCondition: v })} options={YES_NO} />
        </Field>
        {m.hasCondition === 'yes' && (
          <div style={{ marginTop: '.8rem' }}>
            <Field label="Specify condition, allergy triggers or medications" required error={errors.conditionDetails} htmlFor="cond">
              <TextInput id="cond" multiline value={m.conditionDetails} onChange={(v) => set({ conditionDetails: v })} invalid={!!errors.conditionDetails} />
            </Field>
          </div>
        )}
        <div style={{ height: '.9rem' }} />
        <Field label="Are you currently taking any prescription medication?" required error={errors.onMedication}>
          <RadioCards label="Prescription medication" columns={2} value={m.onMedication} onChange={(v) => set({ onMedication: v })} options={[{ value: 'no', title: 'No prescription medication' }, { value: 'yes', title: 'Yes, regular medication' }]} />
        </Field>
        {m.onMedication === 'yes' && (
          <div style={{ marginTop: '.8rem' }}>
            <Field label="List your medication" required error={errors.medicationDetails} htmlFor="meds">
              <TextInput id="meds" multiline value={m.medicationDetails} onChange={(v) => set({ medicationDetails: v })} invalid={!!errors.medicationDetails} />
            </Field>
          </div>
        )}
      </FormSection>

      <FormSection number={2} title="Physician & preferred hospital" note="Optional">
        <FieldGrid>
          <Field label="Family doctor / physician name" error={errors.physicianName} htmlFor="phys"><TextInput id="phys" value={m.physicianName} onChange={(v) => set({ physicianName: v })} /></Field>
          <Field label="Doctor contact number" error={errors.physicianMobile} htmlFor="physm"><TextInput id="physm" prefix="+91" inputMode="numeric" value={m.physicianMobile} onChange={(v) => set({ physicianMobile: digits(v) })} invalid={!!errors.physicianMobile} /></Field>
          <Field label="Preferred hospital / network" error={errors.hospital} htmlFor="hosp"><TextInput id="hosp" value={m.hospital} onChange={(v) => set({ hospital: v })} /></Field>
        </FieldGrid>
      </FormSection>

      <FormSection number={3} title="Fitness clearance">
        <Field label="Recent health checkup / fitness status" required error={errors.healthCheckup}>
          <RadioCards label="Fitness status" columns={2} value={m.healthCheckup} onChange={(v) => set({ healthCheckup: v })} options={HEALTH_CHECKUPS} />
        </Field>
        <div style={{ height: '.9rem' }} />
        <Field label="Medical fitness certificate (optional)" error={errors.fitnessCertificatePath}>
          <FileUpload kind="medical_certificate" accept="image/jpeg,image/png,image/webp,application/pdf" title="Drag & drop or click to upload" hint="PDF or image, up to 5 MB" value={m.fitnessCertificatePath} fileName={m.fitnessCertificateName} onChange={(path, name) => set({ fitnessCertificatePath: path, fitnessCertificateName: name })} />
        </Field>
      </FormSection>
    </div>
  );
}
