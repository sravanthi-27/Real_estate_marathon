'use client';
import Field from '@/components/ui/form/Field';
import TextInput from '@/components/ui/form/TextInput';
import Select from '@/components/ui/form/Select';
import RadioCards from '@/components/ui/form/RadioCards';
import FormSection, { FieldGrid } from '@/components/ui/form/FormSection';
import { useRegistration } from '../RegistrationProvider';
import { LONGEST_DISTANCES, PACER_GROUPS } from '@/config/registration';
import styles from './steps.module.css';

export default function RunningStep({ errors }) {
  const { data, update } = useRegistration();
  const r = data.running;
  const set = (patch) => update('running', patch);

  return (
    <div>
      <h2 className={styles.title}>Running Experience & Timing</h2>
      <p className={styles.sub}>Help us plan the start waves, pacer buses and support along the route.</p>

      <FormSection number={1} title="Prior marathon & running background">
        <Field label="Have you participated in a timed marathon or running event before?" required error={errors.priorExperience}>
          <RadioCards label="Prior experience" columns={2} value={r.priorExperience} onChange={(v) => set({ priorExperience: v })} options={[{ value: 'yes', title: 'Yes, experienced runner', description: 'I have completed timed events' }, { value: 'no', title: 'No, this is my first run', description: 'First official run' }]} />
        </Field>
        <div style={{ height: '.9rem' }} />
        <FieldGrid cols={2}>
          <Field label="Total runs completed" error={errors.totalRuns} htmlFor="totalRuns"><TextInput id="totalRuns" inputMode="numeric" value={r.totalRuns} onChange={(v) => set({ totalRuns: v.replace(/\D/g, '').slice(0, 4) })} invalid={!!errors.totalRuns} /></Field>
          <Field label="Longest distance completed" required error={errors.longestDistance} htmlFor="longest"><Select id="longest" value={r.longestDistance} onChange={(v) => set({ longestDistance: v })} options={LONGEST_DISTANCES} invalid={!!errors.longestDistance} /></Field>
          <Field label="Personal best / recent time" error={errors.personalBest} htmlFor="pb"><TextInput id="pb" placeholder="e.g. 01:05:30" value={r.personalBest} onChange={(v) => set({ personalBest: v })} /></Field>
          <Field label="Last completed race" error={errors.lastRace} htmlFor="lastRace"><TextInput id="lastRace" value={r.lastRace} onChange={(v) => set({ lastRace: v })} /></Field>
        </FieldGrid>
      </FormSection>

      <FormSection number={2} title="Target finish time & pacer bus" note="Pacers keep you on time">
        <Field label="Select your target finish time / pacer bus" required error={errors.pacerGroup}>
          <RadioCards label="Pacer group" columns={2} value={r.pacerGroup} onChange={(v) => set({ pacerGroup: v })} options={PACER_GROUPS} />
        </Field>
        <div style={{ height: '.9rem' }} />
        <Field label="Running club / community affiliation (optional)" error={errors.club} htmlFor="club"><TextInput id="club" value={r.club} onChange={(v) => set({ club: v })} /></Field>
      </FormSection>
    </div>
  );
}
