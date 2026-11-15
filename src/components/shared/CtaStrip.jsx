import Button from '@/components/ui/Button';
import Img from '@/components/ui/Img';
import { images } from '@/config/images';
import styles from './CtaStrip.module.css';

/** Compact sponsor CTA banner shown above the footer on every page. */
export default function CtaStrip({ variant = 'default' }) {
  const isSponsor = variant === 'sponsor';

  return (
    <>
      <section className={`${styles.strip} ${isSponsor ? styles.sponsorStrip : ''}`}>
        <Img src={isSponsor ? images.sponsors.runnerIcon : images.home.ctaRunner} alt={isSponsor ? 'Runner silhouette' : ''} className={styles.runner} />
        <div className={`container ${styles.row}`}>
          {isSponsor ? (
            <div className={styles.sponsorCopy}>
              <h2 className={styles.title}>Interested in Sponsoring?</h2>
              <p className={styles.description}>Let&apos;s build a healthier, stronger and more connected tomorrow.</p>
            </div>
          ) : (
            <h2 className={styles.title}>
              <span>Together, let&apos;s run towards</span>
              <span><em>Stronger communities</em> and a better future.</span>
            </h2>
          )}
          <div className={styles.actions}>
            <Button href="/sponsors#sponsor-form" className={styles.button}>
              {isSponsor ? 'Get in Touch' : 'Become a Sponsor'} <span aria-hidden="true">→</span>
            </Button>
            {!isSponsor && (
              <span className={styles.hash}>
                #RUN<span className={styles.hashFour}>4</span>REALESTATE
              </span>
            )}
          </div>
        </div>
        {!isSponsor && <Img src={images.home.ctaSkyline} alt="" className={styles.skyline} />}
      </section>
      {!isSponsor && <div className={styles.separator} aria-hidden="true" />}
    </>
  );
}
