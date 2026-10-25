import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getDiscountPercentage,
  calculateCampaignPricing,
  generateBookingId,
  formatCAD,
  formatImpressionNumber,
} from './pricing';
import { BillboardLocation } from '../types/billboard';

const mockBillboardDigital: BillboardLocation = {
  id: 'b-dig-1',
  code: 'SAM-TOR-DIG-01',
  name: 'Hwy 401 & Yonge Digital Superboard',
  road: 'Highway 401',
  address: '401 Hwy at Yonge St, Toronto',
  city: 'Toronto',
  province: 'ON',
  coordinates: { lat: 43.7615, lng: -79.4111 },
  mapPosition: { x: 50, y: 50 },
  type: 'digital',
  format: "14' x 48' Digital Spectacular",
  dimensions: '14ft H x 48ft W',
  facing: 'Eastbound',
  dailyTraffic: 245000,
  weeklyImpressions: 420000,
  weeklyRate: 3500,
  productionFee: 0,
  minWeeks: 1,
  illumination: '24/7 High-Nits LED',
  status: 'available',
  availableFrom: 'Immediate',
  features: ['Dynamic Dayparting', 'Ultra HD LED'],
  dwellTimeSec: 8,
  description: 'High visibility digital billboard',
};

const mockBillboardStatic: BillboardLocation = {
  id: 'b-stat-1',
  code: 'SAM-MIS-QEW-02',
  name: 'QEW & Hurontario Static Bulletin',
  road: 'QEW',
  address: 'QEW at Hurontario St, Mississauga',
  city: 'Mississauga',
  province: 'ON',
  coordinates: { lat: 43.589, lng: -79.644 },
  mapPosition: { x: 45, y: 55 },
  type: 'static',
  format: "14' x 48' Premier Bulletin",
  dimensions: '14ft H x 48ft W',
  facing: 'Westbound',
  dailyTraffic: 190000,
  weeklyImpressions: 290000,
  weeklyRate: 2200,
  productionFee: 750,
  minWeeks: 4,
  illumination: '24/7 Backlit Halogen',
  status: 'available',
  availableFrom: 'Immediate',
  features: ['Exclusive 100% Share', 'Night Floodlit'],
  dwellTimeSec: 9,
  description: 'Premium static highway billboard',
};

test('discount calculation handles duration and multiple boards', () => {
  assert.equal(getDiscountPercentage(2, 1), 0);
  assert.equal(getDiscountPercentage(4, 1), 10);
  assert.equal(getDiscountPercentage(12, 1), 18);
  assert.equal(getDiscountPercentage(26, 1), 25);
  // Multi-board additions
  assert.equal(getDiscountPercentage(4, 2), 15); // 10% + 5%
  assert.equal(getDiscountPercentage(12, 3), 26); // 18% + 8%
});

test('calculateCampaignPricing calculates correct subtotals, tax, and CPM', () => {
  const result = calculateCampaignPricing([mockBillboardDigital], 4, false);
  // Base weekly rate = $3500 * 4 weeks = $14,000
  // Discount at 4 weeks = 10% = $1,400
  // Subtotal = $14,000 - $1,400 = $12,600
  // Tax (13%) = 12600 * 0.13 = $1,638
  // Grand total = 12600 + 1638 = $14,238
  assert.equal(result.baseWeeklyTotal, 3500);
  assert.equal(result.discountPercentage, 10);
  assert.equal(result.discountAmount, 1400);
  assert.equal(result.subtotal, 12600);
  assert.equal(result.taxAmount, 1638);
  assert.equal(result.grandTotal, 14238);

  // Impressions: 420,000 * 4 = 1,680,000
  assert.equal(result.totalImpressions, 1680000);
  // CPM = (14238 / 1680000) * 1000 = 8.47
  assert.equal(result.cpm, 8.47);
});

test('calculateCampaignPricing applies production fee for static vinyl boards', () => {
  const resultWithPrint = calculateCampaignPricing([mockBillboardStatic], 4, true);
  // Static board has $750 production fee
  assert.equal(resultWithPrint.productionCost, 750);
  // Weekly rate: 2200 * 4 = 8800. Discount 10% = 880. Discounted rental = 7920
  // Subtotal with $750 print fee = 7920 + 750 = 8670
  assert.equal(resultWithPrint.subtotal, 8670);
});

test('generateBookingId produces valid SAM format', () => {
  const bookingId = generateBookingId();
  assert.match(bookingId, /^SAM-\d{4}-[A-Z0-9]{5}$/);
});

test('formatCAD formats CAD currency properly', () => {
  const cad = formatCAD(12500);
  assert.ok(cad.includes('12,500'));
});

test('formatImpressionNumber formats large audience figures cleanly', () => {
  assert.equal(formatImpressionNumber(185000), '185K');
  assert.equal(formatImpressionNumber(1500000), '1.5M');
});
