import styles from './form.module.css';

/** Compact single-choice buttons (e.g. T-shirt size). options: ['S','M'] or [{value,label}] */
export default function ChipGroup({ value, onChange, options, label }) {
  return (
    <div className={styles.chips} role="radiogroup" aria-label={label}>
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value;
        const l = typeof o === 'string' ? o : o.label;
        return (
          <button type="button" role="radio" aria-checked={value === v} key={v} className={`${styles.chip} ${value === v ? styles.chipOn : ''}`} onClick={() => onChange(v)}>{l}</button>
        );
      })}
    </div>
  );
}
