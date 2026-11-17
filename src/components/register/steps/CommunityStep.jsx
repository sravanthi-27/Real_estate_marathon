'use client';
import Field from '@/components/ui/form/Field';
import TextInput from '@/components/ui/form/TextInput';
import Select from '@/components/ui/form/Select';
import RadioCards from '@/components/ui/form/RadioCards';
import Checkbox from '@/components/ui/form/Checkbox';
import { FieldGrid } from '@/components/ui/form/FormSection';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useRegistration } from '../RegistrationProvider';
import { COMMUNITIES, COMMUNITY_OTHER, COMMUNITY_ROLES, PROPERTY_TYPES, STATES } from '@/config/registration';
import { EVENT } from '@/config/site';
import styles from './steps.module.css';

function SectionHeading({ number, title, note }) {
  return (
    <header className={styles.communitySectionHead}>
      <span className={styles.communitySectionNumber}>{number}</span>
      <h3>{title}</h3>
      {note && <span className={styles.communitySectionNote}>{note}</span>}
    </header>
  );
}

export default function CommunityStep({ errors, onSkip, onBack, onContinue }) {
  const { data, update } = useRegistration();
  const c = data.community;
  const set = (patch) => update('community', patch);
  const communityOptions = [...COMMUNITIES, { value: COMMUNITY_OTHER, label: 'My community is not listed' }];

  return (
    <div className={styles.communityStep}>
      <header className={styles.communityIntro}>
        <h2 className={styles.title}>Community &amp; Society Details <small>(optional)</small></h2>
        <p>Connect with your gated society or residential community to participate together and support your group in the community challenge.</p>
      </header>

      <aside className={styles.communityBanner}>
        <span className={styles.communityBannerIcon}><Icon name="building" size={17} /></span>
        <div>
          <div className={styles.communityBannerHeading}>
            <strong>Inter-Society Marathon Challenge</strong>
            <span>Community Challenge</span>
          </div>
          <p>Link your registration with your residential society to be counted in community participation and leaderboard totals.</p>
        </div>
      </aside>

      {c.skip ? (
        <div className={styles.individualBox}>
          <p>You&apos;re registering as an individual runner (no community selected).</p>
          <Button variant="outline" size="sm" onClick={() => set({ skip: false })}>Add community details instead</Button>
        </div>
      ) : (
        <>
          <section className={styles.communitySection}>
            <SectionHeading number="01" title="Gated community / apartment information" note="Community details" />
            <FieldGrid cols={2}>
              <Field label="Gated community / society name" required error={errors.communityName} htmlFor="communityName" className={styles.communityNameField}>
                <Select id="communityName" value={c.communityName} onChange={(v) => set({ communityName: v })} options={communityOptions} searchable searchPlaceholder="Search your community..." invalid={!!errors.communityName} />
              </Field>
              {c.communityName === COMMUNITY_OTHER && (
                <Field label="Community name" required error={errors.customCommunityName} htmlFor="customCommunityName" className={styles.communityNameField}>
                  <TextInput id="customCommunityName" value={c.customCommunityName} onChange={(v) => set({ customCommunityName: v })} invalid={!!errors.customCommunityName} />
                </Field>
              )}
              <Field label="Tower / block name" required error={errors.tower} htmlFor="tower">
                <TextInput id="tower" value={c.tower} onChange={(v) => set({ tower: v })} invalid={!!errors.tower} />
              </Field>
              <Field label="Flat / villa number" required error={errors.flatNumber} htmlFor="flatNumber">
                <TextInput id="flatNumber" value={c.flatNumber} onChange={(v) => set({ flatNumber: v })} invalid={!!errors.flatNumber} />
              </Field>
            </FieldGrid>
          </section>

          <section className={styles.communitySection}>
            <SectionHeading number="02" title="Locality &amp; location verification" note="Official event location" />
            <FieldGrid cols={4}>
              <Field label="Locality / area" required error={errors.locality} htmlFor="locality">
                <TextInput id="locality" value={c.locality} onChange={(v) => set({ locality: v })} invalid={!!errors.locality} />
              </Field>
              <Field label="Host marathon hub">
                <div className={styles.eventHub}>{EVENT.city.split(',')[0]}<span>OFFICIAL</span></div>
              </Field>
              <Field label="State" required error={errors.state} htmlFor="c-state">
                <Select id="c-state" value={c.state} onChange={(v) => set({ state: v })} options={STATES} searchable invalid={!!errors.state} />
              </Field>
              <Field label="Pincode" required error={errors.pincode} htmlFor="c-pincode">
                <TextInput id="c-pincode" inputMode="numeric" value={c.pincode} onChange={(v) => set({ pincode: v.replace(/\D/g, '').slice(0, 6) })} invalid={!!errors.pincode} />
              </Field>
            </FieldGrid>
            <div className={styles.communityHint}><Icon name="info" size={14} /><span>Use your residential address details so we can associate your registration with the correct community.</span></div>
          </section>

          <section className={styles.communitySection}>
            <SectionHeading number="03" title="Residential status &amp; role" note="Dwelling &amp; community group" />
            <Field label="Select property type" required error={errors.propertyType}>
              <RadioCards label="Property type" columns={4} value={c.propertyType} onChange={(v) => set({ propertyType: v })} options={PROPERTY_TYPES} />
            </Field>
            <div className={styles.communityRoleRow}>
              <Field label="Your role in the community" required error={errors.role} htmlFor="role">
                <Select id="role" value={c.role} onChange={(v) => set({ role: v })} options={COMMUNITY_ROLES} placeholder="Select your role" invalid={!!errors.role} />
              </Field>
              <div className={styles.whatsappBox}>
                <Checkbox id="wa" checked={c.joinWhatsapp} onChange={(v) => set({ joinWhatsapp: v })}>Join my community&apos;s WhatsApp group for race-day coordination and updates.</Checkbox>
              </div>
            </div>
          </section>

          <div className={styles.independentRow}>
            <button type="button" className={styles.independentButton} onClick={onSkip}><Icon name="arrow-right" size={13} /> Run as an independent solo runner</button>
            <span>Not living in a gated community? Continue directly as an independent runner.</span>
          </div>
        </>
      )}

      <footer className={styles.communityFooter}>
        <Button variant="ghost" size="sm" onClick={onBack}><Icon name="chevron-left" size={14} /> Back (Family)</Button>
        <span>Step 3 of 6 <i /> Autosaved</span>
        <Button size="sm" onClick={onContinue}>Save &amp; continue to medical (Step 4) <Icon name="arrow-right" size={14} /></Button>
      </footer>
    </div>
  );
}
