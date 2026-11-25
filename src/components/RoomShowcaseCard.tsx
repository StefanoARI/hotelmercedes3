import { useState } from 'react';
import { Expand, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { GalleryImage, RoomData } from '../data/hotelData';
import { EditorialImage } from './EditorialImage';

interface RoomShowcaseCardProps {
  room: RoomData;
  index: number;
  onBook: (roomId: string) => void;
  onOpenLightbox: (images: GalleryImage[], startIndex: number) => void;
}

export function RoomShowcaseCard({
  room,
  index,
  onBook,
  onOpenLightbox,
}: RoomShowcaseCardProps) {
  const allPhotos: GalleryImage[] = [
    {
      url: room.mainImage,
      alt: `${room.name} — vista principale (${room.building})`,
      caption: `${room.name} — ${room.size} · ${room.capacity}`,
    },
    ...room.detailImages.map((url, idx) => ({
      url,
      alt: `${room.name} — dettaglio ${idx + 1}`,
      caption: `${room.name} — Dettaglio degli interni e degli affacci (${idx + 1}/3)`,
    })),
  ];

  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const reversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start border-t border-[#abb8c3]/35 pt-12 md:pt-16"
    >
      {/* Visual Column: Main Image + 3 Interactive Detail Thumbnails */}
      <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
        <div className="group relative aspect-[4/3] w-full overflow-hidden bg-[#f7f9fc]">
          <EditorialImage
            src={allPhotos[selectedPhotoIdx].url}
            alt={allPhotos[selectedPhotoIdx].alt}
            className="h-full w-full"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            fallbackLabel={room.name}
          />
          <button
            type="button"
            onClick={() => onOpenLightbox(allPhotos, selectedPhotoIdx)}
            aria-label={`Ingrandisci le foto di ${room.name}`}
            className="absolute bottom-4 right-4 flex h-11 items-center gap-2 bg-[#010722]/75 px-4 text-xs font-medium tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-[#2a7cc3] focus-visible:outline-2 focus-visible:outline-white"
          >
            <Expand className="h-3.5 w-3.5" />
            <span>Galleria ({allPhotos.length})</span>
          </button>
        </div>

        {/* 4-frame Strip: Main + 3 Detail Photos */}
        <div className="mt-3 grid grid-cols-4 gap-3">
          {allPhotos.map((photo, idx) => {
            const isSelected = idx === selectedPhotoIdx;
            return (
              <button
                key={`${room.id}-thumb-${idx}`}
                type="button"
                onClick={() => setSelectedPhotoIdx(idx)}
                aria-label={`Mostra foto ${idx + 1} di ${room.name}`}
                aria-pressed={isSelected}
                className={`relative aspect-[4/3] overflow-hidden transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7cc3] ${
                  isSelected
                    ? 'ring-2 ring-[#2a7cc3] opacity-100'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <EditorialImage
                  src={photo.url}
                  alt={photo.alt}
                  className="h-full w-full"
                  fallbackLabel={room.name}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Editorial Details Column */}
      <div className={`lg:col-span-5 flex flex-col justify-between ${reversed ? 'lg:order-1' : ''}`}>
        <div>
          {/* Unboxed clean metadata */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[#010722]/65 tabular-nums">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span aria-hidden="true">·</span>
            <span>{room.building}</span>
            <span aria-hidden="true">·</span>
            <span>{room.size}</span>
            <span aria-hidden="true">·</span>
            <span>{room.capacity}</span>
          </div>

          <h2 className="mt-3 font-display text-3xl md:text-4xl text-[#07233b]">
            {room.name}
          </h2>

          <p className="mt-4 text-base md:text-[17px] leading-relaxed text-[#010722]/80">
            {room.summary}
          </p>

          {/* Key characteristics */}
          <ul className="mt-6 space-y-2.5 border-t border-[#abb8c3]/30 pt-6">
            {room.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] leading-snug text-[#010722]/85"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-[1px] w-4 shrink-0 bg-[#2a7cc3]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Specifications grid */}
          <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-b border-[#abb8c3]/30 py-4">
            <div>
              <dt className="text-xs text-[#010722]/60">Superficie</dt>
              <dd className="mt-1 text-base font-semibold tabular-nums text-[#07233b]">
                {room.size}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#010722]/60">Capienza</dt>
              <dd className="mt-1 text-base font-semibold tabular-nums text-[#07233b]">
                {room.capacity}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#010722]/60">Animali</dt>
              <dd className="mt-1 text-base font-semibold text-[#07233b]">
                {room.petFriendly ? 'Cani ammessi' : 'Non ammessi'}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="block text-xs text-[#010722]/60">Prezzo indicativo</span>
            <span className="font-display text-2xl md:text-[1.75rem] tabular-nums text-[#07233b]">
              {room.priceLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onBook(room.id)}
            className="inline-flex items-center gap-2 bg-[#2a7cc3] hover:bg-[#1f64a1] px-6 py-3 text-sm font-semibold tracking-[0.02em] text-white transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7cc3]"
          >
            <span>Richiedi disponibilità</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
