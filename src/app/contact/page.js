import PageHero from '@/components/shared/PageHero';
import IconCardGrid from '@/components/shared/IconCardGrid';
import PeopleRow from '@/components/shared/PeopleRow';
import InfoCard from '@/components/shared/InfoCard';
import EnquiryForm from '@/components/shared/EnquiryForm';
import CtaStrip from '@/components/shared/CtaStrip';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactCards from '@/components/contact/ContactCards';
import MapLocation from '@/components/contact/MapLocation';
import VolunteerCard from '@/components/contact/VolunteerCard';
import SupportCard from '@/components/contact/SupportCard';
import { contactFormFields, departments, eventSnapshot, helpTopics, organizers, quickContacts } from '@/data/contact';
import { images } from '@/config/images';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <>
      <PageHero title="Get in" highlight="touch" subtitle="Let's build Hyderabad's biggest community movement together." image={images.contact.hero} side={<div style={{ minWidth: 300 }}><InfoCard dark title={eventSnapshot.title} items={eventSnapshot.rows} /></div>} />
      <section className="section">
        <div className="container"><ContactCards items={quickContacts} dark /></div>
      </section>
      <section className="section section--white">
        <div className="container">
          <SectionTitle>What can we help you with?</SectionTitle>
          <IconCardGrid items={helpTopics} columns={4} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionTitle>{'Organized by Industry, for the Community'}</SectionTitle>
          <PeopleRow people={organizers} />
        </div>
      </section>
      <section className="section section--white">
        <div className="container">
          <SectionTitle>Our Department Contacts</SectionTitle>
          <ContactCards items={departments} columns={5} />
        </div>
      </section>
      <section className="section">
        <div className="container layout-2">
          <MapLocation />
          <EnquiryForm id="contact-form" type="contact" title="Send us a message" fields={contactFormFields} submitLabel="Submit message" successMessage="Thank you! We have received your message and will reply soon." />
        </div>
      </section>
      <section className="section section--white">
        <div className="container layout-2">
          <VolunteerCard />
          <SupportCard />
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
