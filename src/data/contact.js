import { images } from '@/config/images';

export const eventSnapshot = {
  title: 'Event Snapshot',
  rows: [
    { icon: 'activity', label: 'Event', value: "World's First Real Estate Marathon" },
    { icon: 'route', label: 'Distance', value: '10 KM' },
    { icon: 'map-pin', label: 'Venue', value: 'Gachibowli Stadium' },
    { icon: 'route', label: 'Route', value: 'Gachibowli → Financial District → Gachibowli' },
    { icon: 'users', label: 'Participants', value: '10,000+', emphasis: true },
    { icon: 'building', label: 'Communities', value: '250+' },
    { icon: 'building', label: 'Companies', value: '100+' },
    { icon: 'handshake', label: 'Sponsors', value: '50+' },
    { icon: 'tree', label: 'Trees Planned', value: '10,000+', emphasis: true, green: true },
  ],
};

export const helpTopics = [
  { title: 'Participant Registration', image: images.contact.serviceIcons.participantRegistration },
  { title: 'Community Registration', image: images.contact.serviceIcons.communityRegistration },
  { title: 'Sponsor Partnership', image: images.contact.serviceIcons.sponsorPartnership },
  { title: 'Expo Stall Booking', image: images.contact.serviceIcons.expoStallBooking },
  { title: 'Merchandise Orders', image: images.contact.serviceIcons.merchandiseOrders },
  { title: 'Media Partnership', image: images.contact.serviceIcons.mediaPartnership },
  { title: 'Volunteers', image: images.contact.serviceIcons.volunteers },
  { title: 'Emergency Support', image: images.contact.serviceIcons.emergencySupport },
];

const organizerProfiles = [
  { name: 'Chief Patron', role: 'Leading the vision, inspiring the change.' },
  { name: 'Event Chairman', role: 'Driving purpose, building connections.' },
  { name: 'Event Director', role: 'Planning today, transforming tomorrow.' },
  { name: 'Race Director', role: 'On the track, for an unforgettable race.' },
  { name: 'Advisory Board', role: 'Guiding the path towards excellence.' },
  { name: 'Advisory Board', role: 'Guiding the path towards excellence.' },
];

export const organizers = images.contact.organizers.map((src, i) => ({
  ...organizerProfiles[i],
  id: `organizer-${i + 1}`,
  src,
}));

export const departments = [
  { icon: 'headset', title: 'Participant Support', phone: '+91 98765 43211', email: 'participant@realestatejobs.co.in', tone: 'participant' },
  { icon: 'handshake', title: 'Sponsorship Desk', phone: '+91 98765 43212', email: 'sponsors@realestatejobs.co.in', tone: 'sponsorship' },
  { icon: 'store', title: 'Expo Sales', phone: '+91 98765 43213', email: 'expo@realestatejobs.co.in', tone: 'expo' },
  { icon: 'network', title: 'Community Partnerships', phone: '+91 98765 43214', email: 'communities@realestatejobs.co.in', tone: 'community' },
  { icon: 'shirt', title: 'Merchandise Support', phone: '+91 98765 43215', email: 'merchandise@realestatejobs.co.in', tone: 'merchandise' },
  { icon: 'megaphone', title: 'Media & PR', phone: '+91 98765 43216', email: 'media@realestatejobs.co.in', tone: 'media' },
];

export const contactFormFields = [
  { name: 'name', label: '', placeholder: 'Your Name', required: true },
  { name: 'phone', label: '', placeholder: 'Mobile Number', type: 'tel', required: true },
  { name: 'email', label: '', placeholder: 'Email Address', type: 'email', required: true },
  { name: 'subject', label: '', placeholder: 'Select Category', type: 'select', options: helpTopics.map((h) => h.title), required: true, span: 2 },
  { name: 'message', label: '', placeholder: 'Message / Enquiry', type: 'textarea', span: 2, required: true },
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
