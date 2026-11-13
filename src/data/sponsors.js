import { images } from '@/config/images';

const logos = (arr, label) => arr.map((src, i) => ({ src, name: `${label} ${i + 1}` }));

export const sponsorStats = [
  { value: '10000+', label: 'Participants' },
  { value: '250+', label: 'Real Estate Companies' },
  { value: '100+', label: 'Exhibitors' },
  { value: '50+', label: 'Speakers' },
  { value: 'One', label: 'Stronger Community' },
];

export const sponsorTiers = [
  { key: 'title', title: 'Title Sponsor', size: 'xl', logos: logos(images.sponsors.title, 'Title Sponsor') },
  { key: 'powered', title: 'Powered By Sponsors', size: 'lg', logos: logos(images.sponsors.powered, 'Powered By') },
  { key: 'platinum', title: 'Platinum Sponsors', size: 'md', logos: logos(images.sponsors.platinum, 'Platinum') },
  { key: 'gold', title: 'Gold Sponsors', size: 'md', logos: logos(images.sponsors.gold, 'Gold') },
  { key: 'silver', title: 'Silver Sponsors', size: 'md', logos: logos(images.sponsors.silver, 'Silver') },
  { key: 'bronze', title: 'Bronze Sponsors', size: 'sm', logos: logos(images.sponsors.bronze, 'Bronze') },
  { key: 'supporting', title: 'Supporting Partners', size: 'sm', logos: logos(images.sponsors.supporting, 'Supporting') },
  { key: 'media', title: 'Media Partners', size: 'sm', logos: logos(images.sponsors.media, 'Media') },
];

export const partnerWithPurpose = {
  title: 'Partner with Purpose',
  intro: 'Align your brand with a movement that celebrates health, community and sustainable growth.',
  points: ['Maximum brand visibility', 'Targeted audience reach', 'Be part of a bigger purpose', 'Meaningful community impact'],
};

/* PLACEHOLDER prices - edit before launch */
export const sponsorshipCategories = {
  title: 'Sponsorship Categories',
  rows: [
    { label: 'Title Sponsor', value: '25,00,000+' },
    { label: 'Presented By', value: '15,00,000+' },
    { label: 'Platinum Sponsor', value: '10,00,000' },
    { label: 'Gold Sponsor', value: '5,00,000' },
    { label: 'Silver Sponsor', value: '2,50,000' },
    { label: 'Bronze Sponsor', value: '1,00,000' },
    { label: 'Supporting Partner', value: 'On request' },
  ],
};

export const sponsorBenefits = {
  title: 'Sponsor Benefits',
  items: ['Logo on race kit and bibs', 'Branding at start / finish and route', 'On-ground stall at the expo', 'Social media and press mentions', 'Complimentary runner entries', 'Networking access to industry leaders'],
};

export const sponsorFormFields = [
  { name: 'name', label: 'Your name', required: true },
  { name: 'organisation', label: 'Company', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Mobile', type: 'tel' },
  { name: 'tier', label: 'Sponsorship interest', type: 'select', options: ['Title Sponsor', 'Presented By', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Supporting Partner', 'Media Partner'], required: true },
  { name: 'message', label: 'Tell us about your goals', type: 'textarea', span: 2 },
];
