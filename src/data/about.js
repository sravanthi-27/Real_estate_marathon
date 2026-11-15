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
    { icon: 'clock', label: 'Time', value: '6:00 AM onwards' },
  ],
};

export const visionMission = {
  vision: { icon: 'eye', title: 'Our Vision', text: 'To create a healthier real estate community and contribute towards building a vibrant, active and sustainable Telangana.' },
  mission: { icon: 'target', title: 'Our Mission', text: 'To bring together real estate professionals, communities and stakeholders to promote wellness, collaboration and growth through the power of running.' },
};

export const aboutStats = [
  { value: '10000+', label: 'Participants', icon: 'users' },
  { value: '250+', label: 'Gated Communities', icon: 'building' },
  { value: '100+', label: 'Real Estate Companies', icon: 'building' },
  { value: '50', label: 'Sponsors', icon: 'handshake' },
  { value: 'One', label: 'Stronger Community', icon: 'users' },
];

export const whyThisMarathon = [
  { icon: 'heart', title: 'Health & Wellness', text: 'Encouraging a fit and healthy lifestyle.' },
  { icon: 'users', title: 'Networking', text: 'Connect with industry leaders & professionals.' },
  { icon: 'trending-up', title: 'Industry Growth', text: 'Strengthen the real estate ecosystem together.' },
  { icon: 'users', title: 'Community Building', text: 'Building stronger communities for a better tomorrow.' },
  { icon: 'map-pin', title: 'Telangana Rising 2047', text: 'Supporting the vision of a developed Telangana.' },
];

export const impact = {
  title: 'Our Impact',
  description: 'This event is designed to leave a lasting impact on society by supporting health, unity and sustainable development.',
  items: [
    { icon: 'heart', title: 'PROMOTE\nHEALTHY LIVING' },
    { icon: 'users', title: 'ENCOURAGE\nSOCIAL RESPONSIBILITY' },
    { icon: 'building', title: 'SUPPORT SUSTAINABLE\nURBAN DEVELOPMENT' },
    { icon: 'zap', title: 'INSPIRE FUTURE\nGENERATIONS' },
  ],
  image: images.about.hyderabad,
};

export const whoCanParticipate = {
  title: 'Who Can Participate?',
  items: [
    'Builders & Developers',
    'Realtors & Channel Partners',
    'Architects & Engineers',
    'Investors & Consultants',
    'Home Buyers & Residents',
    'Fitness Enthusiasts',
    'Students & Families',
    'Anyone who wants to make a difference!',
  ],
};

export const organizers = {
  title: 'Organized by Industry, for the Community.',
  people: [
    { name: 'Chief Patron', role: 'Leading the vision, inspiring the change.' },
    { name: 'Event Chairman', role: 'Driving purpose, building connections.' },
    { name: 'Event Director', role: 'Planning today, transforming tomorrow.' },
    { name: 'Race Director', role: 'On the track, for an unforgettable race.' },
    { name: 'Advisory Board', role: 'Guiding the path towards excellence.' },
  ].map((person, i) => ({ ...person, src: images.about.organizers[i] })),
};
