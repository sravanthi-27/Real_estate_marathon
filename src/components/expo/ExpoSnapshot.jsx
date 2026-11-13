import InfoCard from '@/components/shared/InfoCard';
import Button from '@/components/ui/Button';
import { expoSnapshot } from '@/data/expo';

/** Right-hand card in the Expo hero. */
export default function ExpoSnapshot() {
  return (
    <div className="stack" style={{ minWidth: 280 }}>
      <InfoCard title={expoSnapshot.title} items={expoSnapshot.items} />
      <InfoCard dark title="Who can attend?" items={expoSnapshot.attendees}>
        <div style={{ marginTop: '.8rem' }}><Button href="/register" size="sm">Register to visit</Button></div>
      </InfoCard>
    </div>
  );
}
