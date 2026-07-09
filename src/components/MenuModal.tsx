/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { X, Search, Flame, Leaf, Coffee, Pizza, Sparkles, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
}

type CategoryFilter = 'All' | 'Brew (Coffee & Drinks)' | 'Bites (Burgers & Pizza)' | 'Beats (Snacks & Appetizers)' | 'Desserts';

export default function MenuModal({ isOpen, onClose, onAddToCart }: MenuModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [spicyLevel, setSpicyLevel] = useState<number | null>(null);

  const categories: CategoryFilter[] = [
    'All',
    'Brew (Coffee & Drinks)',
    'Bites (Burgers & Pizza)',
    'Beats (Snacks & Appetizers)',
    'Desserts'
  ];

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !vegOnly || item.isVeg;
      const matchesSpicy = spicyLevel === null || item.spicyLevel === spicyLevel;

      return matchesCategory && matchesSearch && matchesVeg && matchesSpicy;
    });
  }, [selectedCategory, searchQuery, vegOnly, spicyLevel]);

  if (!isOpen) return null;

  return (
    <div id="menu-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-none border border-white/10 bg-[#0A0A0A] p-6 md:p-8 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          id="close-menu-btn"
          onClick={onClose}
          className="absolute right-6 top-6 rounded-none bg-[#121212] border border-white/10 p-2 text-zinc-400 hover:text-white hover:border-brand-gold transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="mb-6 flex flex-col items-start">
          <span className="flex items-center gap-1.5 font-heading text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase">
            <Sparkles className="h-3.5 w-3.5" /> Our Full Menu
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-light tracking-tight text-white mt-1 uppercase">
            SS DRUM <span className="italic font-serif text-brand-gold">Cafe</span>
          </h2>
        </div>

        {/* Search and Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          {/* Search box */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              id="menu-search-input"
              type="text"
              placeholder="Search for lattes, pizzas, wraps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-none border border-white/10 bg-[#121212] py-2.5 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-600 focus:border-brand-gold focus:outline-none transition-colors font-light"
            />
          </div>

          {/* Veg Toggle */}
          <button
            id="veg-only-filter-btn"
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center justify-center gap-2 rounded-none border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all md:col-span-3 ${
              vegOnly 
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' 
                : 'border-white/10 bg-[#121212] text-zinc-500 hover:text-white hover:border-white/30'
            }`}
          >
            <Leaf className={`h-4 w-4 ${vegOnly ? 'fill-emerald-400' : ''}`} />
            Veg Only
          </button>

          {/* Spicy Rating Selector */}
          <div className="flex items-center justify-between rounded-none border border-white/10 bg-[#121212] px-4 py-2 md:col-span-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-brand-red fill-brand-red" /> Spicy:
            </span>
            <div className="flex gap-1.5">
              {[1, 2].map((lvl) => (
                <button
                  id={`spicy-lvl-${lvl}-btn`}
                  key={lvl}
                  onClick={() => setSpicyLevel(spicyLevel === lvl ? null : lvl)}
                  className={`flex h-6 w-6 items-center justify-center rounded-none text-xs font-bold transition-all ${
                    spicyLevel === lvl 
                      ? 'bg-brand-red text-white' 
                      : 'bg-[#1A1A1A] border border-white/5 text-zinc-500 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="no-scrollbar flex gap-2 border-b border-white/5 overflow-x-auto pb-3 mb-6 shrink-0">
          {categories.map((cat) => (
            <button
              id={`cat-tab-${cat.replace(/\s+/g, '-')}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap rounded-none px-4.5 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                selectedCategory === cat
                  ? 'border-b-2 border-brand-gold text-brand-gold font-extrabold'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {cat === 'All' ? 'All Items' : cat.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Menu Grid - Scrollable area */}
        <div className="flex-1 overflow-y-auto pr-1 no-scrollbar">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-zinc-500 font-heading">No menu items match your current selection.</p>
              <button
                id="reset-filters-btn"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setVegOnly(false);
                  setSpicyLevel(null);
                }}
                className="mt-4 rounded-none border border-brand-gold bg-brand-gold/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-200"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  id={`menu-item-card-${item.id}`}
                  className="flex flex-col rounded-none border border-white/5 bg-[#121212]/85 overflow-hidden hover:border-brand-gold/40 hover:shadow-2xl hover:shadow-brand-gold/5 group transition-all duration-300"
                >
                  {/* Item Image */}
                  <div className="relative h-44 w-full bg-[#1A1A1A] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Tags overlays */}
                    <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                      {item.isVeg && (
                        <span className="flex items-center gap-1 rounded-none bg-[#0A0A0A]/90 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Veg
                        </span>
                      )}
                      {item.spicyLevel && item.spicyLevel > 0 && (
                        <span className="flex items-center gap-0.5 rounded-none bg-[#0A0A0A]/90 border border-brand-red/30 px-2 py-0.5 text-[9px] font-bold text-brand-red uppercase tracking-widest">
                          <Flame className="h-2.5 w-2.5 fill-brand-red text-brand-red" />
                          {item.spicyLevel === 2 ? 'Extra Spicy' : 'Spicy'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-heading text-sm font-bold text-white group-hover:text-brand-gold transition-colors tracking-wide">
                          {item.name}
                        </h3>
                        <span className="font-heading text-sm font-bold text-brand-gold whitespace-nowrap">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>

                    <button
                      id={`add-to-cart-btn-${item.id}`}
                      disabled
                      className="mt-4.5 flex w-full items-center justify-center gap-2 rounded-none border border-white/5 bg-[#161616]/40 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-500 cursor-not-allowed"
                    >
                      <ShoppingBag className="h-3.5 w-3.5 text-zinc-600" />
                      Coming Soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
