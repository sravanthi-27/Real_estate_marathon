import Link from 'next/link';
import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { homeExpoHighlights, homeMerchandise } from '@/data/home';
import styles from './HomePromoGrid.module.css';

export default function HomePromoGrid() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <article className={`card ${styles.merch}`}>
          <div className={styles.heading}>
            <h2>Official Merchandise</h2>
            <span>Official Gear</span>
          </div>
          <div className={styles.products}>
            {homeMerchandise.map((product) => (
              <div className={styles.product} key={product.name}>
                <Img src={product.src} alt={product.name} contain className={styles.productImage} />
                <strong>{product.displayName}</strong>
                <span>{product.price}</span>
              </div>
            ))}
          </div>
          <Link className={styles.outlineLink} href="/merchandise">View all merchandise <Icon name="arrow-right" size={13} /></Link>
        </article>

        <article className={styles.expo}>
          <span className={styles.kicker}>Parallel Event</span>
          <h2>Real Estate Expo</h2>
          <div className={styles.expoFeatures}>
            <span><Icon name="building" size={14} /> Builders &amp; developers</span>
            <span><Icon name="users" size={14} /> Gated communities</span>
            <span><Icon name="banknote" size={14} /> Home loans</span>
            <span><Icon name="lightbulb" size={14} /> Smart living</span>
          </div>
          <Link className={styles.expoLink} href="/expo">Book your stall <Icon name="arrow-right" size={13} /></Link>
        </article>

        <article className={`card ${styles.highlights}`}>
          <h2>Event Highlights</h2>
          <div className={styles.highlightGrid}>
            {homeExpoHighlights.map((item) => (
              <div className={styles.highlight} key={item.title}>
                <Img src={item.src} alt={item.title} className={styles.highlightImage} />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
          <p className={styles.note}><Icon name="music" size={14} /> Live DJ &amp; Zumba warmup session included</p>
        </article>
      </div>
    </section>
  );
}
