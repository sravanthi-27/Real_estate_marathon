'use client';

import { useRef } from 'react';
import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import EnquiryForm from '@/components/shared/EnquiryForm';
import { corporateKits, limitedEdition } from '@/data/merchandise';
import { images } from '@/config/images';
import styles from './CorporateAndLimited.module.css';

const corporateFields = [
  { name: 'name', label: 'Your name', required: true },
  { name: 'organisation', label: 'Company', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'quantity', label: 'Quantity', type: 'select', options: ['25-50', '51-100', '101-250', '250+'], required: true },
];

export function CorporateKits() {
  const dialogRef = useRef(null);

  return (
    <section className={`card ${styles.card}`} aria-labelledby="corporate-kits-heading">
      <header className={styles.header}>
        <h2 id="corporate-kits-heading">{corporateKits.title}</h2>
        <p>{corporateKits.subtitle}</p>
      </header>
      <div className={styles.corporateContent}>
        <div className={styles.pair}>
          <figure>
            <Img src={images.merchandise.corporateFront} alt="Corporate running kit, front view" contain className={styles.shirt} />
            <figcaption>Front View</figcaption>
          </figure>
          <figure>
            <Img src={images.merchandise.corporateBack} alt="Corporate running kit, back view" contain className={styles.shirt} />
            <figcaption>Back View</figcaption>
          </figure>
        </div>
        <ul className={styles.points}>
          {corporateKits.points.map((point) => (
            <li key={point}><Icon name="check-circle" size={11} />{point}</li>
          ))}
        </ul>
      </div>
      <div className={styles.minimumRow}>
        <p className={styles.min}>{corporateKits.minimum} <strong>50 Kits</strong></p>
        <button type="button" className={styles.quoteButton} onClick={() => dialogRef.current?.showModal()}>
          Request Quotation
        </button>
      </div>
      <dialog ref={dialogRef} className={styles.dialog} aria-label="Request a corporate kit quotation" onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}>
        <button type="button" className={styles.closeButton} aria-label="Close quotation form" onClick={() => dialogRef.current?.close()}>
          <Icon name="x" size={18} />
        </button>
        <EnquiryForm
          id="corporate-form"
          type="corporate_kit"
          title="Request a Corporate Kit Quotation"
          fields={corporateFields}
          submitLabel="Request quote"
          successMessage="Thank you! We will send a quote shortly."
          className={styles.modalForm}
        />
      </dialog>
    </section>
  );
}

export function LimitedEdition() {
  return (
    <section className={`card ${styles.card}`} aria-labelledby="limited-edition-heading">
      <header className={styles.header}>
        <h2 id="limited-edition-heading">{limitedEdition.title}</h2>
        <p>{limitedEdition.subtitle}</p>
      </header>
      <div className={styles.limitedContent}>
        <div className={styles.landmarks}>
          {limitedEdition.items.map((item) => (
            <figure key={item.name}>
              <Img src={item.src} alt="" contain className={styles.landmark} />
              <figcaption>{item.name}</figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.showcase} aria-label="Hyderabad collection merchandise">
          <Img src={images.merchandise.showcaseJersey} alt="Hyderabad collection running jersey" contain className={styles.showcaseJersey} />
          <Img src={images.merchandise.showcaseCap} alt="Hyderabad collection running cap" contain className={styles.showcaseCap} />
          <Img src={images.merchandise.showcaseMedal} alt="Hyderabad collection marathon medal" contain className={styles.showcaseMedal} />
        </div>
      </div>
      <div className={styles.available}>
        <span className={styles.availableTitle}>Available On:</span>
        <ul className={styles.categories}>
          <li><Icon name="shirt" size={11} />Jerseys</li>
          <li><Icon name="cap" size={11} />Caps</li>
          <li><Icon name="mug" size={11} />Mugs</li>
          <li><Icon name="shopping-bag" size={11} />Bags</li>
          <li><Icon name="medal" size={11} />Collectibles</li>
        </ul>
      </div>
    </section>
  );
}
