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
    name: 'Masala Chai',
    description: 'Traditional Indian spice-infused milk tea brewed to perfection with fresh ginger, cardamom, and a touch of cloves, served in an authentic clay cup (kulhad).',
    price: 49,
    category: 'Brew (Coffee & Drinks)',
    image: masalaChaiImg,
    isSpecialty: true,
    isVeg: true
  },
  {
    id: 'm2',
    name: 'Desi Tadka Pizza',
    description: 'Fresh stone-baked thin-crust pizza topped with succulent tandoori marinated paneer cubes, crisp red onions, bell peppers, green chilies, and loaded with liquid mozzarella.',
    price: 199,
    category: 'Bites (Burgers & Pizza)',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true,
    spicyLevel: 2
  },
  {
    id: 'm3',
    name: 'Mughal Burger',
    description: 'A grand fusion double-decker burger featuring a seasoned, char-grilled vegetable kebab patty, tangy mint-coriander mayo, caramelized sweet onions, and a layer of melting cheddar cheese.',
    price: 159,
    category: 'Bites (Burgers & Pizza)',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true,
    spicyLevel: 1
  },
  {
    id: 'm4',
    name: 'Cold Coffee',
    description: 'Premium double shot of house-blend espresso whisked creamy with cold milk, decadent Swiss chocolate syrup, and crowned with a giant scoop of French vanilla ice cream.',
    price: 129,
    category: 'Brew (Coffee & Drinks)',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  },
  {
    id: 'm5',
    name: 'Desi Noodles',
    description: 'Stir-fried street-style Hakka noodles tossed in a high-heat wok with crunchy garden cabbage, capsicum, carrots, scallions, and a robust savory soy-garlic schezwan sauce.',
    price: 149,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true,
    spicyLevel: 2
  },
  {
    id: 'm6',
    name: 'Choco Lava Cake',
    description: 'Succulent warm chocolate sponge cake containing an intensely rich center of molten dark chocolate that flows gracefully when cut, dusted with fine powdered sugar.',
    price: 119,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
    isSpecialty: true,
    isVeg: true
  },
  // Extra Menu Items for View Full Menu
  {
    id: 'm7',
    name: 'Single Shot Espresso',
    description: 'A powerful, concentrated 30ml extraction of our premium medium-dark roasted Arabica beans, featuring a rich golden crema.',
    price: 89,
    category: 'Brew (Coffee & Drinks)',
    image: 'https://images.unsplash.com/photo-1510707577719-fa7c14a51e61?w=600&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'm8',
    name: 'Velvet Cappuccino',
    description: 'Balanced double-shot espresso combined with equal layers of warm steamed milk and micro-foam velvet texture, finished with cocoa dust.',
    price: 119,
    category: 'Brew (Coffee & Drinks)',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a720eb9?w=600&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'm9',
    name: 'Hazelnut Frappe',
    description: 'A luscious icy blend of espresso, dark roasted hazelnut praline syrup, whole milk, topped with rich whipped cream and chocolate curls.',
    price: 139,
    category: 'Brew (Coffee & Drinks)',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'm10',
    name: 'Tandoori Paneer Wrap',
    description: 'Grilled whole wheat wrap packed with clay-oven roasted paneer chunks, mixed bell peppers, shredded lettuce, and refreshing mint-coriander salsa.',
    price: 139,
    category: 'Bites (Burgers & Pizza)',
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=600&auto=format&fit=crop&q=80',
    isVeg: true,
    spicyLevel: 1
  },
  {
    id: 'm11',
    name: 'Royal Veg Club Sandwich',
    description: 'A triple-deck classic loaded with crisp cucumber, ripe tomatoes, butter lettuce, cheddar slice, and an aromatic house-special pesto cream spread.',
    price: 129,
    category: 'Bites (Burgers & Pizza)',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'm12',
    name: 'Spicy Peri-Peri Fries',
    description: 'Super-crispy golden double-fried skin-on rustic potatoes dusted heavily with our secret hot peri-peri seasoning, served with garlic aioli.',
    price: 89,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80',
    isVeg: true,
    spicyLevel: 2
  },
  {
    id: 'm13',
    name: 'Mozzarella Garlic Baguette',
    description: 'Crisp rustic Italian baguette slices slathered with freshly crushed wild garlic herb butter and covered in bubbling, golden-brown mozzarella.',
    price: 109,
    category: 'Beats (Snacks & Appetizers)',
    image: mozzarellaBaguetteImg,
    isVeg: true
  },
  {
    id: 'm14',
    name: 'Samosa Beats Platter',
    description: 'Crispy flaky crust pastry filled with local green peas and smashed potatoes roasted in spices, served with sour-sweet date tamarind chutney.',
    price: 99,
    category: 'Beats (Snacks & Appetizers)',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80',
    isVeg: true
  },
  {
    id: 'm15',
    name: 'Warm Walnut Fudgy Brownie',
    description: 'Extremely dense, chocolate-fudgy brownie loaded with roasted California walnuts, served under warm hot-fudge sauce and french vanilla ice cream.',
    price: 129,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&auto=format&fit=crop&q=80',
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
