import Img from '@/components/ui/Img';
import SectionTitle from '@/components/ui/SectionTitle';
import { communityKits } from '@/data/merchandise';
import styles from './KitCarousel.module.css';

/** Horizontally scrollable community kits (CSS scroll-snap, no JS needed). */
export default function KitCarousel({ className = '' }) {
  return (
    <section className={`section section--white ${styles.section} ${className}`}>
      <div className="container">
        <SectionTitle sub="Official community kits designed by residents' welfare associations.">Community Sponsored Kits</SectionTitle>
        <div className={styles.track} tabIndex={0} aria-label="Community kits">
          {communityKits.map((k) => (
            <article key={k.name} className={styles.card}>
              <Img src={k.src} alt={`${k.name} kit`} contain className={styles.img} />
              <strong>{k.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
