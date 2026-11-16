import Link from 'next/link';
import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { volunteer } from '@/data/contact';
import { images } from '@/config/images';
import styles from './VolunteerCard.module.css';

const benefits = [
  'Event Certificate',
  'Volunteer Merchandise',
  'Networking Opportunities',
  'Experience Letter',
  'Be a part of something bigger!',
];

export default function VolunteerCard() {
  return (
    <article className={`card ${styles.card}`}>
      <h2 className={styles.title}>{volunteer.title}</h2>
      <p className={styles.subtitle}>Help organize Hyderabad&apos;s biggest purpose-driven marathon.</p>
      <div className={styles.content}>
        <Img src={images.contact.volunteer} alt="Marathon volunteers helping participants at a hydration station" className={styles.img} />
        <ul className={styles.list}>
          {benefits.map((benefit, index) => (
            <li key={benefit} className={index === benefits.length - 1 ? styles.emphasis : ''}>
              <Icon name="check-circle" size={12} />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/register" className={styles.cta}>
        <Icon name="user-round" size={12} />
        <span>Join Volunteer Team</span>
      </Link>
    </article>
  );
}
