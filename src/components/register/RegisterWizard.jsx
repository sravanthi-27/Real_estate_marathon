'use client';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Stepper from './Stepper';
import ParticipantStep from './steps/ParticipantStep';
import FamilyStep from './steps/FamilyStep';
import CommunityStep from './steps/CommunityStep';
import MedicalStep from './steps/MedicalStep';
import RunningStep from './steps/RunningStep';
import ReviewPayStep from './steps/ReviewPayStep';
import { useRegistration } from './RegistrationProvider';
import { STEPS } from '@/config/registration';
import { medicalContactSchema, STEP_SCHEMAS } from '@/lib/validation/registration';
import { validate } from '@/lib/validation/utils';
import styles from './RegisterWizard.module.css';

const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
const scrollToError = () => requestAnimationFrame(() => document.querySelector('[role="alert"]')?.scrollIntoView({ block: 'center', behavior: 'smooth' }));

export default function RegisterWizard() {
  const { data, update, hydrated } = useRegistration();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});

  const def = STEPS[step];
  const cfg = STEP_SCHEMAS[def.id];
  const slice = cfg ? data[cfg.slice] : null;

  // Once errors are showing, keep them in sync as the user fixes fields.
  useEffect(() => {
    if (!cfg || Object.keys(errors).length === 0) return;
    const updatedErrors = validate(cfg.schema, slice).errors;
    if (def.id === 'medical') Object.assign(updatedErrors, validate(medicalContactSchema, data.personal).errors);
    setErrors(updatedErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slice, data.personal]);

  const goTo = (i) => { setErrors({}); setStep(i); scrollTop(); };

  function next() {
    if (def.id === 'medical') {
      const contacts = validate(medicalContactSchema, data.personal);
      if (!contacts.ok) { setErrors(contacts.errors); scrollToError(); return; }
    }
    if (cfg) {
      const res = validate(cfg.schema, slice);
      if (!res.ok) { setErrors(res.errors); scrollToError(); return; }
    }
    goTo(Math.min(step + 1, STEPS.length - 1));
  }

  function skipCommunity() {
    update('community', { skip: true });
    goTo(step + 1);
  }

  if (!hydrated) return <div className={`container ${styles.loading}`}>Loading your registration...</div>;

  return (
    <section className="section">
      <div className="container">
        <Stepper current={step} onSelect={goTo} />
        <div className={`card ${styles.card}`}>
          {def.id === 'participant' && <ParticipantStep errors={errors} />}
          {def.id === 'family' && <FamilyStep errors={errors} />}
          {def.id === 'community' && <CommunityStep errors={errors} onSkip={skipCommunity} onBack={() => goTo(step - 1)} onContinue={next} />}
          {def.id === 'medical' && <MedicalStep errors={errors} onBack={() => goTo(step - 1)} onContinue={next} />}
          {def.id === 'running' && <RunningStep errors={errors} onBack={() => goTo(step - 1)} onContinue={next} />}
          {def.id === 'review' && <ReviewPayStep goToStep={goTo} onBack={() => goTo(step - 1)} />}

          {def.id !== 'review' && def.id !== 'community' && def.id !== 'medical' && def.id !== 'running' && (
            <footer className={styles.footer}>
              {step > 0 ? <Button variant="ghost" onClick={() => goTo(step - 1)}><Icon name="chevron-left" size={16} /> Back</Button> : <span />}
              <span className={styles.progress}>Step {step + 1} of {STEPS.length} &middot; Fields marked * are required</span>
              <Button onClick={next}>Save &amp; continue <Icon name="arrow-right" size={16} /></Button>
            </footer>
          )}
        </div>
      </div>
    </section>
  );
}
