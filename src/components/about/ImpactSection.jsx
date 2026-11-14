import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { impact } from '@/data/about';
import styles from './ImpactSection.module.css';

export default function ImpactSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <h2 className={styles.title}>{impact.title}</h2>
          <ul className={styles.list}>{impact.items.map((i) => <li key={i}><Icon name="check-circle" size={16} /> {i}</li>)}</ul>
        </div>
        <Img src={impact.image} alt="Hyderabad skyline" className={styles.img} />
      </div>
    </section>
  );
}
