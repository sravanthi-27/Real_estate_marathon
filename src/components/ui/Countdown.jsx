'use client';
import { useEffect, useState } from 'react';
import styles from './Countdown.module.css';

function diff(target) {
  const ms = Math.max(new Date(target).getTime() - Date.now(), 0);
  return { Days: Math.floor(ms / 86400000), Hours: Math.floor((ms / 3600000) % 24), Mins: Math.floor((ms / 60000) % 60), Secs: Math.floor((ms / 1000) % 60) };
}

export default function Countdown({ target }) {
  const [t, setT] = useState(null);
  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div className={styles.wrap} role="timer" aria-label="Countdown to event">
      {['Days', 'Hours', 'Mins', 'Secs'].map((k) => (
        <div key={k} className={styles.box}>
          <strong>{t ? String(t[k]).padStart(2, '0') : '--'}</strong>
          <span>{k}</span>
        </div>
      ))}
    </div>
  );
}
