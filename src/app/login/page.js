'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Field from '@/components/ui/form/Field';
import TextInput from '@/components/ui/form/TextInput';
import { apiPost } from '@/lib/api/client';
import styles from './profile.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      await apiPost('/api/profile/login', { email, password });
      router.push('/profile');
    } catch (e) {
      setError(e.message || 'Could not log in. Please try again.');
      setBusy(false);
    }
  }

  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <div className={`card ${styles.authCard}`}>
          <span className={styles.eyebrow}>Runner account</span>
          <h1>Welcome back</h1>
          <p>Log in to view your Real Estate Marathon registrations and bib details.</p>
          <form onSubmit={submit} className={styles.form}>
            <Field label="Email address" required htmlFor="login-email">
              <TextInput id="login-email" type="email" autoComplete="email" required value={email} onChange={setEmail} />
            </Field>
            <Field label="Password" required htmlFor="login-password">
              <TextInput id="login-password" type="password" autoComplete="current-password" required value={password} onChange={setPassword} />
            </Field>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <Button type="submit" disabled={busy} block>{busy ? 'Logging in...' : 'Log in'}</Button>
          </form>
          <p className={styles.authFoot}>New to the marathon? <Link href="/register">Register now</Link></p>
        </div>
      </div>
    </section>
  );
}
