import { images } from '@/config/images';

export const aboutIntro = {
  title: 'About the Marathon',
  paragraphs: [
    "The World's First Real Estate Marathon is a groundbreaking initiative bringing together the real estate community of Hyderabad for a single cause - building stronger communities.",
    'It is more than a race: it is a movement to promote health, community building and sustainability, uniting developers, builders, professionals and residents of Telangana.',
    'We expect thousands of participants, hundreds of companies and a vibrant expo of real estate innovation on race day.',
  ],
  eventDetails: [
    { icon: 'calendar', label: 'Date', value: 'Coming Soon' },
    { icon: 'map-pin', label: 'Venue', value: 'Gachibowli Stadium, Hyderabad' },
    { icon: 'clock', label: 'Time', value: '5:00 AM onwards' },
  ],
};

export const visionMission = {
  vision: { icon: 'eye', title: 'Our Vision', text: 'To create a healthier, more connected real estate community across Telangana and beyond.' },
  mission: { icon: 'target', title: 'Our Mission', text: 'To bring together the industry and residents through a shared run - promoting fitness, collaboration and community pride.' },
};

export const aboutStats = [
  { value: '10000+', label: 'Participants' },
  { value: '250+', label: 'Real Estate Companies' },
  { value: '100+', label: 'Exhibitors' },
  { value: '50', label: 'Speakers' },
  { value: 'One', label: 'Stronger Community' },
];

export const whyThisMarathon = [
  { icon: 'heart-pulse', title: 'Health & Wellness', text: 'Encouraging fit and healthy lifestyles.' },
  { icon: 'users', title: 'Networking', text: 'Connect with leaders and peers across the industry.' },
  { icon: 'trending-up', title: 'Industry Growth', text: 'Showcasing innovation and opportunity.' },
  { icon: 'building', title: 'Community Building', text: 'Strengthening bonds between neighbourhoods.' },
  { icon: 'flag', title: 'Telangana Rising 2047', text: 'Supporting the vision of a developed Telangana.' },
];

export const impact = {
  title: 'Our Impact',
  items: ['Promoting health and fitness', 'Encouraging social responsibility', 'Supporting sustainable development', 'Inspiring community participation'],
  image: images.about.hyderabad,
};

export const whoCanParticipate = {
  title: 'Who Can Participate?',
  items: ['Builders & developers', 'Real estate professionals', 'Architects & consultants', 'Channel partners & brokers', 'Bankers & lenders', 'Residents & families', 'Fitness enthusiasts', 'Anyone who wants to make a difference'],
};

export const organizers = {
  title: 'Organized by Industry, for the Community',
  people: ['Organizer 1', 'Organizer 2', 'Organizer 3', 'Organizer 4', 'Organizer 5'].map((name, i) => ({ name, role: 'Committee Member', src: images.about.organizers[i] })),
};
