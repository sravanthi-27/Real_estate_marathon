import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import Countdown from '@/components/ui/Countdown';
import { EVENT, SITE } from '@/config/site';
import { images } from '@/config/images';
import { PRICING } from '@/lib/pricing';
import styles from './EventBanner.module.css';

export default function EventBanner() {
  return (
    <section className={styles.banner}>
      <Img src={images.register.banner} alt="" className={styles.bg} />
      <div className={`container ${styles.inner}`}>
        <div className={styles.pills}>
          <div className={styles.pill}><Icon name="map-pin" size={16} /><span><small>Venue</small><strong>{EVENT.venue}</strong><em>{EVENT.city}</em></span></div>
          <div className={styles.pill}><Icon name="clock" size={16} /><span><small>Time</small><strong>5:00 AM</strong><em>Onwards</em></span></div>
        </div>
        <div className={styles.center}>
          <p className={styles.first}>World&apos;s First</p>
          <h1 className={styles.title}>Real Estate <span>Marathon</span></h1>
          <p className={styles.sub}>{SITE.tagline}</p>
          <p className={styles.hash}>Run. Connect. Transform. &nbsp; {SITE.hashtag}</p>
          <Countdown target={EVENT.startISO} />
        </div>
        <aside className={styles.price}>
          <Icon name="ticket" size={22} />
          <small>Runner Registration</small>
          <strong>Rs {PRICING.baseFamilyPassPaise / 100}</strong>
          <span>Per family</span>
        </aside>
      </div>
    </section>
  );
}
