'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { apiGet, apiPost } from '@/lib/api/client';
import { formatDate, formatINR } from '@/lib/utils';
import styles from '../login/profile.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    apiGet('/api/profile').then((result) => {
      if (active) setDashboard(result);
    }).catch((e) => {
      if (!active) return;
      if (e.status === 401) router.replace('/login');
      else setError(e.message || 'Could not load your profile. Please try again.');
    });
    return () => { active = false; };
  }, [router]);

  async function logout() {
    setBusy(true);
    setError('');
    try {
      await apiPost('/api/profile', {});
      router.replace('/login');
    } catch (e) {
      setError(e.message || 'Could not log out. Please try again.');
      setBusy(false);
    }
  }

  if (!dashboard && !error) {
    return <section className={`section ${styles.section}`}><div className={`container ${styles.container}`}><p className={styles.loading}>Loading your profile...</p></div></section>;
  }

  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.dashboard}`}>
        {dashboard && (
          <>
            <header className={styles.dashboardHeader}>
              <div>
                <span className={styles.eyebrow}>Runner dashboard</span>
                <h1>Hello, {dashboard.profile.name}</h1>
                <p>{dashboard.profile.email}</p>
              </div>
              <Button variant="ghost" onClick={logout} disabled={busy}>{busy ? 'Logging out...' : 'Log out'}</Button>
            </header>

            <div className={styles.dashboardIntro}>
              <div><strong>{dashboard.registrations.length}</strong><span>{dashboard.registrations.length === 1 ? 'Registration' : 'Registrations'}</span></div>
              <p>Manage your event details, bib assignment, and family entries below.</p>
            </div>

            {dashboard.registrations.length === 0 ? (
              <div className={`card ${styles.empty}`}>
                <h2>No registrations yet</h2>
                <p>Once you complete a registration using this email, its details will appear here.</p>
                <Button href="/register">Register for the marathon</Button>
              </div>
            ) : (
              <div className={styles.registrationList}>
                {dashboard.registrations.map((registration) => (
                  <article className={`card ${styles.registrationCard}`} key={registration.reference}>
                    <header className={styles.registrationHeader}>
                      <div>
                        <span className={styles.reference}>{registration.reference}</span>
                        <h2>{registration.name}</h2>
                        <p>{registration.category} &middot; Registered {formatDate(registration.createdAt.slice(0, 10))}</p>
                      </div>
                      <span className={`${styles.status} ${registration.status === 'confirmed' ? styles.confirmed : ''}`}>
                        {registration.status === 'confirmed' ? 'Confirmed' : 'Payment pending'}
                      </span>
                    </header>
                    <div className={styles.detailGrid}>
                      <div><span>Bib number</span><strong>{registration.bibNumber || 'Assigned after payment'}</strong></div>
                      <div><span>T-shirt size</span><strong>{registration.tshirtSize}</strong></div>
                      <div><span>Amount</span><strong>{formatINR(registration.amountPaise)}</strong></div>
                      {registration.bibName && <div><span>Bib name</span><strong>{registration.bibName}</strong></div>}
                    </div>
                    {registration.family.length > 0 && (
                      <div className={styles.family}>
                        <h3>Family registrations ({registration.family.length})</h3>
                        {registration.family.map((member, index) => (
                          <div key={`${member.name}-${index}`}>
                            <strong>{member.name}</strong><span>{member.relationship} &middot; {member.category}</span>
                            <span>{member.bibNumber ? `Bib ${member.bibNumber}` : `Size ${member.tshirtSize}`}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </>
        )}
        {error && <p className={styles.error} role="alert">{error}</p>}
      </div>
    </section>
  );
}
