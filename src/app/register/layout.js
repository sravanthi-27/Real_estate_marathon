import { RegistrationProvider } from '@/components/register/RegistrationProvider';
import EventBanner from '@/components/register/EventBanner';

export const metadata = { title: 'Register' };

export default function RegisterLayout({ children }) {
  return (
    <RegistrationProvider>
      <EventBanner />
      {children}
    </RegistrationProvider>
  );
}
