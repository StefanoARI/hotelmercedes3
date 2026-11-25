import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import type { GalleryImage, PageId } from './data/hotelData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal, type BookingPrefill } from './components/BookingModal';
import { Lightbox } from './components/Lightbox';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { VillaOlivetoPage } from './pages/VillaOlivetoPage';
import { RestaurantPage } from './pages/RestaurantPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<
    BookingPrefill | undefined
  >(undefined);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleNavigate = useCallback((page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenBooking = useCallback(
    (prefillOrRoomId?: string | BookingPrefill) => {
      if (typeof prefillOrRoomId === 'string') {
        setBookingPrefill({ roomId: prefillOrRoomId });
      } else {
        setBookingPrefill(prefillOrRoomId);
      }
      setBookingOpen(true);
    },
    []
  );

  const handleOpenLightbox = useCallback(
    (images: GalleryImage[], startIndex: number) => {
      setLightboxImages(images);
      setLightboxIndex(startIndex);
    },
    []
  );

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  useEffect(() => {
    const titles: Record<PageId, string> = {
      home: 'Hotel Mercedes — Limone sul Garda | Limen Collection',
      camere: 'Camere — Residenza Mercedes | Hotel Mercedes Limone sul Garda',
      'villa-oliveto':
        'Villa Oliveto — Dépendance Storica | Hotel Mercedes Limone sul Garda',
      ristorante:
        'Ristorante La Dolce Vita | Hotel Mercedes Limone sul Garda',
      contatti: 'Contatti e Posizione | Hotel Mercedes Limone sul Garda',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  const hasDarkHero = currentPage === 'home' || currentPage === 'ristorante';

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#010722]">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBooking}
          hasDarkHero={hasDarkHero}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentPage === 'home' && (
                <HomePage
                  onNavigate={handleNavigate}
                  onOpenBooking={handleOpenBooking}
                  onOpenLightbox={handleOpenLightbox}
                />
              )}
              {currentPage === 'camere' && (
                <RoomsPage
                  onNavigate={handleNavigate}
                  onOpenBooking={handleOpenBooking}
                  onOpenLightbox={handleOpenLightbox}
                />
              )}
              {currentPage === 'villa-oliveto' && (
                <VillaOlivetoPage
                  onNavigate={handleNavigate}
                  onOpenBooking={handleOpenBooking}
                  onOpenLightbox={handleOpenLightbox}
                />
              )}
              {currentPage === 'ristorante' && (
                <RestaurantPage onOpenLightbox={handleOpenLightbox} />
              )}
              {currentPage === 'contatti' && (
                <ContactPage onOpenBooking={handleOpenBooking} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBooking}
        />

        <BookingModal
          isOpen={bookingOpen}
          initialPrefill={bookingPrefill}
          onClose={() => setBookingOpen(false)}
        />

        <Lightbox
          images={lightboxImages}
          activeIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onChangeIndex={setLightboxIndex}
        />
      </div>
    </MotionConfig>
  );
}
