import Img from '@/components/ui/Img';
import { sponsorTiers } from '@/data/sponsors';
import styles from './SponsorTiers.module.css';

export default function SponsorTiers() {
  return (
    <div className={styles.wrap}>
      {sponsorTiers.map((tier) => (
        <section key={tier.key} className="card">
          <h3 className={styles.title}><span>{tier.title}</span></h3>
          <div className={`${styles.row} ${styles[tier.size]}`}>
            {tier.logos.map((l) => <Img key={l.name} src={l.src} alt={l.name} contain className={styles.logo} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
