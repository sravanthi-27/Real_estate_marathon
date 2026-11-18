export const SITE = {
  name: 'Real Estate Marathon',
  hashtag: '#RUN4REALESTATE',
  tagline: 'Running towards stronger communities',
  presenter: 'RealEstateJobs.co.in',
  description:
    "The World's First Real Estate Marathon - a community movement uniting Hyderabad's real estate industry. Run. Connect. Transform.",
};

export const EVENT = {
  startISO: process.env.NEXT_PUBLIC_EVENT_DATE || '2026-12-20T05:00:00+05:30',
  timeLabel: '5:00 AM Onwards',
  venue: 'Gachibowli Stadium',
  city: 'Hyderabad, Telangana',
  address: 'Gachibowli Stadium, Gachibowli, Hyderabad, Telangana',
  mapEmbedUrl: process.env.NEXT_PUBLIC_MAP_EMBED_URL || '',
};

export const CONTACT = {
  email: 'hello@realestatemarathon.example',
  phone: '+91 00000 00000',
  whatsapp: '910000000000',
  address: EVENT.address,
};

export const SOCIALS = [
  { label: 'Facebook', icon: 'facebook', href: '#' },
  { label: 'Instagram', icon: 'instagram', href: '#' },
  { label: 'LinkedIn', icon: 'linkedin', href: '#' },
  { label: 'YouTube', icon: 'youtube', href: '#' },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Route', href: '/route' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Expo', href: '/expo' },
  { label: 'Merchandise', href: '/merchandise' },
  { label: 'Why Participate', href: '/why-participate' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login' },
];

export const FOOTER_COLUMNS = [
  { title: 'Quick Links', links: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Route', href: '/route' }, { label: 'Sponsors', href: '/sponsors' }, { label: 'Expo', href: '/expo' }] },
  { title: '', links: [{ label: 'Merchandise', href: '/merchandise' }, { label: 'Why Participate', href: '/why-participate' }, { label: 'Contact', href: '/contact' }, { label: 'Register', href: '/register' }] },
];

export const KIT_PICKUP = {
  title: 'Expo & Bib Pickup',
  dateLabel: 'Date shared by email before race day',
  timeLabel: '10:00 AM - 8:00 PM',
  venue: EVENT.venue,
  note: 'Carry a photo ID and this confirmation to collect your bib and race kit.',
};
