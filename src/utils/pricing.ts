import { BillboardLocation, PricingCalculation } from '../types/billboard';

export const TAX_RATE_HST = 0.13; // 13% Canadian HST (Ontario / Federal)

/**
 * Calculates volume & duration discount rate
 */
export function getDiscountPercentage(weeks: number, boardCount: number): number {
  let discount = 0;

  if (weeks >= 26) {
    discount += 25; // 26+ weeks (semi-annual/annual)
  } else if (weeks >= 12) {
    discount += 18; // 12-25 weeks (quarterly)
  } else if (weeks >= 4) {
    discount += 10; // 4-11 weeks (standard monthly cycle)
  }

  // Multi-location discount
  if (boardCount >= 3) {
    discount += 8;
  } else if (boardCount >= 2) {
    discount += 5;
  }

  return Math.min(discount, 35); // capped at 35% max
}

/**
 * Calculates complete campaign pricing breakdown
 */
export function calculateCampaignPricing(
  billboards: BillboardLocation[],
  weeks: number,
  needsProductionPrint: boolean = true
): PricingCalculation {
  if (billboards.length === 0 || weeks <= 0) {
    return {
      baseWeeklyTotal: 0,
      durationWeeks: weeks > 0 ? weeks : 1,
      discountPercentage: 0,
      discountAmount: 0,
      productionCost: 0,
      subtotal: 0,
      taxAmount: 0,
      grandTotal: 0,
      totalImpressions: 0,
      cpm: 0,
    };
  }

  const baseWeeklyTotal = billboards.reduce((acc, b) => acc + b.weeklyRate, 0);
  const rawRentalCost = baseWeeklyTotal * weeks;

  const discountPercentage = getDiscountPercentage(weeks, billboards.length);
  const discountAmount = Math.round((rawRentalCost * discountPercentage) / 100);
  const discountedRentalCost = rawRentalCost - discountAmount;

  // Production fee: only applies to static/superboard/poster if vinyl print needed
  const productionCost = needsProductionPrint
    ? billboards.reduce((acc, b) => {
        // Digital has 0 vinyl production fee
        return acc + (b.type === 'digital' ? 0 : b.productionFee);
      }, 0)
    : 0;

  const subtotal = discountedRentalCost + productionCost;
  const taxAmount = Math.round(subtotal * TAX_RATE_HST);
  const grandTotal = subtotal + taxAmount;

  const totalWeeklyImpressions = billboards.reduce((acc, b) => acc + b.weeklyImpressions, 0);
  const totalImpressions = totalWeeklyImpressions * weeks;

  const cpm = totalImpressions > 0 ? Number(((grandTotal / totalImpressions) * 1000).toFixed(2)) : 0;

  return {
    baseWeeklyTotal,
    durationWeeks: weeks,
    discountPercentage,
    discountAmount,
    productionCost,
    subtotal,
    taxAmount,
    grandTotal,
    totalImpressions,
    cpm,
  };
}

/**
 * Generates official Sign Art Media booking confirmation ID
 */
export function generateBookingId(): string {
  const year = new Date().getFullYear();
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `SAM-${year}-${randomStr}`;
}

/**
 * Formats CAD currency nicely
 */
export function formatCAD(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats large audience counts (e.g., 185000 -> 185K)
 */
export function formatImpressionNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toLocaleString();
}
