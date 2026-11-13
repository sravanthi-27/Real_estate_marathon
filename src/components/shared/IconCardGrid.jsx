import Icon from '@/components/ui/Icon';
import styles from './IconCardGrid.module.css';

/** Grid of small cards: icon + title + text. items: [{icon,title,text}] */
export default function IconCardGrid({ items, columns = 4, highlightIndex = -1 }) {
  return (
    <div className={styles.grid} style={{ '--cols': columns }}>
      {items.map((it, i) => (
        <article key={it.title} className={`${styles.card} ${i === highlightIndex ? styles.hl : ''}`}>
          <span className={styles.icon}><Icon name={it.icon} size={22} /></span>
          <h3 className={styles.title}>{it.title}</h3>
          {it.text && <p className={styles.text}>{it.text}</p>}
        </article>
      ))}
    </div>
  );
}
