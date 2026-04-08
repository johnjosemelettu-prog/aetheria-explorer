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
  createdAt: string;
  updatedAt: string;
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
  timestamp: string;
}

export interface ESimProfile {
  id: string;
  userId: string;
  country: string;
  dataLimit: number; // in GB
  dataUsed: number;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
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
