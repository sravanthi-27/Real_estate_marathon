import Img from '@/components/ui/Img';
import { images } from '@/config/images';
import styles from './EventBanner.module.css';

export default function EventBanner() {
  return (
    <section className={styles.banner}>
      <Img src={images.register.banner} alt="Real Estate Marathon at sunrise — venue, time, and family registration details" className={styles.image} />
    </section>
  );
}
