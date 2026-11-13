import PageHero from '@/components/shared/PageHero';
import StatsBand from '@/components/shared/StatsBand';
import CtaStrip from '@/components/shared/CtaStrip';
import EnquiryForm from '@/components/shared/EnquiryForm';
import SponsorTiers from '@/components/sponsors/SponsorTiers';
import SponsorSidebar from '@/components/sponsors/SponsorSidebar';
import { sponsorFormFields, sponsorStats } from '@/data/sponsors';
import { images } from '@/config/images';

export const metadata = { title: 'Sponsors' };

export default function SponsorsPage() {
  return (
    <>
      <PageHero title="Our" highlight="Sponsors" subtitle="Partners in progress. Builders of tomorrow." image={images.sponsors.hero} />
      <StatsBand items={sponsorStats} />
      <section className="section">
        <div className="container layout-2">
          <SponsorTiers />
          <SponsorSidebar />
        </div>
      </section>
      <section className="section section--white">
        <div className="container" style={{ maxWidth: 820 }}>
          <EnquiryForm id="sponsor-form" type="sponsor" title="Become a Sponsor" intro="Tell us a little about your brand and we will share the full sponsorship deck." fields={sponsorFormFields} submitLabel="Request sponsorship deck" successMessage="Thank you! Our sponsorship team will contact you within 2 working days." />
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
