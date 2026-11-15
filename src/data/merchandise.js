import { images } from '@/config/images';

export const merchStats = [
  { value: '10,000+', label: 'Participants' },
  { value: '250+', label: 'Communities' },
  { value: '100+', label: 'Real Estate Companies' },
];

export const communityKits = [
  {
    name: 'My Home Group',
    logo: images.home.partners.principal[1],
    count: '1,248',
    src: images.merchandise.kits[1],
  },
  {
    name: 'Aparna Constructions',
    count: '1,102',
    src: images.merchandise.kits[0],
  },
  {
    name: 'Prestige Group',
    logo: images.home.partners.principal[0],
    count: '975',
    src: images.merchandise.kits[2],
  },
  {
    name: 'Ramky Estates',
    logo: images.home.partners.principal[3],
    count: '842',
    src: images.merchandise.kits[4],
  },
  {
    name: 'Vasavi Group',
    logo: images.sponsors.powered[5],
    count: '721',
    src: images.merchandise.kits[6],
  },
  {
    name: 'Rajapushpa Properties',
    logo: images.home.partners.principal[2],
    count: '618',
    src: images.merchandise.kits[3],
  },
  {
    name: 'Sumadhura Group',
    logo: images.home.partners.principal[4],
    count: '542',
    src: images.merchandise.kits[5],
  },
  {
    name: 'Brigade Group',
    logo: images.home.partners.builders[4],
    count: '489',
    src: images.merchandise.kits[7],
  },
];

export const howItWorks = {
  title: 'How It Works',
  options: [
    {
      label: 'Register directly on RealEstateJobs.co.in',
      benefits: ['Official Bib', 'T-Shirt', 'Medal', 'Refreshments', 'Finisher Certificate'],
    },
    {
      label: 'Register through your Builder / Community',
      benefits: ['Community Branded Kit (With Marathon Logo)', 'Official Event Access', 'Community Participation', 'Group Recognition', 'Special Community Awards'],
    },
  ],
};

export const communityChallenge = {
  title: 'Community Challenge',
  subtitle: "Hyderabad's Fittest Community Award",
  awards: [
    { icon: 'medal', label: 'Highest Registrations' },
    { icon: 'users', label: 'Best Participation' },
    { icon: 'flame', label: 'Most Active Community' },
    { icon: 'footprints', label: 'Fastest Community Team' },
    { icon: 'heart-pulse', label: 'Community Wellness Champion' },
  ],
  rows: [['My Home', '1,248'], ['Aparna', '1,102'], ['Prestige', '975'], ['Ramky', '842'], ['Vasavi', '721']],
};

export const registerCommunityFields = [
  { name: 'name', label: '', placeholder: 'Community Name', required: true },
  { name: 'organisation', label: '', placeholder: 'Builder / Company Name' },
  { name: 'phone', label: '', placeholder: 'Contact Number', type: 'tel' },
  { name: 'email', label: '', placeholder: 'Email ID (Optional)', type: 'email' },
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
  { id: 'tee-white', name: 'Official Running T-shirt', price: 599, src: images.merchandise.products[0] },
  { id: 'cap', name: 'Running Cap', price: 349, src: images.merchandise.products[1] },
  { id: 'bag', name: 'Sports Bag', price: 899, src: images.merchandise.products[2] },
  { id: 'bottle', name: 'Insulated Bottle', price: 499, src: images.merchandise.products[3] },
  { id: 'medal', name: 'Medal Replica', price: 799, src: images.merchandise.products[4] },
  { id: 'mug', name: 'Coffee Mug', price: 399, src: images.merchandise.products[5] },
];

export const corporateKits = {
  title: 'Corporate Running Kits',
  subtitle: 'For builders, brokers and teams',
  points: ['Custom company branding', 'Front and back print', 'Bulk pricing and delivery', 'Team photo support'],
  minimum: 'Minimum order: 25 kits',
};

export const limitedEdition = {
  title: 'Limited Edition Hyderabad Collection',
  items: ['Charminar', 'Financial District', 'Tank Bund Buddha', 'Durgam Cheruvu Bridge', 'Telangana Rising 2047'].map((name, i) => ({ name, src: images.merchandise.limited[i] })),
};

export const orderFormFields = [
  { name: 'name', label: 'Your name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Mobile', type: 'tel', required: true },
  { name: 'address', label: 'Delivery address', type: 'textarea', span: 2, required: true },
];
