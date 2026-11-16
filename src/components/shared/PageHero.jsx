import Img from '@/components/ui/Img';
import styles from './PageHero.module.css';

/** Banner at the top of inner pages. `children` renders under the subtitle (buttons, chips...). */
export default function PageHero({ eyebrow, title, highlight, subtitle, image, children, side }) {
  return (
    <section className={styles.hero}>
      <Img src={image} alt="" className={styles.bg} loading="eager" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 className={styles.title}>{title} {highlight && <span>{highlight}</span>}</h1>
          {subtitle && <p className={styles.sub}>{subtitle}</p>}
          {children}
        </div>
        {side && <div className={styles.side}>{side}</div>}
      </div>
    </section>
  );
}
