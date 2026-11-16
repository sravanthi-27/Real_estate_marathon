import Icon from '@/components/ui/Icon';
import Img from '@/components/ui/Img';
import { finisherReceives } from '@/data/why';
import styles from './FinisherReceives.module.css';

export default function FinisherReceives() {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>
        <span aria-hidden="true" />
        {finisherReceives.title}
        <span aria-hidden="true" />
      </h2>
      <div className={styles.grid}>
        {finisherReceives.items.map((item, index) => (
          <figure key={item.label} className={styles[`item${index + 1}`]}>
            <Img src={item.src} alt={item.label} className={styles.img} />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className={styles.impact}>
        <Icon name="leaf" size={16} />
        <span>YOUR RUN. YOUR IMPACT. YOUR LEGACY.</span>
      </div>
    </article>
  );
}
