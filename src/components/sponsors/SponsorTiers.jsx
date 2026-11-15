import Img from '@/components/ui/Img';
import { sponsorTiers } from '@/data/sponsors';
import styles from './SponsorTiers.module.css';

export default function SponsorTiers() {
  return (
    <div className={styles.wrap}>
      {sponsorTiers.map((tier) => (
        <section key={tier.key} className={`${styles.tierCard} ${styles[`tierCard--${tier.key}`]}`}>
          <h3 className={styles.title}><span>{tier.title}</span></h3>
          <div className={`${styles.row} ${styles[tier.size]}`}>
            {tier.logos.map((logo, index) => (
              <div className={styles.logoCell} key={logo.name}>
                <Img src={logo.src} alt={logo.name} contain className={styles.logo} />
                {index < tier.logos.length - 1 && tier.key !== 'title' && (
                  <span className={styles.separator} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
