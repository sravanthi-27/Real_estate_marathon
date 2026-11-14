import CtaStrip from '@/components/shared/CtaStrip';
import Leaderboard from '@/components/shared/Leaderboard';
import EnquiryForm from '@/components/shared/EnquiryForm';
import KitCarousel from '@/components/merchandise/KitCarousel';
import KitTiers from '@/components/merchandise/KitTiers';
import MerchStore from '@/components/merchandise/MerchStore';
import { CorporateKits, LimitedEdition } from '@/components/merchandise/CorporateAndLimited';
import { communityChallenge, howItWorks, registerCommunityFields } from '@/data/merchandise';
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
        <a className={styles.sponsorLink} href="#kit-sponsor-form" aria-label="Sponsor community kits" />
      </div>
      <KitCarousel className={styles.kitSection} />
      <section className={`section ${styles.infoSection}`}>
        <div className={`container ${styles.infoGrid}`}>
          <article className={`card ${styles.stepsCard}`}>
            <h2 className={styles.heading}>{howItWorks.title}</h2>
            <div className={styles.steps}>
              {howItWorks.steps.map((step, i) => (
                <div className={styles.step} key={step}>
                  <Img src={images.merchandise.howItWorks[i]} alt="" contain className={styles.stepImage} />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </article>
          <div className={styles.challenge}>
            <Leaderboard title={communityChallenge.title} columns={communityChallenge.columns} rows={communityChallenge.rows} />
          </div>
          <div className={styles.register}>
            <EnquiryForm id="community-form" type="community_register" title="Don't see your community?" fields={registerCommunityFields} submitLabel="Register my community" successMessage="Thank you! We will set up your community kit shortly." />
          </div>
        </div>
      </section>
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
