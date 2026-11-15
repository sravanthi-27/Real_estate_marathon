import Img from '@/components/ui/Img';
import CtaStrip from '@/components/shared/CtaStrip';
import EnquiryForm from '@/components/shared/EnquiryForm';
import SponsorTiers from '@/components/sponsors/SponsorTiers';
import SponsorSidebar from '@/components/sponsors/SponsorSidebar';
import { sponsorFormFields } from '@/data/sponsors';
import { images } from '@/config/images';
import styles from './SponsorsPage.module.css';

export const metadata = { title: 'Sponsors' };

export default function SponsorsPage() {
  return (
    <>
      <Img src={images.sponsors.hero} alt="Our sponsors and partners in progress" className={styles.hero} />
      <section className={styles.sponsorSection}>
        <div className={`container ${styles.layout}`}>
          <SponsorTiers />
          <SponsorSidebar />
        </div>
      </section>
      <section className={styles.additionalSponsors}>
        <div className={`container ${styles.additionalLayout}`}>
          <SponsorTiers secondary />
          <SponsorSidebar secondary />
        </div>
      </section>
      <section className={styles.laterSponsors}>
        <div className={`container ${styles.additionalLayout}`}>
          <SponsorTiers later />
          <SponsorSidebar later />
        </div>
      </section>
      <section className={`section section--white ${styles.formSection}`}>
        <div className={`container ${styles.formContainer}`}>
          <EnquiryForm id="sponsor-form" type="sponsor" title="Become a Sponsor" intro="Tell us a little about your brand and we will share the full sponsorship deck." fields={sponsorFormFields} submitLabel="Request sponsorship deck" successMessage="Thank you! Our sponsorship team will contact you within 2 working days." />
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
