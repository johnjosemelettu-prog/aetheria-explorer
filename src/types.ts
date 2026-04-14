export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  location?: string;
  role: 'explorer' | 'admin' | 'partner';
  vibe?: string;
  bodyMeasurements?: BodyMeasurements;
  preferences?: TravelPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface TravelPreferences {
  currency: string;
  language: string;
  timezone: string;
  units: 'metric' | 'imperial';
}

export interface Itinerary {
  id: string;
  userId: string;
  title: string;
  destination: string;
  vibe?: string;
  startDate: string;
  endDate: string;
  invitedUsers?: string[];
  activities: Activity[];
  carbonFootprint: number;
  status: 'draft' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  location: string;
  time: string;
  type: 'flight' | 'hotel' | 'dining' | 'sightseeing' | 'transport';
}

export interface WalletTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  category: 'booking' | 'topup' | 'refund' | 'esim';
  timestamp: { seconds: number };
}

export interface ESimProfile {
  id: string;
  userId: string;
  country: string;
  dataLimit: number; // in GB
  dataUsed: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
  createdAt: { seconds: number };
}

export interface WalletState {
  balance: number;
  lastUpdated: string;
}

export interface BodyMeasurements {
  height: number; // in cm
  weight: number; // in kg
  chest?: number;
  waist?: number;
  hips?: number;
  shoulder?: number;
  inseam?: number;
}

export interface FashionRental {
  id: string;
  userId: string;
  itemName: string;
  category: string;
  price: number;
  type: 'buy' | 'rent';
  status: 'active' | 'returned' | 'purchased';
  rentalEndDate?: string;
  destination: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: 'free' | 'premium';
  status: 'active' | 'inactive';
  startDate: string;
  endDate: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  vibe: string;
  destination: string;
  imageUrl: string;
}

export interface PremiumPass {
  id: string;
  userId: string;
  bookingId: string;
  status: 'active' | 'expired';
  purchasedAt: string;
  expiresAt: string;
}
