import Icon from '@/components/ui/Icon';
import styles from './InfoCard.module.css';

/** Card with a title and a list of bullet lines (or label/value rows when items have `value`). */
export default function InfoCard({ title, items = [], icon, dark = false, children }) {
  return (
    <article className={`card ${dark ? 'card--dark' : ''}`}>
      <h3 className="card__title">{icon && <Icon name={icon} size={16} />} {title}</h3>
      <ul className={styles.list}>
        {items.map((it, i) => typeof it === 'string'
          ? <li key={it} className={styles.bullet}><Icon name="check" size={14} /> {it}</li>
          : <li key={it.label + i} className={styles.row}><span>{it.label}</span><strong>{it.value}</strong></li>)}
      </ul>
      {children}
    </article>
  );
}
