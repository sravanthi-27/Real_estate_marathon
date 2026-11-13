'use client';
import { useState } from 'react';
import Icon from './Icon';
import styles from './Accordion.module.css';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={styles.list}>
      {items.map((it, i) => (
        <div key={it.q} className={styles.item}>
          <button className={styles.q} aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span>
            <Icon name="chevron-down" size={16} style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: '.2s' }} />
          </button>
          {open === i && <p className={styles.a}>{it.a}</p>}
        </div>
      ))}
    </div>
  );
}
