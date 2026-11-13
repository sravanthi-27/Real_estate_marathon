import styles from './form.module.css';

/** Selectable cards. options: [{ value, title, description?, badge? }] */
export default function RadioCards({ value, onChange, options, columns = 1, label }) {
  return (
    <div className={styles.cards} role="radiogroup" aria-label={label} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {options.map((o) => (
        <button type="button" role="radio" aria-checked={value === o.value} key={o.value} className={`${styles.card} ${value === o.value ? styles.cardOn : ''}`} onClick={() => onChange(o.value)}>
          <span className={styles.dot} />
          <span>
            <span className={styles.cardTitle}>{o.title}{o.badge && <span className={styles.badge}>{o.badge}</span>}</span>
            {o.description && <span className={styles.cardDesc}>{o.description}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
