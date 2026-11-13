import { Suspense } from 'react';
import ConfirmationView from '@/components/register/ConfirmationView';

export const metadata = { title: 'Registration Confirmation' };

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationView />
    </Suspense>
  );
}
