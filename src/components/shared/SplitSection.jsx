import Img from '@/components/ui/Img';
import styles from './SplitSection.module.css';

/** Image on one side, content on the other. */
export default function SplitSection({ image, imageAlt = '', reverse = false, children, imageHeight = 300 }) {
  return (
    <div className={`${styles.wrap} ${reverse ? styles.reverse : ''}`}>
      <Img src={image} alt={imageAlt} className={styles.img} style={{ minHeight: imageHeight }} />
      <div className={styles.body}>{children}</div>
    </div>
  );
}
