/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Song, Review } from './types';
import masalaChaiImg from './assets/images/masala_chai_kulhad_1783603163882.jpg';
import mozzarellaBaguetteImg from './assets/images/mozzarella_garlic_baguette_1783603851925.jpg';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Special Kadak Tea',
    description: 'Strong, aromatic tea brewed with rich masala notes and a classic desi kick.',
    price: 20,
    category: 'Brew (Coffee & Drinks)',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  },
  {
    id: 'm2',
    name: 'Desi Masala Tea',
    description: 'A comforting blend of tea, ginger, and warming spices served in the classic spirit of Indian chai culture.',
    price: 25,
    category: 'Brew (Coffee & Drinks)',
    image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  },
  {
    id: 'm3',
    name: 'Hot Coffee',
    description: 'Freshly brewed hot coffee with a smooth, comforting finish for your evening unwind.',
    price: 45,
    category: 'Brew (Coffee & Drinks)',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  },
  {
    id: 'm4',
    name: 'Cold Coffee with Ice Cream',
    description: 'Chilled, creamy cold coffee topped with a scoop of ice cream for a rich café-style treat.',
    price: 110,
    category: 'Brew (Coffee & Drinks)',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  },
  {
    id: 'm5',
    name: 'Paneer Tikka',
    description: 'Char-grilled paneer cubes marinated in tandoori spices and finished with smoky, fresh flavors.',
    price: 180,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true,
    spicyLevel: 2
  },
  {
    id: 'm6',
    name: 'Paneer Malai Tikka',
    description: 'Creamy, mildly spiced paneer tikka with a smooth, rich finish and classic tandoor aroma.',
    price: 190,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true,
    spicyLevel: 1
  },
  {
    id: 'm7',
    name: 'Tandoori Chicken',
    description: 'Juicy chicken pieces roasted in tandoori spices for a smoky, bold, and flavorful starter.',
    price: 260,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: false,
    spicyLevel: 3
  },
  {
    id: 'm8',
    name: 'Chicken Tikka',
    description: 'Succulent chicken tikka prepared with a balanced blend of tandoori masala and smoky char.',
    price: 280,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: false,
    spicyLevel: 2
  },
  {
    id: 'm9',
    name: 'Veg Hakka Noodles',
    description: 'Stir-fried noodles packed with vibrant vegetables and a rich Indo-Chinese savory finish.',
    price: 110,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true,
    spicyLevel: 1
  },
  {
    id: 'm10',
    name: 'Chicken Hakka Noodles',
    description: 'Classic hakka noodles tossed with chicken, veggies, and bold schezwan-style flavors.',
    price: 140,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: false,
    spicyLevel: 2
  },
  {
    id: 'm11',
    name: 'Veg Fried Rice',
    description: 'Fragrant fried rice loaded with garden vegetables and a light, savory wok flavor.',
    price: 90,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  },
  {
    id: 'm12',
    name: 'Chicken Fried Rice',
    description: 'A comforting rice dish with tender chicken, vegetables, and signature wok-tossed goodness.',
    price: 150,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1517244683847-94a83d3e3157?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: false
  },
  {
    id: 'm13',
    name: 'Paneer Butter Masala',
    description: 'Soft paneer pieces simmered in a rich buttery tomato gravy, finished with gentle spices.',
    price: 130,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  },
  {
    id: 'm14',
    name: 'Paneer Tikka Masala',
    description: 'A rich, velvety masala curry with smoky paneer tikka and comforting Indian gravy notes.',
    price: 210,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  },
  {
    id: 'm15',
    name: 'Butter Chicken',
    description: 'A creamy, indulgent chicken curry finished with butter and aromatic spices.',
    price: 310,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: false
  },
  {
    id: 'm16',
    name: 'Veg Cheese Pizza',
    description: 'Loaded with cheese and garden veggies on a thin, crisp base with a perfect bake.',
    price: 110,
    category: 'Bites (Burgers & Pizza)',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  },
  {
    id: 'm17',
    name: 'Paneer Special Pizza',
    description: 'A cheesy pizza topped with paneer, herbs, and bold, comforting flavor bursts.',
    price: 160,
    category: 'Bites (Burgers & Pizza)',
    image: 'https://images.unsplash.com/photo-1548365328-9f547fb9587c?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true,
    spicyLevel: 1
  },
  {
    id: 'm18',
    name: 'Chicken Pizza',
    description: 'Loaded with savory chicken and cheese on a perfectly baked cheesy crust.',
    price: 210,
    category: 'Bites (Burgers & Pizza)',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: false,
    spicyLevel: 1
  },
  {
    id: 'm19',
    name: 'Paneer Steam Momos',
    description: 'Soft, juicy momos filled with paneer and served with a savory, house-made chutney.',
    price: 60,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  },
  {
    id: 'm20',
    name: 'Garlic Naan',
    description: 'Freshly baked naan brushed with garlic and butter, ideal with curries and gravies.',
    price: 50,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  }
];

export const SONGS: Song[] = [
  {
    id: 's1',
    title: 'Acoustic Snare Harmony',
    artist: 'Sakti Percussion Ensemble',
    duration: '3:45'
  },
  {
    id: 's2',
    title: 'Warm Steam & Handpans',
    artist: 'The Brew Beats Group',
    duration: '4:12'
  },
  {
    id: 's3',
    title: 'Rhythmic Coffee Beans',
    artist: 'DJ Drummer Boy',
    duration: '2:58'
  },
  {
    id: 's4',
    title: 'Mughal Evening Tabla Beat',
    artist: 'Satyam Classic Fusion',
    duration: '5:24'
  }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Anjali Sharma',
    rating: 5,
    comment: 'The concept of drum furniture is absolutely genius! I loved the tandoori paneer pizza and cold coffee here. The vibe is spectacular, definitely the best hangout spot in Jaijaipur!',
    date: 'July 5, 2026',
    avatar: ''
  },
  {
    id: 'r2',
    name: 'Rajesh Dewangan',
    rating: 5,
    comment: 'SS Drum Cafe is exactly what Sakti needed! Incredible design, very cozy white swing seat, and delicious, clean food. The Masala Chai in kulhad brought back traditional memories with a modern rhythm.',
    date: 'June 28, 2026',
    avatar: ''
  },
  {
    id: 'r3',
    name: 'Vikram Singh',
    rating: 4.8,
    comment: 'A true sensory treat! Excellent customer service, cozy lighting, and a magnificent musical ambiance. The Choco Lava Cake is a must-have for sweet lovers. We will come back every weekend!',
    date: 'June 14, 2026',
    avatar: ''
  }
];
