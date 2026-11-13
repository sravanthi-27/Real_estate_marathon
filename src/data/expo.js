import { images } from '@/config/images';

export const expoSnapshot = {
  title: 'Real Estate Expo 2026',
  items: [
    { label: 'Date', value: 'Coming Soon' },
    { label: 'Timings', value: '9:00 AM - 7:00 PM' },
    { label: 'Venue', value: 'Gachibowli Stadium, Hyderabad' },
  ],
  attendees: ['Homebuyers & investors', 'Developers & builders', 'Home loan providers', 'Interior & design firms'],
};

export const aboutExpo = {
  title: 'About the Real Estate Expo',
  text: 'The Real Estate Expo is a premier showcase of projects, innovations and opportunities from across the property ecosystem - held alongside the marathon so runners, families and industry meet in one place.',
  features: [
    { icon: 'users', title: 'Visit & Network' },
    { icon: 'building', title: 'Discover Projects' },
    { icon: 'trending-up', title: 'Investment Opportunities' },
    { icon: 'lightbulb', title: 'Tech & Innovation' },
    { icon: 'handshake', title: 'Business Collaboration' },
    { icon: 'award', title: 'Learn & Grow' },
  ],
};

export const whyExhibit = {
  title: 'Why Exhibit?',
  points: ['Showcase projects to 10,000+ visitors', 'Generate qualified buyer leads', 'Launch and promote new projects', 'Connect with partners and channel networks', 'Boost brand awareness'],
  image: images.expo.whyExhibit,
};

export const expoHighlights = {
  title: 'Expo Highlights',
  items: [
    { icon: 'store', title: '100+ Stalls' },
    { icon: 'banknote', title: 'Exclusive Offers' },
    { icon: 'users', title: 'Panel Talks' },
    { icon: 'building', title: 'Product Launches' },
    { icon: 'ticket', title: 'Live Projects' },
    { icon: 'handshake', title: 'Vendor Meets' },
  ],
};

export const expoZones = ['Residential Zone', 'Commercial Zone', 'Luxury Living Zone', 'Investment Zone', 'Proptech Zone', 'Sustainability Zone'].map((title, i) => ({ title, src: images.expo.zones[i] }));

export const expectColumns = [
  { title: 'What to Expect?', items: ['Live demonstrations', 'Expert presentations', 'Knowledge sessions', 'Entertainment & engagement', 'Food & refreshments'] },
  { title: 'For Exhibitors', items: ['Prime stall locations', 'Branding opportunities', 'Lead generation support', 'Networking lounge access', 'Dedicated event support'] },
  { title: 'For Visitors', items: ['Free entry for runners', 'Exclusive launch offers', 'Home loan assistance', 'Expert Q&A desks', 'Family-friendly activities'] },
];

export const stallFormFields = [
  { name: 'name', label: 'Contact person', required: true },
  { name: 'organisation', label: 'Company / project', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Mobile', type: 'tel' },
  { name: 'stallSize', label: 'Stall size', type: 'select', options: ['3m x 3m', '3m x 6m', '6m x 6m', 'Custom'], required: true },
  { name: 'zone', label: 'Preferred zone', type: 'select', options: expoZones.map((z) => z.title) },
  { name: 'message', label: 'Anything else we should know?', type: 'textarea', span: 2 },
];
