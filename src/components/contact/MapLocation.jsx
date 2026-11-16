'use client';
import { useState } from 'react';
import { CONTACT, EVENT } from '@/config/site';
import { images } from '@/config/images';
import Icon from '@/components/ui/Icon';
import Img from '@/components/ui/Img';
import styles from './MapLocation.module.css';

const destination = encodeURIComponent(CONTACT.address);
const googleDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
const appleMapsUrl = `https://maps.apple.com/?daddr=${destination}`;
export default function MapLocation() {
  const [shareMessage, setShareMessage] = useState('');

  async function shareLocation() {
    try {
      if (navigator.share) {
        await navigator.share({ title: EVENT.venue, text: CONTACT.address, url: googleDirectionsUrl });
        setShareMessage('');
        return;
      }

      await navigator.clipboard.writeText(googleDirectionsUrl);
      setShareMessage('Location link copied.');
    } catch (error) {
      if (error.name === 'AbortError') return;
      try {
        await navigator.clipboard.writeText(googleDirectionsUrl);
        setShareMessage('Location link copied.');
      } catch {
        setShareMessage('Unable to share the location. Please try again.');
      }
    }
  }

  return (
    <div className={`card ${styles.locationCard}`}>
      <h2 className={`card__title ${styles.title}`}>Our Location</h2>
      <Img src={images.contact.map} alt="Street map showing Gachibowli Stadium and surrounding Hyderabad roads" className={styles.map} />
      <div className={styles.actions}>
        <a className={styles.action} href={googleDirectionsUrl} target="_blank" rel="noopener noreferrer">
          <Icon name="map-pin" size={15} />
          <span><strong>Navigate</strong><small>(Via Google Maps)</small></span>
        </a>
        <a className={styles.action} href={appleMapsUrl} target="_blank" rel="noopener noreferrer">
          <Icon name="compass" size={15} />
          <span><strong>Open In</strong><small>Apple Maps</small></span>
        </a>
        <button className={styles.action} type="button" onClick={shareLocation}>
          <Icon name="share" size={14} />
          <span><strong>Share</strong><small>Location</small></span>
        </button>
      </div>
      {shareMessage && <p className={styles.shareMessage} role="status">{shareMessage}</p>}
    </div>
  );
}
