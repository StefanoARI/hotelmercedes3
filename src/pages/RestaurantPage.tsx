import { FormEvent, useState } from 'react';
import { Check, Expand, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { HOTEL_CONTACT, IMAGES, type GalleryImage } from '../data/hotelData';
import { EditorialImage } from '../components/EditorialImage';

interface RestaurantPageProps {
  onOpenLightbox: (images: GalleryImage[], startIndex: number) => void;
}

export function RestaurantPage({ onOpenLightbox }: RestaurantPageProps) {
  const [service, setService] = useState<'Pranzo' | 'Cena'>('Cena');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [reserved, setReserved] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Inserisci il nominativo per la prenotazione.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 6) {
      setError('Inserisci un recapito telefonico valido per la conferma.');
      return;
    }
    setReserved(true);
  };

  return (
    <div>
      {/* Hero Section — La Dolce Vita */}
      <section className="relative flex min-h-[74vh] items-end overflow-hidden bg-[#010722]">
        <motion.div
          initial={{ scale: 1.05, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <EditorialImage
            src={IMAGES.restaurant.hero}
            alt="Ristorante La Dolce Vita — Hotel Mercedes a Limone sul Garda"
            className="h-full w-full"
            priority
            fallbackLabel="Ristorante La Dolce Vita"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#010722]/85 via-[#07233b]/40 to-[#010722]/45"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-32 md:px-10 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-sm tracking-[0.14em] text-[#badfff]">
              Ristorazione · Hotel Mercedes, Limone sul Garda
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.06] text-white">
              Ristorante La Dolce Vita
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-white/88">
              All’interno dell’Hotel Mercedes, immerso nella natura e affacciato sul
              Lago di Garda: un’esperienza gastronomica che accompagna gli ospiti dal
              risveglio a bordo piscina fino alle cene à la carte vista lago.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="#prenota-tavolo"
                className="px-7 py-3.5 bg-[#2a7cc3] hover:bg-[#1f64a1] text-white text-sm font-semibold tracking-[0.03em] transition-colors whitespace-nowrap"
              >
                Prenota un tavolo
              </a>
              <a
                href={HOTEL_CONTACT.receptionPhoneHref}
                className="inline-flex items-center gap-2 text-sm font-medium tabular-nums text-white/95 hover:text-[#badfff] transition-colors whitespace-nowrap"
              >
                <Phone className="h-4 w-4" />
                <span>{HOTEL_CONTACT.receptionPhone}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Culinary Philosophy — Colazione & Pranzo/Cena */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#2a7cc3]">
              I momenti della tavola
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1.1] text-[#07233b]">
              Cucina italiana raffinata e sapori del Garda
            </h2>
          </div>

          <div className="lg:col-span-7 divide-y divide-[#abb8c3]/35 border-t border-b border-[#abb8c3]/35">
            <div className="py-7">
              <p className="text-xs font-semibold tabular-nums text-[#2a7cc3]">
                01. Il risveglio
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#07233b]">
                Colazione a buffet a bordo piscina
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-[#010722]/80">
                Una colazione ricca e curata, servita a buffet direttamente a bordo
                piscina per iniziare la giornata con la luce del mattino sul Lago di
                Garda e sul Monte Baldo.
              </p>
            </div>

            <div className="py-7">
              <p className="text-xs font-semibold tabular-nums text-[#2a7cc3]">
                02. La tavola del giorno e della sera
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#07233b]">
                Pranzo e cena à la carte
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-[#010722]/80">
                Raffinata cucina italiana con menù <em>à la carte</em> e piatti tipici
                locali, valorizzati dall’olio d’oliva pregiato e dalle eccellenze della
                Riviera bresciana.
              </p>
            </div>

            <div className="py-7">
              <p className="text-xs font-semibold tabular-nums text-[#2a7cc3]">
                03. Servizio dedicato
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#07233b]">
                Prenotazione tavoli
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-[#010722]/80">
                Contatta direttamente il ristorante e la reception al numero{' '}
                <a
                  href={HOTEL_CONTACT.receptionPhoneHref}
                  className="font-semibold tabular-nums text-[#2a7cc3] underline underline-offset-4"
                >
                  {HOTEL_CONTACT.receptionPhone}
                </a>{' '}
                oppure invia una richiesta qui sotto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Image Gallery */}
      <section className="bg-[#f7f9fc] border-t border-b border-[#abb8c3]/25 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#2a7cc3]">Galleria fotografica</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl text-[#07233b]">
                Atmosfere de La Dolce Vita
              </h2>
            </div>
            <p className="text-sm text-[#010722]/65">
              Clicca su una fotografia per ingrandire
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {IMAGES.restaurant.gallery.map((img, idx) => (
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
                onClick={() => onOpenLightbox(IMAGES.restaurant.gallery, idx)}
                className="group relative aspect-square w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7cc3]"
              >
                <EditorialImage
                  src={img.url}
                  alt={img.alt}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#010722]/75 via-[#010722]/20 to-transparent p-5">
                  <p className="text-sm text-white/95 leading-snug">{img.caption}</p>
                  <Expand className="h-4 w-4 shrink-0 ml-3 text-white/80" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Table Reservation Form */}
      <section id="prenota-tavolo" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#2a7cc3]">Prenotazione tavoli</p>
            <h2 className="mt-3 font-display text-4xl text-[#07233b]">
              Riserva la tua esperienza vista lago
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#010722]/80">
              Che sia un pranzo leggero dopo la piscina o una cena romantica al
              tramonto, il nostro team sarà lieto di riservarti il tavolo migliore.
            </p>
            <div className="mt-8 border-t border-[#abb8c3]/35 pt-6 space-y-2 text-sm text-[#010722]/80">
              <p>
                Telefono diretto:{' '}
                <a
                  href={HOTEL_CONTACT.receptionPhoneHref}
                  className="font-semibold tabular-nums text-[#07233b] hover:text-[#2a7cc3]"
                >
                  {HOTEL_CONTACT.receptionPhone}
                </a>
              </p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${HOTEL_CONTACT.receptionEmail}`}
                  className="font-semibold text-[#07233b] hover:text-[#2a7cc3]"
                >
                  {HOTEL_CONTACT.receptionEmail}
                </a>
              </p>
              <p>{HOTEL_CONTACT.address}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-[#abb8c3]/35 bg-white p-6 md:p-10">
              {reserved ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center bg-[#f7f9fc] border border-[#2a7cc3]/30 text-[#2a7cc3]">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-3xl text-[#07233b]">
                    Richiesta tavolo ricevuta
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#010722]/80">
                    Grazie, {name}. Abbiamo registrato la tua richiesta per{' '}
                    <strong>{service}</strong> del{' '}
                    <span className="tabular-nums">{date}</span> per{' '}
                    <span className="tabular-nums">{guests}</span>{' '}
                    {guests === 1 ? 'persona' : 'persone'}. Ti ricontatteremo al{' '}
                    <span className="tabular-nums">{phone}</span> per conferma.
                  </p>
                  <button
                    type="button"
                    onClick={() => setReserved(false)}
                    className="mt-6 text-sm font-semibold text-[#2a7cc3] underline underline-offset-4 hover:text-[#07233b]"
                  >
                    Effettua una nuova richiesta
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Service selector */}
                  <div>
                    <span className="block text-sm font-medium text-[#07233b]">
                      Servizio
                    </span>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      {(['Pranzo', 'Cena'] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setService(option)}
                          className={`py-3 text-sm font-semibold transition-colors ${
                            service === option
                              ? 'bg-[#07233b] text-white'
                              : 'border border-[#abb8c3]/60 text-[#07233b] hover:border-[#07233b]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="rest-date"
                        className="block text-sm font-medium text-[#07233b]"
                      >
                        Data
                      </label>
                      <input
                        id="rest-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm tabular-nums text-[#010722] focus:border-[#2a7cc3] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="rest-guests"
                        className="block text-sm font-medium text-[#07233b]"
                      >
                        Ospiti
                      </label>
                      <select
                        id="rest-guests"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="mt-2 w-full border border-[#abb8c3]/60 bg-white px-4 py-3 text-sm tabular-nums text-[#010722] focus:border-[#2a7cc3] focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'persona' : 'persone'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="rest-name"
                        className="block text-sm font-medium text-[#07233b]"
                      >
                        Nome e cognome *
                      </label>
                      <input
                        id="rest-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Es. Elena Conti"
                        className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm text-[#010722] placeholder:text-[#abb8c3] focus:border-[#2a7cc3] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="rest-phone"
                        className="block text-sm font-medium text-[#07233b]"
                      >
                        Telefono *
                      </label>
                      <input
                        id="rest-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+39 ..."
                        className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm text-[#010722] placeholder:text-[#abb8c3] focus:border-[#2a7cc3] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="rest-notes"
                      className="block text-sm font-medium text-[#07233b]"
                    >
                      Note o esigenze alimentari (facoltativo)
                    </label>
                    <textarea
                      id="rest-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tavolo in terrazza, allergie, ricorrenza..."
                      className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm text-[#010722] placeholder:text-[#abb8c3] focus:border-[#2a7cc3] focus:outline-none resize-none"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="text-sm font-medium text-[#9f2323] bg-[#fef2f2] border border-[#fecaca] px-4 py-3"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#2a7cc3] hover:bg-[#1f64a1] text-white text-sm font-semibold tracking-[0.03em] transition-colors"
                  >
                    Invia richiesta tavolo
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
