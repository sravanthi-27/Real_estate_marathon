import Img from '@/components/ui/Img';
import SectionTitle from '@/components/ui/SectionTitle';
import { expoZones } from '@/data/expo';
import styles from './ExpoZones.module.css';

export default function ExpoZones() {
  return (
    <section className="section">
      <div className="container">
        <SectionTitle>Expo Zones</SectionTitle>
        <div className={styles.grid}>
          {expoZones.map((z) => (
            <figure key={z.title} className={styles.item}>
              <Img src={z.src} alt={z.title} className={styles.img} />
              <figcaption>{z.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
