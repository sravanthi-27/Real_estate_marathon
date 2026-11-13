'use client';
import Select from '@/components/ui/form/Select';
import { BANKS } from '@/config/registration';
import styles from './steps.module.css';

/** Method-specific hint panel. Card / bank details are entered on the gateway - we never handle them. */
export default function PaymentPanel({ method, bank, onBank }) {
  if (method === 'upi') {
    return (
      <div className={styles.panel}>
        <p><strong>Pay with any UPI app.</strong> Scan the QR code or approve the request on the secure checkout.</p>
        <div className={styles.apps}>{['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map((a) => <span key={a} className={styles.app}>{a}</span>)}</div>
      </div>
    );
  }
  if (method === 'card') {
    return (
      <div className={styles.panel}>
        <p><strong>Credit / debit card.</strong> You will enter your card details on the secure payment gateway.</p>
        <p>We never see or store your card number.</p>
      </div>
    );
  }
  return (
    <div className={styles.panel}>
      <p><strong>Net banking.</strong> Choose your bank (optional) - you will log in on your bank&apos;s secure page.</p>
      <Select value={bank} onChange={onBank} options={BANKS} searchable searchPlaceholder="Search bank..." placeholder="Select bank (optional)" />
    </div>
  );
}
