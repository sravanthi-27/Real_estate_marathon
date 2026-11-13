'use client';
import { useMemo, useState } from 'react';
import Img from '@/components/ui/Img';
import SectionTitle from '@/components/ui/SectionTitle';
import EnquiryForm from '@/components/shared/EnquiryForm';
import { orderFormFields, products } from '@/data/merchandise';
import styles from './MerchStore.module.css';

/** Pick quantities, then send the order request. Payment for merchandise is arranged by the team after the order. */
export default function MerchStore() {
  const [qty, setQty] = useState({});
  const change = (id, d) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(10, (q[id] || 0) + d)) }));
  const items = useMemo(() => products.filter((p) => qty[p.id] > 0).map((p) => ({ id: p.id, name: p.name, qty: qty[p.id], price: p.price })), [qty]);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="card">
      <SectionTitle align="left" sub="Choose your gear, then send an order request.">Official Merchandise Store</SectionTitle>
      <div className={styles.grid}>
        {products.map((p) => (
          <article key={p.id} className={styles.item}>
            <Img src={p.src} alt={p.name} contain className={styles.img} />
            <strong>{p.name}</strong>
            <span className={styles.price}>Rs {p.price}</span>
            <div className={styles.qty}>
              <button onClick={() => change(p.id, -1)} aria-label={`Decrease ${p.name}`}>-</button>
              <span aria-live="polite">{qty[p.id] || 0}</span>
              <button onClick={() => change(p.id, 1)} aria-label={`Increase ${p.name}`}>+</button>
            </div>
          </article>
        ))}
      </div>
      {items.length > 0 ? (
        <div className={styles.order}>
          <p className={styles.total}>{items.reduce((s, i) => s + i.qty, 0)} items &middot; <strong>Rs {total}</strong></p>
          <EnquiryForm id="order-form" type="merch_order" title="Order request" fields={orderFormFields} submitLabel="Send order request" extraPayload={{ items, totalRs: total }} successMessage="Order request received! Our team will confirm availability and payment details." />
        </div>
      ) : <p className={styles.hint}>Add items to place an order request.</p>}
    </div>
  );
}
