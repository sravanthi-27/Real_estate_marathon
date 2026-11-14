import Img from '@/components/ui/Img';
import { CONTACT, EVENT } from '@/config/site';
import { images } from '@/config/images';
import styles from './MapLocation.module.css';

/** Shows a Google Maps embed when NEXT_PUBLIC_MAP_EMBED_URL is set, otherwise the static map image. */
export default function MapLocation() {
  return (
    <div className="card">
      <h2 className="card__title">Event Location</h2>
      {EVENT.mapEmbedUrl
        ? <iframe title="Event location map" src={EVENT.mapEmbedUrl} className={styles.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        : <a className={styles.mapLink} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`} target="_blank" rel="noopener noreferrer" aria-label="Open Gachibowli Stadium in Google Maps">
            <Img src={images.contact.map} alt="Hyderabad city illustration" className={styles.map} />
            <span>View Gachibowli Stadium on Google Maps</span>
          </a>}
      <p className={styles.addr}>{CONTACT.address}</p>
    </div>
  );
}
