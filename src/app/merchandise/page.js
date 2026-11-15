import CtaStrip from '@/components/shared/CtaStrip';
import KitCarousel from '@/components/merchandise/KitCarousel';
import CommunityInfoSection from '@/components/merchandise/CommunityInfoSection';
import KitTiers from '@/components/merchandise/KitTiers';
import MerchStore from '@/components/merchandise/MerchStore';
import { CorporateKits, LimitedEdition } from '@/components/merchandise/CorporateAndLimited';
import { registerCommunityFields } from '@/data/merchandise';
import { images } from '@/config/images';
import Img from '@/components/ui/Img';
import styles from './MerchandisePage.module.css';

export const metadata = { title: 'Merchandise & Community Kits' };

export default function MerchandisePage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <Img src={images.merchandise.hero} alt="Run in your community colors — Real Estate Marathon Hyderabad" className={styles.heroImage} />
        <a className={styles.orderLink} href="#store" aria-label="Order your kit" />
        <a className={styles.sponsorLink} href="#kit-sponsor-cta" aria-label="Sponsor community kits" />
      </div>
      <KitCarousel className={styles.kitSection} />
      <CommunityInfoSection fields={registerCommunityFields} />
      <section className={`section section--white ${styles.storeSection}`}>
        <div className={`container ${styles.storeGrid}`}>
          <KitTiers />
          <div id="store"><MerchStore /></div>
        </div>
      </section>
      <section className={`section ${styles.lastSection}`}>
        <div className={`container ${styles.lastGrid}`}>
          <CorporateKits />
          <LimitedEdition />
        </div>
      </section>
      <CtaStrip />
    </div>
  );
}
