/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Play,
  Volume2,
  Instagram,
  Facebook,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  ChefHat,
  CalendarDays,
  CheckCircle2,
  Quote,
  Flame,
  ArrowRight,
  Disc,
  X,
  Plus,
  Coffee,
  Heart,
  Music,
  ChevronRight,
  Anchor,
  User,
  Star,
  Menu
} from 'lucide-react';

// Import custom generated assets
import logoImg from './assets/images/ss_drum_cafe_logo_1783601067113.jpg';
import heroImg from './assets/images/ss_drum_cafe_hero_bg_1783602618528.jpg';
import swingImg from './assets/images/drum_swing_bench_1783601108508.jpg';

// Import components
import AudioPlayer from './components/AudioPlayer';
import MenuModal from './components/MenuModal';
import CartDrawer from './components/CartDrawer';
import ReservationModal from './components/ReservationModal';
import ReviewSection from './components/ReviewSection';

// Import mock data
import { MENU_ITEMS } from './data';
import { MenuItem, CartItem } from './types';

export default function App() {
  // Modal / Sidebar States
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Active Navigation Highlight
  const [activeNav, setActiveNav] = useState('Home');

  // Notification Toast State
  const [toast, setToast] = useState<string | null>(null);

  // Specialties (First 6 items from data, filtered for Specialties)
  const specialtyItems = useMemoSpecialties();

  function useMemoSpecialties() {
    return React.useMemo(() => {
      return MENU_ITEMS.filter(item => item.isSpecialty).slice(0, 6);
    }, []);
  }

  // Toast notifier
  const showToast = (message: string) => {
    setToast(message);
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  };

  // Cart operations
  const handleAddToCart = (menuItem: MenuItem) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.menuItem.id === menuItem.id);
      if (existing) {
        showToast(`Increased quantity of ${menuItem.name} inside order!`);
        return prevItems.map((item) =>
          item.menuItem.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      showToast(`Added ${menuItem.name} to your order!`);
      return [...prevItems, { menuItem, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.menuItem.id === itemId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    const item = cartItems.find((i) => i.menuItem.id === itemId);
    if (item) {
      showToast(`Removed ${item.menuItem.name} from order.`);
    }
    setCartItems((prevItems) => prevItems.filter((item) => item.menuItem.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Smooth scroll helper
  const scrollToSection = (id: string, name: string) => {
    setActiveNav(name);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Listen to scrolls to dynamically change active nav highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'home', name: 'Home' },
        { id: 'about', name: 'About Us' },
        { id: 'specialties', name: 'Menu' },
        { id: 'gallery', name: 'Gallery' },
        { id: 'events', name: 'Events' },
        { id: 'contact', name: 'Contact' }
      ];

      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-brown-dark text-zinc-400 font-sans selection:bg-brand-gold selection:text-brand-brown-dark">
      
      {/* 1. TOP HEADER INFO BAR */}
      <header id="top-bar" className="hidden sm:block w-full bg-[#0A0A0A] border-b border-white/5 py-3 px-4 md:px-12 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4.5">
            <span className="flex items-center gap-1.5 hover:text-brand-gold transition-colors font-medium tracking-wider">
              <MapPin className="h-3.5 w-3.5 text-brand-red animate-pulse" />
              Jaijaipur, Sakti, Chhattisgarh
            </span>
          </div>
          <div className="flex items-center gap-4.5">
            <a href="mailto:ssdrumcafe@gmail.com" className="flex items-center gap-1.5 hover:text-brand-gold transition-colors font-medium tracking-wider">
              <Mail className="h-3.5 w-3.5 text-brand-gold" />
              ssdrumcafe@gmail.com
            </a>
          </div>
        </div>
      </header>

      {/* 2. STICKY GLASSMORPHIC NAVBAR */}
      <nav id="navbar" className="sticky top-0 z-40 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 py-3 md:py-5 px-4 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Logo & Text */}
          <div className="flex items-center gap-3 cursor-pointer animate-fadeIn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative h-11 w-11 rounded-none overflow-hidden border border-white/10 hover:scale-105 transition-transform duration-300">
              <img
                src={logoImg}
                alt="SS Drum Cafe Logo"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover scale-110"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-display text-sm font-extrabold tracking-[0.2em] text-white leading-tight">
                SS DRUM <span className="text-brand-red">CAFE</span>
              </h1>
              <span className="text-[8px] font-heading font-bold tracking-[0.25em] text-brand-gold uppercase">
                Beats • Brew • Bites
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { id: 'home', name: 'Home' },
              { id: 'about', name: 'About Us' },
              { id: 'specialties', name: 'Menu' },
              { id: 'gallery', name: 'Gallery' },
              { id: 'events', name: 'Events' },
              { id: 'contact', name: 'Contact' }
            ].map((link) => (
              <button
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={link.id}
                onClick={() => scrollToSection(link.id, link.name)}
                className={`text-xs font-bold uppercase tracking-[0.2em] relative py-1 transition-colors ${
                  activeNav === link.name ? 'text-brand-gold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
                {activeNav === link.name && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-gold" />
                )}
              </button>
            ))}
          </div>

          {/* Cart & Online Order Shortcut */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Quick Cart Trigger */}
            <button
              id="navbar-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-none bg-transparent border border-white/10 p-2.5 text-brand-gold hover:border-brand-gold hover:text-white transition-all duration-300 flex items-center justify-center"
              title="View Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-none bg-brand-red text-[8px] font-black text-white animate-pulse">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>

            {/* Main Order Button */}
            <button
              id="navbar-order-online-btn"
              onClick={() => showToast("Online Ordering is coming soon! Stay tuned.")}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 border border-white/10 text-zinc-500 text-xs font-bold tracking-widest uppercase transition-all bg-[#0e0e0e]/40 relative group cursor-not-allowed"
            >
              <ChefHat className="h-4 w-4 text-zinc-600" />
              Order Online
              <span className="absolute -top-2 -right-1.5 bg-brand-gold text-black text-[8px] font-extrabold px-1.5 py-0.5 tracking-wider uppercase">Soon</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="navbar-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative rounded-none bg-transparent border border-white/10 p-2.5 text-zinc-400 hover:text-white hover:border-brand-gold transition-all duration-300 flex items-center justify-center"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 text-brand-gold" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Navigation Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-dropdown" className="lg:hidden fixed inset-x-0 top-[85px] z-30 border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-lg px-6 py-8 flex flex-col gap-6 animate-fadeIn shadow-2xl">
          {[
            { id: 'home', name: 'Home' },
            { id: 'about', name: 'About Us' },
            { id: 'specialties', name: 'Menu' },
            { id: 'gallery', name: 'Gallery' },
            { id: 'events', name: 'Events' },
            { id: 'contact', name: 'Contact' }
          ].map((link) => (
            <button
              id={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={link.id}
              onClick={() => {
                scrollToSection(link.id, link.name);
                setIsMobileMenuOpen(false);
              }}
              className={`text-xs font-bold uppercase tracking-[0.25em] text-left py-3 border-b border-white/5 transition-colors ${
                activeNav === link.name ? 'text-brand-gold border-brand-gold/30' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          
          <button
            id="mobile-nav-order-online-btn"
            onClick={() => {
              showToast("Online Ordering is coming soon! Stay tuned.");
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2 px-4 py-3.5 border border-brand-gold/30 text-brand-gold text-xs font-bold tracking-widest uppercase bg-brand-gold/5 mt-2"
          >
            <ChefHat className="h-4 w-4" />
            Order Online (Coming Soon)
          </button>
        </div>
      )}

      {/* 3. HERO SECTION */}
      <section id="home" className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen flex items-center overflow-hidden py-10 sm:py-16 px-4 md:px-12 border-b border-white/5 bg-[#0A0A0A]">
        
        {/* Ambient background blur circles from Elegant Dark design */}
        <div className="absolute top-20 right-[-100px] w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-red-500/5 rounded-full blur-[100px] z-0 pointer-events-none" />

        {/* Hero Background image with left fade vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="SS Drum Cafe Interior Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-75 sm:opacity-65 block"
          />
          {/* Dual gradient overlays to ensure text is 100% legible and fade nicely to the sides */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/30 sm:via-[#0A0A0A]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/75 via-[#0A0A0A]/35 to-transparent sm:from-[#0A0A0A] sm:via-transparent sm:to-[#0A0A0A]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-8 flex flex-col justify-center text-left">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 border border-brand-gold/30 text-brand-gold text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> स्वागत हे आप सबो संगवारी मन के!
                </span>
              </span>
              
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-light tracking-tight text-white leading-[1.05] sm:leading-[1.02]">
                BEATS.<br />
                BREW.<br />
                <span className="italic font-serif text-brand-gold relative inline-block select-none animate-pulse">
                  BITES.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-zinc-400 text-sm md:text-base leading-relaxed font-light">
              Experience unprecedented sensory harmony. Feel the rhythm of acoustic lo-fi drums and taste the moment inside our bespoke industrial drum layouts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
              <button
                id="hero-explore-menu-btn"
                onClick={() => setIsMenuOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-xs tracking-widest uppercase hover:bg-brand-gold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                Explore Menu
              </button>
              
              <button
                id="hero-reserve-btn"
                onClick={() => setIsReserveOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-brand-gold hover:text-brand-gold text-xs font-bold tracking-widest uppercase transition-all"
              >
                <CalendarDays className="h-4 w-4" />
                Visit Us / Book Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR SPECIALTIES SECTION */}
      <section id="specialties" className="relative w-full bg-[#0A0A0A] py-16 md:py-24 px-4 md:px-12 border-b border-white/5 overflow-hidden">
        
        {/* Subtle blur background spot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center">
            <span className="font-heading text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase">
              OUR SPECIALTIES —
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light tracking-wide text-white mt-2">
              आवव, बइठव, खावव... <span className="italic font-serif text-brand-gold">मन ला भा जाही।</span>
            </h2>
            <div className="h-[1px] w-12 bg-brand-gold mt-4" />
          </div>

          {/* Specialties Food Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialtyItems.map((item) => (
              <div
                key={item.id}
                id={`specialty-card-${item.id}`}
                className="flex flex-col rounded-none border border-white/5 bg-[#121212]/80 overflow-hidden hover:border-brand-gold/40 hover:shadow-2xl hover:shadow-brand-gold/5 group transition-all duration-300"
              >
                {/* Food image wrapper */}
                <div className="relative h-56 w-full bg-[#1A1A1A] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Veg Indicator dot overlay */}
                  <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                    {item.isVeg && (
                      <span className="flex items-center gap-1.5 rounded-none bg-[#0A0A0A]/90 border border-emerald-500/30 px-2.5 py-1 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Veg
                      </span>
                    )}
                    {item.spicyLevel && item.spicyLevel > 0 && (
                      <span className="flex items-center gap-1 rounded-none bg-[#0A0A0A]/90 border border-brand-red/30 px-2.5 py-1 text-[9px] font-bold text-brand-red uppercase tracking-widest">
                        <Flame className="h-3 w-3 fill-brand-red text-brand-red" />
                        {item.spicyLevel === 2 ? 'Tadka Spicy' : 'Spicy'}
                      </span>
                    )}
                  </div>
                  {/* Category overlay label */}
                  <span className="absolute right-4 top-4 rounded-none bg-[#0A0A0A]/90 border border-white/5 px-2.5 py-1 text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                    {item.category.split(' (')[0]}
                  </span>
                </div>

                {/* Card description details */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-[#121212]">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-brand-gold transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-heading text-base font-bold text-brand-gold whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Add to order action button */}
                  <button
                    id={`specialties-add-btn-${item.id}`}
                    onClick={() => showToast("Online Ordering is coming soon! Stay tuned.")}
                    className="mt-6 flex w-full items-center justify-center gap-2 border border-white/5 bg-[#161616]/40 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-brand-gold hover:border-brand-gold/30 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 text-zinc-600" />
                    Coming Soon
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View Full Menu CTA */}
          <div className="flex justify-center pt-4">
            <button
              id="specialties-full-menu-btn"
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 px-8 py-4 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black text-xs font-bold tracking-widest uppercase transition-all duration-300"
            >
              <Sparkles className="h-4 w-4" />
              View Full Menu
            </button>
          </div>

        </div>
      </section>
      {/* 6. ABOUT US SECTION */}
      <section id="about" className="relative w-full bg-[#0E0E0E] py-16 md:py-24 px-4 md:px-12 border-b border-white/5 overflow-hidden">
        
        {/* Ambient glow */}
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            <div className="space-y-3">
              <span className="font-heading text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase">
                ABOUT SS DRUM CAFE —
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-light tracking-tight text-white leading-tight uppercase">
                MORE THAN A CAFE,<br />
                इहां के बात हे <span className="italic font-serif text-brand-gold">कुछ अलग!</span>
              </h2>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              At SS Drum Cafe, we blend the beats of drums with the warmth of delicious food and beverages. A perfect hangout spot in Jaijaipur for friends, families, and music lovers who appreciate dynamic style and authentic taste.
            </p>

            {/* Feature lists icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {[
                { name: 'Drum Inspired Ambience', desc: 'Custom oil barrel drum setups.', icon: Disc },
                { name: 'Unique Furniture', desc: 'Swaying chains white leather swing bench.', icon: Anchor },
                { name: 'Quality Brew & Food', desc: 'Tandoori stone-pizzas and spiced chai.', icon: Coffee },
                { name: 'Good Vibes Everytime', desc: 'Cozy, amber, dim-lit musical nights.', icon: Sparkles }
              ].map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="rounded-none bg-[#0A0A0A] p-2.5 border border-white/10 text-brand-gold shrink-0">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-heading text-xs font-bold text-zinc-200 tracking-wide">{feat.name}</h4>
                      <p className="text-[10px] text-zinc-500 leading-relaxed mt-1 font-light">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                id="about-know-more-btn"
                onClick={() => setIsReserveOpen(true)}
                className="flex items-center gap-2 border border-white/20 hover:border-brand-gold text-zinc-300 hover:text-brand-gold px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all"
              >
                Book Seating Zone
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </button>
            </div>
          </div>

          {/* Right Column Layout: Swing bench card + visual subgallery */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Large Swing Bench Image Container */}
            <div className="relative rounded-none border border-white/10 bg-[#121212] overflow-hidden group shadow-2xl h-80">
              <img
                src={swingImg}
                alt="SS Drum Cafe Custom Swing Bench seating"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-75 group-hover:scale-[1.02] transition-transform duration-700 filter grayscale"
              />
              {/* Outer Shadow Vignette */}
              <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#0A0A0A]/30 transition-all duration-300" />

              {/* OVERLAY PLAY AMBIENCE TRIGGER BUTTON */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  id="about-play-overlay-btn"
                  onClick={() => setIsAudioOpen(true)}
                  className="flex flex-col items-center gap-3.5 cursor-pointer group/btn"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-none bg-[#0A0A0A]/95 border border-brand-gold text-brand-gold group-hover/btn:bg-brand-gold group-hover/btn:text-black group-hover/btn:scale-115 transition-all duration-300 shadow-xl">
                    <Play className="h-7 w-7 fill-current ml-1" />
                  </div>
                  <span className="bg-[#0A0A0A]/95 border border-white/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-zinc-200 group-hover/btn:border-brand-gold transition-colors uppercase">
                    Play Ambience
                  </span>
                </button>
              </div>
            </div>

            {/* Subgallery Grid (3 static/curated images underneath the swing card) */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  title: 'Cozy Interior',
                  url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&auto=format&fit=crop&q=80'
                },
                {
                  title: 'Custom Bar',
                  url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&auto=format&fit=crop&q=80'
                },
                {
                  title: 'Live Rhythms',
                  url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&auto=format&fit=crop&q=80'
                }
              ].map((img, i) => (
                <div
                  key={i}
                  id={`gallery-sub-card-${i}`}
                  className="relative rounded-none border border-white/5 overflow-hidden h-24 bg-[#121212] group"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#0A0A0A]/40" />
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 7. REVIEWS & TABLE RESERVATION CTA ROW */}
      <section id="gallery" className="relative w-full bg-[#0A0A0A] py-16 md:py-24 px-4 md:px-12 border-b border-white/5 overflow-hidden">
        
        {/* Ambient glow */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
          
          {/* Left Column: Community Feedback */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            <div className="space-y-3">
              <span className="font-heading text-[10px] font-bold tracking-[0.25em] text-brand-gold uppercase">
                GUEST MEMORIES —
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-white uppercase">
                SHARED <span className="italic font-serif text-brand-gold">Experiences</span>
              </h2>
            </div>
            
            {/* Reviews render */}
            <ReviewSection />
          </div>

          {/* Right Column: Book reservation spotlight flyer */}
          <div id="events" className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-none border border-white/10 bg-[#121212]/80 p-8 text-left space-y-6 shadow-2xl overflow-hidden group">
              
              <div className="absolute top-4 right-4 bg-brand-gold text-black font-extrabold text-[9px] uppercase tracking-widest py-1 px-3 shadow-md z-10 animate-pulse">
                COMING SOON
              </div>

              <div className="absolute -right-12 -bottom-12 rounded-full border border-white/5 p-16 text-brand-gold/5 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <Disc className="h-44 w-44 shrink-0 animate-spin" style={{ animationDuration: '12s' }} />
              </div>

              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 border border-brand-gold/30 text-[9px] font-bold text-brand-gold uppercase tracking-widest">
                  Exclusive Seating
                </span>
                <h3 className="font-display text-2xl font-light text-white tracking-wide uppercase leading-tight">
                  PLANNING A<br />
                  <span className="italic font-serif text-brand-gold">Sunday Beats</span> OUTING?
                </h3>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Our custom-built red Snare tables and white suspended leather Swings fill up rapidly for live acoustic table sessions. Claim your spot online in 30 seconds!
              </p>

              <div className="space-y-3 text-xs text-zinc-500">
                <div className="flex items-center gap-2.5 font-light">
                  <span className="flex h-5 w-5 items-center justify-center border border-brand-gold/30 text-brand-gold text-[10px] font-bold">✓</span>
                  <span>Select custom layout seating style</span>
                </div>
                <div className="flex items-center gap-2.5 font-light">
                  <span className="flex h-5 w-5 items-center justify-center border border-brand-gold/30 text-brand-gold text-[10px] font-bold">✓</span>
                  <span>Instant digital VIP Table pass ticket</span>
                </div>
                <div className="flex items-center gap-2.5 font-light">
                  <span className="flex h-5 w-5 items-center justify-center border border-brand-gold/30 text-brand-gold text-[10px] font-bold">✓</span>
                  <span>Zero reservation fee booking online</span>
                </div>
              </div>

              <button
                id="spotlight-claim-table-btn"
                disabled
                className="w-full bg-zinc-800 text-zinc-500 font-bold py-4 text-xs uppercase tracking-widest border border-white/5 cursor-not-allowed"
              >
                Reservations Coming Soon
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. FOOTER SECTION */}
      <footer id="contact" className="w-full bg-[#0A0A0A] pt-16 md:pt-20 pb-10 px-4 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start pb-12 border-b border-white/5 text-left font-light">
            
            {/* Column 1: Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-none overflow-hidden border border-white/15">
                  <img
                    src={logoImg}
                    alt="SS Drum Cafe"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-display text-sm font-extrabold text-white tracking-widest uppercase">
                  SS DRUM <span className="text-brand-red">CAFE</span>
                </h3>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
                Experience dynamic, drum-themed aesthetics paired with freshly brewed beverages and fusion kitchen delicacies in Sakti, Chhattisgarh.
              </p>
              
              <div className="flex items-center gap-2.5 pt-2 text-xs text-zinc-600">
                <MapPin className="h-4 w-4 text-brand-red shrink-0" />
                <span>Jaijaipur, Sakti, Chhattisgarh, India</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-brand-gold">
                Quick Links
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'home', name: 'Home' },
                  { id: 'about', name: 'About Us' },
                  { id: 'specialties', name: 'Menu' },
                  { id: 'gallery', name: 'Gallery' },
                  { id: 'events', name: 'Events' },
                  { id: 'contact', name: 'Contact' }
                ].map((link) => (
                  <button
                    id={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    key={link.id}
                    onClick={() => scrollToSection(link.id, link.name)}
                    className="text-zinc-500 hover:text-white transition-colors text-left flex items-center gap-1.5 font-medium tracking-wider uppercase text-[11px]"
                  >
                    <ChevronRight className="h-3 w-3 text-brand-gold" />
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Column 3: Follow Us */}
            <div className="space-y-6 flex flex-col justify-between h-full md:items-end md:text-right">
              <div className="space-y-4 w-full md:max-w-xs">
                <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-brand-gold">
                  Follow Us
                </h4>
                <div className="flex gap-3 justify-start md:justify-end">
                  {[
                    { icon: Facebook, href: '#', id: 'facebook-btn' },
                    { icon: Instagram, href: '#', id: 'instagram-btn' },
                    { icon: MessageCircle, href: '#', id: 'whatsapp-btn' }
                  ].map((soc, i) => {
                    const Icon = soc.icon;
                    return (
                      <a
                        id={soc.id}
                        key={i}
                        href={soc.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-none border border-white/10 text-zinc-400 hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300"
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* brand slogan */}
              <div className="pt-4 md:pt-0">
                <p className="font-cursive text-xl md:text-2xl text-zinc-300 select-none tracking-wide">
                  Feel the <span className="text-brand-red font-bold">Beat</span>, Taste the <span className="text-brand-gold font-bold">Best</span>.
                </p>
              </div>
            </div>

          </div>

          {/* Copyright notice and credits */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
            <span>© 2026 SS Drum Cafe. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-brand-red fill-brand-red animate-pulse" /> for Sakti & Music Lovers
            </span>
          </div>

        </div>
      </footer>

      {/* 9. FLOATING TOAST NOTIFIER (Fades in-out when adding to basket) */}
      {toast && (
        <div id="cart-notification-toast" className="fixed top-24 right-6 z-50 rounded-xl bg-brand-gold border border-brand-gold text-[#0a0705] py-3 px-5 font-bold text-xs flex items-center gap-2 animate-fadeIn shadow-2xl">
          <CheckCircle2 className="h-4.5 w-4.5 fill-current" />
          <span>{toast}</span>
        </div>
      )}

      {/* 10. MODALS & SLIDEOVER DRAWER LAYERS */}
      
      {/* Dynamic sound Ambience Player */}
      <AudioPlayer
        isOpen={isAudioOpen}
        onClose={() => setIsAudioOpen(false)}
        autoPlay={true}
      />

      {/* Browsable Full Menu Modal */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Order Basket slide-drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Interactive Seating Table claim Pass */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
      />

    </div>
  );
}
