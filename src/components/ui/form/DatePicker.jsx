'use client';
import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon';
import { formatDate, toISODate } from '@/lib/utils';
import styles from './form.module.css';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/** Calendar popover with month + year dropdowns (fast for date of birth). Value is ISO 'YYYY-MM-DD'. */
export default function DatePicker({ id, value, onChange, invalid, placeholder = 'DD/MM/YYYY', minYear = 1930, maxDate }) {
  const today = new Date();
  const max = maxDate ? new Date(maxDate) : today;
  const initial = value ? new Date(value) : new Date(Math.min(max.getTime(), new Date(today.getFullYear() - 25, 0, 1).getTime()));
  const [open, setOpen] = useState(false);
  const [view, setView] = useState({ y: initial.getFullYear(), m: initial.getMonth() });
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const years = Array.from({ length: max.getFullYear() - minYear + 1 }, (_, i) => max.getFullYear() - i);

  const step = (delta) => setView(({ y, m }) => {
    const d = new Date(y, m + delta, 1);
    return { y: Math.min(Math.max(d.getFullYear(), minYear), max.getFullYear()), m: d.getMonth() };
  });
  const disabled = (d) => new Date(view.y, view.m, d) > max;

  return (
    <div className={styles.pop} ref={ref}>
      <button type="button" id={id} className={`${styles.control} ${styles.trigger} ${invalid ? styles.invalid : ''}`} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className={value ? '' : styles.placeholder}>{value ? formatDate(value) : placeholder}</span>
        <Icon name="calendar" size={16} />
      </button>
      {open && (
        <div className={`${styles.panel} ${styles.cal}`} role="dialog" aria-label="Choose date">
          <div className={styles.calHead}>
            <button type="button" className={styles.navBtn} onClick={() => step(-1)} aria-label="Previous month"><Icon name="chevron-left" size={16} /></button>
            <select value={view.m} onChange={(e) => setView({ ...view, m: Number(e.target.value) })} aria-label="Month">
              {MONTHS.map((n, i) => <option key={n} value={i}>{n}</option>)}
            </select>
            <select value={view.y} onChange={(e) => setView({ ...view, y: Number(e.target.value) })} aria-label="Year">
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <button type="button" className={styles.navBtn} onClick={() => step(1)} aria-label="Next month"><Icon name="chevron-right" size={16} /></button>
          </div>
          <div className={styles.grid}>
            {DOW.map((d) => <span key={d} className={styles.dow}>{d}</span>)}
            {cells.map((d, i) => d === null ? <span key={`e${i}`} /> : (
              <button type="button" key={d} disabled={disabled(d)}
                className={`${styles.day} ${value === toISODate(view.y, view.m, d) ? styles.daySel : ''}`}
                onClick={() => { onChange(toISODate(view.y, view.m, d)); setOpen(false); }}>{d}</button>
            ))}
          </div>
          <div className={styles.calFoot}>
            <button type="button" className={styles.link} onClick={() => { onChange(''); setOpen(false); }}>Clear</button>
            <button type="button" className={styles.link} onClick={() => { onChange(toISODate(max.getFullYear(), max.getMonth(), max.getDate())); setOpen(false); }}>Today</button>
          </div>
        </div>
      )}
    </div>
  );
}
