import Icon from '@/components/ui/Icon';
import { visionMission } from '@/data/about';
import styles from './VisionMission.module.css';

export default function VisionMission() {
  const { vision, mission } = visionMission;
  return (
    <section className={styles.wrap}>
      <div className={`container ${styles.grid}`}>
        {[vision, mission].map((v, i) => (
          <article key={v.title} className={`${styles.panel} ${i ? styles.accent : styles.purple}`}>
            <span className={styles.icon}><Icon name={v.icon} size={22} /></span>
            <div><h3>{v.title}</h3><p>{v.text}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
