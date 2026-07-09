/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Brew (Coffee & Drinks)' | 'Bites (Burgers & Pizza)' | 'Beats (Snacks & Appetizers)' | 'Desserts';
  image: string;
  isSpecialty?: boolean;
  isVeg?: boolean;
  spicyLevel?: number; // 0 to 3
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableType: string;
  specialRequests?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl?: string; // we can simulate audio playing with standard visualizers
}
