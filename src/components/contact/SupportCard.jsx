import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import Icon from '@/components/ui/Icon';
import Img from '@/components/ui/Img';
import { CONTACT } from '@/config/site';
import { images } from '@/config/images';
import { faqs } from '@/data/contact';
import styles from './SupportCard.module.css';

export default function SupportCard() {
  return (
    <div className="stack">
      <div className="card">
        <h2 className="card__title">Quick Help Access</h2>
        <Accordion items={faqs} />
      </div>
      <div className="card card--dark">
        <h2 className="card__title"><Icon name="message" size={16} /> Live Chat Support</h2>
        <div className={styles.liveChat}>
          <div>
            <p style={{ fontSize: 'var(--fs-xs)', opacity: .85, marginBottom: '.8rem' }}>Chat with our team on WhatsApp for fast answers.</p>
            <Button href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" size="sm">Chat on WhatsApp</Button>
          </div>
          <Img src={images.contact.support} alt="Marathon medical support ambulance" className={styles.image} />
        </div>
      </div>
    </div>
  );
}
