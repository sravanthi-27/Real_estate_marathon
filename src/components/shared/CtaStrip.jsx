import Button from '@/components/ui/Button';
import Img from '@/components/ui/Img';
import { SITE } from '@/config/site';
import { images } from '@/config/images';
import styles from './CtaStrip.module.css';

/** Compact sponsor CTA banner shown above the footer on every page. */
export default function CtaStrip() {
  return (
    <>
      <section className={styles.strip}>
        <Img src={images.home.ctaRunner} alt="" className={styles.runner} />
        <div className={`container ${styles.row}`}>
          <h2 className={styles.title}>
            <span>Together, let&apos;s run towards</span>
            <span><em>Stronger communities</em> and a better future.</span>
          </h2>
          <div className={styles.actions}>
            <Button href="/sponsors#sponsor-form" className={styles.button}>
              Become a Sponsor <span aria-hidden="true">→</span>
            </Button>
            <span className={styles.hash}>
              #RUN<span className={styles.hashFour}>4</span>REALESTATE
            </span>
          </div>
        </div>
        <Img src={images.home.ctaSkyline} alt="" className={styles.skyline} />
      </section>
      <div className={styles.separator} aria-hidden="true" />
    </>
  );
}
