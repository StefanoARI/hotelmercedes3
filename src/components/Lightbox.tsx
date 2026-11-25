import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { GalleryImage } from '../data/hotelData';

interface LightboxProps {
  images: GalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxProps) {
  const isOpen = activeIndex !== null && images.length > 0;
  const current = isOpen ? images[activeIndex] : null;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + images.length) % images.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, images.length, onClose, onChangeIndex]);

  return (
    <AnimatePresence>
      {isOpen && current && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#010722]/94 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Galleria fotografica"
          onClick={onClose}
        >
          <div
            className="flex w-full max-w-5xl items-center justify-between pb-4 text-white/85"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm tracking-wide tabular-nums text-[#badfff]">
              {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi galleria"
              className="flex h-11 w-11 items-center justify-center text-white/85 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#badfff]"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div
            className="relative flex w-full max-w-5xl flex-1 items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  onChangeIndex((activeIndex - 1 + images.length) % images.length)
                }
                aria-label="Immagine precedente"
                className="absolute left-0 md:-left-14 z-10 flex h-12 w-12 items-center justify-center bg-[#010722]/60 text-white hover:bg-[#2a7cc3] transition-colors focus-visible:outline-2 focus-visible:outline-[#badfff]"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <motion.img
              key={current.url}
              src={current.url}
              alt={current.alt}
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[74vh] max-w-full object-contain shadow-2xl"
            />

            {images.length > 1 && (
              <button
                type="button"
                onClick={() => onChangeIndex((activeIndex + 1) % images.length)}
                aria-label="Immagine successiva"
                className="absolute right-0 md:-right-14 z-10 flex h-12 w-12 items-center justify-center bg-[#010722]/60 text-white hover:bg-[#2a7cc3] transition-colors focus-visible:outline-2 focus-visible:outline-[#badfff]"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          <p
            className="mt-5 max-w-2xl text-center text-sm md:text-base text-white/85"
            onClick={(e) => e.stopPropagation()}
          >
            {current.caption || current.alt}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
