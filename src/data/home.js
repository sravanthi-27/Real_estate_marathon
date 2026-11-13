import { images } from '@/config/images';

export const homeHighlights = [
  { icon: 'dumbbell', title: 'Get Fit', text: 'Stay Active' },
  { icon: 'network', title: 'Network', text: '& Connect' },
  { icon: 'trending-up', title: 'Grow', text: 'Together' },
];

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
  '3k': { name: 'Fun Run', audience: 'Families, students & beginners', reporting: '4:20 AM' },
  '5k': { name: 'Community Run', audience: 'Fitness enthusiasts', reporting: '4:20 AM' },
  '10k': { name: 'Professional Run', audience: 'Industry professionals', reporting: '4:00 AM' },
  '21k': { name: 'Half Marathon', audience: 'Elite marathoners', reporting: '3:30 AM' },
};

export const pointsOfInterest = [
  { title: 'Financial District', text: 'Hyderabad\'s towering business hub' },
  { title: 'Commercial Corridor', text: 'Offices and retail along the route' },
  { title: 'Residential Enclaves', text: 'Gated communities cheering you on' },
  { title: 'Green Stretch', text: 'Tree-lined roads and open spaces' },
  { title: 'Lakeside View', text: 'A calm, scenic mid-race section' },
].map((p, i) => ({ ...p, src: images.home.poi[i] }));

export const infoCards = [
  { icon: 'droplets', title: 'Hydration Points', text: 'Every 2 km with water and electrolytes' },
  { icon: 'heart-pulse', title: 'Medical Support', text: 'Ambulances and doctors on the route' },
  { icon: 'shield', title: 'Safety First', text: 'Closed roads, marshals and volunteers' },
  { icon: 'utensils', title: 'Runner Amenities', text: 'Baggage, restrooms and refreshments' },
  { icon: 'info', title: 'Important Info', text: 'Carry your bib and ID on race day' },
];
