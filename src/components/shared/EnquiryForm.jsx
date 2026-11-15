'use client';
import { useState } from 'react';
import Field from '@/components/ui/form/Field';
import TextInput from '@/components/ui/form/TextInput';
import Select from '@/components/ui/form/Select';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { apiPost } from '@/lib/api/client';
import { enquirySchema } from '@/lib/validation/enquiry';
import { validate } from '@/lib/validation/utils';
import styles from './EnquiryForm.module.css';

const TOP_LEVEL = ['name', 'email', 'phone', 'organisation', 'subject', 'message'];

/**
 * One reusable form for every enquiry on the site (contact, sponsor, expo stall, volunteer...).
 * fields: [{ name, label, type: 'text'|'email'|'tel'|'textarea'|'select', required, options, placeholder, span }]
 * Fields named name/email/phone/organisation/subject/message are stored as columns, everything else in `payload`.
 */
export default function EnquiryForm({ id, type, title, intro, fields, children, className = '', submitLabel = 'Submit', successMessage = 'Thank you! We will get back to you shortly.', extraPayload, beforeSubmit }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const set = (k, v) => { setValues((s) => ({ ...s, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };

  async function submit(e) {
    e.preventDefault();
    const payload = { ...(extraPayload || {}) };
    const body = { type, payload };
    fields.forEach((f) => { const v = (values[f.name] ?? '').toString().trim(); if (TOP_LEVEL.includes(f.name)) body[f.name] = v; else if (v) payload[f.name] = v; });
    body.website = values.website || '';

    const local = {};
    const result = validate(enquirySchema, body);
    Object.assign(local, result.errors);
    fields.forEach((f) => { if (f.required && !(values[f.name] ?? '').toString().trim()) local[f.name] = `${f.label || f.placeholder || 'This field'} is required`; });
    if (Object.keys(local).length) { setErrors(local); return; }

    try {
      if (beforeSubmit) beforeSubmit(body);
      setStatus({ state: 'loading', message: '' });
      await apiPost('/api/enquiries', body);
      setValues({}); setErrors({});
      setStatus({ state: 'ok', message: successMessage });
    } catch (err) {
      if (err.fieldErrors) setErrors(err.fieldErrors);
      setStatus({ state: 'error', message: err.message });
    }
  }

  return (
    <form id={id} onSubmit={submit} className={`card ${styles.form} ${className}`} noValidate>
      {title && <h3 className="card__title">{title}</h3>}
      {intro && <p className={styles.intro}>{intro}</p>}
      {children}
      <div className={styles.grid}>
        {fields.map((f) => (
          <Field key={f.name} label={f.label} required={f.required} error={errors[f.name]} htmlFor={`${id}-${f.name}`} className={f.span === 2 ? styles.span2 : ''}>
            {f.type === 'select'
              ? <Select id={`${id}-${f.name}`} value={values[f.name]} onChange={(v) => set(f.name, v)} options={f.options.map((o) => ({ value: o, label: o }))} placeholder={f.placeholder || 'Select'} invalid={!!errors[f.name]} />
              : <TextInput id={`${id}-${f.name}`} aria-label={f.label || f.placeholder || f.name} multiline={f.type === 'textarea'} type={f.type === 'textarea' ? undefined : f.type || 'text'} value={values[f.name]} onChange={(v) => set(f.name, v)} placeholder={f.placeholder} invalid={!!errors[f.name]} />}
          </Field>
        ))}
        <input className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={values.website || ''} onChange={(e) => set('website', e.target.value)} />
      </div>
      {status.state === 'ok' && <p className={styles.ok} role="status"><Icon name="check-circle" size={16} /> {status.message}</p>}
      {status.state === 'error' && <p className={styles.err} role="alert"><Icon name="alert" size={16} /> {status.message}</p>}
      <Button type="submit" className={styles.submit} disabled={status.state === 'loading'}>{status.state === 'loading' ? 'Sending...' : submitLabel}</Button>
    </form>
  );
}
