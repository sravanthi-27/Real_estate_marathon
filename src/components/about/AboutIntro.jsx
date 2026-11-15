import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { aboutIntro } from '@/data/about';
import { images } from '@/config/images';
import styles from './AboutIntro.module.css';

export default function AboutIntro() {
  return (
    <section className={`section section--white ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <Img src={images.about.intro} alt="Runners at the marathon" className={styles.img} loading="eager" />
        <div className={styles.content}>
          <h2 className={styles.title}>{aboutIntro.title}</h2>
          {aboutIntro.paragraphs.map((p) => <p key={p} className={styles.p}>{p}</p>)}
        </div>
        <aside className={styles.card}>
          <h3>Event Details</h3>
          <ul>{aboutIntro.eventDetails.map((d) => <li key={d.label}><Icon name={d.icon} size={19} /><span><small>{d.label}</small><strong>{d.value}</strong></span></li>)}</ul>
        </aside>
      </div>
    </section>
  );
}
