import styles from './form.module.css';

/** Label + control + hint + error wrapper used by every form input. */
export default function Field({ label, required, hint, error, htmlFor, children, className }) {
  return (
    <div className={`${styles.field} ${className || ''}`}>
      {label && (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}{required && <span className={styles.req}>*</span>}
        </label>
      )}
      {children}
      {hint && !error && <span className={styles.hint}>{hint}</span>}
      {error && <span className={styles.error} role="alert">{error}</span>}
    </div>
  );
}
