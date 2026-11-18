import Link from 'next/link';
import PeopleRow from '@/components/shared/PeopleRow';
import EnquiryForm from '@/components/shared/EnquiryForm';
import SectionTitle from '@/components/ui/SectionTitle';
import Icon from '@/components/ui/Icon';
import Img from '@/components/ui/Img';
import ContactHelpSection from '@/components/contact/ContactHelpSection';
import ContactInfoSection from '@/components/contact/ContactInfoSection';
import ContactCards from '@/components/contact/ContactCards';
import MapLocation from '@/components/contact/MapLocation';
import VolunteerCard from '@/components/contact/VolunteerCard';
import SupportCard from '@/components/contact/SupportCard';
import ContactFollowupSection from '@/components/contact/ContactFollowupSection';
import ContactHistoryCta from '@/components/contact/ContactHistoryCta';
import { contactFormFields, departments, organizers } from '@/data/contact';
import { images } from '@/config/images';
import styles from './ContactPage.module.css';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <Img src={images.contact.hero} alt="Get in touch — Real Estate Marathon Hyderabad" className={styles.heroImage} loading="eager" />
        <Link href="/register" className={styles.heroRegister} aria-label="Register now">
          Register Now
        </Link>
      </div>
      <ContactInfoSection />
      <section className={`section section--white ${styles.section}`}>
        <div className={`container ${styles.helpContainer}`}>
          <ContactHelpSection />
        </div>
      </section>
      <section className={`${styles.section} ${styles.organizedSection}`}>
        <div className="container">
          <h2 className={styles.organizedTitle}>ORGANIZED BY INDUSTRY. FOR THE COMMUNITY.</h2>
          <PeopleRow people={organizers} className={styles.organizers} />
        </div>
      </section>
      <section className={`${styles.section} ${styles.departmentSection}`}>
        <div className={`container ${styles.departmentContainer}`}>
          <SectionTitle>Our Department Contacts</SectionTitle>
          <ContactCards items={departments} columns={6} />
        </div>
      </section>
      <section className={`${styles.section} ${styles.locationMessageSection}`}>
        <div className={`container ${styles.locationMessageGrid}`}>
          <MapLocation />
          <EnquiryForm
            id="contact-form"
            type="contact"
            title="Send us a message"
            fields={contactFormFields}
            className={styles.contactForm}
            submitLabel={<><Icon name="send" size={12} />Submit Enquiry</>}
            successMessage="Thank you! We have received your message and will reply soon."
          />
        </div>
      </section>
      <section className={`section section--white ${styles.section} ${styles.volunteerSupportSection}`}>
        <div className={`container ${styles.contactGrid}`}>
          <VolunteerCard />
          <SupportCard />
        </div>
      </section>
      <ContactFollowupSection />
      <ContactHistoryCta />
    </div>
  );
}
