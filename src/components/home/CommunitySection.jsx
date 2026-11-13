import Icon from '@/components/ui/Icon';
import styles from './CommunitySection.module.css';

const reasons = [
  { icon: 'dumbbell', title: 'Get fit', text: 'Enjoy an active morning with your family and community.' },
  { icon: 'users', title: 'Network & connect', text: 'Meet developers, realtors, investors, and industry peers.' },
  { icon: 'trending-up', title: 'Grow together', text: "Support stronger communities and Telangana's growth." },
];

const experiences = [
  'Finisher medal',
  'Marathon T-shirt',
  'Professional photos',
  'Industry networking',
  'Sponsor goodies',
  'Entertainment & activities',
];

const visionGoals = [
  { icon: 'building', label: 'Smart cities' },
  { icon: 'network', label: 'Metro expansion' },
  { icon: 'trending-up', label: 'IT growth' },
  { icon: 'building', label: 'Infrastructure' },
  { icon: 'sprout', label: 'Sustainable' },
];

const communities = [
  'Developers', 'Architects',
  'Realtors', 'Engineers',
  'Channel partners', 'Government bodies',
  'Construction pros', 'Investors',
  'Home buyers', 'Fitness enthusiasts',
];

const metrics = [
  { icon: 'users', value: '5000+', label: 'Participants' },
  { icon: 'building', value: '250+', label: 'Real Estate Companies' },
  { icon: 'landmark', value: '100+', label: 'Builders & Developers' },
  { icon: 'handshake', value: '50+', label: 'Sponsors' },
  { icon: 'award', value: '25+', label: 'Industry Associations' },
];

export default function CommunitySection() {
  return (
    <section className="section" aria-label="Why participate and Telangana Rising 2047">
      <div className={`container ${styles.container}`}>
        <div className={styles.main}>
          <article className={styles.column}>
            <span className={styles.accentLine} />
            <h2 className={styles.heading}>Why Participate?</h2>
            <div className={styles.reasons}>
              {reasons.map((reason) => (
                <div className={styles.reason} key={reason.title}>
                  <span className={styles.reasonIcon}><Icon name={reason.icon} size={14} /></span>
                  <div>
                    <h3>{reason.title}</h3>
                    <p>{reason.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.experience}>
              <h3>A Complete Event Experience</h3>
              <ul>
                {experiences.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </article>

          <article className={`${styles.column} ${styles.vision}`}>
            <div className={styles.emblem} aria-label="Telangana Rising 2047">
              <Icon name="landmark" size={25} />
              <span>Telangana<br />Rising</span>
              <strong>2047</strong>
            </div>
            <p className={styles.eyebrow}>Running towards</p>
            <h2 className={styles.visionTitle}>Telangana Rising 2047</h2>
            <p className={styles.visionCopy}>Celebrating Telangana&apos;s growth through infrastructure, urban development, innovation, and community engagement.</p>
            <div className={styles.goals}>
              {visionGoals.map((goal) => (
                <div className={styles.goal} key={goal.label}>
                  <Icon name={goal.icon} size={15} />
                  <span>{goal.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.visionFooter}>
              <span>Vision 2047 Goal</span>
              <strong>1 Trillion Economy</strong>
            </div>
          </article>

          <article className={styles.column}>
            <span className={styles.accentLine} />
            <h2 className={styles.heading}>More Than a Run.<br /><span>It&apos;s an Industry Movement.</span></h2>
            <p className={styles.industryCopy}>Bringing the real estate community together on one platform.</p>
            <ul className={styles.communityList}>
              {communities.map((community) => <li key={community}>{community}</li>)}
            </ul>
            <div className={styles.purpose}>
              <h3>Connected by a Shared Purpose</h3>
              <p>Health & wellness <i /> Networking <i /> Industry growth <i /> Community building</p>
            </div>
          </article>
        </div>

        <div className={styles.metrics} aria-label="Marathon community highlights">
          {metrics.map((metric) => (
            <div className={styles.metric} key={metric.label}>
              <span className={styles.metricIcon}><Icon name={metric.icon} size={15} /></span>
              <strong>{metric.value}</strong>
              <span className={styles.metricLabel}>{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
