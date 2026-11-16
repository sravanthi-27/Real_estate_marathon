import { images } from '@/config/images';

export const whyStats = [
  { value: '10,000+', label: 'Trees Planted' },
  { value: '10,000+', label: 'Participants' },
  { value: '250+', label: 'Communities' },
  { value: '100+', label: 'Real Estate Companies' },
  { value: '50+', label: 'Sponsors' },
];

export const reasons = [
  { icon: 'heart-pulse', title: 'Improve Your\nHealth', text: 'Running regularly improves cardiovascular health, boosts immunity and reduces stress.' },
  { icon: 'users', title: 'Be Part of a\nCommunity', text: 'Connect with like-minded runners, real estate professionals and local communities.' },
  { icon: 'target', title: 'Challenge\nYourself', text: "Set new goals, push your limits and achieve something you'll be proud of for a lifetime." },
  { icon: 'building', title: 'Celebrate\nHyderabad', text: 'Experience the iconic landmarks and vibrant spirit of Hyderabad like never before.' },
  { icon: 'tree', title: 'Leave a Green\nLegacy', text: 'Every registration plants one tree, helping build a greener Telangana for future generations.' },
  { icon: 'gift', title: 'Earn Rewards', text: 'Finisher medal, e-certificate, exclusive running kit and recognition for your achievement.' },
];

export const runForPlanet = {
  title: 'RUN FOR YOURSELF.\nRUN FOR THE PLANET.',
  description: 'The Real Estate Marathon is committed to creating a greener and healthier Telangana. For every registered participant:',
  points: [
    '1 Tree Planted',
    'Zero-Tagged Plantation Records',
    'Community Plantation Drives',
    'Environmental Awareness',
    'Long-Term Sustainability Impact',
  ],
  image: images.why.runForPlanet,
};

export const finisherReceives = {
  title: 'Every Finisher Receives',
  items: [
    { label: 'Marathon Finisher Medal', src: images.why.finisher[3] },
    { label: 'Marathon Finisher Certificate', src: images.why.finisher[0] },
    { label: 'Digital Tree Plantation Certificate', src: images.why.finisher[1] },
    { label: 'Plantation Location Tracking', src: images.why.finisher[2] },
    { label: 'Plantation Updates', src: images.why.plantation },
  ],
};

export const plantationPartners = {
  title: 'Our Tree Plantation Partners',
  text: 'Together, we are building a greener Hyderabad.',
  partners: [
    { name: 'Telangana Forest Department', src: images.why.partnerLogos[0] },
    { name: 'HMDA Urban Forestry', src: images.why.partnerLogos[1] },
    { name: 'GHMC Green Hyderabad', src: images.why.partnerLogos[2] },
    { name: 'CSR Partners', icon: 'handshake' },
    { name: 'Community Associations', icon: 'users' },
  ],
};

export const greenChallenge = {
  title: 'Green Community Challenge',
  description: 'The community with the highest participation contributes the most trees.',
  columns: ['Community', 'Participants', 'Trees Sponsored'],
  rows: [
    ['My Home', '1,248', '1,248 Trees'],
    ['Aparna', '1,102', '1,102 Trees'],
    ['Prestige', '975', '975 Trees'],
    ['Ramky Estates', '842', '842 Trees'],
    ['Vasavi Group', '721', '721 Trees'],
  ],
};

export const collectiveImpact = {
  title: 'Our Collective Impact',
  description: 'Every step we take today creates a better tomorrow.',
  items: [
    { icon: 'wind', label: 'Cleaner Air' },
    { icon: 'leaf', label: 'Better Environment' },
    { icon: 'users', label: 'Stronger Communities' },
    { icon: 'heart-pulse', label: 'Healthier Future' },
  ],
  note: 'Small steps today. Big change tomorrow.',
};
