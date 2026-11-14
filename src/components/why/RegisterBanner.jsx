import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import { SITE } from '@/config/site';
import { images } from '@/config/images';
import styles from './RegisterBanner.module.css';

export default function RegisterBanner() {
  return (
    <section className={styles.banner}>
      <Img src={images.why.banner} alt="" className={styles.bg} />
      <div className={`container ${styles.row}`}>
        <div>
          <h2 className={styles.title}>Run 10 km. Plant a tree. <span>Change a future.</span></h2>
          <p className={styles.sub}>Join Hyderabad&apos;s largest purpose-driven marathon.</p>
          <p className={styles.hash}>{SITE.hashtag} &nbsp; #10KTreesForTelangana</p>
        </div>
        <div className={styles.qr}>
          <Button href="/register">Register now</Button>
        </div>
      </div>
    </section>
  );
}
