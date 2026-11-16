import Icon from '@/components/ui/Icon';
import styles from './ContactCards.module.css';

/** Small icon + title + value cards (used for quick contacts and department contacts). */
export default function ContactCards({ items, columns = 4, dark = false }) {
  return (
    <div className={styles.grid} style={{ '--cols': columns }}>
      {items.map((c) => (
        <article key={c.title} className={`${styles.card} ${dark ? styles.dark : ''}`}>
          <span className={`${styles.icon} ${c.tone ? styles[c.tone] : ''}`}>
            <Icon name={c.icon} size={13} strokeWidth={2} />
          </span>
          <strong className={styles.title}>{c.title}</strong>
          <span className={styles.phone}>{c.phone}</span>
          <a className={styles.email} href={`mailto:${c.email}`}>{c.email}</a>
        </article>
      ))}
    </div>
  );
}
