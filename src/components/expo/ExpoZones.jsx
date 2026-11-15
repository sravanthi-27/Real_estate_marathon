import Img from '@/components/ui/Img';
import { expoZones } from '@/data/expo';
import styles from './ExpoZones.module.css';

export default function ExpoZones() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.heading}>
          <span aria-hidden="true" />
          <h2>Expo Zones</h2>
          <span aria-hidden="true" />
        </div>
        <div className={styles.grid}>
          {expoZones.map((z) => (
            <figure key={z.title} className={styles.item}>
              <Img src={z.src} alt={z.title} className={styles.img} />
              <figcaption className={styles.content}>
                <h3>{z.title}</h3>
                <p>{z.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
