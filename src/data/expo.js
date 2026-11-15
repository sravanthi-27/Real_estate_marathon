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
  text: 'The Real Estate Expo is a premier business and networking platform bringing together top developers, realtors, investors, architects, consultants, fintech, PropTech and industry leaders under one roof.',
  features: [
    { icon: 'users', title: 'Meet & Network', text: 'Connect with 10,000+ real estate companies, industry leaders and decision makers.' },
    { icon: 'building', title: 'Discover Projects', text: 'Explore residential, commercial, plotted developments and luxury projects.' },
    { icon: 'trending-up', title: 'Investment Opportunities', text: 'Find the right investment opportunities and get expert financial guidance.' },
    { icon: 'settings', title: 'Tech & Innovation', text: 'Experience the latest in PropTech, Smart Homes, Construction Tech and Sustainable Solutions.' },
    { icon: 'graduation-cap', title: 'Learn & Grow', text: 'Attend seminars, panel discussions and workshops by industry experts.' },
    { icon: 'handshake', title: 'Business Collaborations', text: 'Create partnerships and collaborations that drive the future.' },
  ],
};

export const whyExhibit = {
  title: 'Why Exhibit?',
  points: [
    'Showcase your brand to 10000+ participants',
    'Generate high-quality leads',
    'Strengthen brand visibility and trust',
    'Launch new projects and offers',
    'Network with potential partners and investors',
    "Be part of Hyderabad's biggest real estate movement",
  ],
  image: images.expo.whyExhibit,
};

export const expoHighlights = {
  title: 'Expo Highlights',
  items: [
    { icon: 'landmark', title: '100+', text: 'Exhibitors' },
    { icon: 'users', title: '5000+', text: 'Business Visitors' },
    { icon: 'messages-square', title: 'Panel', text: 'Discussions' },
    { icon: 'megaphone', title: 'Product', text: 'Launches' },
    { icon: 'building', title: 'Live Project', text: 'Showcases' },
    { icon: 'tags', title: 'Special Offers &', text: 'Spot Bookings' },
  ],
};

export const expoZones = [
  { title: 'Residential Zone', description: 'Apartments, Villas, Gated Communities & Plotted Developments' },
  { title: 'Commercial Zone', description: 'Office Spaces, IT Parks, Retail Spaces & Co-working Solutions' },
  { title: 'Luxury Living Zone', description: 'Premium Homes, Luxury Amenities & Lifestyle Experiences' },
  { title: 'Investment Zone', description: 'Investment Advisory, Financial Institutions, Home Loans & NRI Services' },
  { title: 'Proptech Zone', description: 'Technology, Innovation, Smart Solutions & Digital Platforms' },
  { title: 'Sustainability Zone', description: 'Green Building Materials, Sustainable Projects & Eco-friendly Solutions' },
].map((zone, i) => ({ ...zone, src: images.expo.zones[i] }));

export const expectColumns = [
  {
    title: 'What to Expect?',
    items: [
      { icon: 'monitor', label: 'Live Demonstrations' },
      { icon: 'user-round', label: 'Expert Consultations' },
      { icon: 'book-open', label: 'Knowledge Sessions' },
      { icon: 'party-popper', label: 'Entertainment & Experiences' },
      { icon: 'utensils', label: 'Food & Refreshments' },
    ],
  },
  {
    title: 'For Exhibitors',
    items: [
      { icon: 'panels-top-left', label: 'Booth Space Options' },
      { icon: 'target', label: 'Branding & Visibility' },
      { icon: 'filter', label: 'Lead Generation' },
      { icon: 'network', label: 'Networking Opportunities' },
      { icon: 'handshake', label: 'Post-Event Engagement' },
    ],
  },
  {
    title: 'For Visitors',
    items: [
      { icon: 'ticket', label: 'Free Entry for All' },
      { icon: 'search', label: 'Explore Top Projects' },
      { icon: 'compass', label: 'Expert Guidance' },
      { icon: 'gift', label: 'Exciting Offers' },
      { icon: 'award', label: 'Win Lucky Draws' },
    ],
  },
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
