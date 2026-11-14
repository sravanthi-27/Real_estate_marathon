import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { plantationPartners } from '@/data/why';
import styles from './PlantationPartners.module.css';

export default function PlantationPartners() {
  return (
    <div className="card">
      <h2 className="card__title">{plantationPartners.title}</h2>
      <p className={styles.text}>{plantationPartners.text}</p>
      <Img src={plantationPartners.image} alt="Community members caring for a young tree" contain className={styles.image} />
      <ul className={styles.steps}>
        {plantationPartners.steps.map((step) => <li key={step}><Icon name="check-circle" size={14} />{step}</li>)}
      </ul>
    </div>
  );
}
