'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Checkbox from '@/components/ui/form/Checkbox';
import Field from '@/components/ui/form/Field';
import RadioCards from '@/components/ui/form/RadioCards';
import FormSection from '@/components/ui/form/FormSection';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import PaymentPanel from './PaymentPanel';
import { useRegistration } from '../RegistrationProvider';
import { CATEGORIES, COMMUNITY_OTHER, PAYMENT_METHODS, STEPS } from '@/config/registration';
import { SITE } from '@/config/site';
import { buildFees } from '@/lib/pricing';
import { formatDate, formatINR } from '@/lib/utils';
import { createRegistrationSchema, declarationsSchema, STEP_SCHEMAS } from '@/lib/validation/registration';
import { validate } from '@/lib/validation/utils';
import { apiPost } from '@/lib/api/client';
import { openRazorpay } from '@/lib/api/razorpay';
import styles from './steps.module.css';

export default function ReviewPayStep({ goToStep, onBack }) {
  const router = useRouter();
  const { data, update, setField } = useRegistration();
  const [declErrors, setDeclErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const { personal: p, family, community: c, medical, declarations } = data;
  const cat = CATEGORIES.find((x) => x.id === p.category);
  const fees = buildFees({ category: p.category, familyCount: family.members.length });
  const communityName = c.skip ? 'Individual runner' : (c.communityName === COMMUNITY_OTHER ? c.customCommunityName : c.communityName);
  const stepIndex = (id) => STEPS.findIndex((s) => s.id === id);

  function setDecl(patch) { update('declarations', patch); setDeclErrors({}); }

  async function pay() {
    setError('');
    // 1) re-validate everything; jump to the first step with a problem
    for (const [stepId, cfg] of Object.entries(STEP_SCHEMAS)) {
      if (!validate(cfg.schema, data[cfg.slice]).ok) { setError('Some details are missing or invalid. Please review that step.'); goToStep(stepIndex(stepId)); return; }
    }
    const decl = validate(declarationsSchema, declarations);
    if (!decl.ok) { setDeclErrors(decl.errors); return; }
    const full = validate(createRegistrationSchema, { personal: p, family, community: c, medical, running: data.running, declarations });
    if (!full.ok) { setError('Please review your details and try again.'); return; }

    setBusy(true);
    try {
      // 2) create the registration once; reuse it when retrying a failed payment
      let sub = data.submission;
      if (!sub) {
        sub = await apiPost('/api/registrations', full.data);
        setField('submission', sub);
      }
      // 3) start payment
      const order = await apiPost('/api/payments/create', { registrationId: sub.id, token: sub.token, method: data.paymentMethod });
      let result;
      if (order.provider === 'razorpay') {
        result = await openRazorpay({
          keyId: order.keyId, orderId: order.orderId, amountPaise: order.amountPaise, currency: order.currency,
          name: SITE.name, description: `Registration ${order.reference}`, method: data.paymentMethod, bank: data.bank || undefined,
          prefill: { name: p.fullName, email: p.email, contact: p.mobile },
        });
      } else {
        result = { orderId: order.orderId, paymentId: `demo_pay_${Date.now()}`, signature: 'demo' }; // demo mode: no real money
      }
      // 4) verify on the server, then go to the confirmation page
      await apiPost('/api/payments/verify', { registrationId: sub.id, token: sub.token, ...result });
      router.push(`/register/confirmation?ref=${encodeURIComponent(sub.reference)}&t=${encodeURIComponent(sub.token)}`);
    } catch (e) {
      setError(e.message || 'Payment could not be completed.');
      setBusy(false);
    }
  }

  return (
    <div>
      <h2 className={styles.title}>Registration Review & Payment</h2>
      <p className={styles.sub}>Verify your participant details, confirm mandatory declarations and complete payment.</p>

      <FormSection number={1} title="Registration summary">
        <div className={styles.summary}>
          <div className={styles.sumCard}>
            <h4>Primary runner <button type="button" className={styles.link} onClick={() => goToStep(0)}>Edit</button></h4>
            <strong>{p.fullName}</strong>
            <p>{cat?.label} &middot; Size {p.tshirtSize}</p>
            <p>DOB {formatDate(p.dob)} &middot; {p.bloodGroup}</p>
            <p>{p.mobile} &middot; {p.email}</p>
          </div>
          <div className={styles.sumCard}>
            <h4>Family members ({family.members.length}) <button type="button" className={styles.link} onClick={() => goToStep(1)}>Edit</button></h4>
            {family.members.length === 0 ? <p>No family members added</p> : family.members.map((m) => <p key={m.id}><strong style={{ display: 'inline' }}>{m.fullName}</strong> - {CATEGORIES.find((x) => x.id === m.category)?.short}</p>)}
          </div>
          <div className={styles.sumCard}>
            <h4>Society / community <button type="button" className={styles.link} onClick={() => goToStep(2)}>Edit</button></h4>
            <strong>{communityName || '-'}</strong>
            {!c.skip && <p>{[c.tower, c.flatNumber, c.locality].filter(Boolean).join(', ')}</p>}
          </div>
        </div>
        <div className={`${styles.banner} ${styles.green}`}>
          <Icon name="stethoscope" size={18} />
          <span><strong>Emergency contact:</strong> {p.emergencyName} ({p.emergencyRelationship}) &middot; {p.emergencyMobile}. <button type="button" className={styles.link} onClick={() => goToStep(3)}>Modify medical</button></span>
        </div>
      </FormSection>

      <FormSection number={2} title="Mandatory declarations & event rules">
        <div className="stack">
          <Field error={declErrors.medical}>
            <Checkbox id="decl-medical" checked={declarations.medical} onChange={(v) => setDecl({ medical: v })}>
              <strong>Medical fitness &amp; assumption of risk.</strong> I declare that I and my registered family members are medically fit to participate, that the information provided is accurate, and that we participate at our own risk.
            </Checkbox>
          </Field>
          <Field error={declErrors.indemnity}>
            <Checkbox id="decl-indemnity" checked={declarations.indemnity} onChange={(v) => setDecl({ indemnity: v })}>
              <strong>Organizer &amp; sponsor indemnity.</strong> I release the organizers, sponsors and partners from liability for any injury, loss or damage arising from participation, and agree to follow the event rules.
            </Checkbox>
          </Field>
        </div>
      </FormSection>

      <div className={styles.payGrid}>
        <FormSection number={3} title="Fee summary">
          <table className={styles.fees}>
            <tbody>
              {fees.lines.map((l) => <tr key={l.key}><td>{l.label}</td><td>{l.amountPaise ? formatINR(l.amountPaise) : l.note}</td></tr>)}
              <tr className={styles.total}><td>Total payable</td><td>{formatINR(fees.totalPaise)}</td></tr>
            </tbody>
          </table>
        </FormSection>
        <FormSection number={4} title="Select payment option">
          <RadioCards label="Payment method" value={data.paymentMethod} onChange={(v) => setField('paymentMethod', v)} options={PAYMENT_METHODS} />
          <PaymentPanel method={data.paymentMethod} bank={data.bank} onBank={(v) => setField('bank', v)} />
        </FormSection>
      </div>

      {error && <p className={styles.err} role="alert"><Icon name="alert" size={16} /> {error}</p>}

      <footer className={styles.payFooter}>
        <Button variant="ghost" onClick={onBack} disabled={busy}><Icon name="chevron-left" size={16} /> Back</Button>
        <span className={styles.secure}><Icon name="lock" size={12} /> Secure payment &middot; Step 6 of 6</span>
        <Button onClick={pay} disabled={busy}>{busy ? <><Icon name="loader" size={16} className="spin" /> Processing...</> : `Pay ${formatINR(fees.totalPaise)} & confirm registration`}</Button>
      </footer>
    </div>
  );
}
