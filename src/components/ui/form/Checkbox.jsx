import styles from './form.module.css';

export default function Checkbox({ checked, onChange, children, id }) {
  return (
    <label className={styles.check} htmlFor={id}>
      <input id={id} type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{children}</span>
    </label>
  );
}
