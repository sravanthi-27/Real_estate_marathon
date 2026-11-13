import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { aboutIntro } from '@/data/about';
import { images } from '@/config/images';
import styles from './AboutIntro.module.css';

export default function AboutIntro() {
  return (
    <section className="section section--white">
      <div className={`container ${styles.grid}`}>
        <Img src={images.about.intro} alt="Runners at the marathon" className={styles.img} />
        <div>
          <h2 className={styles.title}>{aboutIntro.title}</h2>
          {aboutIntro.paragraphs.map((p) => <p key={p} className={styles.p}>{p}</p>)}
          <Button href="/register" className={styles.btn}>Register Now</Button>
        </div>
        <aside className={styles.card}>
          <h3>Event Details</h3>
          <ul>{aboutIntro.eventDetails.map((d) => <li key={d.label}><Icon name={d.icon} size={16} /><span><small>{d.label}</small><strong>{d.value}</strong></span></li>)}</ul>
        </aside>
      </div>
    </section>
  );
}
