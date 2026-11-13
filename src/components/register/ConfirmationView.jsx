'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
  const params = useSearchParams();
  const ref = params.get('ref');
  const token = params.get('t');
  const { reset } = useRegistration();
  const [reg, setReg] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ref || !token) { setError('This confirmation link is incomplete.'); return; }
    apiGet(`/api/registrations/${encodeURIComponent(ref)}?token=${encodeURIComponent(token)}`)
      .then((r) => { setReg(r); if (r.status === 'confirmed') reset(); })
      .catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, token]);

  if (error) return <section className="section"><div className="container card" style={{ maxWidth: 560, textAlign: 'center' }}><h2 className="card__title">We couldn&apos;t load this registration</h2><p style={{ marginBottom: '1rem' }}>{error}</p><Button href="/register">Back to registration</Button></div></section>;
  if (!reg) return <section className="section"><div className="container" style={{ textAlign: 'center', color: 'var(--color-muted)' }}>Loading your confirmation...</div></section>;

  const paid = reg.status === 'confirmed';
  return (
    <section className="section">
      <div className="container">
        <Stepper current={paid ? STEPS.length : 5} />

        <div className={`card ${styles.hero}`}>
          <span className={styles.tick}><Icon name={paid ? 'check-circle' : 'alert'} size={34} /></span>
          <small>{paid ? 'Payment successful' : 'Payment pending'}</small>
          <h2>{paid ? 'Registration confirmed!' : 'Registration not yet paid'}</h2>
          <p>Registration ID <strong>{reg.reference}</strong>{reg.payment && <> &middot; Payment ID {reg.payment.paymentId}</>}</p>
          {paid && <p className={styles.note}>Keep this page handy. Show your bib number at the expo to collect your kit.</p>}
          {!paid && <Button href="/register">Complete payment</Button>}
        </div>

        {paid && (
          <>
            <div className={styles.grid}>
              <article className={`card card--dark ${styles.pass}`}>
                <p className={styles.passTop}>{SITE.name} &middot; Official pass</p>
                <p className={styles.cat}>{reg.runner.category}</p>
                <p className={styles.bibLabel}>B.I.B number</p>
                <p className={styles.bib}>{reg.runner.bibNumber}</p>
                <p className={styles.name}>{reg.runner.bibName || reg.runner.name}</p>
                <p className={styles.meta}>{reg.runner.community}</p>
                <div className={styles.passRow}>
                  <span><small>Wave</small>{reg.runner.wave}</span>
                  <span><small>Start</small>{reg.runner.startTime}</span>
                  <span><small>T-shirt</small>{reg.runner.tshirtSize}</span>
                </div>
              </article>

              <article className="card">
                <h3 className="card__title">Squad registrations ({1 + reg.family.length})</h3>
                <ul className={styles.squad}>
                  <li><span><strong>{reg.runner.name}</strong>Primary runner &middot; {reg.runner.categoryShort}</span><b>#{reg.runner.bibNumber}</b></li>
                  {reg.family.map((m) => <li key={m.bibNumber}><span><strong>{m.name}</strong>{m.relationship} &middot; {m.category}</span><b>#{m.bibNumber}</b></li>)}
                </ul>
                <p className={styles.total}>Total paid <strong>{formatINR(reg.amountPaid ?? reg.amountPaise)}</strong></p>
              </article>
            </div>

            <article className={`card ${styles.pickup}`}>
              <h3 className="card__title">{KIT_PICKUP.title}</h3>
              <ul>
                <li><Icon name="calendar" size={14} /> {KIT_PICKUP.dateLabel}</li>
                <li><Icon name="clock" size={14} /> {KIT_PICKUP.timeLabel}</li>
                <li><Icon name="map-pin" size={14} /> {KIT_PICKUP.venue}</li>
              </ul>
              <p>{KIT_PICKUP.note}</p>
              <div className={`${styles.actions} no-print`}>
                <Button variant="ghost" onClick={() => downloadCalendar(reg)}><Icon name="calendar-plus" size={16} /> Add to calendar</Button>
                <Button onClick={() => window.print()}><Icon name="download" size={16} /> Download receipt / pass</Button>
              </div>
            </article>
            <p className={`${styles.back} no-print`}><Link href="/">Back to home</Link></p>
          </>
        )}
      </div>
    </section>
  );
}
