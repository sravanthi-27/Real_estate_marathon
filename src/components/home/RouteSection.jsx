import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Img from '@/components/ui/Img';
import { CATEGORIES } from '@/config/registration';
import { images } from '@/config/images';
import { raceCategoryDetails, route } from '@/data/home';
import styles from './RouteSection.module.css';

export default function RouteSection() {
  return (
    <section id="route" className="section">
      <div className={`container ${styles.grid}`}>
        <article className={`card ${styles.categories}`}>
          <div className={styles.sectionHeading}>
            <div>
              <h2 className="card__title">Marathon Categories</h2>
              <p className={styles.subtitle}>Find your distance. Join the movement.</p>
            </div>
          </div>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map((category) => {
              const details = raceCategoryDetails[category.id];
              return (
                <article key={category.id} className={styles.category}>
                  <span className={styles.categoryName}>{details.name}</span>
                  <strong className={styles.distance}>{category.short.replace('K', '')} <small>KM</small></strong>
                  <p className={styles.audience}>{details.audience}</p>
                  <div className={styles.schedule}>
                    <span>Reporting: {category.reporting}</span>
                    <span>Start: {category.start}</span>
                  </div>
                </article>
              );
            })}
          </div>
          <div className={styles.priceBar}>
            <div className={styles.price}>₹99</div>
            <div className={styles.priceCopy}>
              <strong>Per participant or family</strong>
              <span>Valid for any marathon category</span>
            </div>
            <Button href="/register" size="sm">Register Now <Icon name="arrow-right" size={14} /></Button>
          </div>
        </article>

        <article className={`card ${styles.routeCard}`}>
          <div className={styles.routeHeading}>
            <div>
              <h2 className="card__title">{route.title}</h2>
              <p className={styles.subtitle}>Illustrative route · Gachibowli Stadium</p>
            </div>
            <a className={styles.mapLink} href={route.mapUrl} target="_blank" rel="noreferrer">
              View full map <Icon name="arrow-right" size={13} />
            </a>
          </div>
          <div className={styles.routeContent}>
            <div className={styles.mapFrame}>
              <Img src={images.home.map} alt="Illustrative marathon route map showing Gachibowli Stadium, Financial District, Durgam Cheruvu and route checkpoints" className={styles.mapImage} />
            </div>
            <div className={styles.stats}>
              {route.stats.map((stat) => (
                <div key={stat.label} className={`${styles.stat} ${styles[stat.tone]}`}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <p className={styles.mapNote}>Illustrative event route. Course details may be updated before race day.</p>
        </article>
      </div>
    </section>
  );
}
