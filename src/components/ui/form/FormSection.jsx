import Icon from '../Icon';
import styles from './FormSection.module.css';

/** Numbered section header + fields grid used inside the registration steps. */
export default function FormSection({ number, title, note, icon, children }) {
  return (
    <section className={styles.section}>
      <header className={styles.head}>
        <span className={styles.num}>{icon ? <Icon name={icon} size={14} /> : number}</span>
        <h3 className={styles.title}>{title}</h3>
        {note && <span className={styles.note}>{note}</span>}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

export function FieldGrid({ cols = 3, children }) {
  return <div className={styles.grid} style={{ '--cols': cols }}>{children}</div>;
}
