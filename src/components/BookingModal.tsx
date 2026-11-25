import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ALL_ROOMS, HOTEL_CONTACT } from '../data/hotelData';

export interface BookingPrefill {
  roomId?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  withDog?: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  initialPrefill?: BookingPrefill;
  onClose: () => void;
}

function getDefaultDates() {
  const today = new Date();
  const checkIn = new Date(today);
  checkIn.setDate(today.getDate() + 7);
  const checkOut = new Date(today);
  checkOut.setDate(today.getDate() + 10);

  const fmt = (d: Date) => d.toISOString().split('T')[0];
  return { checkIn: fmt(checkIn), checkOut: fmt(checkOut) };
}

export function BookingModal({
  isOpen,
  initialPrefill,
  onClose,
}: BookingModalProps) {
  const defaults = useMemo(() => getDefaultDates(), []);

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialPrefill?.roomId || ALL_ROOMS[0].id
  );
  const [checkIn, setCheckIn] = useState(
    initialPrefill?.checkIn || defaults.checkIn
  );
  const [checkOut, setCheckOut] = useState(
    initialPrefill?.checkOut || defaults.checkOut
  );
  const [guests, setGuests] = useState(initialPrefill?.guests || 2);
  const [withDog, setWithDog] = useState(Boolean(initialPrefill?.withDog));
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError('');

      if (initialPrefill?.checkIn) {
        setCheckIn(initialPrefill.checkIn);
      }
      if (initialPrefill?.checkOut) {
        setCheckOut(initialPrefill.checkOut);
      }
      if (typeof initialPrefill?.guests === 'number') {
        setGuests(initialPrefill.guests);
      }

      if (typeof initialPrefill?.withDog === 'boolean') {
        setWithDog(initialPrefill.withDog);
      }

      if (initialPrefill?.roomId) {
        setSelectedRoomId(initialPrefill.roomId);
        const target = ALL_ROOMS.find((r) => r.id === initialPrefill.roomId);
        if (target) {
          if (!target.petFriendly && initialPrefill.withDog === undefined) {
            setWithDog(false);
          }
          if (
            typeof initialPrefill.guests === 'number' &&
            initialPrefill.guests > target.maxGuests
          ) {
            setGuests(target.maxGuests);
          }
        }
      } else if (initialPrefill?.withDog) {
        setSelectedRoomId('villa-relax');
      }
    }
  }, [isOpen, initialPrefill]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  const availableRooms = useMemo(
    () => (withDog ? ALL_ROOMS.filter((r) => r.petFriendly) : ALL_ROOMS),
    [withDog]
  );

  useEffect(() => {
    if (withDog) {
      const current = ALL_ROOMS.find((r) => r.id === selectedRoomId);
      if (current && !current.petFriendly) {
        setSelectedRoomId('villa-relax');
      }
    }
  }, [withDog, selectedRoomId]);

  const selectedRoom =
    ALL_ROOMS.find((r) => r.id === selectedRoomId) || ALL_ROOMS[0];

  const nights = useMemo(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const estimatedTotal =
    selectedRoom.basePrice !== null && nights > 0
      ? selectedRoom.basePrice * nights
      : null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (nights <= 0) {
      setError('La data di partenza deve essere successiva alla data di arrivo.');
      return;
    }
    if (guests > selectedRoom.maxGuests) {
      setError(
        `${selectedRoom.name} ospita fino a ${selectedRoom.maxGuests} persone.`
      );
      return;
    }
    if (!fullName.trim()) {
      setError('Inserisci il tuo nome e cognome.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Inserisci un indirizzo email valido.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#010722]/60 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#abb8c3]/30 bg-white px-6 py-5 md:px-8">
              <div>
                <p className="text-xs tracking-[0.14em] text-[#2a7cc3] font-medium">
                  Prenotazione diretta · Miglior tariffa garantita
                </p>
                <h2
                  id="booking-modal-title"
                  className="mt-1 font-display text-2xl md:text-3xl text-[#07233b]"
                >
                  Richiedi il tuo soggiorno
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Chiudi modulo prenotazione"
                className="flex h-11 w-11 items-center justify-center text-[#07233b] hover:text-[#2a7cc3] transition-colors focus-visible:outline-2 focus-visible:outline-[#2a7cc3]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 px-6 py-6 md:px-8 md:py-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center bg-[#f7f9fc] border border-[#2a7cc3]/30 text-[#2a7cc3]">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-3xl text-[#07233b]">
                    Richiesta inviata con successo
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#010722]/80">
                    Grazie, {fullName}. L’Ufficio Prenotazioni dell’Hotel Mercedes ha
                    ricevuto la tua richiesta per <strong>{selectedRoom.name}</strong> (
                    {selectedRoom.building}) dal{' '}
                    <span className="tabular-nums">{checkIn}</span> al{' '}
                    <span className="tabular-nums">{checkOut}</span> per {guests}{' '}
                    {guests === 1 ? 'ospite' : 'ospiti'}.
                  </p>
                  <div className="mt-6 border-t border-b border-[#abb8c3]/35 py-5 space-y-2 text-sm text-[#010722]/80">
                    <div className="flex justify-between">
                      <span>Sistemazione</span>
                      <span className="font-medium text-[#07233b]">
                        {selectedRoom.name} ({selectedRoom.size})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Notti selezionate</span>
                      <span className="tabular-nums font-medium text-[#07233b]">
                        {nights}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tariffa indicativa</span>
                      <span className="tabular-nums font-semibold text-[#07233b]">
                        {estimatedTotal !== null
                          ? `Da ${estimatedTotal.toLocaleString('it-IT')} €`
                          : 'Preventivo su richiesta'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Incluso nel soggiorno</span>
                      <span className="text-[#07233b]">
                        Colazione a bordo piscina · Garage coperto
                      </span>
                    </div>
                  </div>
                  <p className="mt-5 text-sm text-[#010722]/70">
                    Ti risponderemo a <strong>{email}</strong> entro poche ore. Per
                    urgenze puoi contattare la reception al{' '}
                    <a
                      href={HOTEL_CONTACT.receptionPhoneHref}
                      className="text-[#2a7cc3] underline underline-offset-4"
                    >
                      {HOTEL_CONTACT.receptionPhone}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-8 w-full py-3.5 bg-[#07233b] text-white text-sm font-semibold tracking-wide hover:bg-[#010722] transition-colors"
                  >
                    Torna al sito
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Pet-friendly selector */}
                  <div className="flex items-start justify-between gap-4 border border-[#abb8c3]/35 bg-[#f7f9fc] p-4">
                    <div>
                      <p className="text-sm font-semibold text-[#07233b]">
                        Viaggi con il tuo cane?
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#010722]/70">
                        I cani sono i benvenuti nella dépendance storica Villa Oliveto; nella
                        Residenza Mercedes gli animali non sono ammessi.
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={withDog}
                      onClick={() => setWithDog((v) => !v)}
                      className={`mt-0.5 shrink-0 px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                        withDog
                          ? 'bg-[#2a7cc3] text-white'
                          : 'bg-white text-[#07233b] border border-[#abb8c3]/60 hover:border-[#07233b]'
                      }`}
                    >
                      {withDog ? 'Sì, con cane' : 'No'}
                    </button>
                  </div>

                  {/* Room Selection */}
                  <div>
                    <label
                      htmlFor="booking-room"
                      className="block text-sm font-medium text-[#07233b]"
                    >
                      Sistemazione desiderata
                    </label>
                    <select
                      id="booking-room"
                      value={selectedRoomId}
                      onChange={(e) => setSelectedRoomId(e.target.value)}
                      className="mt-2 w-full border border-[#abb8c3]/60 bg-white px-4 py-3 text-sm text-[#010722] focus:border-[#2a7cc3] focus:outline-none"
                    >
                      {availableRooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.building} — {room.name} ({room.capacity} · {room.size} ·{' '}
                          {room.priceLabel})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="booking-checkin"
                        className="block text-sm font-medium text-[#07233b]"
                      >
                        Arrivo
                      </label>
                      <input
                        id="booking-checkin"
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm tabular-nums text-[#010722] focus:border-[#2a7cc3] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="booking-checkout"
                        className="block text-sm font-medium text-[#07233b]"
                      >
                        Partenza
                      </label>
                      <input
                        id="booking-checkout"
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm tabular-nums text-[#010722] focus:border-[#2a7cc3] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label
                      htmlFor="booking-guests"
                      className="block text-sm font-medium text-[#07233b]"
                    >
                      Numero di ospiti (max {selectedRoom.maxGuests} per questa camera)
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                      {[1, 2, 3, 4].map((count) => {
                        const disabled = count > selectedRoom.maxGuests;
                        const active = guests === count;
                        return (
                          <button
                            key={count}
                            type="button"
                            disabled={disabled}
                            onClick={() => setGuests(count)}
                            className={`flex-1 py-2.5 text-sm font-medium tabular-nums transition-colors ${
                              active
                                ? 'bg-[#07233b] text-white'
                                : disabled
                                  ? 'bg-[#f7f9fc] text-[#abb8c3] cursor-not-allowed'
                                  : 'border border-[#abb8c3]/60 text-[#07233b] hover:border-[#07233b]'
                            }`}
                          >
                            {count}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4 border-t border-[#abb8c3]/30 pt-6">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-sm font-medium text-[#07233b]"
                      >
                        Nome e cognome *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Es. Marco Bellini"
                        className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm text-[#010722] placeholder:text-[#abb8c3] focus:border-[#2a7cc3] focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="booking-email"
                          className="block text-sm font-medium text-[#07233b]"
                        >
                          Email *
                        </label>
                        <input
                          id="booking-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="nome@esempio.it"
                          className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm text-[#010722] placeholder:text-[#abb8c3] focus:border-[#2a7cc3] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="booking-phone"
                          className="block text-sm font-medium text-[#07233b]"
                        >
                          Telefono
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+39 ..."
                          className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm text-[#010722] placeholder:text-[#abb8c3] focus:border-[#2a7cc3] focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="booking-notes"
                        className="block text-sm font-medium text-[#07233b]"
                      >
                        Richieste particolari (facoltativo)
                      </label>
                      <textarea
                        id="booking-notes"
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Orario di arrivo, prenotazione tavolo a La Dolce Vita, culla..."
                        className="mt-2 w-full border border-[#abb8c3]/60 px-4 py-3 text-sm text-[#010722] placeholder:text-[#abb8c3] focus:border-[#2a7cc3] focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Live Estimate Summary */}
                  <div className="bg-[#f7f9fc] border border-[#abb8c3]/35 p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#010722]/65">
                        {nights > 0
                          ? `Stima per ${nights} ${nights === 1 ? 'notte' : 'notti'} · Colazione e garage inclusi`
                          : 'Seleziona date valide'}
                      </p>
                      <p className="mt-0.5 text-lg font-semibold tabular-nums text-[#07233b]">
                        {estimatedTotal !== null
                          ? `Da ${estimatedTotal.toLocaleString('it-IT')} €`
                          : 'Tariffa su richiesta'}
                      </p>
                    </div>
                    <span className="text-xs text-[#010722]/60 text-right">
                      Nessun addebito immediato
                    </span>
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
                    className="w-full py-3.5 bg-[#2a7cc3] hover:bg-[#1f64a1] text-white text-sm font-semibold tracking-[0.03em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7cc3]"
                  >
                    Invia richiesta di prenotazione
                  </button>
                </form>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
