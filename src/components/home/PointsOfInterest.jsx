import Img from '@/components/ui/Img';
import SectionTitle from '@/components/ui/SectionTitle';
import { pointsOfInterest } from '@/data/home';
import styles from './PointsOfInterest.module.css';

export default function PointsOfInterest() {
  return (
    <section className="section section--white">
      <div className="container">
        <SectionTitle>Points of Interest</SectionTitle>
        <div className={styles.grid}>
          {pointsOfInterest.map((p) => (
            <article key={p.title} className={styles.card}>
              <Img src={p.src} alt={p.title} className={styles.img} />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
