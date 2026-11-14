import Icon from '@/components/ui/Icon';
import styles from './StatsBand.module.css';

export default function StatsBand({ items, light = false }) {
  const withIcons = items.some((item) => item.icon);
  return (
    <section className={`${styles.band} ${light ? styles.light : ''} ${withIcons ? styles.withIcons : ''}`}>
      <div className={`container ${styles.row}`} style={{ '--n': items.length }}>
        {items.map((s) => (
          <div key={s.label} className={styles.item}>
            {s.icon && <Icon name={s.icon} size={18} className={styles.icon} />}
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
