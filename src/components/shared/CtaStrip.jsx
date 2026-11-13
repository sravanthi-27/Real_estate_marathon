import Button from '@/components/ui/Button';
import Img from '@/components/ui/Img';
import { SITE } from '@/config/site';
import { images } from '@/config/images';
import styles from './CtaStrip.module.css';

/** The purple "Together, let's run..." banner shown above the footer on every page. */
export default function CtaStrip() {
  return (
    <section className={styles.strip}>
      <Img src={images.common.skyline} alt="" className={styles.bg} />
      <div className={`container ${styles.row}`}>
        <h2 className={styles.title}>Together, let&apos;s run towards <span>stronger communities</span> and a better future.</h2>
        <div className={styles.actions}>
          <Button href="/sponsors#sponsor-form">Become a Sponsor</Button>
          <span className={styles.hash}>{SITE.hashtag}</span>
        </div>
      </div>
    </section>
  );
}
