import test from 'node:test';
import assert from 'node:assert/strict';
import { getSeoMetadata } from './seo';
import { BillboardLocation } from '../types/billboard';

const sampleBoard: BillboardLocation = {
  id: 'sam-tor-401-01',
  code: 'SAM-TOR-401-D1',
  name: 'Hwy 401 & Yonge St Spectacular',
  road: 'Highway 401',
  address: 'Hwy 401 at Yonge St Interchange, North York, Toronto',
  city: 'Toronto',
  province: 'Ontario',
  coordinates: { lat: 43.7592, lng: -79.4085 },
  mapPosition: { x: 58, y: 64 },
  type: 'digital',
  format: "14' x 48' Digital Spectacular",
  dimensions: '14ft H x 48ft W',
  facing: 'Eastbound',
  dailyTraffic: 265000,
  weeklyImpressions: 485000,
  weeklyRate: 3850,
  productionFee: 0,
  minWeeks: 1,
  illumination: '24/7 Ultra-Nits Dynamic LED',
  status: 'available',
  availableFrom: 'Available Now',
  features: ['Express Lanes', 'High Traffic'],
  dwellTimeSec: 11,
  description: 'Unsurpassed visibility on Highway 401.',
};

test('getSeoMetadata returns default branded title and description for explore/home', () => {
  const meta = getSeoMetadata('explore');
  assert.ok(meta.title.includes('Sign Art Media'));
  assert.ok(meta.title.includes('Billboard Rentals'));
  assert.ok(meta.description.length >= 100);
  assert.ok(meta.description.includes('Highway 401'));
  assert.equal(meta.ogType, 'website');
});

test('getSeoMetadata returns customized location and specs for 3D simulator view', () => {
  const meta = getSeoMetadata('3d-simulator', sampleBoard);
  assert.ok(meta.title.includes('Hwy 401 & Yonge St Spectacular'));
  assert.ok(meta.title.includes('Toronto'));
  assert.ok(meta.description.includes('265,000'));
  assert.ok(meta.description.includes('$3850/wk'));
  assert.equal(meta.schemaType, 'Product');
});

test('getSeoMetadata returns pricing and rates targeted keywords for pricing tab', () => {
  const meta = getSeoMetadata('pricing');
  assert.ok(meta.title.includes('Rates & Prices'));
  assert.ok(meta.keywords.includes('billboard prices Canada'));
  assert.ok(meta.description.includes('$2,150/wk'));
});

test('getSeoMetadata returns category specific title for digital filter', () => {
  const meta = getSeoMetadata('explore', null, 'digital');
  assert.ok(meta.title.includes('Digital LED Billboard Rentals'));
  assert.ok(meta.description.includes('Digital LED Spectacular'));
});
