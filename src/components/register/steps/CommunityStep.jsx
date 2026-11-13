'use client';
import Field from '@/components/ui/form/Field';
import TextInput from '@/components/ui/form/TextInput';
import Select from '@/components/ui/form/Select';
import RadioCards from '@/components/ui/form/RadioCards';
import Checkbox from '@/components/ui/form/Checkbox';
import FormSection, { FieldGrid } from '@/components/ui/form/FormSection';
import Button from '@/components/ui/Button';
import { useRegistration } from '../RegistrationProvider';
import { COMMUNITIES, COMMUNITY_OTHER, COMMUNITY_ROLES, PROPERTY_TYPES, STATES } from '@/config/registration';
import styles from './steps.module.css';

export default function CommunityStep({ errors, onSkip }) {
  const { data, update } = useRegistration();
  const c = data.community;
  const set = (patch) => update('community', patch);
  const communityOptions = [...COMMUNITIES, { value: COMMUNITY_OTHER, label: 'My community is not listed' }];

  return (
    <div>
      <h2 className={styles.title}>Community & Society Details <small style={{ fontSize: '.6em', color: 'var(--color-muted)' }}>(optional)</small></h2>
      <p className={styles.sub}>Connect with your gated society or residential community to support your group in the community challenge.</p>

      {c.skip ? (
        <div className={styles.box}>
          <p style={{ fontSize: 'var(--fs-sm)', marginBottom: '.7rem' }}>You&apos;re registering as an individual runner (no community selected).</p>
          <Button variant="outline" size="sm" onClick={() => set({ skip: false })}>Add community details instead</Button>
        </div>
      ) : (
        <>
          <FormSection number={1} title="Gated community / apartment information">
            <FieldGrid>
              <Field label="Gated community / society name" required error={errors.communityName} htmlFor="communityName">
                <Select id="communityName" value={c.communityName} onChange={(v) => set({ communityName: v })} options={communityOptions} searchable searchPlaceholder="Search your community..." invalid={!!errors.communityName} />
              </Field>
              {c.communityName === COMMUNITY_OTHER && (
                <Field label="Community name" required error={errors.customCommunityName} htmlFor="customCommunityName">
                  <TextInput id="customCommunityName" value={c.customCommunityName} onChange={(v) => set({ customCommunityName: v })} invalid={!!errors.customCommunityName} />
                </Field>
              )}
              <Field label="Tower / block name" error={errors.tower} htmlFor="tower">
                <TextInput id="tower" value={c.tower} onChange={(v) => set({ tower: v })} />
              </Field>
              <Field label="Flat / villa number" required error={errors.flatNumber} htmlFor="flatNumber">
                <TextInput id="flatNumber" value={c.flatNumber} onChange={(v) => set({ flatNumber: v })} invalid={!!errors.flatNumber} />
              </Field>
            </FieldGrid>
          </FormSection>

          <FormSection number={2} title="Locality & location verification">
            <FieldGrid>
              <Field label="Locality / area" required error={errors.locality} htmlFor="locality">
                <TextInput id="locality" value={c.locality} onChange={(v) => set({ locality: v })} invalid={!!errors.locality} />
              </Field>
              <Field label="State" required error={errors.state} htmlFor="c-state">
                <Select id="c-state" value={c.state} onChange={(v) => set({ state: v })} options={STATES} searchable invalid={!!errors.state} />
              </Field>
              <Field label="Pincode" required error={errors.pincode} htmlFor="c-pincode">
                <TextInput id="c-pincode" inputMode="numeric" value={c.pincode} onChange={(v) => set({ pincode: v.replace(/\D/g, '').slice(0, 6) })} invalid={!!errors.pincode} />
              </Field>
            </FieldGrid>
          </FormSection>

          <FormSection number={3} title="Residential status & role">
            <Field label="Select property type" required error={errors.propertyType}>
              <RadioCards label="Property type" columns={2} value={c.propertyType} onChange={(v) => set({ propertyType: v })} options={PROPERTY_TYPES} />
            </Field>
            <div style={{ height: '.9rem' }} />
            <Field label="Your role in the community" required error={errors.role} htmlFor="role">
              <Select id="role" value={c.role} onChange={(v) => set({ role: v })} options={COMMUNITY_ROLES} placeholder="Select your role" invalid={!!errors.role} />
            </Field>
            <div style={{ height: '.9rem' }} />
            <Checkbox id="wa" checked={c.joinWhatsapp} onChange={(v) => set({ joinWhatsapp: v })}>Join my community&apos;s WhatsApp group for race-day coordination and updates.</Checkbox>
          </FormSection>
        </>
      )}

      {!c.skip && <button type="button" className={styles.skipLink} onClick={onSkip}>Not in a gated community? Continue directly as an individual runner</button>}
    </div>
  );
}
