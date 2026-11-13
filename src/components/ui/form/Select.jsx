'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';
import styles from './form.module.css';

/**
 * Custom dropdown. options: [{ value, label, description?, badge? }]
 * searchable -> adds a search box (use for long lists such as nationality / state)
 */
export default function Select({ id, value, onChange, options, placeholder = 'Select', searchable = false, searchPlaceholder = 'Search...', invalid = false }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(-1);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? options.filter((o) => `${o.label} ${o.description || ''}`.toLowerCase().includes(s)) : options;
  }, [options, q]);

  const selected = options.find((o) => o.value === value);
  const choose = (o) => { onChange(o.value); setOpen(false); setQ(''); };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && open && filtered[active]) { e.preventDefault(); choose(filtered[active]); }
  };

  return (
    <div className={styles.pop} ref={ref} onKeyDown={onKeyDown}>
      <button type="button" id={id} className={`${styles.control} ${styles.trigger} ${invalid ? styles.invalid : ''}`} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className={selected ? '' : styles.placeholder}>{selected ? selected.label : placeholder}</span>
        <Icon name="chevron-down" size={16} />
      </button>
      {open && (
        <div className={styles.panel}>
          {searchable && <input autoFocus className={styles.search} placeholder={searchPlaceholder} value={q} onChange={(e) => { setQ(e.target.value); setActive(0); }} />}
          <div className={styles.list} role="listbox">
            {filtered.length === 0 && <p className={styles.empty}>No matches found</p>}
            {filtered.map((o, i) => (
              <button type="button" role="option" aria-selected={o.value === value} key={o.value}
                className={`${styles.option} ${i === active ? styles.optionActive : ''} ${o.value === value ? styles.optionSelected : ''}`}
                onMouseEnter={() => setActive(i)} onClick={() => choose(o)}>
                <span className={styles.optionText}>{o.label}{o.description && <small>{o.description}</small>}</span>
                {o.badge && <span className={styles.badge}>{o.badge}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
