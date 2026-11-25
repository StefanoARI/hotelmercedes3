import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Expand,
  Minus,
  Plus,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  HOTEL_CONTACT,
  HOTEL_SERVICES,
  IMAGES,
  MAIN_BUILDING_ROOMS,
  RECOMMENDED_RESTAURANTS,
  STANDARD_ROOM_AMENITIES,
  SURROUNDINGS_ITEMS,
  VILLA_OLIVETO_ROOMS,
  type GalleryImage,
  type PageId,
} from '../data/hotelData';
import { EditorialImage } from '../components/EditorialImage';
import type { BookingPrefill } from '../components/BookingModal';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (prefillOrRoomId?: string | BookingPrefill) => void;
  onOpenLightbox: (images: GalleryImage[], startIndex: number) => void;
}

function getHeroDefaultDates() {
  const today = new Date();
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 7);
  const checkOut = new Date(today);
  checkOut.setDate(today.getDate() + 10);
  const fmt = (d: Date) => d.toISOString().split('T')[0];
  return {
    minDate: fmt(today),
    checkIn: fmt(checkIn),
    checkOut: fmt(checkOut),
  };
}

export function HomePage({
  onNavigate,
  onOpenBooking,
  onOpenLightbox,
}: HomePageProps) {
  const [activeSurroundingId, setActiveSurroundingId] = useState<string>(
    SURROUNDINGS_ITEMS[0].id
  );

  // Quick Hero Booking Module state
  const dateDefaults = useMemo(() => getHeroDefaultDates(), []);
  const [heroWing, setHeroWing] = useState<'main' | 'villa'>('main');
  const [heroCheckIn, setHeroCheckIn] = useState(dateDefaults.checkIn);
  const [heroCheckOut, setHeroCheckOut] = useState(dateDefaults.checkOut);
  const [heroGuests, setHeroGuests] = useState(2);
  const [heroRoomId, setHeroRoomId] = useState<string>(
    MAIN_BUILDING_ROOMS[0].id
  );
  const [heroError, setHeroError] = useState('');

  const wingRooms =
    heroWing === 'main' ? MAIN_BUILDING_ROOMS : VILLA_OLIVETO_ROOMS;

  const selectedHeroRoom =
    wingRooms.find((r) => r.id === heroRoomId) || wingRooms[0];

  const heroNights = useMemo(() => {
    const start = new Date(heroCheckIn);
    const end = new Date(heroCheckOut);
    const diff = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff > 0 ? diff : 0;
  }, [heroCheckIn, heroCheckOut]);

  const handleWingChange = (nextWing: 'main' | 'villa') => {
    setHeroWing(nextWing);
    const nextList =
      nextWing === 'main' ? MAIN_BUILDING_ROOMS : VILLA_OLIVETO_ROOMS;
    setHeroRoomId(nextList[0].id);
    if (heroGuests > nextList[0].maxGuests) {
      setHeroGuests(nextList[0].maxGuests);
    }
    setHeroError('');
  };

  const handleRoomChange = (roomId: string) => {
    setHeroRoomId(roomId);
    const found = wingRooms.find((r) => r.id === roomId);
    if (found && heroGuests > found.maxGuests) {
      setHeroGuests(found.maxGuests);
    }
    setHeroError('');
  };

  const handleQuickBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (heroNights <= 0) {
      setHeroError(
        'Seleziona una data di partenza successiva alla data di arrivo.'
      );
      return;
    }
    setHeroError('');
    onOpenBooking({
      roomId: selectedHeroRoom.id,
      checkIn: heroCheckIn,
      checkOut: heroCheckOut,
      guests: heroGuests,
      withDog: heroWing === 'villa',
    });
  };

  const activeSurrounding =
    SURROUNDINGS_ITEMS.find((item) => item.id === activeSurroundingId) ||
    SURROUNDINGS_ITEMS[0];

  return (
    <div>
      {/* 1. HERO SECTION — Architettura panoramica centrata con modulo rapido */}
      <section className="relative flex min-h-[96vh] flex-col justify-between overflow-hidden bg-[#010722]">
        {/* Full-bleed Lake Garda backdrop with subtle cinematic settle */}
        <motion.div
          initial={{ scale: 1.07, opacity: 0.92 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <EditorialImage
            src={IMAGES.home.hero}
            alt="Risveglio sul Lago di Garda — vista panoramica dall’Hotel Mercedes a Limone sul Garda"
            className="h-full w-full"
            priority
            fallbackLabel="Risveglio sul Lago di Garda"
          />
        </motion.div>

        {/* Sculpted radial + vertical scrim keeping the horizon luminous while guaranteeing crisp contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#010722]/65 via-[#07233b]/35 to-[#010722]/85"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(1,7,34,0.22)_0%,rgba(1,7,34,0.58)_100%)]"
        />

        {/* Delicate architectural perimeter frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-20 bottom-5 hidden md:block md:inset-x-8 md:top-24 md:bottom-8 border border-white/14"
        />

        {/* Top spacer for fixed navbar */}
        <div className="h-20 md:h-24 shrink-0" aria-hidden="true" />

        {/* Centered Editorial Lockup + Quick Booking Module */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-10 md:px-10 md:py-12">
          {/* Poetic Centered Title Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl"
          >
            <div className="flex items-center justify-center gap-4 text-xs md:text-sm tracking-[0.18em] text-[#badfff]">
              <span aria-hidden="true" className="h-px w-8 bg-[#badfff]/55" />
              <span>Limen Collection · Limone sul Garda</span>
              <span aria-hidden="true" className="h-px w-8 bg-[#badfff]/55" />
            </div>

            <h1 className="mt-5 font-display text-[clamp(2.65rem,5.8vw,4.9rem)] leading-[1.03] tracking-[0.01em] text-white">
              Risveglio sul Lago di Garda
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-[15px] md:text-[17px] leading-relaxed text-white/88">
              Un boutique hotel immerso nella quiete di un uliveto sulla Riviera
              bresciana, sospeso tra la piscina a sfioro riscaldata e il blu del lago.
            </p>
          </motion.div>

          {/* Centered Quick Booking Module */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 md:mt-11 w-full max-w-5xl"
          >
            {/* Integrated Architectural Wing Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#010722]/70 backdrop-blur-md border border-b-0 border-white/18 px-4 py-2.5 sm:px-6">
              <div
                role="tablist"
                aria-label="Scegli edificio"
                className="flex items-center gap-5"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={heroWing === 'main'}
                  onClick={() => handleWingChange('main')}
                  className={`relative py-1 text-xs sm:text-sm font-medium tracking-[0.02em] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#badfff] ${
                    heroWing === 'main'
                      ? 'text-white'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  Residenza Mercedes
                  {heroWing === 'main' && (
                    <motion.span
                      layoutId="hero-wing-indicator"
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-0 -bottom-2.5 h-[2px] bg-[#badfff]"
                    />
                  )}
                </button>

                <span aria-hidden="true" className="h-3.5 w-px bg-white/20" />

                <button
                  type="button"
                  role="tab"
                  aria-selected={heroWing === 'villa'}
                  onClick={() => handleWingChange('villa')}
                  className={`relative py-1 text-xs sm:text-sm font-medium tracking-[0.02em] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#badfff] ${
                    heroWing === 'villa'
                      ? 'text-white'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  Villa Oliveto · Ammessi i cani
                  {heroWing === 'villa' && (
                    <motion.span
                      layoutId="hero-wing-indicator"
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-x-0 -bottom-2.5 h-[2px] bg-[#badfff]"
                    />
                  )}
                </button>
              </div>

              <p className="hidden md:block text-xs text-[#badfff]/90 tabular-nums">
                {selectedHeroRoom.priceLabel} · {selectedHeroRoom.size}
              </p>
            </div>

            {/* Main Frosted Ivory Booking Bar */}
            <form
              onSubmit={handleQuickBookingSubmit}
              noValidate
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_0.85fr_1.25fr_auto] divide-y sm:divide-y-0 lg:divide-x divide-[#abb8c3]/35 bg-white/96 backdrop-blur-md shadow-[0_28px_70px_rgba(1,7,34,0.42)] border border-white/80"
            >
              {/* Arrivo */}
              <div className="px-5 py-4 flex flex-col justify-center">
                <label
                  htmlFor="hero-checkin"
                  className="text-[11px] font-semibold tracking-[0.08em] text-[#07233b]/65"
                >
                  Arrivo
                </label>
                <input
                  id="hero-checkin"
                  type="date"
                  min={dateDefaults.minDate}
                  value={heroCheckIn}
                  onChange={(e) => {
                    setHeroCheckIn(e.target.value);
                    setHeroError('');
                  }}
                  className="mt-1 w-full bg-transparent text-[15px] font-semibold tabular-nums text-[#010722] focus:outline-none"
                />
              </div>

              {/* Partenza */}
              <div className="px-5 py-4 flex flex-col justify-center sm:border-l sm:border-[#abb8c3]/35 lg:border-l-0">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="hero-checkout"
                    className="text-[11px] font-semibold tracking-[0.08em] text-[#07233b]/65"
                  >
                    Partenza
                  </label>
                  {heroNights > 0 && (
                    <span className="text-[11px] font-medium tabular-nums text-[#2a7cc3]">
                      {heroNights} {heroNights === 1 ? 'notte' : 'notti'}
                    </span>
                  )}
                </div>
                <input
                  id="hero-checkout"
                  type="date"
                  min={heroCheckIn || dateDefaults.minDate}
                  value={heroCheckOut}
                  onChange={(e) => {
                    setHeroCheckOut(e.target.value);
                    setHeroError('');
                  }}
                  className="mt-1 w-full bg-transparent text-[15px] font-semibold tabular-nums text-[#010722] focus:outline-none"
                />
              </div>

              {/* Ospiti stepper */}
              <div className="px-5 py-4 flex flex-col justify-center sm:border-t sm:border-[#abb8c3]/35 lg:border-t-0">
                <span className="text-[11px] font-semibold tracking-[0.08em] text-[#07233b]/65">
                  Ospiti
                </span>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-[15px] font-semibold tabular-nums text-[#010722] whitespace-nowrap">
                    {heroGuests} {heroGuests === 1 ? 'ospite' : 'ospiti'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setHeroGuests((g) => Math.max(1, g - 1))}
                      disabled={heroGuests <= 1}
                      aria-label="Riduci numero ospiti"
                      className="flex h-8 w-8 items-center justify-center border border-[#abb8c3]/50 text-[#07233b] hover:border-[#2a7cc3] hover:text-[#2a7cc3] disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setHeroGuests((g) =>
                          Math.min(selectedHeroRoom.maxGuests, g + 1)
                        )
                      }
                      disabled={heroGuests >= selectedHeroRoom.maxGuests}
                      aria-label="Aumenta numero ospiti"
                      className="flex h-8 w-8 items-center justify-center border border-[#abb8c3]/50 text-[#07233b] hover:border-[#2a7cc3] hover:text-[#2a7cc3] disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sistemazione */}
              <div className="px-5 py-4 flex flex-col justify-center sm:border-t sm:border-l sm:border-[#abb8c3]/35 lg:border-t-0 lg:border-l-0">
                <label
                  htmlFor="hero-room"
                  className="text-[11px] font-semibold tracking-[0.08em] text-[#07233b]/65"
                >
                  Sistemazione
                </label>
                <select
                  id="hero-room"
                  value={selectedHeroRoom.id}
                  onChange={(e) => handleRoomChange(e.target.value)}
                  className="mt-1 w-full bg-transparent text-[15px] font-semibold text-[#010722] focus:outline-none truncate pr-2"
                >
                  {wingRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} ({room.capacity})
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="group sm:col-span-2 lg:col-span-1 flex items-center justify-center gap-2.5 bg-[#2a7cc3] hover:bg-[#1f64a1] px-7 py-5 text-sm font-semibold tracking-[0.03em] text-white transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
              >
                <span>Verifica disponibilità</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </form>

            {heroError && (
              <p
                role="alert"
                className="mt-2.5 text-center text-xs font-medium text-[#fecaca]"
              >
                {heroError}
              </p>
            )}

            {/* Quiet direct-booking assurances + quick page links */}
            <div className="mt-5 flex flex-col items-center justify-between gap-3 text-xs text-white/80 sm:flex-row sm:px-1">
              <p className="text-center sm:text-left">
                Miglior tariffa garantita · Colazione a bordo piscina · Garage privato coperto incluso
              </p>
              <div className="flex items-center gap-5 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('camere')}
                  className="inline-flex items-center gap-1 text-white/90 hover:text-[#badfff] transition-colors whitespace-nowrap"
                >
                  <span>Esplora le camere</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('ristorante')}
                  className="inline-flex items-center gap-1 text-white/90 hover:text-[#badfff] transition-colors whitespace-nowrap"
                >
                  <span>La Dolce Vita</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Architectural Coordinates & Scroll Cue */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pb-7 md:px-12 md:pb-11 text-xs text-white/65">
          <span className="hidden md:inline tabular-nums tracking-[0.08em]">
            45°48′ N · 10°47′ E
          </span>

          <a
            href="#posizioni-hotel"
            className="mx-auto md:mx-0 inline-flex flex-col items-center gap-2 text-white/80 hover:text-[#badfff] transition-colors"
          >
            <span className="text-[11px] tracking-[0.14em]">Scopri l’hotel</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </a>

          <span className="hidden md:inline tracking-[0.04em]">
            Via Nanzello 12 · Limone sul Garda
          </span>
        </div>
      </section>

      {/* Architectural Location & Trust Strip (below hero split) */}
      <section
        id="posizioni-hotel"
        aria-label="Posizione e punti di forza"
        className="border-b border-[#abb8c3]/30 bg-[#f7f9fc]"
      >
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            <div>
              <dt className="text-xs text-[#010722]/60">Soggiorni a due</dt>
              <dd className="mt-1 font-display text-2xl md:text-3xl tabular-nums text-[#07233b]">
                {HOTEL_CONTACT.couplesScore} / 10
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#010722]/60">Spiagge più vicine</dt>
              <dd className="mt-1 font-display text-2xl md:text-3xl tabular-nums text-[#07233b]">
                150 m
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#010722]/60">Centro storico</dt>
              <dd className="mt-1 font-display text-2xl md:text-3xl tabular-nums text-[#07233b]">
                10 min
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#010722]/60">Riva del Garda</dt>
              <dd className="mt-1 font-display text-2xl md:text-3xl tabular-nums text-[#07233b]">
                16 min
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-xs text-[#010722]/60">Collegamento Rovereto</dt>
              <dd className="mt-1 font-display text-2xl md:text-3xl tabular-nums text-[#07233b]">
                35 km
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 2. SEZIONE CAMERE E SUITE — Due anime dell'ospitalità */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-sm text-[#2a7cc3] font-medium tracking-[0.06em]">
                Camere e Suite · Due edifici distinti
              </p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1.1] text-[#07233b]">
                L’eleganza del lago, in due stili d’accoglienza
              </h2>
              <p className="mt-5 text-base md:text-[17px] leading-relaxed text-[#010722]/80">
                L’Hotel Mercedes si divide in due edifici distinti con stili e regole
                differenti, pensati per offrire sia ambienti completamente rinnovati
                con vista panoramica sia un’ala storica più informale e pet-friendly.
              </p>

              {/* Two buildings editorial directory */}
              <div className="mt-9 divide-y divide-[#abb8c3]/35 border-t border-b border-[#abb8c3]/35">
                <div className="py-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-md">
                    <div className="flex items-center gap-2 text-xs text-[#010722]/60 tabular-nums">
                      <span>01</span>
                      <span aria-hidden="true">·</span>
                      <span>29 camere e suite</span>
                      <span aria-hidden="true">·</span>
                      <span>Animali non ammessi</span>
                    </div>
                    <h3 className="mt-1.5 text-xl font-semibold text-[#07233b]">
                      Residenza Mercedes
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#010722]/75">
                      Completamente rinnovata con arredi eleganti e confortevoli. Tutte
                      le sistemazioni godono di vista panoramica sul Lago di Garda.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('camere')}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a7cc3] hover:text-[#07233b] transition-colors whitespace-nowrap shrink-0 mt-1"
                  >
                    <span>Scopri</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="py-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-md">
                    <div className="flex items-center gap-2 text-xs text-[#010722]/60 tabular-nums">
                      <span>02</span>
                      <span aria-hidden="true">·</span>
                      <span>14–15 camere</span>
                      <span aria-hidden="true">·</span>
                      <span>Ammessi i cani</span>
                    </div>
                    <h3 className="mt-1.5 text-xl font-semibold text-[#07233b]">
                      Villa Oliveto — Dépendance storica
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#010722]/75">
                      La parte più storica dell’hotel, dallo stile retrò e dall’atmosfera
                      semplice e informale, ideale per vacanze in famiglia con il proprio cane.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('villa-oliveto')}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a7cc3] hover:text-[#07233b] transition-colors whitespace-nowrap shrink-0 mt-1"
                  >
                    <span>Scopri</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold tracking-wide text-[#07233b]">
                Dotazioni standard in ogni camera
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#010722]/70">
                {STANDARD_ROOM_AMENITIES.join(' · ')}.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <button
              type="button"
              onClick={() =>
                onOpenLightbox(
                  [
                    {
                      url: IMAGES.home.roomsSection,
                      alt: 'Camere e Suite dell’Hotel Mercedes a Limone sul Garda',
                      caption: 'Camere e Suite panoramiche — Hotel Mercedes',
                    },
                  ],
                  0
                )
              }
              className="group relative block h-full min-h-[380px] w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7cc3]"
            >
              <EditorialImage
                src={IMAGES.home.roomsSection}
                alt="Camere e Suite con vista panoramica all’Hotel Mercedes"
                className="h-full w-full lg:h-full"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                fallbackLabel="Camere e Suite"
              />
              <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-[#010722]/70 text-white backdrop-blur-sm transition-colors group-hover:bg-[#2a7cc3]">
                <Expand className="h-4 w-4" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. GALLERIA CENTRALE (3 IMMAGINI) + PISCINA, BENESSERE E SERVIZI */}
      <section className="bg-[#f7f9fc] border-t border-b border-[#abb8c3]/25 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="max-w-2xl">
            <p className="text-sm text-[#2a7cc3] font-medium tracking-[0.06em]">
              Piscina, benessere e servizi in struttura
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1.1] text-[#07233b]">
              Sospesi tra la piscina a sfioro e il Monte Baldo
            </h2>
          </div>

          {/* 3-Image Editorial Gallery */}
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {IMAGES.home.galleryThree.map((img, idx) => (
              <motion.button
                key={img.url}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => onOpenLightbox(IMAGES.home.galleryThree, idx)}
                className="group relative aspect-square w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7cc3]"
              >
                <EditorialImage
                  src={img.url}
                  alt={img.alt}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#010722]/75 via-[#010722]/25 to-transparent p-5 opacity-95 transition-opacity">
                  <p className="text-sm text-white/95 leading-snug">
                    {img.caption}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Numbered Editorial Services List */}
          <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3 border-t border-[#abb8c3]/35 pt-12">
            {HOTEL_SERVICES.map((service) => (
              <div key={service.number} className="space-y-2">
                <p className="text-xs font-semibold tabular-nums text-[#2a7cc3]">
                  {service.number}.
                </p>
                <h3 className="text-lg font-semibold text-[#07233b]">
                  {service.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#010722]/75">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERIA CENTRALE (2 IMMAGINI) + RISTORANTE LA DOLCE VITA TEASER */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm text-[#2a7cc3] font-medium tracking-[0.06em]">
              L’oasi nell’uliveto · Ristorazione
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1.1] text-[#07233b]">
              Quietamente immersi nella natura, affacciati sul lago
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('ristorante')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#07233b] hover:text-[#2a7cc3] transition-colors whitespace-nowrap self-start md:self-end"
          >
            <span>Scopri il Ristorante La Dolce Vita</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {IMAGES.home.galleryTwo.map((img, idx) => (
            <motion.button
              key={img.url}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.65,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onOpenLightbox(IMAGES.home.galleryTwo, idx)}
              className="group relative aspect-[4/3] w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7cc3]"
            >
              <EditorialImage
                src={img.url}
                alt={img.alt}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#010722]/75 via-[#010722]/20 to-transparent p-6">
                <p className="text-sm md:text-base text-white/95">{img.caption}</p>
                <Expand className="h-4 w-4 text-white/80 shrink-0 ml-4" />
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 border-t border-[#abb8c3]/30 pt-8 md:grid-cols-3">
          <div>
            <h3 className="text-base font-semibold text-[#07233b]">
              Colazione a bordo piscina
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#010722]/75">
              Un risveglio ricco e curato, servito a buffet direttamente sulla
              terrazza a bordo piscina con vista sul Lago di Garda.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#07233b]">
              Pranzo e cena à la carte
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#010722]/75">
              Al ristorante interno La Dolce Vita la raffinata cucina italiana
              incontra i piatti tipici del territorio gardesano.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#07233b]">
              Prenotazione tavoli
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#010722]/75">
              Per riservare un tavolo affacciato sul lago chiama direttamente il{' '}
              <a
                href={HOTEL_CONTACT.receptionPhoneHref}
                className="font-medium tabular-nums text-[#2a7cc3] hover:underline"
              >
                {HOTEL_CONTACT.receptionPhone}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 5. SEZIONE DINTORNI — Esperienze a Limone sul Garda */}
      <section className="bg-[#f7f9fc] border-t border-[#abb8c3]/25 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm text-[#2a7cc3] font-medium tracking-[0.06em]">
              Esperienze e dintorni · Limone sul Garda
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1.1] text-[#07233b]">
              Un borgo di limoneti, vento e longevità
            </h2>
            <p className="mt-4 text-base md:text-[17px] leading-relaxed text-[#010722]/80">
              Il borgo di Limone sul Garda (circa 1.102 abitanti) è celebre per i suoi
              storici limoneti, il pregiato olio d’oliva e la longevità dei suoi abitanti.
              Seleziona un tema per scoprire i nostri consigli dedicati.
            </p>
          </div>

          {/* 4 Interactive Cards with exact provided images */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SURROUNDINGS_ITEMS.map((item) => {
              const isSelected = item.id === activeSurrounding.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSurroundingId(item.id)}
                  aria-pressed={isSelected}
                  className={`group flex flex-col text-left bg-white transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7cc3] ${
                    isSelected
                      ? 'ring-2 ring-[#2a7cc3]'
                      : 'border border-[#abb8c3]/35 hover:border-[#07233b]/50'
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <EditorialImage
                      src={item.image}
                      alt={`${item.title} a Limone sul Garda`}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-[#2a7cc3] font-medium">
                        {item.subtitle}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-[#07233b]">
                        {item.title}
                      </h3>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#07233b]/75 group-hover:text-[#2a7cc3] transition-colors">
                      <span>{isSelected ? 'Scheda aperta' : 'Approfondisci'}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Surrounding Editorial Detail Panel */}
          <motion.div
            key={activeSurrounding.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 bg-white border border-[#abb8c3]/35 p-6 md:p-10"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium tracking-[0.08em] text-[#2a7cc3]">
                  {activeSurrounding.subtitle}
                </p>
                <h3 className="mt-2 font-display text-3xl text-[#07233b]">
                  {activeSurrounding.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#010722]/80">
                  {activeSurrounding.description}
                </p>
              </div>
              <div className="lg:col-span-7 border-t border-[#abb8c3]/30 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                {activeSurrounding.id === 'gastronomia' ? (
                  <div>
                    <p className="text-xs font-semibold text-[#07233b]">
                      Locali e ristoranti consigliati dall’hotel in zona
                    </p>
                    <ul className="mt-4 divide-y divide-[#abb8c3]/25">
                      {RECOMMENDED_RESTAURANTS.map((place) => (
                        <li
                          key={place.name}
                          className="py-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"
                        >
                          <span className="font-semibold text-[15px] text-[#07233b]">
                            {place.name}
                          </span>
                          <span className="text-sm text-[#010722]/75">
                            {place.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {activeSurrounding.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-[15px] leading-relaxed text-[#010722]/85"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-[1px] w-4 shrink-0 bg-[#2a7cc3]"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. SEZIONE MIGLIOR PREZZO — Prenotazione Diretta */}
      <section className="relative overflow-hidden bg-[#010722] py-24 md:py-32">
        <div className="absolute inset-0">
          <EditorialImage
            src={IMAGES.home.bestPriceBg}
            alt="Panorama sul Lago di Garda — Miglior prezzo garantito sul sito ufficiale Hotel Mercedes"
            className="h-full w-full"
            fallbackLabel="Miglior Prezzo Garantito"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#010722]/88 via-[#07233b]/75 to-[#010722]/65"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-sm tracking-[0.12em] text-[#badfff]">
              Prenotazione diretta · {HOTEL_CONTACT.website}
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1.1] text-white">
              Miglior prezzo garantito sul sito ufficiale
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-white/85">
              Prenotando direttamente con il nostro Ufficio Prenotazioni hai sempre
              accesso alle migliori tariffe stagionali, alla scelta dedicata tra Residenza
              Mercedes e Villa Oliveto, al posto auto riservato nei nostri 2 garage
              privati coperti e alla colazione a buffet a bordo piscina.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="px-7 py-3.5 bg-[#2a7cc3] hover:bg-[#1f64a1] text-white text-sm font-semibold tracking-[0.03em] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#badfff]"
              >
                Prenota ora al miglior prezzo
              </button>
              <a
                href={`mailto:${HOTEL_CONTACT.bookingEmail}`}
                className="text-sm font-medium text-white/90 hover:text-[#badfff] underline underline-offset-4 transition-colors"
              >
                {HOTEL_CONTACT.bookingEmail}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
