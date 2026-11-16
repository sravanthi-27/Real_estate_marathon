import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { images } from '@/config/images';
import styles from './HomeHero.module.css';

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <h1 id="home-hero-title" className="sr-only">Real Estate Marathon</h1>
      <Img
        src={images.home.hero}
        alt="World's First Real Estate Marathon event banner"
        className={styles.banner}
        loading="eager"
      />
      <div className={styles.registerCard}>
        <p className={styles.priceLabel}>Price for any marathon category is</p>
        <p className={styles.price}>₹99</p>
        <p className={styles.participants}>Per participant or family</p>
        <a className={styles.register} href="/register">Register Now <span aria-hidden="true">›</span></a>
        <p className={styles.medical}><Icon name="heart-pulse" size={12} /> Medical Included</p>
      </div>
    </section>
  );
}
