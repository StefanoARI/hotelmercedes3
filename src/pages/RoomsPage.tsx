import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import {
  IMAGES,
  MAIN_BUILDING_ROOMS,
  STANDARD_ROOM_AMENITIES,
  type GalleryImage,
  type PageId,
} from '../data/hotelData';
import { EditorialImage } from '../components/EditorialImage';
import { RoomShowcaseCard } from '../components/RoomShowcaseCard';

interface RoomsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (roomId?: string) => void;
  onOpenLightbox: (images: GalleryImage[], startIndex: number) => void;
}

export function RoomsPage({
  onNavigate,
  onOpenBooking,
  onOpenLightbox,
}: RoomsPageProps) {
  return (
    <div className="pt-20 md:pt-24">
      {/* Editorial Cover Split — Camere principali della proprietà */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-[#2a7cc3] font-medium">
                <span>Residenza Mercedes</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">29 camere e suite</span>
                <span aria-hidden="true">·</span>
                <span>Vista lago panoramica</span>
              </div>

              <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-[3.5rem] leading-[1.08] text-[#07233b]">
                Camere principali della proprietà
              </h1>

              <p className="mt-6 text-base md:text-lg leading-relaxed text-[#010722]/80">
                Completamente rinnovata con arredi eleganti e confortevoli, la Residenza
                Mercedes accoglie 29 camere e suite tutte dotate di vista panoramica
                sul Lago di Garda.
              </p>

              <p className="mt-4 text-[15px] leading-relaxed text-[#010722]/75">
                Per preservare la quiete e la cura degli arredi rinnovati, nella Residenza
                Mercedes gli <strong>animali non sono ammessi</strong>. Chi viaggia
                con il proprio cane è accolto con calore nella nostra dépendance
                storica{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('villa-oliveto')}
                  className="font-semibold text-[#2a7cc3] underline underline-offset-4 hover:text-[#07233b]"
                >
                  Villa Oliveto
                </button>
                .
              </p>
            </div>

            <div className="mt-8 border-t border-[#abb8c3]/35 pt-6 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => onOpenBooking('limone')}
                className="px-6 py-3 bg-[#2a7cc3] hover:bg-[#1f64a1] text-white text-sm font-semibold tracking-[0.02em] transition-colors whitespace-nowrap"
              >
                Prenota nella Residenza Mercedes
              </button>
              <button
                type="button"
                onClick={() => onNavigate('villa-oliveto')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#07233b] hover:text-[#2a7cc3] transition-colors whitespace-nowrap"
              >
                <span>Vedi anche Villa Oliveto (pet-friendly)</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <EditorialImage
              src={IMAGES.mainBuilding.cover}
              alt="Copertina Camere principali della proprietà — Hotel Mercedes"
              className="aspect-square lg:aspect-auto lg:h-full min-h-[360px] w-full"
              priority
              fallbackLabel="Residenza Mercedes"
            />
          </motion.div>
        </div>
      </section>

      {/* Room List: Limone, Junior Suite Garda, Junior Suite Relax */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10 md:pb-28 space-y-16 md:space-y-24">
        {MAIN_BUILDING_ROOMS.map((room, index) => (
          <RoomShowcaseCard
            key={room.id}
            room={room}
            index={index}
            onBook={onOpenBooking}
            onOpenLightbox={onOpenLightbox}
          />
        ))}
      </section>

      {/* Comparison Table & Standard Amenities */}
      <section className="bg-[#f7f9fc] border-t border-[#abb8c3]/25 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            {/* Comparison Table */}
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-[#2a7cc3]">
                Riepilogo tipologie
              </p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl text-[#07233b]">
                Confronto camere — Residenza Mercedes
              </h2>

              <div className="mt-8 overflow-x-auto bg-white border border-[#abb8c3]/35">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#abb8c3]/35 text-xs font-semibold text-[#07233b]/70">
                      <th className="py-4 px-5">Tipologia</th>
                      <th className="py-4 px-5">Capienza</th>
                      <th className="py-4 px-5">Superficie</th>
                      <th className="py-4 px-5 text-right">Prezzo indicativo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#abb8c3]/25 text-sm">
                    {MAIN_BUILDING_ROOMS.map((room) => (
                      <tr key={room.id} className="hover:bg-[#f7f9fc]/70 transition-colors">
                        <td className="py-4 px-5 font-semibold text-[#07233b]">
                          {room.name}
                        </td>
                        <td className="py-4 px-5 tabular-nums text-[#010722]/80">
                          {room.capacity}
                        </td>
                        <td className="py-4 px-5 tabular-nums text-[#010722]/80">
                          {room.size}
                        </td>
                        <td className="py-4 px-5 text-right font-semibold tabular-nums text-[#07233b]">
                          {room.priceLabel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Standard Amenities */}
            <div className="lg:col-span-5">
              <p className="text-sm font-medium text-[#2a7cc3]">
                Comfort incluso
              </p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl text-[#07233b]">
                Dotazioni standard
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#010722]/75">
                Ogni camera della Residenza Mercedes dispone delle dotazioni essenziali
                per un soggiorno sereno, incluso il posto auto riservato nei 2 garage
                privati coperti della struttura.
              </p>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-[#010722]/85">
                {STANDARD_ROOM_AMENITIES.map((amenity) => (
                  <li key={amenity} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-[1px] w-3.5 shrink-0 bg-[#2a7cc3]"
                    />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
