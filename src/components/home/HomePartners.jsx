import Img from '@/components/ui/Img';
import { homePartners } from '@/data/home';
import styles from './HomePartners.module.css';

export default function HomePartners() {
  return (
    <section className={`section ${styles.section}`} aria-label="Event partners and sponsors">
      <div className={`container ${styles.container}`}>
        <div className={styles.panel}>
          {homePartners.map((group) => (
            <div className={styles.group} key={group.title}>
              <h3>{group.title}</h3>
              <div className={styles.logos}>
                {group.logos.map((src, index) => (
                  <Img
                    key={src}
                    src={src}
                    alt={`${group.names[index]} logo`}
                    contain
                    className={styles.logo}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
