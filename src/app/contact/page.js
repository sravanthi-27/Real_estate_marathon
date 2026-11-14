import IconCardGrid from '@/components/shared/IconCardGrid';
import PeopleRow from '@/components/shared/PeopleRow';
import EnquiryForm from '@/components/shared/EnquiryForm';
import CtaStrip from '@/components/shared/CtaStrip';
import SectionTitle from '@/components/ui/SectionTitle';
import Img from '@/components/ui/Img';
import ContactCards from '@/components/contact/ContactCards';
import MapLocation from '@/components/contact/MapLocation';
import VolunteerCard from '@/components/contact/VolunteerCard';
import SupportCard from '@/components/contact/SupportCard';
import { contactFormFields, departments, helpTopics, organizers, quickContacts } from '@/data/contact';
import { images } from '@/config/images';
import styles from './ContactPage.module.css';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Img src={images.contact.hero} alt="Get in touch — Real Estate Marathon Hyderabad" className={styles.hero} />
      <section className={styles.quickSection}>
        <div className={`container ${styles.quickContainer}`}><ContactCards items={quickContacts} dark /></div>
      </section>
      <section className={`section section--white ${styles.section}`}>
        <div className={`container ${styles.helpContainer}`}>
          <SectionTitle>What can we help you with?</SectionTitle>
          <IconCardGrid items={helpTopics} columns={4} compact />
        </div>
      </section>
      <section className={`section ${styles.section}`}>
        <div className="container">
          <SectionTitle>{'Organized by Industry, for the Community'}</SectionTitle>
          <PeopleRow people={organizers} className={styles.organizers} />
        </div>
      </section>
      <section className={`section section--white ${styles.section}`}>
        <div className={`container ${styles.departmentContainer}`}>
          <SectionTitle>Our Department Contacts</SectionTitle>
          <ContactCards items={departments} columns={5} />
        </div>
      </section>
      <section className={`section ${styles.section}`}>
        <div className={`container ${styles.contactGrid}`}>
          <MapLocation />
          <EnquiryForm id="contact-form" type="contact" title="Send us a message" fields={contactFormFields} submitLabel="Submit message" successMessage="Thank you! We have received your message and will reply soon." />
        </div>
      </section>
      <section className={`section section--white ${styles.section}`}>
        <div className={`container ${styles.contactGrid}`}>
          <VolunteerCard />
          <SupportCard />
        </div>
      </section>
      <CtaStrip />
    </div>
  );
}
