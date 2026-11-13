import Img from '@/components/ui/Img';
import { plantationPartners } from '@/data/why';
import styles from './PlantationPartners.module.css';

export default function PlantationPartners() {
  return (
    <div className="card">
      <h2 className="card__title">{plantationPartners.title}</h2>
      <p className={styles.text}>{plantationPartners.text}</p>
      <div className={styles.row}>
        {plantationPartners.partners.map((p) => <Img key={p.name} src={p.src} alt={p.name} contain className={styles.logo} />)}
      </div>
    </div>
  );
}
