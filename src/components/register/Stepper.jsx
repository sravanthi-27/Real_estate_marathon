import Icon from '@/components/ui/Icon';
import { STEPS } from '@/config/registration';
import styles from './Stepper.module.css';

/** current: index of active step. Pass current = STEPS.length for "all done". */
export default function Stepper({ current, onSelect }) {
  return (
    <ol className={styles.stepper} aria-label="Registration progress">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const clickable = onSelect && done;
        const Tag = clickable ? 'button' : 'div';
        return (
          <li key={s.id} className={`${styles.step} ${done ? styles.done : ''} ${active ? styles.active : ''}`} aria-current={active ? 'step' : undefined}>
            <Tag className={styles.dot} {...(clickable ? { type: 'button', onClick: () => onSelect(i), 'aria-label': `Go back to ${s.label}` } : {})}>
              {done ? <Icon name="check" size={14} /> : i + 1}
            </Tag>
            <span className={styles.label}>{s.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
