import { Instagram } from 'lucide-react';
import { HOTEL_CONTACT, type PageId } from '../data/hotelData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (roomId?: string) => void;
}

export function Footer({ onNavigate, onOpenBooking }: FooterProps) {
  return (
    <footer className="bg-[#010722] text-white/85">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand & Address */}
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-display text-3xl tracking-[0.04em] text-white"
            >
              Hotel Mercedes
            </button>
            <p className="mt-2 text-sm tracking-wide text-[#badfff]/85">
              {HOTEL_CONTACT.collection} · Limone sul Garda
            </p>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/75">
              Boutique hotel immerso nella quiete di un uliveto sulla Riviera
              bresciana del Lago di Garda, a 150 metri dalle spiagge e a 10 minuti
              a piedi dal centro storico.
            </p>
            <p className="mt-4 text-sm text-white/70">{HOTEL_CONTACT.address}</p>
          </div>

          {/* Navigation Mirror */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Esplora l’hotel
            </h3>
            <ul className="mt-4 space-y-3 text-[15px] text-white/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#badfff] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('camere')}
                  className="hover:text-[#badfff] transition-colors"
                >
                  Camere — Residenza Mercedes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('villa-oliveto')}
                  className="hover:text-[#badfff] transition-colors"
                >
                  Villa Oliveto — Dépendance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('ristorante')}
                  className="hover:text-[#badfff] transition-colors"
                >
                  Ristorante La Dolce Vita
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contatti')}
                  className="hover:text-[#badfff] transition-colors"
                >
                  Contatti e posizione
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Contatti e prenotazioni
            </h3>
            <dl className="mt-4 space-y-3 text-sm text-white/75">
              <div>
                <dt className="text-xs text-white/50">Reception e Ristorante</dt>
                <dd className="mt-0.5 flex flex-wrap items-center gap-x-2">
                  <a
                    href={HOTEL_CONTACT.receptionPhoneHref}
                    className="tabular-nums text-white hover:text-[#badfff] transition-colors"
                  >
                    {HOTEL_CONTACT.receptionPhone}
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={`mailto:${HOTEL_CONTACT.receptionEmail}`}
                    className="hover:text-[#badfff] transition-colors"
                  >
                    {HOTEL_CONTACT.receptionEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-white/50">Sede Principale</dt>
                <dd className="mt-0.5 flex flex-wrap items-center gap-x-2">
                  <a
                    href={HOTEL_CONTACT.hqPhoneHref}
                    className="tabular-nums text-white hover:text-[#badfff] transition-colors"
                  >
                    {HOTEL_CONTACT.hqPhone}
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={`mailto:${HOTEL_CONTACT.hqEmail}`}
                    className="hover:text-[#badfff] transition-colors"
                  >
                    {HOTEL_CONTACT.hqEmail}
                  </a>
                </dd>
              </div>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="px-5 py-2.5 bg-[#2a7cc3] hover:bg-[#1f64a1] text-white text-sm font-semibold transition-colors whitespace-nowrap"
                >
                  Prenota direttamente
                </button>
                <a
                  href={HOTEL_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-[#badfff] transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  <span>{HOTEL_CONTACT.instagramHandle}</span>
                </a>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {HOTEL_CONTACT.brand} —{' '}
            {HOTEL_CONTACT.collection}. Tutti i diritti riservati.
          </p>
          <p>{HOTEL_CONTACT.website}</p>
        </div>
      </div>
    </footer>
  );
}
