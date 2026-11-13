import { images } from '@/config/images';

export const whyStats = [
  { value: '10,000+', label: 'Trees Planted' },
  { value: '10,000+', label: 'Participants' },
  { value: '250+', label: 'Communities' },
  { value: '100+', label: 'Real Estate Companies' },
  { value: '50+', label: 'Sponsors' },
];

export const reasons = [
  { icon: 'heart-pulse', title: 'Improve Your Health', text: 'Build a fitness habit with a goal to work toward.' },
  { icon: 'users', title: 'Be Part of a Community', text: 'Run with neighbours, colleagues and friends.' },
  { icon: 'flag', title: 'Champion Hyderabad', text: 'Represent the city you help build.' },
  { icon: 'trophy', title: 'Celebrate Together', text: 'Cheer, compete and finish as one community.' },
  { icon: 'tree', title: 'Leave a Green Legacy', text: 'Every runner plants one tree in Telangana.' },
  { icon: 'award', title: 'Earn Rewards', text: 'Medals, certificates and exclusive goodies.' },
];

export const runForPlanet = {
  title: 'Run for Sport. Run for the Planet.',
  points: ['1 tree planted per runner', 'Zero-waste water stations', 'Community plantation drives', 'Long-term green monitoring'],
  image: images.why.runForPlanet,
};

export const finisherReceives = {
  title: 'Every Finisher Receives',
  items: [
    { label: 'E-Certificate', src: images.why.finisher[0] },
    { label: 'Tree Plantation Proof', src: images.why.finisher[1] },
    { label: 'Your Tree Location', src: images.why.finisher[2] },
  ],
};

export const plantationPartners = {
  title: 'Our Tree Plantation Partners',
  text: 'We work with trusted environmental groups to plant, protect and track every tree.',
  partners: ['Partner 1', 'Partner 2', 'Partner 3'].map((name, i) => ({ name, src: images.why.partners[i] })),
};

export const greenChallenge = {
  title: 'Green Community Challenge',
  columns: ['Community', 'Trees', 'Points'],
  rows: [['Community 1', 412, 980], ['Community 2', 365, 905], ['Community 3', 310, 850], ['Community 4', 280, 790], ['Community 5', 245, 720]],
};

export const collectiveImpact = {
  title: 'Our Collective Impact',
  items: [{ value: '10,000', label: 'Runners' }, { value: '10,000', label: 'Trees' }, { value: '250+', label: 'Communities' }, { value: '1', label: 'Greener Telangana' }],
};
