import { images } from '@/config/images';
import { CONTACT, EVENT } from '@/config/site';

export const quickContacts = [
  { icon: 'users', title: 'Event Queries', value: CONTACT.email },
  { icon: 'phone', title: 'Registration Support', value: CONTACT.phone },
  { icon: 'handshake', title: 'Sponsorship Enquiries', value: CONTACT.email },
  { icon: 'building', title: 'Expo & Exhibitors', value: CONTACT.email },
];

export const eventSnapshot = {
  title: 'Event Snapshot',
  rows: [
    { label: 'Event', value: "World's First Real Estate Marathon" },
    { label: 'Date', value: 'Coming Soon' },
    { label: 'Time', value: EVENT.timeLabel },
    { label: 'Venue', value: EVENT.venue },
    { label: 'Categories', value: '3K / 5K / 10K / 21K' },
    { label: 'Registration', value: 'Rs 99 per family' },
  ],
};

export const helpTopics = [
  { icon: 'ticket', title: 'Participant Registration' },
  { icon: 'handshake', title: 'Sponsorship Opportunities' },
  { icon: 'store', title: 'Expo Stall Booking' },
  { icon: 'users', title: 'Community Participation' },
  { icon: 'shirt', title: 'Merchandise Orders' },
  { icon: 'tree', title: 'Plantation Partnerships' },
  { icon: 'megaphone', title: 'Media & Press' },
  { icon: 'message', title: 'General Queries' },
];

export const organizers = ['Organizer 1', 'Organizer 2', 'Organizer 3', 'Organizer 4', 'Organizer 5', 'Organizer 6']
  .map((name, i) => ({ name, role: 'Committee Member', src: images.contact.organizers[i] }));

export const departments = [
  { icon: 'ticket', title: 'Participant Support', value: CONTACT.email },
  { icon: 'handshake', title: 'Sponsorship Team', value: CONTACT.email },
  { icon: 'store', title: 'Expo Desk', value: CONTACT.email },
  { icon: 'users', title: 'Community Partnerships', value: CONTACT.email },
  { icon: 'megaphone', title: 'Media Desk', value: CONTACT.email },
];

export const contactFormFields = [
  { name: 'name', label: 'Full name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Mobile', type: 'tel' },
  { name: 'subject', label: 'Subject', type: 'select', options: helpTopics.map((h) => h.title), required: true },
  { name: 'message', label: 'Message', type: 'textarea', span: 2, required: true },
];

export const volunteer = {
  title: 'Become a Marathon Volunteer',
  points: ['Registration & bib desk', 'Hydration points', 'Route marshals', 'Expo & hospitality', 'Medical assistance support'],
  fields: [
    { name: 'name', label: 'Full name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Mobile', type: 'tel', required: true },
    { name: 'area', label: 'Preferred area', type: 'select', options: ['Registration', 'Hydration', 'Route marshal', 'Expo', 'Medical support'] },
  ],
};

export const faqs = [
  { q: 'How do I register?', a: 'Click Register Now, fill in the 6 short steps and pay Rs 99 per family.' },
  { q: 'Can I run with my family?', a: 'Yes. The Family Squad Pass covers up to 5 family members.' },
  { q: 'When and where do I collect my race kit?', a: 'Kit collection details are shared on your confirmation page and by email before race day.' },
  { q: 'Is there a refund policy?', a: 'Registrations are non-refundable but transferable. Write to us for help.' },
  { q: 'Is the event safe for beginners?', a: 'Absolutely. The 3K and 5K categories are designed for beginners and families.' },
];
