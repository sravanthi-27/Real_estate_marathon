'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Stepper from './Stepper';
import { useRegistration } from './RegistrationProvider';
import { STEPS } from '@/config/registration';
import { EVENT, KIT_PICKUP, SITE } from '@/config/site';
import { apiGet } from '@/lib/api/client';
import { formatINR } from '@/lib/utils';
import styles from './ConfirmationView.module.css';

function downloadCalendar(reg) {
  const start = new Date(EVENT.startISO);
  const end = new Date(start.getTime() + 4 * 3600 * 1000);
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Real Estate Marathon//EN', 'BEGIN:VEVENT',
    `UID:${reg.reference}@realestatemarathon`, `DTSTAMP:${fmt(new Date())}`, `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
    `SUMMARY:${SITE.name}`, `LOCATION:${EVENT.address}`, `DESCRIPTION:Registration ${reg.reference}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'real-estate-marathon.ics';
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function ConfirmationView() {
  const router = useRouter();
  const params = useSearchParams();
  const ref = params.get('ref');
  const token = params.get('t');
  const { reset } = useRegistration();
  const [reg, setReg] = useState(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [startingNextRegistration, setStartingNextRegistration] = useState(false);

  useEffect(() => {
    if (!ref || !token) { setError('This confirmation link is incomplete.'); return; }
    apiGet(`/api/registrations/${encodeURIComponent(ref)}?token=${encodeURIComponent(token)}`)
      .then((r) => { setReg(r); if (r.status === 'confirmed' && r.payment?.paidAt) reset(); })
      .catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, token]);

  if (error) return <section className="section"><div className="container card" style={{ maxWidth: 560, textAlign: 'center' }}><h2 className="card__title">We couldn&apos;t load this registration</h2><p style={{ marginBottom: '1rem' }}>{error}</p><Button href="/register">Back to registration</Button></div></section>;
  if (!reg) return <section className="section"><div className="container" style={{ textAlign: 'center', color: 'var(--color-muted)' }}>Loading your confirmation...</div></section>;

  const paid = reg.status === 'confirmed' && Boolean(reg.payment?.paidAt);
  const confirmationPending = reg.status === 'confirmed' && !paid;
  const family = reg.family || [];
  const paidAmount = reg.amountPaise;

  function startNextRegistration() {
    if (!paid || startingNextRegistration) return;
    setStartingNextRegistration(true);
    reset();
    router.replace('/register');
  }

  async function downloadReceipt() {
    if (downloading || !paid) return;
    setDownloading(true);
    setDownloadError('');
    try {
      const response = await fetch(`/api/registrations/${encodeURIComponent(reg.reference)}/receipt?token=${encodeURIComponent(token)}`, { cache: 'no-store' });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || 'The official receipt could not be downloaded. Please try again.');
      }
      if (!response.headers.get('content-type')?.includes('application/pdf')) {
        throw new Error('The receipt service returned an invalid file. Please try again.');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `Marathon_Registration_${reg.reference}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      setDownloadError(e.message || 'The official receipt could not be downloaded. Please try again.');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section className={`section ${styles.confirmationPage}`}>
      <div className="container">
        <Stepper current={paid ? STEPS.length : 5} />

        <div className={`card ${styles.hero}`}>
          <span className={`${styles.tick} ${paid ? styles.tickSuccess : ''}`}><Icon name={paid ? 'check-circle' : 'alert'} size={24} /></span>
          <small>{paid ? 'Payment successful' : confirmationPending ? 'Payment confirmation pending' : 'Payment pending'}</small>
          <h2>{paid ? 'Registration confirmed!' : 'Registration not yet paid'}</h2>
          <p className={styles.confirmationCopy}>
            {paid
              ? <>Your payment of <strong>{formatINR(paidAmount)}</strong> was successful. Registration <strong>{reg.reference}</strong> is confirmed.</>
              : confirmationPending
                ? <>The server is finalizing the verified payment for registration <strong>{reg.reference}</strong>. Refresh this page shortly to view your confirmed pass.</>
                : <>Registration <strong>{reg.reference}</strong> has been created but payment is still pending.</>}
          </p>
          {reg.payment && <p className={styles.paymentMeta}>{reg.payment.paymentId && <><span>Payment ID</span><strong>{reg.payment.paymentId}</strong></>}<span>Method</span><strong>{reg.payment.method?.toUpperCase()}</strong>{reg.payment.paidAt && <><span>Confirmed</span><strong>{new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }).format(new Date(reg.payment.paidAt))}</strong></>}</p>}
          {paid && <p className={styles.note}>Confirmation details: {reg.runner.email} &middot; {reg.runner.mobile}. Show your bib pass at kit collection.</p>}
          {confirmationPending && <Button variant="ghost" onClick={() => window.location.reload()}>Refresh confirmation</Button>}
          {!paid && !confirmationPending && <Button href="/register">Complete payment</Button>}
        </div>

        {paid && (
          <>
            <div className={styles.grid}>
              <article className={`card ${styles.pass}`}>
                <header className={styles.passHeader}>
                  <p className={styles.passTop}>{SITE.name}</p>
                  <span>Official pass</span>
                </header>
                <p className={styles.cat}>{reg.runner.category}</p>
                <div className={styles.bibWrap}>
                  <p className={styles.bibLabel}>B.I.B number</p>
                  <p className={styles.bib}>{reg.runner.bibNumber ?? 'Pending'}</p>
                  <p className={styles.name}>{reg.runner.bibName || reg.runner.name}</p>
                  {reg.runner.community && <p className={styles.meta}>{reg.runner.community}</p>}
                </div>
                <div className={styles.passRow}>
                  <span><small>Wave</small>{reg.runner.wave || 'Pending'}</span>
                  <span><small>Start</small>{reg.runner.startTime || 'Pending'}</span>
                  <span><small>T-shirt</small>{reg.runner.tshirtSize}</span>
                </div>
              </article>

              <article className="card">
                <header className={styles.squadHead}>
                  <h3 className="card__title">Social registrations</h3>
                  <span>All {1 + family.length} pass{1 + family.length === 1 ? '' : 'es'} active</span>
                </header>
                <ul className={styles.squad}>
                  <li><span><strong>{reg.runner.name}</strong>Primary participant &middot; {reg.runner.category}</span><b>{reg.runner.bibNumber ? `#${reg.runner.bibNumber}` : 'Pending'}</b></li>
                  {family.map((m) => <li key={m.bibNumber || m.name}><span><strong>{m.name}</strong>{m.relationship} &middot; {m.category}</span><b>{m.bibNumber ? `#${m.bibNumber}` : 'Pending'}</b></li>)}
                </ul>
                <p className={styles.total}><span>Total registration paid</span><strong>{formatINR(paidAmount)}</strong></p>
              </article>
            </div>

            <article className={`card ${styles.pickup}`}>
              <div>
                <h3 className="card__title">Event kit &amp; race-day details</h3>
                <p>{KIT_PICKUP.note}</p>
              </div>
              <ul>
                <li><Icon name="flag" size={14} /><span>Race day: {new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(EVENT.startISO))} &middot; {EVENT.timeLabel}</span></li>
                <li><Icon name="map-pin" size={14} /><span>{EVENT.address}</span></li>
                <li><Icon name="ticket" size={14} /><span>{KIT_PICKUP.title}: {KIT_PICKUP.dateLabel} &middot; {KIT_PICKUP.timeLabel}</span></li>
                <li><Icon name="map-pin" size={14} /><span>Kit collection: {KIT_PICKUP.venue}</span></li>
              </ul>
              <div className={`${styles.actions} no-print`}>
                <Button variant="ghost" onClick={() => downloadCalendar(reg)}><Icon name="calendar-plus" size={14} /> Add to calendar</Button>
                <Button onClick={downloadReceipt} disabled={downloading}><Icon name={downloading ? 'loader' : 'download'} size={14} className={downloading ? 'spin' : ''} /> {downloading ? 'Preparing official receipt...' : 'DOWNLOAD OFFICIAL RECEIPT & BIB PASS'}</Button>
                <Button onClick={startNextRegistration} disabled={startingNextRegistration}>
                  {startingNextRegistration ? <><Icon name="loader" size={14} className="spin" /> Starting...</> : 'Complete Registration'}
                </Button>
              </div>
              <p className={styles.completionNote}>Your confirmed registration is saved. Complete Registration starts a clean form for the next participant.</p>
              {downloadError && <p className={styles.downloadError} role="alert">{downloadError}</p>}
            </article>
            <p className={`${styles.back} no-print`}><Link href="/">Back to home</Link></p>
          </>
        )}
      </div>
    </section>
  );
}
