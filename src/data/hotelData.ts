export type PageId = 'home' | 'camere' | 'villa-oliveto' | 'ristorante' | 'contatti';

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface RoomData {
  id: string;
  building: 'Residenza Mercedes' | 'Villa Oliveto';
  name: string;
  capacity: string;
  maxGuests: number;
  size: string;
  priceLabel: string;
  basePrice: number | null; // null for "Su richiesta"
  summary: string;
  highlights: string[];
  petFriendly: boolean;
  mainImage: string;
  detailImages: string[];
}

export interface SurroundingsItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  details: string[];
}

export interface RecommendedRestaurant {
  name: string;
  description: string;
}

export const IMAGES = {
  home: {
    hero: 'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/65082597-c0b6-4307-bcdb-98ddb2e20bfe/image.jpg',
    roomsSection:
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/f53ae954-4f68-49fb-9955-a43c356c41ee/l334,t0,w1333,h1333/image-911x911.jpg',
    galleryThree: [
      {
        url: 'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/442f89bb-eab8-4545-9493-ffaf296079be/l334,t0,w1333,h1333/image.jpg',
        alt: 'Piscina a sfioro riscaldata con vista panoramica sul Lago di Garda e Monte Baldo',
        caption: 'Piscina a sfioro riscaldata vista Lago di Garda e Monte Baldo',
      },
      {
        url: 'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/64ac520e-57a5-4646-b02d-6d7c93c2de6b/l0,t180,w1440,h1440/image-911x911.jpg',
        alt: 'Terrazza solarium e area relax immersa nella quiete dell’Hotel Mercedes',
        caption: 'Terrazza solarium e vasca idromassaggio riscaldata',
      },
      {
        url: 'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/3c986e5d-7050-4469-82ce-547f853ab112/l334,t0,w1333,h1333/image-911x911.jpg',
        alt: 'Scorcio panoramico dell’Hotel Mercedes circondato dagli uliveti di Limone sul Garda',
        caption: 'Immerso nella quiete di un uliveto storico a Limone sul Garda',
      },
    ] as GalleryImage[],
    galleryTwo: [
      {
        url: 'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/6682cea9-c7e6-45d3-b6c6-905f5d9cfb6b/l0,t334,w1333,h1333/image.jpg',
        alt: 'Spazi esterni e giardino curato dell’Hotel Mercedes sul Lago di Garda',
        caption: 'Spazi verdi attrezzati e oasi di quiete',
      },
      {
        url: 'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/0736eb9d-7e21-4bdc-9db3-a597692cf05c/l0,t334,w1333,h1333/image.jpg',
        alt: 'Atmosfera elegante e colazione a bordo piscina dell’Hotel Mercedes',
        caption: 'L’eleganza dell’ospitalità affacciata sul lago',
      },
    ] as GalleryImage[],
    surroundings: {
      cultura:
        'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/a03db782-a4bb-482f-9e91-d851808c5ad0/l0,t96,w768,h576/image.jpg',
      gastronomia:
        'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/7ccbacc1-dfe4-41ae-9ee0-d05e12be3b46/l0,t352,w1406,h1055/image-768x576.jpg',
      tempoLibero:
        'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/8ae4b39a-8ebb-4084-a2b6-1ece1556987a/l0,t0,w640,h480/image.webp',
      spiagge:
        'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/106d1a93-de65-46a4-b2ce-57cc9984d681/l0,t142,w1400,h1050/image-768x576.jpg',
    },
    bestPriceBg:
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/c8002021-7f10-4f57-8b58-2b5b0f5354a5/image.jpg',
  },
  mainBuilding: {
    cover:
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/7995ada1-1e0e-415d-bb42-1f918671c2fa/l667,t0,w1333,h1333/image-768x768.jpg',
  },
  villaOliveto: {
    cover:
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/82dac8cd-f0b8-478d-9666-7df523230787/l0,t131,w1333,h1333/image-768x768.jpg',
  },
  restaurant: {
    hero: 'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/a6eac4bd-ea64-45b4-96fc-422bb23c504a/image.jpg',
    gallery: [
      {
        url: 'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/ef708241-d91c-4e1d-93b2-a2d44fe4af38/l0,t334,w1333,h1333/image.jpg',
        alt: 'Ristorante La Dolce Vita — colazione a buffet a bordo piscina',
        caption: 'Colazione a buffet servita direttamente a bordo piscina',
      },
      {
        url: 'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/2e8dde2a-e0a4-41ec-bd05-66c3036f00c8/l11,t0,w1298,h1298/image.jpg',
        alt: 'Ristorante La Dolce Vita — cucina italiana raffinata e piatti tipici locali',
        caption: 'Raffinata cucina italiana con menù à la carte e sapori del Garda',
      },
      {
        url: 'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/50c3453b-6408-4894-aba5-f14341c52b52/l334,t0,w1333,h1333/image-768x768.jpg',
        alt: 'Ristorante La Dolce Vita — sala affacciata sulla natura e sul Lago di Garda',
        caption: 'Atmosfera intima immersa nella natura con vista sul lago',
      },
    ] as GalleryImage[],
  },
};

export const STANDARD_ROOM_AMENITIES: string[] = [
  'Aria condizionata autonoma',
  'Connessione Wi-Fi gratuita',
  'TV satellitare a schermo piatto da 32"',
  'Minibar fornito',
  'Cassaforte privata',
  'Telefono diretto',
  'Bagno privato con doccia',
  'Posto auto riservato in garage privato coperto',
];

export const MAIN_BUILDING_ROOMS: RoomData[] = [
  {
    id: 'limone',
    building: 'Residenza Mercedes',
    name: 'Camera Limone',
    capacity: '1–2 persone',
    maxGuests: 2,
    size: '30 mq',
    priceLabel: 'Da 179 € / notte',
    basePrice: 179,
    summary:
      'Balcone con vista sulla piscina antistante e sul lago. Atmosfera intima e romantica, ideale per coppie.',
    highlights: [
      'Balcone privato vista piscina e Lago di Garda',
      'Completamente rinnovata con arredi eleganti',
      'Atmosfera intima pensata per soggiorni a due',
    ],
    petFriendly: false,
    mainImage:
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/87914bbf-ee78-4d09-95e6-ba5d6c0a31d5/l111,t0,w1777,h1333/image-1366x1025.jpg',
    detailImages: [
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/2b1392f7-b395-43af-a218-677cddfd00cb/l70,t553,w1192,h894/image-455x341.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/070ac623-e166-49ca-a95b-87f6f4f2bca8/l0,t417,w1333,h1000/image-455x341.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/9ca52f55-c8fc-4dce-9360-a4a2227e6437/l0,t508,w1312,h984/image-455x341.jpg',
    ],
  },
  {
    id: 'junior-suite-garda',
    building: 'Residenza Mercedes',
    name: 'Junior Suite Garda',
    capacity: '1–4 persone',
    maxGuests: 4,
    size: '40 mq',
    priceLabel: 'Da 179 € / notte',
    basePrice: 179,
    summary:
      'Balcone con vista lago frontale. Ideale per coppie o famiglie, dotata di ampio divano letto per 1–2 persone.',
    highlights: [
      'Balcone con vista lago frontale panoramica',
      'Ampio divano letto confortevole per 1–2 ospiti aggiuntivi',
      'Spazi luminosi di 40 mq per coppie o famiglie',
    ],
    petFriendly: false,
    mainImage:
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/d926e0ec-728b-477c-8b2c-299a6974bb2c/l0,t500,w1333,h1000/image.jpg',
    detailImages: [
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/5b865d1e-b12b-4df5-b9b4-535a546d3271/l111,t0,w1777,h1333/image-455x341.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/7fb911d9-81b0-4c70-9f89-c28f9fe34df8/l0,t908,w1333,h1000/image-455x341.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/9ca52f55-c8fc-4dce-9360-a4a2227e6437/l0,t508,w1312,h984/image-455x341.jpg',
    ],
  },
  {
    id: 'junior-suite-relax',
    building: 'Residenza Mercedes',
    name: 'Junior Suite Relax',
    capacity: '1–2 persone',
    maxGuests: 2,
    size: '50 mq',
    priceLabel: 'Da 209 € / notte',
    basePrice: 209,
    summary:
      'Arredamento elegante in stile orientale. Terrazza privata vista lago frontale attrezzata con lettini prendisole, tavolo e sedie, pensata per la massima privacy.',
    highlights: [
      'Arredamento ricercato ed elegante in stile orientale',
      'Terrazza privata vista lago frontale con lettini, tavolo e sedie',
      'Superficie generosa di 50 mq per la massima privacy',
    ],
    petFriendly: false,
    mainImage:
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/ac24301f-d9c9-4df9-a6a3-3afd502c1357/l111,t0,w1777,h1333/image-1366x1025.jpg',
    detailImages: [
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/7647bb01-ac2e-4646-b763-b38e5a36c685/l0,t500,w1333,h1000/image-455x341.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/f2d56e50-69b8-41a7-87b1-717e78d2e9e7/l43,t783,w1247,h935/image-455x341.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/82966a4b-4adc-4f76-8e42-37b316ef4b46/l0,t500,w1333,h1000/image-455x341.jpg',
    ],
  },
];

export const VILLA_OLIVETO_ROOMS: RoomData[] = [
  {
    id: 'villa-relax',
    building: 'Villa Oliveto',
    name: 'Camera Relax',
    capacity: '1–3 persone',
    maxGuests: 3,
    size: '22 mq',
    priceLabel: 'Da 159 € / notte',
    basePrice: 159,
    summary:
      'Situata al piano terra con piccolo spazio esterno, vista sul giardino e vista parziale sul lago.',
    highlights: [
      'Posizione comoda al piano terra con piccolo spazio esterno',
      'Affaccio sul giardino verde e vista parziale sul lago',
      'Cani ammessi in un’atmosfera semplice e informale',
    ],
    petFriendly: true,
    mainImage:
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/90bd7ef0-ba2b-431d-a5dd-1f3df74665d9/l0,t617,w1333,h1000/image-768x576.jpg',
    detailImages: [
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/86d49484-69c5-4c52-8ccb-0d0670359ff4/l0,t710,w1333,h1000/image-256x192.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/8b09261c-db5a-4f85-b59f-b3a55cab3c35/l111,t0,w1777,h1333/image-256x192.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/63f31f16-ac43-4f1c-88a2-5defea86ed24/l0,t500,w1333,h1000/image-256x192.jpg',
    ],
  },
  {
    id: 'villa-lago',
    building: 'Villa Oliveto',
    name: 'Camera Lago',
    capacity: '1–3 persone',
    maxGuests: 3,
    size: '24 mq',
    priceLabel: 'Da 179 € / notte',
    basePrice: 179,
    summary: 'Dotata di balcone con vista sul lago antistante.',
    highlights: [
      'Balcone privato affacciato sul Lago di Garda antistante',
      'Stile retrò e fascino storico della dépendance',
      'Cani ammessi, ideale per vacanze serene sul lago',
    ],
    petFriendly: true,
    mainImage:
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/bb6a23c3-a198-46d0-88a4-85e0ea56e237/l111,t0,w1777,h1333/image-768x576.jpg',
    detailImages: [
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/1437119e-373c-49cb-bf3f-fdeb3ca8eae5/l0,t500,w1333,h1000/image-256x192.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/4bac6e3e-c1f8-4545-87f3-5eccedd2ba20/l0,t500,w1333,h1000/image-256x192.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/ed1acd86-6965-477b-916b-5e131aad31e2/l0,t480,w1333,h1000/image-256x192.jpg',
    ],
  },
  {
    id: 'villa-giardino',
    building: 'Villa Oliveto',
    name: 'Camera Giardino',
    capacity: '1–4 persone',
    maxGuests: 4,
    size: '18 mq',
    priceLabel: 'Su richiesta',
    basePrice: null,
    summary:
      'Balcone con vista giardino. Composta da 1 camera matrimoniale e 1 camera matrimoniale piccola con porta comunicante e bagno in comune.',
    highlights: [
      'Due camere comunicanti (matrimoniale + matrimoniale piccola)',
      'Balcone con vista sul giardino e bagno in comune',
      'Soluzione pratica per famiglie, cani ammessi',
    ],
    petFriendly: true,
    mainImage:
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/4f94740b-e6a2-475f-8f68-871fc125fac6/l0,t500,w1333,h1000/image-768x576.jpg',
    detailImages: [
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/1c0ce170-1a87-4a8b-a577-93f87c6516ec/l0,t500,w1333,h1000/image-256x192.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/8b09261c-db5a-4f85-b59f-b3a55cab3c35/l111,t0,w1777,h1333/image-256x192.jpg',
      'https://www.mercedeshotel.com/wp-content/uploads/go-x/u/1b28affd-a2b3-4f2b-90c1-dd77da697e25/l111,t0,w1777,h1333/image-256x192.jpg',
    ],
  },
];

export const ALL_ROOMS: RoomData[] = [...MAIN_BUILDING_ROOMS, ...VILLA_OLIVETO_ROOMS];

export const HOTEL_SERVICES = [
  {
    number: '01',
    title: 'Piscina a sfioro riscaldata',
    description:
      'All’aperto, affacciata sul Lago di Garda e sul profilo maestoso del Monte Baldo, per nuotare sospesi tra cielo e acqua.',
  },
  {
    number: '02',
    title: 'Area relax e solarium',
    description:
      'Vasca idromassaggio riscaldata e ampia terrazza solarium panoramica per abbandonarsi alla quiete del pomeriggio.',
  },
  {
    number: '03',
    title: 'Giardino e svago',
    description:
      'Spazi verdi curati nell’uliveto, attrezzati con tavolo da ping pong e calcio balilla per momenti di leggerezza.',
  },
  {
    number: '04',
    title: 'Spazi comuni e bar interno',
    description:
      'Bar interno accogliente con sala TV, ideale per un aperitivo o un momento di pausa rientrando dal lago.',
  },
  {
    number: '05',
    title: 'Due garage privati coperti',
    description:
      'Posto auto riservato incluso per ogni camera nei 2 parcheggi coperti della struttura, per viaggiare senza pensieri.',
  },
];

export const RECOMMENDED_RESTAURANTS: RecommendedRestaurant[] = [
  {
    name: 'Ristorante & Pizzeria Dalco',
    description: 'Cucina elegante e raffinata.',
  },
  {
    name: "Garden Bistrot L'Andrunel",
    description: 'Ristorante locale dall’atmosfera romantica.',
  },
  {
    name: 'Dal Bigarola',
    description: 'Cucina italiana tradizionale e accogliente.',
  },
  {
    name: 'Scaloni 20',
    description: 'Panini e cocktail in un ambiente informale.',
  },
  {
    name: 'Dal Piasarot',
    description: 'Focacceria locale da asporto.',
  },
];

export const SURROUNDINGS_ITEMS: SurroundingsItem[] = [
  {
    id: 'cultura',
    title: 'Cultura',
    subtitle: 'Il borgo dei limoneti',
    image: IMAGES.home.surroundings.cultura,
    description:
      'Il borgo di Limone sul Garda, con i suoi circa 1.102 abitanti, è celebre in tutto il mondo per gli storici limoneti affacciati sul lago, il pregiato olio d’oliva extravergine e la longevità dei suoi abitanti.',
    details: [
      'Centro storico raggiungibile con una piacevole passeggiata di 10 minuti',
      'Riva del Garda a soli 16 minuti in auto lungo la riviera',
      'Rovereto a 35 km per escursioni culturali e museali',
    ],
  },
  {
    id: 'gastronomia',
    title: 'Guida gastronomica',
    subtitle: 'Sapori selezionati in zona',
    image: IMAGES.home.surroundings.gastronomia,
    description:
      'Oltre al nostro ristorante interno La Dolce Vita, Limone offre indirizzi autentici che spaziano dall’alta cucina italiana alle focaccerie artigianali del centro.',
    details: RECOMMENDED_RESTAURANTS.map((r) => `${r.name} — ${r.description}`),
  },
  {
    id: 'tempo-libero',
    title: 'Tempo libero',
    subtitle: 'Sport e percorsi panoramici',
    image: IMAGES.home.surroundings.tempoLibero,
    description:
      'I venti costanti dell’alto Garda e i sentieri a picco sull’acqua rendono Limone una destinazione d’elezione per gli amanti dell’aria aperta in ogni stagione.',
    details: [
      'Windsurf, vela e kitesurf nelle acque limpide del lago',
      'Trekking e mountain bike lungo i percorsi panoramici del circondario',
      'Pista ciclo-pedonale Garda Sospesa a strapiombo sul lago',
    ],
  },
  {
    id: 'spiagge',
    title: 'Spiagge',
    subtitle: 'A soli 150 metri a piedi',
    image: IMAGES.home.surroundings.spiagge,
    description:
      'L’Hotel Mercedes sorge a pochissimi passi dalle spiagge più belle della Riviera bresciana, offrendo un accesso immediato e sereno alle rive del Lago di Garda.',
    details: [
      'Spiaggia raggiungibile a piedi in 150 metri dalla struttura',
      'Zone soleggiate e aree ombreggiate per rilassarsi e nuotare',
      'Ideali sia per sport acquatici sia per giornate spensierate con i bambini',
    ],
  },
];

export const HOTEL_CONTACT = {
  brand: 'Hotel Mercedes',
  collection: 'Garbera Collection',
  address: 'Via Nanzello, 12 — 25010 Limone sul Garda (BS)',
  website: 'www.mercedeshotel.com',
  bookingEmail: 'info@mercedeshotel.com',
  receptionEmail: 'info@mercedeshotel.com',
  receptionPhone: '+39 0365 954073',
  receptionPhoneHref: 'tel:+390365954073',
  hqEmail: 'oscarsbeni@gmail.com',
  hqPhone: '+39 0365 954291',
  hqPhoneHref: 'tel:+390365954291',
  instagramHandle: '@hotelmercedeslimone',
  instagramUrl: 'https://www.instagram.com/hotelmercedeslimone/',
  couplesScore: '9,3',
};
