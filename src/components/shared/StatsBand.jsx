import styles from './StatsBand.module.css';

export default function StatsBand({ items, light = false }) {
  return (
    <section className={`${styles.band} ${light ? styles.light : ''}`}>
      <div className={`container ${styles.row}`} style={{ '--n': items.length }}>
        {items.map((s) => (
          <div key={s.label} className={styles.item}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
