/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Sofa, Disc, Anchor, Ticket, Check, MapPin } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TABLE_TYPES = [
  {
    id: 't1',
    name: 'White Swing Bench',
    description: 'Cozy suspended leather swings on heavy metal chains.',
    capacity: '2 Guests max',
    icon: Anchor,
    color: 'text-stone-300 border-stone-600 bg-stone-900/30'
  },
  {
    id: 't2',
    name: 'Crimson Snare Table',
    description: 'Custom red-painted oil drum barrels with wood tops.',
    capacity: '3-4 Guests max',
    icon: Disc,
    color: 'text-brand-red border-brand-red/40 bg-brand-red/5'
  },
  {
    id: 't3',
    name: 'Stealth Bass Table',
    description: 'Sleek matte-black oil barrels with industrial metal stools.',
    capacity: '2 Guests max',
    icon: Disc,
    color: 'text-stone-400 border-stone-700 bg-stone-950/40'
  },
  {
    id: 't4',
    name: 'Chesterfield VIP Lounge',
    description: 'Plush deep-buttoned brown leather couches and low drum-stools.',
    capacity: '5-8 Guests max',
    icon: Sofa,
    color: 'text-brand-gold border-brand-gold/40 bg-brand-gold/5'
  }
];

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [guests, setGuests] = useState(2);
  const [selectedTable, setSelectedTable] = useState('t1');
  const [isBooked, setIsBooked] = useState(false);
  const [ticketNo, setTicketNo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) return;
    
    // Generate simulated booking code
    setTicketNo(`TKT-DRUM-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsBooked(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('18:00');
    setGuests(2);
    setSelectedTable('t1');
    setIsBooked(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div id="reservation-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-none border border-white/10 bg-[#0A0A0A] p-6 md:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          id="close-reservation-btn"
          onClick={handleReset}
          className="absolute right-6 top-6 p-2 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 flex flex-col items-start border-b border-white/5 pb-4">
          <span className="font-heading text-xs font-bold tracking-widest text-brand-gold uppercase">
            RESERVE A BEAT TABLE
          </span>
          <h2 className="font-display text-lg md:text-xl font-light text-white uppercase tracking-wider mt-1">
            CLAIM YOUR RHYTHM SPOT
          </h2>
        </div>

        {!isBooked ? (
          <form onSubmit={handleSubmit} id="reservation-form" className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1.5">
                  Full Name
                </label>
                <input
                  id="reserve-name-input"
                  type="text"
                  required
                  placeholder="e.g. Rajesh Dewangan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-[#121212] p-3 text-xs text-zinc-200 focus:border-brand-gold focus:outline-none transition-colors font-light"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1.5">
                  Mobile Number
                </label>
                <input
                  id="reserve-phone-input"
                  type="tel"
                  required
                  placeholder="e.g. +91 77018 06651"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-[#121212] p-3 text-xs text-zinc-200 focus:border-brand-gold focus:outline-none transition-colors font-light"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1.5 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Date
                </label>
                <input
                  id="reserve-date-input"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-[#121212] p-3 text-xs text-zinc-200 focus:border-brand-gold focus:outline-none transition-colors font-light"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1.5 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> Preferred Time
                </label>
                <select
                  id="reserve-time-select"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-[#121212] p-3 text-xs text-zinc-200 focus:border-brand-gold focus:outline-none transition-colors font-light"
                >
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                  <option value="19:00">07:00 PM</option>
                  <option value="20:00">08:00 PM</option>
                  <option value="21:00">09:00 PM</option>
                </select>
              </div>
            </div>

            {/* Guests & Seating Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1.5 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> Guest Count
                </label>
                <div className="flex items-center gap-3 border border-white/10 bg-[#121212] rounded-none p-2">
                  <button
                    id="reserve-guest-dec-btn"
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-none bg-black text-zinc-400 hover:text-white border border-white/5"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-heading text-xs font-bold text-white">{guests}</span>
                  <button
                    id="reserve-guest-inc-btn"
                    type="button"
                    onClick={() => setGuests(Math.min(12, guests + 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-none bg-black text-zinc-400 hover:text-white border border-white/5"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1.5">
                  Selected Dining Zone
                </span>
                <span className="text-zinc-400 text-[11px] leading-relaxed block bg-[#121212] rounded-none border border-white/10 py-2.5 px-4.5 font-light">
                  Pick your visual setup below. Note capacity guidelines!
                </span>
              </div>
            </div>

            {/* Table Type Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
              {TABLE_TYPES.map((t) => {
                const Icon = t.icon;
                const isSelected = selectedTable === t.id;
                return (
                  <button
                    id={`table-type-card-${t.id}`}
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTable(t.id)}
                    className={`flex flex-col items-start rounded-none border p-4 text-left transition-all group ${
                      isSelected
                        ? 'border-brand-gold bg-[#1A1A1A] shadow-lg shadow-black/40'
                        : 'border-white/5 bg-[#121212]/50 hover:border-brand-gold/40 hover:bg-[#121212]'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between mb-2">
                      <div className={`rounded-none bg-black p-2 border ${isSelected ? 'border-brand-gold text-brand-gold' : 'border-white/10 text-zinc-400'}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {isSelected ? (
                        <span className="rounded-none bg-brand-gold px-1.5 py-0.5 text-[9px] font-bold uppercase text-black">
                          Selected
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-500 uppercase font-heading font-semibold tracking-wider group-hover:text-zinc-300">
                          {t.capacity}
                        </span>
                      )}
                    </div>
                    <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">{t.name}</h4>
                    <p className="text-[10px] text-zinc-400 leading-normal mt-1 font-light">{t.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Submit */}
            <button
              id="reserve-submit-btn"
              type="submit"
              className="w-full rounded-none bg-brand-red hover:bg-[#D32F2F] text-white py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 mt-2"
            >
              Secure Table Spot
            </button>
          </form>
        ) : (
          /* VIP Ticket View */
          <div className="flex flex-col items-center py-6">
            <div className="relative w-full max-w-md rounded-none bg-gradient-to-br from-[#121212] to-[#0A0A0A] border border-brand-gold p-6 text-zinc-300 shadow-2xl overflow-hidden">
              
              {/* Ticket Top-Hanger */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 w-10 h-4 bg-[#0A0A0A] border-b border-brand-gold rounded-none z-10" />
              
              {/* Radial Notch Cuts on Side - Boxy cuts! */}
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-[#0A0A0A] border-r border-brand-gold rounded-none" />
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-[#0A0A0A] border-l border-brand-gold rounded-none" />

              <div className="text-center mb-6 pt-4">
                <Ticket className="h-10 w-10 text-brand-gold mx-auto animate-bounce mb-2" />
                <h4 className="font-display text-base font-light text-white tracking-widest uppercase">VIP DINING PASS</h4>
                <p className="text-[10px] text-brand-gold uppercase font-semibold tracking-widest mt-1">SS DRUM CAFE</p>
              </div>

              <div className="space-y-3 border-y border-dashed border-white/10 py-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500">GUEST:</span>
                  <span className="font-bold text-white uppercase">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">PHONE:</span>
                  <span className="font-semibold text-zinc-300">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">DATE:</span>
                  <span className="font-bold text-brand-gold">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">TIME:</span>
                  <span className="font-bold text-white">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">PARTY SIZE:</span>
                  <span className="font-bold text-white">{guests} GUESTS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">TABLE SETUP:</span>
                  <span className="font-bold text-brand-gold uppercase">
                    {TABLE_TYPES.find(t => t.id === selectedTable)?.name || 'Standard'}
                  </span>
                </div>
              </div>

              {/* Bottom pass info */}
              <div className="pt-4 flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <MapPin className="h-3.5 w-3.5 text-brand-red" />
                  <span>Jaijaipur, Sakti, Chhattisgarh</span>
                </div>
                
                <span className="text-[10px] font-mono tracking-widest text-brand-gold font-bold mt-4 p-2 bg-black border border-white/10 rounded-none">
                  {ticketNo}
                </span>
                
                <p className="text-[9px] text-zinc-500 mt-3 text-center leading-normal">
                  *Please present this pass at the counter upon arrival. Your table will be held for up to 15 minutes past the reserved slot. See you soon!
                </p>
              </div>
            </div>

            <button
              id="reserve-reset-btn"
              onClick={handleReset}
              className="mt-6 rounded-none bg-brand-gold text-black font-bold px-8 py-3.5 text-xs uppercase tracking-widest hover:bg-white transition-all duration-200"
            >
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
