'use client';
import { useState } from 'react';
import Link from 'next/link';
import Img from '@/components/ui/Img';
import Icon from '@/components/ui/Icon';
import { CONTACT, SOCIALS } from '@/config/site';
import { faqs } from '@/data/contact';
import { reasons } from '@/data/why';
import { images } from '@/config/images';
import styles from './ContactFollowupSection.module.css';

const faqItems = [
  { question: 'How do I register for the marathon?', answer: faqs[0].a },
  { question: 'Can my community participate?', link: '/register', linkText: 'Register your community' },
  { question: 'How can sponsors join the marathon?', link: '/sponsors', linkText: 'Explore sponsorship options' },
  { question: 'Where do I collect my race kit?', answer: faqs[2].a },
  { question: 'What merchandise is available?', link: '/merchandise', linkText: 'Explore event merchandise' },
  { question: 'How does the tree plantation initiative work?', answer: reasons.find((reason) => reason.title.includes('Green'))?.text },
];

const socialItems = [
  ...SOCIALS.map((social) => ({ ...social, enabled: social.href !== '#' })),
  { label: 'WhatsApp', icon: 'message', href: `https://wa.me/${CONTACT.whatsapp}`, enabled: Boolean(CONTACT.whatsapp) },
];

export default function ContactFollowupSection() {
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    <section className={styles.section} aria-label="Social, FAQs and support">
      <div className={styles.grid}>
        <article className={`${styles.card} ${styles.socialCard}`}>
          <h2 className={styles.title}>Follow Us &amp; Stay Connected</h2>
          <p className={styles.subtitle}>Get the latest updates, news and announcements.</p>
          <div className={styles.socials}>
            {socialItems.map(({ label, icon, href, enabled }) => {
              const content = (
                <>
                  <span className={`${styles.socialIcon} ${styles[label.toLowerCase()]}`}><Icon name={icon} size={13} /></span>
                  <span className={styles.socialLabel}>{label}</span>
                </>
              );
              return enabled
                ? <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{content}</a>
                : <span key={label} className={styles.unavailableSocial} aria-label={`${label} profile not configured`}>{content}</span>;
            })}
          </div>
          <Img src={images.contact.skyline} alt="Hyderabad skyline featuring Charminar" contain className={styles.skyline} />
        </article>

        <article className={`${styles.card} ${styles.faqCard}`}>
          <h2 className={`${styles.title} ${styles.leftTitle}`}>Quick FAQ Access</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div className={styles.faqItem} key={item.question}>
                  <button type="button" className={styles.question} aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? -1 : index)}>
                    <span>{item.question}</span>
                    <Icon name="chevron-right" size={11} className={styles.chevron} />
                  </button>
                  <div className={`${styles.answer} ${isOpen ? styles.answerOpen : ''}`} aria-hidden={!isOpen}>
                    <div className={styles.answerContent}>
                      {item.answer && <p>{item.answer}</p>}
                      {item.link && <Link href={item.link}>{item.linkText}</Link>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/contact#contact-form" className={styles.viewFaq}>View All FAQs</Link>
        </article>

        <div className={styles.supportColumn}>
          <article className={`${styles.card} ${styles.supportCard}`}>
            <span className={`${styles.supportIcon} ${styles.chatIcon}`}><Icon name="messages-square" size={15} /></span>
            <h2 className={styles.supportTitle}>Live Chat Support</h2>
            <p className={styles.subtitle}>Our team is online and ready to help you!</p>
            <Link href="/contact#contact-form" className={styles.chatButton}>Start Live Chat <Icon name="message" size={10} /></Link>
          </article>
          <article className={`${styles.card} ${styles.supportCard}`}>
            <span className={`${styles.supportIcon} ${styles.whatsappIcon}`}><Icon name="message" size={15} /></span>
            <h2 className={styles.supportTitle}>WhatsApp Support</h2>
            <p className={styles.subtitle}>Chat with us on WhatsApp for quick assistance.</p>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}>Chat on WhatsApp <Icon name="message" size={10} /></a>
          </article>
        </div>
      </div>
    </section>
  );
}
