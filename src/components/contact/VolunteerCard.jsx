import Img from '@/components/ui/Img';
import EnquiryForm from '@/components/shared/EnquiryForm';
import { volunteer } from '@/data/contact';
import { images } from '@/config/images';
import styles from './VolunteerCard.module.css';

export default function VolunteerCard() {
  return (
    <div className="card">
      <h2 className="card__title">{volunteer.title}</h2>
      <div className={styles.top}>
        <ul className={styles.list}>{volunteer.points.map((p) => <li key={p}>&#10003; {p}</li>)}</ul>
        <Img src={images.contact.volunteer} alt="Volunteers" className={styles.img} />
      </div>
      <EnquiryForm id="volunteer-form" type="volunteer" fields={volunteer.fields} submitLabel="Join the volunteer team" successMessage="Thank you for volunteering! We will contact you soon." />
    </div>
  );
}
