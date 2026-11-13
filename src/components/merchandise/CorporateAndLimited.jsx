import Img from '@/components/ui/Img';
import SectionTitle from '@/components/ui/SectionTitle';
import EnquiryForm from '@/components/shared/EnquiryForm';
import { corporateKits, limitedEdition } from '@/data/merchandise';
import { images } from '@/config/images';
import styles from './CorporateAndLimited.module.css';

const corporateFields = [
  { name: 'name', label: 'Your name', required: true },
  { name: 'organisation', label: 'Company', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'quantity', label: 'Quantity', type: 'select', options: ['25-50', '51-100', '101-250', '250+'], required: true },
];

export function CorporateKits() {
  return (
    <div className="card">
      <SectionTitle align="left" sub={corporateKits.subtitle}>{corporateKits.title}</SectionTitle>
      <div className={styles.pair}>
        <Img src={images.merchandise.corporateFront} alt="Front view" contain className={styles.shirt} />
        <Img src={images.merchandise.corporateBack} alt="Back view" contain className={styles.shirt} />
      </div>
      <ul className={styles.points}>{corporateKits.points.map((p) => <li key={p}>&#10003; {p}</li>)}</ul>
      <p className={styles.min}>{corporateKits.minimum}</p>
      <EnquiryForm id="corporate-form" type="corporate_kit" fields={corporateFields} submitLabel="Request quote" successMessage="Thank you! We will send a quote shortly." />
    </div>
  );
}

export function LimitedEdition() {
  return (
    <div className="card">
      <SectionTitle align="left">{limitedEdition.title}</SectionTitle>
      <div className={styles.collection}>
        {limitedEdition.items.map((i) => (
          <figure key={i.name}><Img src={i.src} alt={i.name} contain className={styles.piece} /><figcaption>{i.name}</figcaption></figure>
        ))}
      </div>
    </div>
  );
}
