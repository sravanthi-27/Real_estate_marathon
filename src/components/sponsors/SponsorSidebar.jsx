import InfoCard from '@/components/shared/InfoCard';
import Button from '@/components/ui/Button';
import { partnerWithPurpose, sponsorBenefits, sponsorshipCategories } from '@/data/sponsors';
import styles from './SponsorSidebar.module.css';

export default function SponsorSidebar() {
  return (
    <aside className={styles.side}>
      <InfoCard title={partnerWithPurpose.title} items={partnerWithPurpose.points}>
        <p className={styles.intro}>{partnerWithPurpose.intro}</p>
      </InfoCard>
      <InfoCard dark title={sponsorshipCategories.title} items={sponsorshipCategories.rows.map((r) => ({ label: r.label, value: r.value.includes('On') ? r.value : `Rs ${r.value}` }))} />
      <InfoCard title={sponsorBenefits.title} items={sponsorBenefits.items} />
      <div className={`card ${styles.cta}`}>
        <h3 className="card__title">Interested in sponsoring?</h3>
        <p>Let&apos;s build something meaningful together.</p>
        <Button href="#sponsor-form" size="sm">Get in touch</Button>
      </div>
    </aside>
  );
}
