export type BillboardType = 'digital' | 'static' | 'superboard' | 'poster';

export type BillboardStatus = 'available' | 'reserved' | 'high-demand';

export interface BillboardLocation {
  id: string;
  code: string;
  name: string;
  road: string;
  address: string;
  city: string;
  province: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapPosition: {
    x: number; // 0 - 100 percentage in region map
    y: number; // 0 - 100 percentage in region map
  };
  type: BillboardType;
  format: string; // e.g. "14' x 48' Highway Bulletins"
  dimensions: string; // "14ft H x 48ft W"
  facing: string; // "Eastbound - Morning Rush View"
  dailyTraffic: number; // Vehicles per day
  weeklyImpressions: number; // Estimated eyeballs / week
  weeklyRate: number; // In CAD $
  productionFee: number; // Vinyl print & install fee (0 for digital)
  minWeeks: number;
  illumination: string;
  status: BillboardStatus;
  availableFrom: string;
  features: string[];
  spotDurationSec?: number; // e.g. 10 sec for digital
  loopDurationSec?: number; // e.g. 60 sec loop
  dwellTimeSec: number;
  description: string;
}

export interface BookingRequest {
  id?: string;
  billboardIds: string[];
  startDate: string;
  weeks: number;
  advertiserName: string;
  companyName: string;
  email: string;
  phone: string;
  customArtText?: string;
  hasOwnArtwork: boolean;
  notes?: string;
  totalCost: number;
  productionCost: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
  createdAt: string;
}

export interface PricingCalculation {
  baseWeeklyTotal: number;
  durationWeeks: number;
  discountPercentage: number;
  discountAmount: number;
  productionCost: number;
  subtotal: number;
  taxAmount: number; // 13% HST Canadian standard
  grandTotal: number;
  totalImpressions: number;
  cpm: number; // Cost per thousand impressions
}
