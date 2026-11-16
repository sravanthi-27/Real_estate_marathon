import Img from '@/components/ui/Img';
import { images } from '@/config/images';
import styles from './RegisterBanner.module.css';

export default function RegisterBanner() {
  return (
    <section className={styles.banner} aria-label="Run, walk, plant a tree, and change a future">
      <Img
        src={images.why.banner}
        alt="Run, walk, plant a tree. Change a future. Run and walk, plant trees, fight climate change, and win exciting rewards. Scan to join now."
        className={styles.image}
      />
    </section>
  );
}
