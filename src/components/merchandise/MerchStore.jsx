'use client';
import { useMemo, useState } from 'react';
import Img from '@/components/ui/Img';
import EnquiryForm from '@/components/shared/EnquiryForm';
import { orderFormFields, products } from '@/data/merchandise';
import styles from './MerchStore.module.css';

const catalog = {
  'tee-white': { name: 'Official T-Shirt', price: 699 },
  cap: { name: 'Running Cap', price: 299 },
  bag: { name: 'Sports Bag', price: 799 },
  bottle: { name: 'Water Bottle', price: 399 },
  medal: { name: 'Medal Replica', price: 499 },
  mug: { name: 'Coffee Mug', price: 499 },
};
const displayProducts = products.map((product) => ({ ...product, ...catalog[product.id] }));

export default function MerchStore() {
  const [qty, setQty] = useState({});
  const addToOrder = (id) => {
    setQty((current) => ({ ...current, [id]: Math.min(10, (current[id] || 0) + 1) }));
    window.setTimeout(() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
  };
  const items = useMemo(
    () => displayProducts.filter((product) => qty[product.id] > 0).map((product) => ({ id: product.id, name: product.name, qty: qty[product.id], price: product.price })),
    [displayProducts, qty],
  );
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <section className={`card ${styles.panel}`} aria-labelledby="merch-store-heading">
      <header className={styles.header}>
        <h2 id="merch-store-heading">Official Merchandise Store</h2>
        <p>Shop Official Real Estate Marathon Collection</p>
      </header>
      <div className={styles.grid}>
        {displayProducts.map((p) => (
          <article key={p.id} className={styles.item}>
            <Img src={p.src} alt={p.name} contain className={styles.img} />
            <strong>{p.name}</strong>
            <span className={styles.price}>₹{p.price}</span>
            <button type="button" className={styles.shopButton} onClick={() => addToOrder(p.id)}>Shop Now</button>
          </article>
        ))}
      </div>
      {items.length > 0 ? (
        <div className={styles.order}>
          <p className={styles.total}>{items.reduce((s, i) => s + i.qty, 0)} items &middot; <strong>Rs {total}</strong></p>
          <EnquiryForm id="order-form" type="merch_order" title="Order request" fields={orderFormFields} submitLabel="Send order request" extraPayload={{ items, totalRs: total }} successMessage="Order request received! Our team will confirm availability and payment details." />
        </div>
      ) : null}
    </section>
  );
}
