import Img from '@/components/ui/Img';
import { finisherReceives } from '@/data/why';
import styles from './FinisherReceives.module.css';

export default function FinisherReceives() {
  return (
    <div className="card">
      <h2 className="card__title">{finisherReceives.title}</h2>
      <div className={styles.grid}>
        {finisherReceives.items.map((i) => (
          <figure key={i.label}><Img src={i.src} alt={i.label} className={styles.img} /><figcaption>{i.label}</figcaption></figure>
        ))}
      </div>
    </div>
  );
}
