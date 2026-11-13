import { images } from '@/config/images';

export const merchStats = [
  { value: '10,000+', label: 'Participants' },
  { value: '250+', label: 'Communities' },
  { value: '100+', label: 'Real Estate Companies' },
];

export const communityKits = ['Community 1', 'Community 2', 'Community 3', 'Community 4', 'Community 5', 'Community 6', 'Community 7', 'Community 8']
  .map((name, i) => ({ name, runners: 40 + i * 12, src: images.merchandise.kits[i] }));

export const howItWorks = {
  title: 'How It Works',
  steps: ['Register your community or society', 'Pick a kit colour and design', 'Members register under your community', 'Run together and win the community challenge'],
};

export const communityChallenge = {
  title: 'Community Challenge',
  columns: ['Community', 'Runners', 'Points'],
  rows: [['Community 1', 412, 980], ['Community 2', 365, 905], ['Community 3', 310, 850], ['Community 4', 280, 790], ['Community 5', 245, 720]],
};

export const registerCommunityFields = [
  { name: 'communityName', label: 'Community / society name', required: true },
  { name: 'city', label: 'City / locality' },
  { name: 'name', label: 'Your name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Mobile', type: 'tel' },
  { name: 'members', label: 'Approx. runners', type: 'select', options: ['10-25', '26-50', '51-100', '100+'] },
];

export const kitTiers = [
  { name: 'Bronze', kits: '100', tone: 'bronze' },
  { name: 'Silver', kits: '250', tone: 'silver' },
  { name: 'Gold', kits: '500', tone: 'gold' },
  { name: 'Platinum', kits: '1000+', tone: 'platinum' },
];

export const kitSponsorFields = [
  { name: 'name', label: 'Your name', required: true },
  { name: 'organisation', label: 'Company', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Mobile', type: 'tel' },
  { name: 'tier', label: 'Kit sponsorship tier', type: 'select', options: kitTiers.map((t) => `${t.name} (${t.kits} kits)`), required: true },
];

/* PLACEHOLDER prices (INR) - edit before launch */
export const products = [
  { id: 'tee-white', name: 'Winners Event Tee', price: 599, src: images.merchandise.products[0] },
  { id: 'cap', name: 'Running Cap', price: 349, src: images.merchandise.products[1] },
  { id: 'tee-sports', name: 'Sports Dri-Fit Tee', price: 699, src: images.merchandise.products[2] },
  { id: 'bottle', name: 'Insulated Bottle', price: 499, src: images.merchandise.products[3] },
  { id: 'medal', name: 'Finisher Medal Frame', price: 799, src: images.merchandise.products[4] },
  { id: 'bag', name: 'Gear Bag', price: 899, src: images.merchandise.products[5] },
];

export const corporateKits = {
  title: 'Corporate Running Kits',
  subtitle: 'For builders, brokers and teams',
  points: ['Custom company branding', 'Front and back print', 'Bulk pricing and delivery', 'Team photo support'],
  minimum: 'Minimum order: 25 kits',
};

export const limitedEdition = {
  title: 'Limited Edition Hyderabad Collection',
  items: ['Charminar', 'Financial District', 'Hussain Sagar', 'Golconda', 'Hi-Tech City', 'Telangana Rising'].map((name, i) => ({ name, src: images.merchandise.limited[i] })),
};

export const orderFormFields = [
  { name: 'name', label: 'Your name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Mobile', type: 'tel', required: true },
  { name: 'address', label: 'Delivery address', type: 'textarea', span: 2, required: true },
];
