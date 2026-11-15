import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import CtaStrip from '@/components/shared/CtaStrip';
import { images } from '@/config/images';
import styles from './RoutePage.module.css';

export const metadata = { title: 'Route' };

const pointsOfInterest = [
  { title: 'Gachibowli Stadium', description: 'The iconic start & finish point of the marathon.' },
  { title: 'Financial District', description: "Hyderabad's growing business hub." },
  { title: 'ORR Stretch', description: 'Smooth, wide roads for an energetic run.' },
  { title: 'Durgam Cheruvu', description: 'Scenic beauty by the serene lake.' },
  { title: 'Cyber Towers', description: "Hyderabad's IT landmark on the route." },
  { title: 'Biodiversity Junction', description: 'Clean junction supporting a sustainable future.' },
];

const supportCards = [
  {
    kind: 'hydration',
    icon: 'droplets',
    title: 'Hydration Plan',
    accent: 'Hydration Point',
    supporting: 'Every 100 Meters',
    text: '100+ hydration points ensuring you stay refreshed throughout the run.',
  },
  {
    kind: 'medical',
    icon: 'plus',
    title: 'Medical Plan',
    accent: 'Medical Point',
    supporting: 'Every 1 KM',
    text: '10 Medical points with professional staff and first-aid support.',
  },
  {
    kind: 'safety',
    icon: 'shield',
    title: 'Route Safety',
    items: ['Traffic Free Route', 'Security & Marshals', 'Medical Assistance', 'Ambulance Support', 'CCTV Surveillance'],
  },
  {
    kind: 'facilities',
    icon: 'footprints',
    title: 'Runner Facilities',
    items: ['Hydration Stations', 'Medical Aid', 'Restrooms', 'Waste Management', 'Energy Support'],
  },
  {
    kind: 'note',
    icon: 'info',
    title: 'Important Note',
    text: 'Participants are requested to follow the route, marshals instructions and maintain sportsmanship.',
  },
];

const routeHighlights = [
  'Gachibowli Stadium',
  'Financial District',
  'ORR Stretch',
  'Durgam Cheruvu',
  'Cyber Towers',
  'Biodiversity Junction',
  'Back to Gachibowli Stadium',
];

const routeInformation = [
  { label: 'Distance', value: '10.00 KM', icon: 'activity', color: '#25a9e0' },
  { label: 'Elevation Gain', value: '120 M', icon: 'mountain', color: '#00cfa6' },
  { label: 'Route Type', value: 'OUT & BACK', icon: 'arrow-left-right', color: '#25a9e0' },
  { label: 'Hydration Points', value: '100+', icon: 'droplets', color: '#25a9e0', note: '(Every 100 Meters)' },
  { label: 'Medical Points', value: '10', icon: 'plus', color: '#ff3038', note: '(Every 1 KM)' },
];

const routeStatuses = [
  { label: 'Timed Run', icon: 'clock' },
  { label: 'Chip Timing', icon: 'zap' },
  { label: 'Certified Route', icon: 'badge-check' },
];

export default function RoutePage() {
  return (
    <div className={styles.page}>
      <Img
        src={images.route.hero}
        alt="Real Estate Marathon event banner"
        className={styles.hero}
      />

      <section className={styles.mapSection}>
        <div className={styles.mapPanel}>
          <div className={styles.mapFrame}>
            <Img
              src={images.route.courseMap}
              alt="10 kilometre marathon route map showing Gachibowli Stadium, route markers, hydration points, and medical points"
              className={styles.routeMap}
              loading="eager"
            />
          </div>
          <div className={styles.routeSidebar}>
            <aside className={styles.routeDetails}>
              <h2>Route Highlights</h2>
              <ul>
                {routeHighlights.map((item) => (
                  <li key={item}><Icon name="map-pin" size={11} />{item}</li>
                ))}
              </ul>
            </aside>
            <aside className={styles.routeInformation}>
              <h2>Route Information</h2>
              <div className={styles.informationRows}>
                {routeInformation.map((item) => (
                  <div className={styles.informationGroup} key={item.label}>
                    <div className={styles.informationRow}>
                      <span className={styles.informationLabel}>
                        <Icon name={item.icon} size={10} style={{ color: item.color }} />
                        {item.label}
                      </span>
                      <strong>{item.value}</strong>
                    </div>
                    {item.note && <span className={styles.informationNote}>{item.note}</span>}
                  </div>
                ))}
              </div>
              <div className={styles.statusList}>
                {routeStatuses.map((item) => (
                  <div className={styles.statusRow} key={item.label}>
                    <Icon name={item.icon} size={9} />
                    <span>{item.label}</span>
                    <Icon name="check" size={9} className={styles.statusCheck} />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.detailsSection}>
        <div className={styles.detailsGrid}>
          <aside className={styles.elevation}>
            <div className={styles.elevationHeader}>
              <h2>Elevation Profile</h2>
              <div className={styles.metrics}>
                <div className={styles.metric}>
                  <span>Highest Point</span>
                  <strong>620 M</strong>
                </div>
                <div className={styles.metric}>
                  <span>Elev Gain</span>
                  <strong>120 M</strong>
                </div>
              </div>
            </div>
            <svg className={styles.chart} viewBox="0 0 260 112" role="img" aria-label="Elevation profile over 10 kilometres, rising to a peak near 5 kilometres then descending">
              <defs>
                <linearGradient id="elevation-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ff5722" stopOpacity=".22" />
                  <stop offset="100%" stopColor="#ff5722" stopOpacity=".02" />
                </linearGradient>
              </defs>
              <text className={styles.yAxisTitle} x="8" y="52" transform="rotate(-90 8 52)">Elevation (m)</text>
              {[18, 33, 48, 63, 78].map((y, index) => (
                <g key={y}>
                  <line className={styles.gridLine} x1="30" x2="254" y1={y} y2={y} />
                  <text className={styles.axisText} x="25" y={y + 2} textAnchor="end">{160 - index * 40}</text>
                </g>
              ))}
              <path className={styles.chartArea} d="M30 78 L47 67 L64 61 L75 63 L87 52 L99 55 L116 42 L133 33 L148 22 L163 34 L179 47 L194 56 L210 63 L226 69 L242 75 L254 78 L254 78 L30 78 Z" />
              <polyline className={styles.chartLine} points="30,78 47,67 64,61 75,63 87,52 99,55 116,42 133,33 148,22 163,34 179,47 194,56 210,63 226,69 242,75 254,78" />
              <circle className={styles.chartMarker} cx="30" cy="78" r="2" />
              <circle className={styles.chartMarker} cx="148" cy="22" r="3.2" />
              <circle className={styles.chartMarker} cx="210" cy="63" r="2.4" />
              <circle className={styles.chartMarker} cx="254" cy="78" r="2" />
              {[['0', 30], ['2.5', 86], ['5', 142], ['7.5', 198], ['10', 254]].map(([label, x]) => (
                <text className={styles.axisText} key={label} x={x} y="91" textAnchor="middle">{label}</text>
              ))}
              <text className={styles.xAxisTitle} x="142" y="106" textAnchor="middle">Distance (KM)</text>
            </svg>
          </aside>
          <div className={styles.pointsPanel}>
            <h2>Points of Interest</h2>
            <div className={styles.pointsGrid}>
              {pointsOfInterest.map((point, index) => (
                <article className={styles.point} key={point.title}>
                  <Img src={images.route.points[index]} alt={point.title} className={styles.pointImage} />
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.supportSection}>
        <div className={styles.supportGrid}>
          {supportCards.map((card) => (
            <article className={`${styles.supportCard} ${styles[`supportCard--${card.kind}`]}`} key={card.title}>
              {card.kind === 'hydration' || card.kind === 'medical' ? (
                <>
                  <div className={styles.supportHeader}>
                    <Icon name={card.icon} size={17} className={styles.supportIcon} />
                    <div>
                      <h2>{card.title}</h2>
                      <strong>{card.accent}</strong>
                      <span>{card.supporting}</span>
                    </div>
                  </div>
                  <div className={styles.supportDescription}>
                    <span className={styles.supportIllustration} aria-hidden="true">
                      {card.kind === 'hydration' ? <span>H₂O</span> : <Icon name="plus" size={18} />}
                    </span>
                    <p>{card.text}</p>
                  </div>
                </>
              ) : card.items ? (
                <>
                  <div className={styles.supportListHeader}>
                    <Icon name={card.icon} size={17} className={styles.supportIcon} />
                    <h2>{card.title}</h2>
                  </div>
                  <ul className={styles.supportItems}>
                    {card.items.map((item) => (
                      <li key={item}><Icon name="check" size={8} />{item}</li>
                    ))}
                  </ul>
                  <span className={styles.supportIllustration} aria-hidden="true">
                    {card.kind === 'safety' ? <Icon name="shield" size={25} /> : <><i /><i /></>}
                  </span>
                </>
              ) : (
                <>
                  <div className={styles.noteHeading}>
                    <Icon name={card.icon} size={13} />
                    <h2>{card.title}</h2>
                  </div>
                  <p>{card.text}</p>
                </>
              )}
            </article>
          ))}
        </div>
      </section>
      <CtaStrip />
    </div>
  );
}
