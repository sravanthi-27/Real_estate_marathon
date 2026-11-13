/**
 * Single source of truth for EVERY image path.
 * Folder per page: /public/images/<page>/<file>
 * Run `npm run images` to create folders + regenerate public/images/IMAGES.md
 */
const p = (page, file) => `/images/${page}/${file}`;
const seq = (page, prefix, count, ext = 'jpg') =>
  Array.from({ length: count }, (_, i) => p(page, `${prefix}-${i + 1}.${ext}`));

export const images = {
  common: {
    logo: p('common', 'logo.png'),
    logoLight: p('common', 'logo-light.png'),
    skyline: p('common', 'skyline-strip.png'),
  },
  home: {
    hero: p('home', 'hero.png'),
    routeMap: p('home', 'route-map.png'),
    poi: seq('home', 'poi', 5),
  },
  about: {
    hero: p('about', 'hero.jpg'),
    intro: p('about', 'intro.jpg'),
    hyderabad: p('about', 'hyderabad.jpg'),
    organizers: seq('about', 'organizer', 5),
  },
  sponsors: {
    hero: p('sponsors', 'hero.jpg'),
    title: [p('sponsors', 'title-1.png')],
    powered: seq('sponsors', 'powered', 4, 'png'),
    platinum: seq('sponsors', 'platinum', 4, 'png'),
    gold: seq('sponsors', 'gold', 4, 'png'),
    silver: seq('sponsors', 'silver', 4, 'png'),
    bronze: seq('sponsors', 'bronze', 4, 'png'),
    supporting: seq('sponsors', 'supporting', 4, 'png'),
    media: seq('sponsors', 'media', 4, 'png'),
  },
  expo: {
    hero: p('expo', 'hero.jpg'),
    whyExhibit: p('expo', 'why-exhibit.jpg'),
    zones: seq('expo', 'zone', 6),
    gallery: seq('expo', 'gallery', 4),
  },
  merchandise: {
    hero: p('merchandise', 'hero.jpg'),
    kits: seq('merchandise', 'kit', 8, 'png'),
    products: seq('merchandise', 'product', 6, 'png'),
    corporateFront: p('merchandise', 'corporate-front.png'),
    corporateBack: p('merchandise', 'corporate-back.png'),
    limited: seq('merchandise', 'limited', 6, 'png'),
  },
  why: {
    hero: p('why-participate', 'hero.jpg'),
    runForPlanet: p('why-participate', 'run-for-planet.jpg'),
    finisher: seq('why-participate', 'finisher', 3),
    partners: seq('why-participate', 'partner', 3, 'png'),
    banner: p('why-participate', 'banner.jpg'),
    qr: p('why-participate', 'register-qr.png'),
  },
  contact: {
    hero: p('contact', 'hero.jpg'),
    organizers: seq('contact', 'organizer', 6),
    map: p('contact', 'map.png'),
    volunteer: p('contact', 'volunteer.jpg'),
    support: p('contact', 'support.jpg'),
  },
  register: {
    banner: p('register', 'banner.jpg'),
  },
};
