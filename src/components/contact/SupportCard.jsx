import Icon from '@/components/ui/Icon';
import Img from '@/components/ui/Img';
import { images } from '@/config/images';
import styles from './SupportCard.module.css';

const services = [
  { icon: 'ambulance', color: '#ff4b4b', label: 'Ambulance Services' },
  { icon: 'stethoscope', color: '#ff8a24', label: 'Medical Teams Every 1 KM' },
  { icon: 'shield', color: '#326bff', label: 'Hyderabad Police' },
  { icon: 'droplets', color: '#00b8d9', label: 'Hydration Every 100 Meters' },
  { icon: 'shield-check', color: '#6554ff', label: 'Cyberabad Police' },
  { icon: 'heart-pulse', color: '#ff4566', label: 'Emergency Help Booths Across Route' },
  { icon: 'traffic-cone', color: '#ff9d19', label: 'Traffic Police' },
  { icon: 'clock3', color: '#00b98a', label: '24x7 Control Room Support' },
];

export default function SupportCard() {
  return (
    <article className={`card ${styles.card}`}>
      <h2 className={styles.title}>
        <span className={styles.titleIcon}><Icon name="headset" size={12} /></span>
        <span>Race Day Support</span>
      </h2>
      <div className={styles.content}>
        <ul className={styles.list}>
          {services.map(({ icon, color, label }) => (
            <li key={label}>
              <Icon name={icon} size={12} style={{ color }} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
        <Img src={images.contact.support} alt="Ambulance with emergency lights on an urban road" className={styles.image} />
      </div>
    </article>
  );
}
