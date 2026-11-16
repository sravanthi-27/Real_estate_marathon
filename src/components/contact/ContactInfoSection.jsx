import { Facebook, Globe2, Instagram, Mail, MapPin, MessageCircle, Phone, Hash, Linkedin, Youtube } from 'lucide-react';
import { SITE } from '@/config/site';
import styles from './ContactInfoSection.module.css';

const socialIcons = [
  { name: 'Facebook', Icon: Facebook, className: 'facebook' },
  { name: 'Instagram', Icon: Instagram, className: 'instagram' },
  { name: 'LinkedIn', Icon: Linkedin, className: 'linkedin' },
  { name: 'YouTube', Icon: Youtube, className: 'youtube' },
  { name: 'WhatsApp', Icon: MessageCircle, className: 'whatsapp' },
];

function CardHeader({ icon: Icon, tone, children }) {
  return (
    <h2 className={styles.heading}>
      <span className={`${styles.iconBox} ${styles[tone]}`}><Icon aria-hidden="true" /></span>
      <span>{children}</span>
    </h2>
  );
}

export default function ContactInfoSection() {
  return (
    <section className={styles.section} aria-label="Contact information">
      <div className={styles.grid}>
        <article className={styles.card}>
          <CardHeader icon={MapPin} tone="orange">Event Venue</CardHeader>
          <div className={styles.venue}>
            <strong>Gachibowli Stadium</strong>
            <span>Hyderabad, Telangana</span>
          </div>
          <div className={`${styles.footer} ${styles.venueFooter}`}>
            <span>Reporting Time: 5:00 AM</span>
            <span>Distance: 10 KM</span>
          </div>
        </article>

        <article className={styles.card}>
          <CardHeader icon={Phone} tone="blue">Marathon Helpline</CardHeader>
          <a className={styles.phone} href="tel:+919876543210">+91 98765 43210</a>
          <div className={styles.support}>
            <span>For:</span>
            <span>Registration Support</span>
            <span>Participant Queries</span>
            <span>Route Information</span>
            <span>Merchandise Orders</span>
          </div>
        </article>

        <article className={styles.card}>
          <CardHeader icon={Mail} tone="yellow">Email Support</CardHeader>
          <div className={styles.emails}>
            <a href="mailto:info@realestatejobs.co.in">info@realestatejobs.co.in</a>
            <a href="mailto:support@realestatejobs.co.in">support@realestatejobs.co.in</a>
          </div>
          <div className={styles.footer}>Mon - Sun | 9:00 AM - 7:00 PM</div>
        </article>

        <article className={styles.card}>
          <CardHeader icon={Globe2} tone="teal">Website</CardHeader>
          <a className={styles.website} href="https://www.realestatejobs.co.in" target="_blank" rel="noreferrer">
            www.realestatejobs.co.in
          </a>
          <div className={styles.footer}>Official Event Portal &amp; Registrations</div>
        </article>

        <article className={styles.card}>
          <CardHeader icon={Hash} tone="purple">Follow Us</CardHeader>
          <div className={styles.socials} aria-label="Social media">
            {socialIcons.map(({ name, Icon, className }) => (
              <span key={name} className={`${styles.social} ${styles[className]}`} aria-label={name} title={name}>
                <Icon aria-hidden="true" />
              </span>
            ))}
          </div>
          <div className={styles.footer}>{SITE.hashtag}</div>
        </article>
      </div>
    </section>
  );
}
