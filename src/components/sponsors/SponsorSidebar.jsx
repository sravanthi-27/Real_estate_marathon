import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { partnerWithPurpose, sponsorBenefits, sponsorshipCategories } from '@/data/sponsors';
import styles from './SponsorSidebar.module.css';

export default function SponsorSidebar() {
  return (
    <aside className={styles.side}>
      <article className={styles.purposeCard}>
        <h2>{partnerWithPurpose.title}</h2>
        <p className={styles.intro}>{partnerWithPurpose.intro}</p>
        <ul className={styles.benefits}>
          {partnerWithPurpose.benefits.map((benefit) => (
            <li key={benefit.title}>
              <span className={styles.benefitIcon}><Icon name={benefit.icon} size={13} /></span>
              <span className={styles.benefitCopy}>
                <strong>{benefit.title}</strong>
                <span>{benefit.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </article>
      <article className={styles.categoriesCard}>
        <h2>{sponsorshipCategories.title}</h2>
        <ul className={styles.categoryList}>
          {sponsorshipCategories.rows.map((row) => (
            <li key={row.label}>
              <Icon name={row.icon} size={12} className={styles[`categoryIcon--${row.key}`]} />
              <span>{row.label}</span>
              <strong>{row.value}</strong>
            </li>
          ))}
        </ul>
      </article>
      <article className={`card ${styles.benefitCard}`}>
        <h2>{sponsorBenefits.title}</h2>
        <ul className={styles.benefitList}>
          {sponsorBenefits.items.map((item) => (
            <li key={item}><Icon name="check" size={11} />{item}</li>
          ))}
        </ul>
      </article>
      <article className={`card ${styles.cta}`}>
        <h2>Interested in sponsoring?</h2>
        <p>Let&apos;s build a healthier, stronger and more connected tomorrow.</p>
        <Button href="/contact" size="sm">Get in touch</Button>
        <Icon name="footprints" size={56} className={styles.ctaRunner} />
      </article>
    </aside>
  );
}
