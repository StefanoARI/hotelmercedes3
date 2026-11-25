import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { PageId } from '../data/hotelData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: (roomId?: string) => void;
  hasDarkHero: boolean;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'camere', label: 'Camere' },
  { id: 'villa-oliveto', label: 'Villa Oliveto' },
  { id: 'ristorante', label: 'La Dolce Vita' },
  { id: 'contatti', label: 'Contatti' },
];

export function Navbar({
  currentPage,
  onNavigate,
  onOpenBooking,
  hasDarkHero,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPage]);

  const overDark = hasDarkHero && !scrolled && !mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        overDark
          ? 'bg-gradient-to-b from-[#010722]/70 to-transparent text-white'
          : 'bg-white/95 backdrop-blur-md text-[#07233b] border-b border-[#abb8c3]/30'
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between gap-8 px-5 md:px-10">
        {/* Zone 1: Single text element wordmark in Italiana */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`font-display text-2xl md:text-[1.75rem] leading-none tracking-[0.04em] whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2a7cc3] ${
            overDark ? 'text-white' : 'text-[#07233b]'
          }`}
        >
          Hotel Mercedes
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navigazione principale"
          className="hidden lg:flex items-center gap-8"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-[15px] font-medium tracking-[0.02em] whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2a7cc3] ${
                  overDark
                    ? isActive
                      ? 'text-[#badfff]'
                      : 'text-white/90 hover:text-[#badfff]'
                    : isActive
                      ? 'text-[#2a7cc3]'
                      : 'text-[#07233b]/85 hover:text-[#2a7cc3]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute left-0 right-0 bottom-0 h-[1.5px] ${
                      overDark ? 'bg-[#badfff]' : 'bg-[#2a7cc3]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action (plus mobile menu toggle on smaller viewports) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 text-sm font-semibold tracking-[0.03em] text-white bg-[#2a7cc3] hover:bg-[#1f64a1] active:scale-[0.98] transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7cc3]"
          >
            Prenota ora
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={mobileMenuOpen}
            className={`lg:hidden flex h-11 w-11 items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7cc3] ${
              overDark ? 'text-white' : 'text-[#07233b]'
            }`}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Navigazione mobile"
            className="lg:hidden bg-white border-b border-[#abb8c3]/30 px-6 pb-6 pt-3 shadow-lg"
          >
            <div className="flex flex-col divide-y divide-[#abb8c3]/25">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex min-h-[48px] items-center justify-between text-left text-base font-medium transition-colors ${
                      isActive ? 'text-[#2a7cc3]' : 'text-[#07233b]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="h-[1.5px] w-6 bg-[#2a7cc3]" />}
                  </button>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
