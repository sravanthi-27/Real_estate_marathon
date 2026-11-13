'use client';
import { useState } from 'react';
import { apiPost } from '@/lib/api/client';
import styles from './NewsletterForm.module.css';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState({ status: 'idle', message: '' });

  async function submit(e) {
    e.preventDefault();
    setState({ status: 'loading', message: '' });
    try {
      await apiPost('/api/newsletter', { email });
      setEmail('');
      setState({ status: 'ok', message: 'Subscribed! Thank you.' });
    } catch (err) {
      setState({ status: 'error', message: err.fieldErrors?.email || err.message });
    }
  }

  return (
    <form onSubmit={submit} className={styles.form} noValidate>
      <div className={styles.row}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" className={styles.input} />
        <button className={styles.btn} disabled={state.status === 'loading'}>{state.status === 'loading' ? '...' : 'Subscribe'}</button>
      </div>
      {state.message && <p className={state.status === 'ok' ? styles.ok : styles.err} role="status">{state.message}</p>}
    </form>
  );
}
