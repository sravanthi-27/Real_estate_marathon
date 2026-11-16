import Img from '@/components/ui/Img';
import CtaStrip from '@/components/shared/CtaStrip';
import SponsorTiers from '@/components/sponsors/SponsorTiers';
import SponsorSidebar from '@/components/sponsors/SponsorSidebar';
import { images } from '@/config/images';
import styles from './SponsorsPage.module.css';

export const metadata = { title: 'Sponsors' };

export default function SponsorsPage() {
  return (
    <>
      <Img src={images.sponsors.hero} alt="Our sponsors and partners in progress" className={styles.hero} loading="eager" />
      <section className={styles.sponsorSection}>
        <div className={`container ${styles.layout}`}>
          <SponsorTiers />
          <SponsorSidebar />
        </div>
      </section>
      <CtaStrip variant="sponsor" />
    </>
  );
}
