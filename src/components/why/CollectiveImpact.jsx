import { collectiveImpact } from '@/data/why';
import styles from './CollectiveImpact.module.css';

export default function CollectiveImpact() {
  return (
    <div className="card">
      <h2 className="card__title">{collectiveImpact.title}</h2>
      <div className={styles.grid}>
        {collectiveImpact.items.map((i) => <div key={i.label} className={styles.item}><strong>{i.value}</strong><span>{i.label}</span></div>)}
      </div>
      <p className={styles.note}>Every run grows a greener, stronger Telangana.</p>
    </div>
  );
}
