import Icon from '@/components/ui/Icon';
import styles from './ContactCards.module.css';

/** Small icon + title + value cards (used for quick contacts and department contacts). */
export default function ContactCards({ items, columns = 4, dark = false }) {
  return (
    <div className={styles.grid} style={{ '--cols': columns }}>
      {items.map((c) => (
        <div key={c.title} className={`${styles.card} ${dark ? styles.dark : ''}`}>
          <span className={styles.icon}><Icon name={c.icon} size={18} /></span>
          <span><strong>{c.title}</strong><small>{c.value}</small></span>
        </div>
      ))}
    </div>
  );
}
