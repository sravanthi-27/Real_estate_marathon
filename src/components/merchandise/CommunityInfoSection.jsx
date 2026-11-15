import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import EnquiryForm from '@/components/shared/EnquiryForm';
import { communityChallenge, howItWorks } from '@/data/merchandise';
import styles from './CommunityInfoSection.module.css';

const awardColors = ['gold', 'blue', 'orange', 'green', 'red'];

export default function CommunityInfoSection({ fields }) {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <article className={styles.card}>
          <h2 className={styles.heading}>{howItWorks.title}</h2>
          <div className={styles.divider} />
          <div className={styles.options}>
            {howItWorks.options.map((option, index) => (
              <section className={styles.option} key={option.label}>
                <h3 className={styles.optionHeading}>
                  <span className={`${styles.badge} ${index === 0 ? styles.badgeOrange : styles.badgeBlue}`}>
                    Option {index + 1}
                  </span>
                  <span>{option.label}</span>
                </h3>
                <p className={styles.receive}>You receive:</p>
                <ul className={styles.checkList}>
                  {option.benefits.map((benefit) => (
                    <li key={benefit}>
                      <span className={styles.checkIcon}><Icon name="check" size={9} /></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </article>

        <article className={styles.card}>
          <h2 className={`${styles.heading} ${styles.challengeHeading}`}>
            <Icon name="trophy" size={14} /> {communityChallenge.title}
          </h2>
          <p className={styles.challengeSubtitle}>{communityChallenge.subtitle}</p>
          <div className={styles.divider} />
          <p className={styles.awardedLabel}>Awarded to</p>
          <ul className={styles.awards}>
            {communityChallenge.awards.map((award, index) => (
              <li key={award.label}>
                <Icon name={award.icon} size={12} className={styles[awardColors[index]]} />
                <span>{award.label}</span>
              </li>
            ))}
          </ul>
          <div className={styles.leaderboard} id="community-leaderboard">
            <div className={styles.tableHeader}>
              <span>Rank &amp; Community</span>
              <span>Participants</span>
            </div>
            <ol>
              {communityChallenge.rows.map(([community, participants], index) => (
                <li key={community} className={index === 0 ? styles.topRank : ''}>
                  <span className={`${styles.rank} ${index < 3 ? styles[`rank${index + 1}`] : ''}`}>{index + 1}</span>
                  <strong>{community}</strong>
                  <b>{participants}</b>
                </li>
              ))}
            </ol>
          </div>
          <Button href="#community-leaderboard" variant="ghost" className={styles.leaderboardButton}>
            View Full Leaderboard
          </Button>
        </article>

        <EnquiryForm
          id="community-form"
          type="community_register"
          title="Don't See Your Community?"
          intro="Ask Your Favorite Real Estate Community To Register"
          fields={fields}
          submitLabel="Recommend My Community"
          successMessage="Thank you! We will set up your community kit shortly."
          className={styles.communityForm}
        >
          <div className={styles.communityIcons} aria-hidden="true">
            <Icon name="building" size={24} className={styles.blueIcon} />
            <Icon name="house" size={26} className={styles.orangeIcon} />
            <Icon name="building" size={24} className={styles.blueIcon} />
          </div>
        </EnquiryForm>
      </div>
    </section>
  );
}
