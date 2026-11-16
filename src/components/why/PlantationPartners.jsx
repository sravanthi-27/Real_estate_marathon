import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { plantationPartners } from '@/data/why';
import styles from './PlantationPartners.module.css';

export default function PlantationPartners() {
  return (
    <article className={`card ${styles.card}`}>
      <h2 className="card__title">{plantationPartners.title}</h2>
      <p className={styles.text}>{plantationPartners.text}</p>
      <ul className={styles.partners}>
        {plantationPartners.partners.map((partner) => (
          <li key={partner.name}>
            <span className={styles.logo}>
              {partner.src
                ? <Img src={partner.src} alt="" contain className={styles.logoImage} />
                : <Icon name={partner.icon} size={27} />}
            </span>
            <span className={styles.name}>{partner.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
