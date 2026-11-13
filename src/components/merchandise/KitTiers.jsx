import SectionTitle from '@/components/ui/SectionTitle';
import EnquiryForm from '@/components/shared/EnquiryForm';
import { kitSponsorFields, kitTiers } from '@/data/merchandise';
import styles from './KitTiers.module.css';

export default function KitTiers() {
  return (
    <div className="card">
      <SectionTitle align="left" sub="Sponsor kits for communities and runners.">Sponsor a Community Kit</SectionTitle>
      <div className={styles.grid}>
        {kitTiers.map((t) => (
          <div key={t.name} className={`${styles.tier} ${styles[t.tone]}`}><span>{t.name}</span><strong>{t.kits}</strong><small>kits</small></div>
        ))}
      </div>
      <EnquiryForm id="kit-sponsor-form" type="kit_sponsor" fields={kitSponsorFields} submitLabel="Sponsor community kits" successMessage="Thank you! We will reach out with sponsorship details." />
    </div>
  );
}
