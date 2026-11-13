import styles from './form.module.css';

export default function TextInput({ value, onChange, invalid, prefix, multiline, className = '', ...rest }) {
  const cls = `${styles.input} ${invalid ? styles.invalid : ''} ${className}`;
  const el = multiline
    ? <textarea className={cls} value={value ?? ''} onChange={(e) => onChange(e.target.value)} {...rest} />
    : <input className={cls} value={value ?? ''} onChange={(e) => onChange(e.target.value)} aria-invalid={invalid || undefined} {...rest} />;
  if (!prefix) return el;
  return <div className={styles.prefixWrap}><span className={styles.prefix}>{prefix}</span>{el}</div>;
}
