/**
 * Single source of truth for EVERY image path.
 * Folder per page: /public/images/<page>/<file>
 * Run `npm run images` to create folders + regenerate public/images/IMAGES.md
 */
const p = (page, file) => `/images/${page}/${file}`;
const seq = (page, prefix, count, ext = 'jpg') =>
  Array.from({ length: count }, (_, i) => p(page, `${prefix}-${i + 1}.${ext}`));
const eventPartner = (file) => p('home', `event partners/${file} (1).png`);

export const images = {
  common: {
    logo: '/images/logo.png',
    logoLight: '/images/logo.png',
    skyline: p('common', 'skyline-strip.png'),
  },
  home: {
    hero: p('home', 'hero.png'),
    partners: {
      principal: [
        eventPartner('c48112dc50d188b694e219662b9261ca974898a2'),
        eventPartner('a0efaa5f1c376dab6e7d6a36b82bf4e004c26cce'),
        eventPartner('1cb104a05e3e6b7872b7734493b41e7515913eb1'),
        eventPartner('f54a2e398062cc0c3568d3ce182d16319113a785'),
        eventPartner('462b1e42ff91a38a40ea8ac2fe2ae89153c086bc'),
        eventPartner('73b8694f6ee8d71ddbbaaa2fb938d770b2a80108'),
      ],
      builders: [
        eventPartner('539364c4be9760d9b4d3457ccd7c2a75b3f448d5'),
        eventPartner('8ffba54bb570756b4d011c1d14cf335d837ba14c'),
        eventPartner('87ceab295cdaa7200cf3955296667e89998fad5f'),
        eventPartner('93841153dff5f308229e567c3268a9c2b5e306ed'),
        eventPartner('149c21435d9ec752a7792eaf0d516ed2ac50f72b'),
        eventPartner('ad846d443d32c0a43c79df313921bd93bc301091'),
        eventPartner('6923490c2d9188e738e071d330067aa17cfbaae5'),
        eventPartner('f81f0eadce2dbd06f2072a98ea0a3f0cb284f023'),
      ],
    },
    merch: [
      p('home', 'real-estate-marathon-kits/kits/merchandise/01_official-t-shirt.png'),
      p('home', 'real-estate-marathon-kits/kits/merchandise/02_running-cap.png'),
      p('home', 'real-estate-marathon-kits/kits/merchandise/04_water-bottle.png'),
      p('home', 'real-estate-marathon-kits/kits/merchandise/05_medal-replica.png'),
      p('home', 'real-estate-marathon-kits/kits/merchandise/03_sports-bag.png'),
    ],
    expoHighlights: [
      p('home', 'community/237cf77f27482a14f79343209cd6e28953684b0a.jpg'),
      p('home', 'community/6267e4a0bcb5661afb74429bc72fecc48b75d115.jpg'),
      p('home', 'community/124b07233952195363169b49204bae4e1329190d.jpg'),
      p('home', 'community/b98db517f26b182b0fd78283b87240d4ee1bbd77.jpg'),
      p('home', 'community/7a3f2fcd2b3977e57e2c8439708dadd7805a37df.jpg'),
    ],
    organizers: [
      p('home', 'community/b98db517f26b182b0fd78283b87240d4ee1bbd77.jpg'),
      p('home', 'community/124b07233952195363169b49204bae4e1329190d.jpg'),
      p('home', 'community/7a3f2fcd2b3977e57e2c8439708dadd7805a37df.jpg'),
      p('home', 'community/237cf77f27482a14f79343209cd6e28953684b0a.jpg'),
      p('home', 'community/6267e4a0bcb5661afb74429bc72fecc48b75d115.jpg'),
      p('home', 'community/124b07233952195363169b49204bae4e1329190d (1).jpg'),
    ],
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
