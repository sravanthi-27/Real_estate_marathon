import Icon from '@/components/ui/Icon';
import Img from '@/components/ui/Img';
import styles from './IconCardGrid.module.css';

/** Grid of small cards: icon + title + text. items: [{icon,title,text}] */
export default function IconCardGrid({ items, columns = 4, highlightIndex = -1, compact = false }) {
  return (
    <div className={`${styles.grid} ${compact ? styles.compact : ''}`} style={{ '--cols': columns }}>
      {items.map((it, i) => (
        <article key={it.title} className={`${styles.card} ${i === highlightIndex ? styles.hl : ''}`}>
          <span className={it.image ? styles.image : styles.icon}>
            {it.image ? <Img src={it.image} alt="" contain /> : <Icon name={it.icon} size={22} />}
          </span>
          <h3 className={styles.title}>{it.title}</h3>
          {it.text && <p className={styles.text}>{it.text}</p>}
        </article>
      ))}
    </div>
  );
}
