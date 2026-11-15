'use client';

import { useRef } from 'react';
import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import EnquiryForm from '@/components/shared/EnquiryForm';
import { images } from '@/config/images';
import { kitSponsorFields, kitTiers } from '@/data/merchandise';
import styles from './KitTiers.module.css';

const benefits = [
  ['Logo On Kits', 'Branding At Marathon', 'Recognition On Website'],
  ['Social Media Mentions', 'Community Wellness Branding'],
];

export default function KitTiers() {
  const dialogRef = useRef(null);

  function openForm() {
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }

  return (
    <section className={`card ${styles.panel}`} aria-labelledby="kit-sponsor-heading">
      <header className={styles.header}>
        <h2 id="kit-sponsor-heading">Sponsor a Community Kit</h2>
        <p>Real Estate Companies Can Sponsor Community Kits</p>
      </header>
      <div className={styles.grid}>
        {kitTiers.map((tier) => (
          <article key={tier.name} className={`${styles.tier} ${styles[tier.tone]}`}>
            <strong className={styles.tierName}>{tier.name}</strong>
            <span className={styles.partner}>Community Partner</span>
            <Img src={images.merchandise.products[4]} alt="" className={styles.medal} />
            <strong className={styles.quantity}>{tier.kits}</strong>
            <span className={styles.kitsLabel}>Kits</span>
          </article>
        ))}
      </div>
      <div className={styles.benefits}>
        <h3>Benefits Include:</h3>
        {benefits.map((row, index) => (
          <ul key={index}>
            {row.map((benefit) => (
              <li key={benefit}><Icon name="check-circle" size={12} />{benefit}</li>
            ))}
          </ul>
        ))}
      </div>
      <button id="kit-sponsor-cta" type="button" className={styles.sponsorButton} onClick={openForm}>
        Sponsor Community Kits
      </button>
      <dialog ref={dialogRef} id="kit-sponsor-dialog" className={styles.dialog} aria-label="Sponsor a Community Kit" onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}>
        <button type="button" className={styles.closeButton} aria-label="Close sponsor form" onClick={() => dialogRef.current?.close()}>
          <Icon name="x" size={18} />
        </button>
        <EnquiryForm
          id="kit-sponsor-form"
          type="kit_sponsor"
          title="Sponsor a Community Kit"
          fields={kitSponsorFields}
          submitLabel="Sponsor community kits"
          successMessage="Thank you! We will reach out with sponsorship details."
          className={styles.modalForm}
        />
      </dialog>
    </section>
  );
}
