import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { impact, whoCanParticipate } from '@/data/about';
import styles from './ImpactSection.module.css';

export default function ImpactSection() {
  return (
    <section className="section">
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <h2 className={styles.title}>{impact.title}</h2>
          <ul className={styles.list}>{impact.items.map((i) => <li key={i}><Icon name="check-circle" size={16} /> {i}</li>)}</ul>
        </div>
        <Img src={impact.image} alt="Hyderabad skyline" className={styles.img} />
        <aside className={styles.card}>
          <h3>{whoCanParticipate.title}</h3>
          <ul>{whoCanParticipate.items.map((i) => <li key={i}><Icon name="check" size={14} /> {i}</li>)}</ul>
        </aside>
      </div>
    </section>
  );
}
