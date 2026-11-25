import { FormEvent, useState } from 'react';
import { Check, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { HOTEL_CONTACT } from '../data/hotelData';

interface ContactPageProps {
  onOpenBooking: (roomId?: string) => void;
}

export function ContactPage({ onOpenBooking }: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Informazioni soggiorno');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Inserisci il tuo nome e cognome.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Inserisci un indirizzo email valido.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setError('Scrivi un breve messaggio (almeno 10 caratteri).');
      return;
    }

    setSent(true);
  };

  return (
    <div className="pt-20 md:pt-24">
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm font-medium text-[#2a7cc3]">
            Contatti e posizione · {HOTEL_CONTACT.collection}
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-[3.5rem] leading-[1.08] text-[#07233b]">
            Siamo a tua disposizione sul Lago di Garda
          </h1>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-[#010722]/80">
            L’Hotel Mercedes si trova in Via Nanzello 12, in una zona tranquilla e
            panoramica sulla Riviera bresciana di Limone sul Garda, particolarmente
            apprezzata dalle coppie (valutata {HOTEL_CONTACT.couplesScore} per i
            soggiorni a due).
          </p>
        </motion.div>

        {/* Distances Bar */}
        <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-b border-[#abb8c3]/35 py-8 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-[#010722]/60">Spiaggia</dt>
            <dd className="mt-1 text-base font-semibold text-[#07233b]">
              A soli 150 metri a piedi dalle spiagge più belle di Limone
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#010722]/60">Centro storico</dt>
            <dd className="mt-1 text-base font-semibold text-[#07233b]">
              Raggiungibile con una piacevole passeggiata di 10 minuti
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#010722]/60">Collegamenti principali</dt>
            <dd className="mt-1 text-base font-semibold text-[#07233b]">
              A 16 minuti in auto da Riva del Garda e a 35 km da Rovereto
            </dd>
          </div>
        </dl>

        {/* Directory + Online Contact Form */}
        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Official Contact Directory */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-display text-3xl text-[#07233b]">
                Recapiti ufficiali
              </h2>
              <dl className="mt-6 divide-y divide-[#abb8c3]/30 border-t border-b border-[#abb8c3]/30 text-[15px]">
                <div className="py-4">
                  <dt className="text-xs text-[#010722]/60">Indirizzo</dt>
                  <dd className="mt-1 font-medium text-[#07233b]">
                    {HOTEL_CONTACT.brand} — {HOTEL_CONTACT.address}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs text-[#010722]/60">Ufficio Prenotazioni</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${HOTEL_CONTACT.bookingEmail}`}
                      className="font-medium text-[#2a7cc3] hover:underline"
                    >
                      {HOTEL_CONTACT.bookingEmail}
                    </a>
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs text-[#010722]/60">
                    Reception e Ristorante La Dolce Vita
                  </dt>
                  <dd className="mt-1 space-y-1">
                    <div>
                      <a
                        href={HOTEL_CONTACT.receptionPhoneHref}
                        className="font-medium tabular-nums text-[#07233b] hover:text-[#2a7cc3]"
                      >
                        {HOTEL_CONTACT.receptionPhone}
                      </a>
                    </div>
                    <div>
                      <a
                        href={`mailto:${HOTEL_CONTACT.receptionEmail}`}
                        className="text-sm text-[#2a7cc3] hover:underline"
                      >
                        {HOTEL_CONTACT.receptionEmail}
                      </a>
                    </div>
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs text-[#010722]/60">Sede Principale</dt>
                  <dd className="mt-1 space-y-1">
                    <div>
                      <a
                        href={HOTEL_CONTACT.hqPhoneHref}
                        className="font-medium tabular-nums text-[#07233b] hover:text-[#2a7cc3]"
                      >
                        {HOTEL_CONTACT.hqPhone}
                      </a>
                    </div>
                    <div>
                      <a
                        href={`mailto:${HOTEL_CONTACT.hqEmail}`}
                        className="text-sm text-[#2a7cc3] hover:underline"
                      >
                        {HOTEL_CONTACT.hqEmail}
                      </a>
                    </div>
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs text-[#010722]/60">Sito web e social</dt>
                  <dd className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <span className="font-medium text-[#07233b]">
                      {HOTEL_CONTACT.website}
                    </span>
                    <span aria-hidden="true" className="text-[#abb8c3]">
                      ·
                    </span>
                    <a
                      href={HOTEL_CONTACT.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-[#2a7cc3] hover:text-[#07233b]"
                    >
                      <Instagram className="h-4 w-4" />
                      <span>{HOTEL_CONTACT.instagramHandle}</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-[#f7f9fc] border border-[#abb8c3]/35 p-6">
              <p className="text-sm font-semibold text-[#07233b]">
                Vuoi verificare subito una tariffa?
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#010722]/75">
                Utilizza il modulo di prenotazione diretta per scegliere tra Residenza
                Mercedes e Villa Oliveto (pet-friendly).
              </p>
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="mt-5 px-5 py-2.5 bg-[#2a7cc3] hover:bg-[#1f64a1] text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Apri prenotazione diretta
              </button>
            </div>
          </div>

          {/* Online Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#abb8c3]/35 bg-white p-6 md:p-10">
              <h2 className="font-display text-3xl text-[#07233b]">
                Modulo di contatto online
              </h2>
              <p className="mt-2 text-sm text-[#010722]/75">
                Scrivici per richieste su misura, soggiorni in famiglia, trasferimenti
                o informazioni sulle camere di Villa Oliveto.
              </p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 py-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center bg-[#f7f9fc] border border-[#2a7cc3]/30 text-[#2a7cc3]">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-3xl text-[#07233b]">
                    Messaggio inviato
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#010722]/80">
                    Grazie, {name}. La reception dell’Hotel Mercedes ha ricevuto la
                    tua richiesta riguardo a <strong>{subject}</strong> e ti
                    risponderà al più presto all’indirizzo <strong>{email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setMessage('');
                    }}
                    className="mt-6 text-sm font-semibold text-[#2a7cc3] underline underline-offset-4 hover:text-[#07233b]"
                  >
                    Invia un altro messaggio
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-[#07233b]"
                      >
                        Nome e cognome *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Es. Laura Ferretti"
                        className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm text-[#010722] placeholder:text-[#abb8c3] focus:border-[#2a7cc3] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-[#07233b]"
                      >
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nome@esempio.it"
                        className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm text-[#010722] placeholder:text-[#abb8c3] focus:border-[#2a7cc3] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-medium text-[#07233b]"
                    >
                      Oggetto della richiesta
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="mt-2 w-full border border-[#abb8c3]/60 bg-white px-4 py-3 text-sm text-[#010722] focus:border-[#2a7cc3] focus:outline-none"
                    >
                      <option value="Informazioni soggiorno">
                        Informazioni soggiorno
                      </option>
                      <option value="Camere Residenza Mercedes">
                        Camere Residenza Mercedes
                      </option>
                      <option value="Villa Oliveto (soggiorno con cane)">
                        Villa Oliveto (soggiorno con cane)
                      </option>
                      <option value="Camera Giardino (preventivo su richiesta)">
                        Camera Giardino (preventivo su richiesta)
                      </option>
                      <option value="Ristorante La Dolce Vita">
                        Ristorante La Dolce Vita
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-[#07233b]"
                    >
                      Messaggio *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Indica le date desiderate, il numero di persone o qualsiasi domanda sulla struttura..."
                      className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm text-[#010722] placeholder:text-[#abb8c3] focus:border-[#2a7cc3] focus:outline-none resize-y"
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
                    Invia messaggio
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
