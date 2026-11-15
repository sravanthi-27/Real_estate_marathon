import { images } from '@/config/images';
import { products } from '@/data/merchandise';

export const route = {
  title: 'Event Route Map',
  mapEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=78.29%2C17.39%2C78.40%2C17.49&layer=mapnik&marker=17.4401%2C78.3436',
  mapUrl: 'https://www.openstreetmap.org/?mlat=17.4401&mlon=78.3436#map=14/17.4401/78.3436',
  stats: [
    { label: 'Distance', value: '21.097 KM', tone: 'distance' },
    { label: 'Elevation gain', value: '120 M', tone: 'elevation' },
    { label: 'Hydration', value: '8 Points', tone: 'hydration' },
    { label: 'Medical', value: '6 Stations', tone: 'medical' },
  ],
};

export const raceCategoryDetails = {
  '3k': { name: 'Fun Run', audience: 'Families, students & beginners' },
  '5k': { name: 'Community Run', audience: 'Fitness enthusiasts' },
  '10k': { name: 'Professional Run', audience: 'Industry professionals' },
  '21k': { name: 'Half Marathon', audience: 'Elite marathoners' },
};

export const homePartners = [
  {
    title: 'Powered by & Principal Partners',
    logos: images.home.partners.principal,
    names: ['Prestige Group', 'My Home Group', 'Rajapushpa', 'Ramky', 'Sumadhura', 'APR Group'],
  },
  {
    title: 'Builder & Infrastructure Partners',
    logos: images.home.partners.builders,
    names: ['SAS Infra', 'Anuhar Homes', 'Cybercity', 'Vertex', 'Brigade', 'ASBL', 'SV Infra', 'EIPL'],
  },
  {
    title: 'Banking & Financial Partners',
    logos: images.home.partners.financial,
    names: ['LIC HFL', 'PNB Housing', 'Bank of Baroda'],
  },
];

const homeProductIds = ['tee-white', 'cap', 'bottle', 'medal', 'bag'];
const homeProductLabels = ['T-Shirt', 'Cap', 'Bottle', 'Medal', 'Sports Bag'];
export const homeMerchandise = homeProductIds.map((id, index) => {
  const product = products.find((item) => item.id === id);
  return { ...product, displayName: homeProductLabels[index], src: images.home.merch[index] };
});

export const homeExpoHighlights = [
  { title: 'Flag off', src: images.home.expoHighlights[0] },
  { title: 'Builders Run', src: images.home.expoHighlights[1] },
  { title: 'Corporate Team', src: images.home.expoHighlights[2] },
  { title: 'Awards', src: images.home.expoHighlights[3] },
  { title: 'Food Courts', src: images.home.expoHighlights[4] },
];

export const homeOrganizers = [
  { role: 'Chief Patron', description: 'Leading the vision, inspiring the change.' },
  { role: 'Event Chairman', description: 'Driving purpose, building connections.' },
  { role: 'Event Director', description: 'Planning today, transforming tomorrow.' },
  { role: 'Race Director', description: 'On the track, for an unforgettable race.' },
  { role: 'Advisory Board', description: 'Guiding the path towards excellence.' },
  { role: 'Advisory Board', description: 'Guiding the path towards excellence.' },
].map((person, index) => ({
  id: `organizer-${index + 1}`,
  ...person,
  name: person.role,
  role: person.description,
  src: images.home.organizers[index],
}));
