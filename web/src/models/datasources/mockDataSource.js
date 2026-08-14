/**
 * Mock data source — provides realistic seed data so the entire site
 * runs offline without any Sanity connection.
 *
 * VITE_DATA_SOURCE=mock (default in .env.example)
 *
 * 40+ photos across 4 categories, 8 testimonials, 4 journal posts,
 * 2 client galleries.
 */

// ── Helpers ──
const unsplash = (id, w = 800, h = 1000) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const makeImage = (id, w = 800, h = 1000) => ({
  _type: 'image',
  asset: {
    _id: `image-mock-${id}`,
    url: unsplash(id, w, h),
    metadata: {
      lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAFAAUDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAB//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKYAB//Z',
      dimensions: { width: w, height: h, aspectRatio: w / h },
    },
  },
})

const makeSanityImage = (url, w = 800, h = 1000) => ({
  _type: 'image',
  asset: {
    _id: `image-mock-${Math.random().toString(36).slice(2)}`,
    url,
    metadata: {
      lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAFAAUDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAB//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKYAB//Z',
      dimensions: { width: w, height: h, aspectRatio: w / h },
    },
  },
})

// ── Settings ──
export const mockSettings = {
  photographerName: 'Keshav Sharma',
  tagline: 'Chasing light through the streets of Delhi',
  heroImages: [
    makeImage('1524492412937-b28074a5d7da', 2000, 1200),
    makeImage('1532664189-01onal4b3c4e', 2000, 1200),
    makeImage('1587474260584-136574528ed5', 2000, 1200),
    makeImage('1514222134-b57cbb8ce073', 2000, 1200),
  ],
  profilePhoto: makeImage('1507003211169-0a1dd7228f2d', 800, 800),
  aboutHeading: 'The Photographer',
  aboutText:
    "I'm Keshav Sharma, a street and documentary photographer based in Delhi NCR. I've spent the last six years walking through the old lanes of Chandni Chowk, the ghats of Varanasi, and the festival grounds of Rajasthan — always looking for that one frame where light, emotion, and place come together.\n\nMy work is about ordinary moments in extraordinary light. A chai-wallah pouring tea against a shaft of morning sun. Children playing Holi in a cloud of colour. A bride's hands, heavy with mehndi, caught in the glow of a diya.\n\nI shoot because every street has a story, and I want to make sure someone remembers it.",
  email: 'ks4530157@gmail.com',
  whatsapp: '+91 7280867758',
  instagram: 'https://www.instagram.com/shotbykeshav',
  city: 'Delhi NCR',
}

// ── Photos (40+ across 4 categories) ──
const streetIds = [
  '1524492412937-b28074a5d7da', '1506869640319-fe1a24fd76cb', '1477587458883-47145ed94245',
  '1514222134-b57cbb8ce073', '1543429754-5da8a6a6cc59', '1519501025264-65ba15a82390',
  '1544735716-392fe2489ffa', '1542838132-92c53300f7d0', '1504457047772-27faf794c6c6',
  '1517048676732-d65bc937f952', '1494783367193-149034c05e8f', '1496568816025-5b46f4520c76',
]
const portraitIds = [
  '1507003211169-0a1dd7228f2d', '1531746020798-e6953c6e8e04', '1552374196-c4e7ffc6e126',
  '1521119989659-a83eee488004', '1517841905240-472988babdf9', '1544005313-94ddf0286df2',
  '1500648767791-00dcc994a43e', '1506794778202-cad84cf45f1d', '1534528741775-53994a69daeb',
  '1522075469751-3a6694fb2f61',
]
const travelIds = [
  '1587474260584-136574528ed5', '1524413840807-0c3cb6fa808d', '1532664189-01d4b3c4e',
  '1549989476-69a92fa57c36', '1506953823645-88706329a89c', '1476514525535-07fb3b4ae5f1',
  '1502602898657-3e91760cbb34', '1507525428034-b723cf961d3e', '1512343879784-a960bf40e7b2',
  '1469854523086-cc02fe5d8800',
]
const festivalIds = [
  '1532375810709-75f6e7bb8385', '1514222134-b57cbb8ce073', '1573455012057-f27b8e5d53a5',
  '1504457047772-27faf794c6c6', '1531058020178-b1e9bad1bd4e', '1528698827591-e19cef791f48',
  '1507003211169-0a1dd7228f2d', '1517841905240-472988babdf9', '1519501025264-65ba15a82390',
  '1496568816025-5b46f4520c76',
]

const streetTitles = [
  'Chandni Chowk Morning', 'The Chai Stand', 'Rickshaw Puller', 'Old Delhi Gate',
  'Spice Market', 'Barber in the Lane', 'Newspaper Reader', 'Cycle Repair',
  'Kite Seller', 'Temple Steps', 'Morning Milk Run', 'The Tailor',
]
const portraitTitles = [
  'The Weaver', 'Market Vendor', 'Flower Seller', 'Student',
  'Potter at Work', 'The Musician', 'Grandmother', 'Cobbler',
  'Street Performer', 'The Jeweller',
]
const travelTitles = [
  'Varanasi Ghat', 'Jaisalmer Fort', 'Pushkar Lake', 'Rishikesh Bridge',
  'Hampi Ruins', 'Kerala Backwaters', 'Rann of Kutch', 'Ladakh Monastery',
  'Meghalaya Bridge', 'Goa Chapel',
]
const festivalTitles = [
  'Holi Colours', 'Diwali Diyas', 'Navratri Dancer', 'Durga Puja Pandal',
  'Chhath Puja', 'Ganesh Visarjan', 'Eid Celebration', 'Baisakhi Fair',
  'Onam Boat Race', 'Lohri Bonfire',
]

function makePhotos(ids, titles, category, startFeatured = 0) {
  return ids.map((id, i) => ({
    _id: `photo-${category}-${i}`,
    title: titles[i] || `${category} photo ${i + 1}`,
    category,
    featured: i < startFeatured,
    order: i,
    image: makeImage(id, 800 + Math.floor(Math.random() * 400), 900 + Math.floor(Math.random() * 400)),
  }))
}

export const mockPhotos = [
  ...makePhotos(streetIds, streetTitles, 'street', 3),
  ...makePhotos(portraitIds, portraitTitles, 'portraits', 2),
  ...makePhotos(travelIds, travelTitles, 'travel', 2),
  ...makePhotos(festivalIds, festivalTitles, 'festivals', 2),
]

// ── Testimonials (8) ──
export const mockTestimonials = [
  {
    _id: 'test-1',
    clientName: 'Priya Mehta',
    eventType: 'portraits',
    quote: 'Keshav captured exactly the mood I wanted for my portfolio. The light, the expressions — everything was perfect. I keep coming back to these photos months later.',
    location: 'Delhi',
  },
  {
    _id: 'test-2',
    clientName: 'Rohit & Anjali',
    eventType: 'festivals',
    quote: 'We hired Keshav for our Mehndi ceremony and the photos are absolutely stunning. Every candid moment was captured so naturally.',
    location: 'Gurgaon',
  },
  {
    _id: 'test-3',
    clientName: 'Sameer Khan',
    eventType: 'street',
    quote: "I've followed Keshav's street work for a year before I asked him to shoot my café. He made the space look alive with just natural light.",
    location: 'Noida',
  },
  {
    _id: 'test-4',
    clientName: 'Deepika Rajan',
    eventType: 'portraits',
    quote: 'The maternity shoot was so comfortable and easy-going. Keshav has this calm energy that makes you forget there\'s a camera pointed at you.',
    location: 'Delhi',
  },
  {
    _id: 'test-5',
    clientName: 'Travel India Magazine',
    eventType: 'travel',
    quote: "Keshav's Varanasi series was the highlight of our monsoon issue. Raw, emotional, and deeply authentic.",
    location: 'Mumbai',
  },
  {
    _id: 'test-6',
    clientName: 'Nisha Aggarwal',
    eventType: 'other',
    quote: 'We needed product photos for our handloom brand and Keshav understood the earthy aesthetic immediately. Best decision we made.',
    location: 'Jaipur',
  },
  {
    _id: 'test-7',
    clientName: 'Amit Verma',
    eventType: 'street',
    quote: 'I bought a print of the Chandni Chowk series — it hangs in my living room and every guest asks about it.',
    location: 'Bangalore',
  },
  {
    _id: 'test-8',
    clientName: 'Fatima Sheikh',
    eventType: 'festivals',
    quote: 'The Eid photos Keshav took for our family are treasures. He was so respectful and unobtrusive while capturing every moment.',
    location: 'Delhi',
  },
]

// ── Journal Posts (4) ──
export const mockJournalPosts = [
  {
    _id: 'journal-1',
    title: 'Why I Walk the Same Streets Every Morning',
    slug: 'why-i-walk-the-same-streets',
    coverImage: makeImage('1524492412937-b28074a5d7da', 1600, 900),
    excerpt: 'Delhi changes light every hour. Here\'s what six years of walking Chandni Chowk before sunrise has taught me about seeing.',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', text: 'Every morning at 5:30, before the city wakes fully, I step into the lanes of Chandni Chowk with my camera. The light at that hour is unlike anything else — a soft gold that turns the crumbling walls into canvases and the dust into glitter.' }] },
      { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', text: 'The Same Lane, Never the Same Light' }] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', text: "People ask me how I can photograph the same streets day after day. The answer is simple: they're never the same. A chai-wallah's steam catches the light differently each morning. A sari hanging from a balcony shifts colour with the seasons. The faces change — a new shopkeeper, a visiting pilgrim, a child growing up frame by frame." }] },
      { _type: 'block', _key: 'b4', style: 'normal', children: [{ _type: 'span', text: 'Street photography is about patience and repetition. You walk until the scene arranges itself, until the geometry of the lane and the gesture of a hand align for one-fiftieth of a second.' }] },
    ],
    publishedAt: '2024-06-15T06:00:00Z',
  },
  {
    _id: 'journal-2',
    title: 'Shooting Holi Without Getting Your Lens Destroyed',
    slug: 'shooting-holi-guide',
    coverImage: makeImage('1532375810709-75f6e7bb8385', 1600, 900),
    excerpt: 'Practical tips for photographing India\'s most colourful (and most chaotic) festival without losing your gear.',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', text: 'Holi is the ultimate test for any photographer working in India. The colours are intoxicating, the energy is electric, and your equipment is in constant danger. Here\'s what I\'ve learned over five Holi seasons.' }] },
      { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', text: 'Gear Protection' }] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', text: 'Zip-lock bags and UV filters are your best friends. I tape a clear shower cap around the body and use a UV filter I don\'t mind replacing. The powder gets everywhere — into crevices you didn\'t know existed.' }] },
    ],
    publishedAt: '2024-03-20T06:00:00Z',
  },
  {
    _id: 'journal-3',
    title: 'The Ghats of Varanasi: A Photo Essay',
    slug: 'varanasi-ghats-photo-essay',
    coverImage: makeImage('1587474260584-136574528ed5', 1600, 900),
    excerpt: 'Three weeks on the banks of the Ganges, watching life and death unfold in the same frame.',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', text: 'Varanasi is not a city you photograph. It\'s a city that photographs itself through you. You just have to be present, quiet, and ready.' }] },
      { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', text: 'Dawn at Dashashwamedh' }] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', text: 'The first light hits the ghats at around 5:45 in winter. The priests are already mid-prayer, and the boats are carrying tourists who will see the city for the first time. I always position myself at the northern end, where the stairs curve and the smoke from the cremation ghat drifts across the frame.' }] },
    ],
    publishedAt: '2024-01-10T06:00:00Z',
  },
  {
    _id: 'journal-4',
    title: 'Why Every Photographer Needs a Project',
    slug: 'why-photographers-need-a-project',
    coverImage: makeImage('1506869640319-fe1a24fd76cb', 1600, 900),
    excerpt: 'Random great shots don\'t build a body of work. Here\'s how a long-term project changed my photography.',
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', text: 'For the first three years I shot everything. Markets, portraits, sunsets, food — anything that looked good in the viewfinder. My Instagram grew, but something felt hollow.' }] },
      { _type: 'block', _key: 'b2', style: 'h2', children: [{ _type: 'span', text: 'Finding Your Thread' }] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', text: 'A project gives your work a spine. It forces you to go deeper instead of wider, to return to a subject until you understand it, to say no to easy shots that don\'t serve the story.' }] },
    ],
    publishedAt: '2023-11-05T06:00:00Z',
  },
]

// ── Client Galleries (2) ──
export const mockClientGalleries = [
  {
    _id: 'cg-1',
    clientName: 'Priya & Rohit Wedding',
    slug: 'priya-rohit-wedding',
    shootDate: '2024-02-14',
    passcode: 'priya2024',
    coverImage: makeImage('1519501025264-65ba15a82390', 1200, 800),
    photos: [
      makeImage('1519501025264-65ba15a82390'),
      makeImage('1531746020798-e6953c6e8e04'),
      makeImage('1544005313-94ddf0286df2'),
      makeImage('1532375810709-75f6e7bb8385'),
      makeImage('1522075469751-3a6694fb2f61'),
      makeImage('1517841905240-472988babdf9'),
    ],
  },
  {
    _id: 'cg-2',
    clientName: 'Sameer Café Interiors',
    slug: 'sameer-cafe-interiors',
    shootDate: '2024-04-20',
    passcode: 'cafe2024',
    coverImage: makeImage('1506869640319-fe1a24fd76cb', 1200, 800),
    photos: [
      makeImage('1506869640319-fe1a24fd76cb'),
      makeImage('1504457047772-27faf794c6c6'),
      makeImage('1543429754-5da8a6a6cc59'),
      makeImage('1542838132-92c53300f7d0'),
    ],
  },
]
