import { images } from '@/config/images';

const logos = (arr, names) => arr.map((src, i) => ({ src, name: names[i] }));

export const sponsorStats = [
  { value: '10000+', label: 'Participants' },
  { value: '250+', label: 'Real Estate Companies' },
  { value: '100+', label: 'Exhibitors' },
  { value: '50+', label: 'Speakers' },
  { value: 'One', label: 'Stronger Community' },
];

export const sponsorTiers = [
  { key: 'title', title: 'Title Sponsors', size: 'xl', logos: logos(images.sponsors.title, ['Prestige Group']) },
  { key: 'powered', title: 'Powered By Sponsors', size: 'lg', logos: logos(
    [images.sponsors.powered[0], images.sponsors.powered[2], images.sponsors.powered[5], images.sponsors.powered[3], images.sponsors.powered[4]],
    ['My Home Group', 'Ramky Estates', 'Vasavi Group', 'Sumadhura Group', 'Urbanrise'],
  ) },
  { key: 'platinum', title: 'Platinum Sponsors', size: 'md', logos: logos(images.sponsors.platinum, ['APR Group', 'SAS Infra', 'Anuhar Homes', 'EIPL', 'LIC Housing Finance']) },
  { key: 'gold', title: 'Gold Sponsors', size: 'md', logos: logos(
    [images.sponsors.gold[0], images.sponsors.gold[1], images.sponsors.powered[1], images.sponsors.gold[2], images.sponsors.gold[3]],
    ['PNB Housing Finance', 'Bank of Baroda', 'Rajapushpa Properties', 'Candeur', 'Jain Housing'],
  ) },
  { key: 'silver', title: 'Silver Sponsors', size: 'md', logos: logos(images.sponsors.silver, ['Cybercity', 'Modi Builders', 'Indis', 'Sreenidhi', 'Holistic Living Spaces']) },
  { key: 'bronze', title: 'Bronze Sponsors', size: 'sm', logos: logos(images.sponsors.bronze, ['Ashoka Developers', 'NSL Infratech', 'Vertex', 'Primark', 'SV Infra']) },
  { key: 'supporting', title: 'Supporting Partners', size: 'sm', logos: logos(images.sponsors.supporting, ['CREDAI', 'NAREDCO', 'TS RERA', 'GHMC', 'HMDA']) },
  { key: 'media', title: 'Media Partners', size: 'sm', logos: logos(images.sponsors.media, ['TV9', 'V6 News', 'Hybiz TV', 'CityLight', 'Telangana Today']) },
];

export const partnerWithPurpose = {
  title: 'Partner with Purpose',
  intro: 'Align your brand with a movement that promotes health, unity, sustainability and progress.',
  benefits: [
    { icon: 'badge-check', title: 'Massive Brand Visibility', description: 'Reach 10,000+ participants, 250+ communities and 100+ real estate companies.' },
    { icon: 'users', title: 'Targeted Audience', description: 'Connect with decision makers, investors, home buyers and industry leaders.' },
    { icon: 'activity', title: 'On-Ground & Digital Exposure', description: 'Extensive branding across venue, digital platforms and marketing collaterals.' },
    { icon: 'trophy', title: 'Be a Part of Legacy', description: 'Support a landmark initiative that will become an annual tradition in Telangana.' },
  ],
};

/* PLACEHOLDER prices - edit before launch */
export const sponsorshipCategories = {
  title: 'Sponsorship Categories',
  rows: [
    { key: 'title', icon: 'crown', label: 'Title Sponsor', value: '₹25,00,000+' },
    { key: 'powered', icon: 'zap', label: 'Powered By Sponsor', value: '₹15,00,000+' },
    { key: 'platinum', icon: 'medal', label: 'Platinum Sponsor', value: '₹10,00,000+' },
    { key: 'gold', icon: 'award', label: 'Gold Sponsor', value: '₹5,00,000+' },
    { key: 'silver', icon: 'ribbon', label: 'Silver Sponsor', value: '₹3,00,000+' },
    { key: 'bronze', icon: 'shield', label: 'Bronze Sponsor', value: '₹1,50,000+' },
    { key: 'supporting', icon: 'handshake', label: 'Supporting Partner', value: '₹75,000+' },
    { key: 'inkind', icon: 'gift', label: 'In-Kind Sponsor', value: 'Customized' },
  ],
};

export const sponsorBenefits = {
  title: 'Sponsor Benefits',
  items: [
    'Logo on main event branding',
    'Digital promotions & social media mentions',
    'On-ground branding at venue & route',
    'Sponsor stalls at Expo',
    'Complimentary race entries',
    'Felicitations & recognition in all press meets',
    'Media coverage & brand storytelling',
  ],
};

export const sponsorFormFields = [
  { name: 'name', label: 'Your name', required: true },
  { name: 'organisation', label: 'Company', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Mobile', type: 'tel' },
  { name: 'tier', label: 'Sponsorship interest', type: 'select', options: ['Title Sponsor', 'Presented By', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Supporting Partner', 'Media Partner'], required: true },
  { name: 'message', label: 'Tell us about your goals', type: 'textarea', span: 2 },
];
