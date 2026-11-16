'use client';
import { useState } from 'react';
import Field from '@/components/ui/form/Field';
import TextInput from '@/components/ui/form/TextInput';
import Select from '@/components/ui/form/Select';
import DatePicker from '@/components/ui/form/DatePicker';
import ChipGroup from '@/components/ui/form/ChipGroup';
import RadioCards from '@/components/ui/form/RadioCards';
import FormSection, { FieldGrid } from '@/components/ui/form/FormSection';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { useRegistration } from '../RegistrationProvider';
import { CATEGORIES, FAMILY_RELATIONSHIPS, GENDERS, TSHIRT_SIZES } from '@/config/registration';
import { PRICING } from '@/lib/pricing';
import { ageFromDob, formatDate, uid } from '@/lib/utils';
import { familyMemberSchema } from '@/lib/validation/registration';
import { validate } from '@/lib/validation/utils';
import styles from './steps.module.css';

const blank = () => ({ id: uid(), fullName: '', relationship: '', dob: '', gender: '', category: '', tshirtSize: '', bibName: '' });

export default function FamilyStep({ errors }) {
  const { data, update } = useRegistration();
  const members = data.family.members;
  const [draft, setDraft] = useState(blank);
  const [draftErrors, setDraftErrors] = useState({});
  const [editing, setEditing] = useState(false);
  const set = (patch) => { setDraft((d) => ({ ...d, ...patch })); setDraftErrors({}); };
  const age = ageFromDob(draft.dob);
  const included = PRICING.includedFamilyMembers;
  const familyLimitReached = members.length >= 8 && !editing;

  function save() {
    if (familyLimitReached) return;
    const res = validate(familyMemberSchema, draft);
    if (!res.ok) { setDraftErrors(res.errors); return; }
    const exists = members.some((m) => m.id === draft.id);
    update('family', { members: exists ? members.map((m) => (m.id === draft.id ? res.data : m)) : [...members, res.data] });
    setDraft(blank()); setEditing(false);
  }
  const remove = (id) => update('family', { members: members.filter((m) => m.id !== id) });
  const edit = (m) => { setDraft(m); setEditing(true); setDraftErrors({}); };

  return (
    <div>
      <h2 className={styles.title}>Family Members <small style={{ fontSize: '.6em', color: 'var(--color-muted)' }}>(optional)</small></h2>
      <p className={styles.sub}>Add immediate family members who will run with you. You can skip this step.</p>

      <div className={styles.banner}>
        <Icon name="ticket" size={18} />
        <span><strong>Family Squad Pass (flat fee).</strong> Your Rs {PRICING.baseFamilyPassPaise / 100} pass covers up to {included} family members. Additional members are Rs {PRICING.extraMemberPaise / 100} each. Currently added: <strong>{members.length}</strong>.</span>
      </div>
      {errors.members && <p className={styles.err} role="alert">{errors.members}</p>}
      {familyLimitReached && <p className={styles.sub} role="status">You can add up to 8 family members.</p>}

      {members.length > 0 && (
        <FormSection number={<Icon name="users" size={14} />} title={`Added family members (${members.length})`}>
          <ul className={styles.list}>
            {members.map((m) => (
              <li key={m.id} className={styles.member}>
                <span><strong>{m.fullName}</strong>{m.relationship} &middot; {CATEGORIES.find((c) => c.id === m.category)?.short} &middot; Size {m.tshirtSize} &middot; DOB {formatDate(m.dob)}</span>
                <span className={styles.actions}>
                  <button type="button" className={styles.link} onClick={() => edit(m)}><Icon name="pencil" size={12} /> Edit</button>
                  <button type="button" className={`${styles.link} ${styles.danger}`} onClick={() => remove(m.id)}><Icon name="trash" size={12} /> Remove</button>
                </span>
              </li>
            ))}
          </ul>
        </FormSection>
      )}

      <FormSection number={<Icon name="plus" size={14} />} title={editing ? 'Edit family member' : 'Add new family member'}>
        <FieldGrid>
          <Field label="Full name" required error={draftErrors.fullName} htmlFor="fm-name">
            <TextInput id="fm-name" value={draft.fullName} onChange={(v) => set({ fullName: v })} invalid={!!draftErrors.fullName} />
          </Field>
          <Field label="Relationship" required error={draftErrors.relationship}>
            <Select value={draft.relationship} onChange={(v) => set({ relationship: v })} options={FAMILY_RELATIONSHIPS} invalid={!!draftErrors.relationship} />
          </Field>
          <Field label="Gender" required error={draftErrors.gender}>
            <ChipGroup label="Gender" value={draft.gender} onChange={(v) => set({ gender: v })} options={GENDERS} />
          </Field>
          <Field label="Date of birth" required error={draftErrors.dob}>
            <DatePicker value={draft.dob} onChange={(v) => set({ dob: v })} invalid={!!draftErrors.dob} />
          </Field>
          <Field label="Calculated age"><div className={styles.age}>{age === null ? '-' : `${age} years`}</div></Field>
          <Field label="Preferred name on bib" error={draftErrors.bibName} htmlFor="fm-bib">
            <TextInput id="fm-bib" value={draft.bibName} maxLength={16} onChange={(v) => set({ bibName: v.toUpperCase() })} />
          </Field>
        </FieldGrid>
        <div style={{ height: '.9rem' }} />
        <Field label="Running category" required error={draftErrors.category}>
          <RadioCards label="Running category" columns={2} value={draft.category} onChange={(v) => set({ category: v })} options={CATEGORIES.map((c) => ({ value: c.id, title: c.label, description: `Minimum age ${c.minAge}` }))} />
        </Field>
        <div style={{ height: '.9rem' }} />
        <Field label="T-shirt size" required error={draftErrors.tshirtSize}>
          <ChipGroup label="T-shirt size" value={draft.tshirtSize} onChange={(v) => set({ tshirtSize: v })} options={TSHIRT_SIZES} />
        </Field>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
          <Button onClick={save} size="sm" disabled={familyLimitReached}><Icon name="plus" size={14} /> {editing ? 'Update member' : 'Save & add family member'}</Button>
          {editing && <Button variant="ghost" size="sm" onClick={() => { setDraft(blank()); setEditing(false); setDraftErrors({}); }}>Cancel</Button>}
        </div>
      </FormSection>
    </div>
  );
}
