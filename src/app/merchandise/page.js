import PageHero from '@/components/shared/PageHero';
import StatsBand from '@/components/shared/StatsBand';
import CtaStrip from '@/components/shared/CtaStrip';
import InfoCard from '@/components/shared/InfoCard';
import Leaderboard from '@/components/shared/Leaderboard';
import EnquiryForm from '@/components/shared/EnquiryForm';
import Button from '@/components/ui/Button';
import KitCarousel from '@/components/merchandise/KitCarousel';
import KitTiers from '@/components/merchandise/KitTiers';
import MerchStore from '@/components/merchandise/MerchStore';
import { CorporateKits, LimitedEdition } from '@/components/merchandise/CorporateAndLimited';
import { communityChallenge, howItWorks, merchStats, registerCommunityFields } from '@/data/merchandise';
import { images } from '@/config/images';

export const metadata = { title: 'Merchandise & Community Kits' };

export default function MerchandisePage() {
  return (
    <>
      <PageHero title="Run in your" highlight="community colors" subtitle="Official marathon kits powered by Hyderabad's leading real estate communities." image={images.merchandise.hero}>
        <div style={{ display: 'flex', gap: '.8rem', marginTop: '1.2rem', flexWrap: 'wrap' }}>
          <Button href="#store">Order your kit</Button>
          <Button href="#kit-sponsor-form" variant="ghost">Sponsor community kits</Button>
        </div>
      </PageHero>
      <StatsBand items={merchStats} />
      <KitCarousel />
      <section className="section">
        <div className="container layout-3">
          <InfoCard title={howItWorks.title} items={howItWorks.steps} />
          <Leaderboard title={communityChallenge.title} columns={communityChallenge.columns} rows={communityChallenge.rows} />
          <EnquiryForm id="community-form" type="community_register" title="Don't see your community?" fields={registerCommunityFields} submitLabel="Register my community" successMessage="Thank you! We will set up your community kit shortly." />
        </div>
      </section>
      <section className="section section--white">
        <div className="container layout-2">
          <KitTiers />
          <div id="store"><MerchStore /></div>
        </div>
      </section>
      <section className="section">
        <div className="container layout-2">
          <CorporateKits />
          <LimitedEdition />
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
