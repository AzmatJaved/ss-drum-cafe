/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, ChevronRight, CheckCircle2, CookingPot, Utensils } from 'lucide-react';
import { CartItem, MenuItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

type CheckoutStep = 'cart' | 'details' | 'success';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tableNo, setTableNo] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  
  // Simulated cooking tracking
  const [cookingProgress, setCookingProgress] = useState(0);
  const [cookingStatusText, setCookingStatusText] = useState('Syncing order with drumbeats...');

  // Reset checkout flow on open/close
  useEffect(() => {
    if (isOpen) {
      setStep('cart');
      setCookingProgress(0);
    }
  }, [isOpen]);

  // Simulating the cooking timer timeline
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'success' && cookingProgress < 100) {
      timer = setInterval(() => {
        setCookingProgress((prev) => {
          const next = prev + 25;
          if (next === 25) setCookingStatusText('Brewing fresh organic extracts...');
          if (next === 50) setCookingStatusText('Baking with hot stone tandoor...');
          if (next === 75) setCookingStatusText('Plating with exquisite drum aesthetics...');
          if (next >= 100) {
            setCookingStatusText('Ready to serve! Feel the beat, taste the best.');
            clearInterval(timer);
          }
          return next;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [step, cookingProgress]);

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const cgst = parseFloat((subtotal * 0.025).toFixed(2)); // 2.5%
  const sgst = parseFloat((subtotal * 0.025).toFixed(2)); // 2.5%
  const deliveryOrServiceFee = orderType === 'takeaway' ? 0 : 20; // 20 INR service fee for dining-in rhythm
  const total = subtotal > 0 ? parseFloat((subtotal + cgst + sgst + deliveryOrServiceFee).toFixed(2)) : 0;

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    if (orderType === 'dine-in' && !tableNo) return;
    
    setStep('success');
  };

  const handleFinish = () => {
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      {/* Backdrop Closer */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="h-full w-full max-w-md border-l border-white/10 bg-[#0A0A0A] p-6 shadow-2xl flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-brand-gold" />
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-widest">
              {step === 'cart' ? 'Your Order' : step === 'details' ? 'Details' : 'Status'}
            </h3>
            <span className="bg-brand-red px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            id="close-cart-btn"
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-4">
          {step === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-20">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-none bg-[#121212] text-zinc-500 border border-white/5">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <h4 className="font-heading text-xs font-bold text-zinc-200 uppercase tracking-widest">Your basket is empty</h4>
                  <p className="mt-1.5 text-[10px] text-zinc-500 font-light max-w-xs leading-relaxed">Add mouth-watering beats, brews, or bites to start!</p>
                  <button
                    id="cart-start-browsing-btn"
                    onClick={onClose}
                    className="mt-6 rounded-none border border-brand-gold bg-brand-gold/10 px-6 py-3 text-xs font-bold uppercase tracking-widest text-brand-gold hover:bg-brand-gold hover:text-black transition-all"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.menuItem.id}
                      id={`cart-item-row-${item.menuItem.id}`}
                      className="flex gap-4 rounded-none border border-white/5 bg-[#121212]/55 p-3.5 hover:border-brand-gold/40 transition-all"
                    >
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        referrerPolicy="no-referrer"
                        className="h-16 w-16 rounded-none object-cover bg-[#1A1A1A] border border-white/5"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-heading text-xs font-bold text-white tracking-wide uppercase line-clamp-1">{item.menuItem.name}</h4>
                            <button
                              id={`cart-remove-btn-${item.menuItem.id}`}
                              onClick={() => onRemoveItem(item.menuItem.id)}
                              className="text-zinc-500 hover:text-brand-red transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-brand-gold">₹{item.menuItem.price}</span>
                        </div>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-white/10 bg-black rounded-none px-1.5 py-0.5">
                            <button
                              id={`cart-decrement-btn-${item.menuItem.id}`}
                              onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                              className="text-zinc-500 hover:text-white p-0.5 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-heading text-xs font-bold text-zinc-300 min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              id={`cart-increment-btn-${item.menuItem.id}`}
                              onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                              className="text-zinc-500 hover:text-white p-0.5 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-heading text-sm font-bold text-white">
                            ₹{item.menuItem.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'details' && (
            <form onSubmit={handleSubmitCheckout} id="checkout-form" className="space-y-4 p-1">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1.5">
                  Your Full Name
                </label>
                <input
                  id="checkout-name-input"
                  type="text"
                  required
                  placeholder="e.g. Satyam Vastralay"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-[#121212] p-3 text-sm text-zinc-200 focus:border-brand-gold focus:outline-none transition-colors font-light"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1.5">
                  Mobile Number
                </label>
                <input
                  id="checkout-phone-input"
                  type="tel"
                  required
                  placeholder="e.g. +91 70116 98140"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-none border border-white/10 bg-[#121212] p-3 text-sm text-zinc-200 focus:border-brand-gold focus:outline-none transition-colors font-light"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1.5">
                  Dining Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="dine-in-type-btn"
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`rounded-none border py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      orderType === 'dine-in'
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                        : 'border-white/10 bg-[#121212] text-zinc-500 hover:text-white hover:border-white/30'
                    }`}
                  >
                    Dine-in (Rhythm Tables)
                  </button>
                  <button
                    id="takeaway-type-btn"
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`rounded-none border py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      orderType === 'takeaway'
                        ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                        : 'border-white/10 bg-[#121212] text-zinc-500 hover:text-white hover:border-white/30'
                    }`}
                  >
                    Takeaway / Parcel
                  </button>
                </div>
              </div>

              {orderType === 'dine-in' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-1.5">
                    Table Number
                  </label>
                  <input
                    id="checkout-table-input"
                    type="number"
                    required={orderType === 'dine-in'}
                    placeholder="e.g. 3 (Look for the Snare or Bass symbol)"
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    className="w-full rounded-none border border-white/10 bg-[#121212] p-3 text-sm text-zinc-200 focus:border-brand-gold focus:outline-none transition-colors font-light"
                  />
                </div>
              )}

              <div className="rounded-none border border-white/10 bg-[#121212] p-4.5 mt-6">
                <span className="text-[9px] font-bold text-brand-gold tracking-[0.2em] uppercase">Note on Payments</span>
                <p className="text-[11px] text-zinc-500 leading-relaxed mt-1.5 font-light">
                  Pay at the cashier desk via UPI, Card, or Cash when your rhythm-crafted order is ready! We will print a copy of your receipt instantly.
                </p>
              </div>

              <button type="submit" className="hidden" id="submit-hidden-btn" />
            </form>
          )}

          {step === 'success' && (
            <div className="flex h-full flex-col items-center justify-center text-center px-4 py-8">
              <CheckCircle2 className="h-14 w-14 text-emerald-500 mb-4 animate-pulse" />
              
              <h4 className="font-display text-lg font-light text-white uppercase tracking-widest">Order Confirmed!</h4>
              <p className="mt-1 text-[10px] text-brand-gold font-mono tracking-widest uppercase">Order ID: #SSD-{Math.floor(1000 + Math.random() * 9000)}</p>
              
              <div className="my-8 w-full space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-500 uppercase tracking-widest font-bold">
                  <span className="flex items-center gap-1.5 font-bold"><CookingPot className="h-4 w-4 text-brand-gold" /> Status</span>
                  <span className="font-bold text-brand-gold animate-pulse">{cookingProgress}%</span>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="h-1 w-full rounded-none bg-[#1A1A1A] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-red to-brand-gold transition-all duration-1000 ease-out"
                    style={{ width: `${cookingProgress}%` }}
                  />
                </div>
                
                <p className="text-xs italic text-zinc-300 font-heading bg-[#121212] rounded-none py-3 px-4 border border-white/10 font-light">
                  "{cookingStatusText}"
                </p>
              </div>

              <div className="w-full text-left bg-[#121212]/80 border border-white/10 rounded-none p-4.5 space-y-2 text-xs font-light">
                <div className="flex justify-between text-zinc-500">
                  <span>Guest Name:</span>
                  <span className="font-semibold text-zinc-200">{name}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Contact:</span>
                  <span className="font-semibold text-zinc-200">{phone}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Service Type:</span>
                  <span className="font-semibold text-zinc-200 uppercase tracking-widest">{orderType}</span>
                </div>
                {orderType === 'dine-in' && (
                  <div className="flex justify-between text-zinc-500">
                    <span>Table No:</span>
                    <span className="font-semibold text-brand-gold uppercase tracking-wider">Rhythm Table #{tableNo}</span>
                  </div>
                )}
                <div className="border-t border-white/5 my-2.5 pt-2.5 flex justify-between font-bold text-white uppercase tracking-wider">
                  <span>Amount Due:</span>
                  <span className="text-brand-gold font-bold">₹{total}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Area - Calculations & Checkout triggers */}
        {cartItems.length > 0 && step !== 'success' && (
          <div className="border-t border-white/5 pt-4 mt-auto">
            {/* Price breakdown */}
            <div className="space-y-2 text-xs text-zinc-500 mb-4 font-light">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-zinc-300">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>CGST (2.5%)</span>
                <span>₹{cgst}</span>
              </div>
              <div className="flex justify-between">
                <span>SGST (2.5%)</span>
                <span>₹{sgst}</span>
              </div>
              <div className="flex justify-between">
                <span>{orderType === 'takeaway' ? 'Takeaway Packaging' : 'Drum Table Surcharge'}</span>
                <span>{orderType === 'takeaway' ? 'Free' : `₹${deliveryOrServiceFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-white/5 pt-2.5 uppercase tracking-wider">
                <span className="text-zinc-300">Total Amount</span>
                <span className="text-brand-gold text-base">₹{total}</span>
              </div>
            </div>

            {/* CTA Button */}
            {step === 'cart' ? (
              <button
                id="cart-checkout-step-btn"
                onClick={() => setStep('details')}
                className="flex w-full items-center justify-center gap-2 rounded-none bg-brand-red py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#D32F2F] transition-all duration-200"
              >
                <CreditCard className="h-4 w-4" />
                Proceed to Checkout
                <ChevronRight className="h-4 w-4 ml-0.5" />
              </button>
            ) : (
              <button
                id="cart-submit-order-btn"
                onClick={() => document.getElementById('submit-hidden-btn')?.click()}
                disabled={!name || !phone || (orderType === 'dine-in' && !tableNo)}
                className="flex w-full items-center justify-center gap-2 rounded-none bg-white py-4 text-xs font-bold uppercase tracking-widest text-black hover:bg-brand-gold disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Utensils className="h-4 w-4" />
                Place My Rhythm Order
              </button>
            )}
          </div>
        )}

        {step === 'success' && (
          <button
            id="cart-finish-btn"
            onClick={handleFinish}
            className="w-full rounded-none bg-[#121212] border border-white/10 py-4 text-xs font-bold uppercase tracking-widest text-brand-gold hover:bg-brand-gold hover:text-black transition-all duration-200 mt-4"
          >
            Done & Return to Cafe
          </button>
        )}
      </div>
    </div>
  );
}
