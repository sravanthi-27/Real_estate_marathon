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
          <p className={styles.description}>{impact.description}</p>
          <div className={styles.list}>
            {impact.items.map((item) => (
              <article className={styles.card} key={item.title}>
                <Icon name={item.icon} size={16} strokeWidth={1.8} className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
        <Img src={impact.image} alt="Hyderabad skyline" className={styles.img} />
      </div>
    </section>
  );
}
