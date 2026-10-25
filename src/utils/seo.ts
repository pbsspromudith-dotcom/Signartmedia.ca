import { BillboardLocation } from '../types/billboard';

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogType: string;
  ogImage: string;
  schemaType: string;
}

const DEFAULT_ORIGIN = 'https://signartmedia.ca';

/**
 * Builds optimized SEO titles and meta descriptions for search engines
 */
export function getSeoMetadata(
  activeTab: string,
  selectedBoard?: BillboardLocation | null,
  categoryFilter?: string
): SeoMetadata {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : DEFAULT_ORIGIN;

  // 1. Specific Billboard detail view / 3D preview
  if (activeTab === '3d-simulator' && selectedBoard) {
    return {
      title: `${selectedBoard.name} (${selectedBoard.city}) | 3D Billboard Simulator | Sign Art Media`,
      description: `Preview your ad in 3D on the ${selectedBoard.format} at ${selectedBoard.road}, ${selectedBoard.city}. Daily traffic: ${selectedBoard.dailyTraffic.toLocaleString()} vehicles. Rates from $${selectedBoard.weeklyRate}/wk.`,
      keywords: `billboard ${selectedBoard.city}, ${selectedBoard.road} advertising, ${selectedBoard.type} billboard rental, outdoor media ${selectedBoard.province}, sign art media`,
      canonicalUrl: `${origin}/?tab=3d-simulator&board=${selectedBoard.code}`,
      ogType: 'product',
      ogImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'Product',
    };
  }

  // 2. Pricing & Formats
  if (activeTab === 'pricing') {
    return {
      title: 'Billboard Advertising Rates & Prices Canada (2026) | Sign Art Media',
      description: 'Explore transparent billboard rental rates across Highway 401, QEW, Gardiner, and downtown corridors. Static bulletins from $2,150/wk, Digital LED from $2,400/wk. Up to 25% duration discounts.',
      keywords: 'billboard prices Canada, billboard rental rates Toronto, digital billboard cost, outdoor advertising pricing, highway 401 advertising rates, sign art media pricing',
      canonicalUrl: `${origin}/?tab=pricing`,
      ogType: 'website',
      ogImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'PriceSpecification',
    };
  }

  // 3. ROI & Cost Calculator
  if (activeTab === 'calculator') {
    return {
      title: 'Billboard Campaign ROI & Cost Calculator | Sign Art Media',
      description: 'Calculate your outdoor advertising campaign reach, duration savings, and CPM in Canadian Dollars (CAD). Plan 1 to 52 week flights across Toronto, Vancouver, Montreal, and Calgary.',
      keywords: 'billboard ROI calculator, outdoor media cost estimator, CPM calculator billboard Canada, billboard impression calculator',
      canonicalUrl: `${origin}/?tab=calculator`,
      ogType: 'website',
      ogImage: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'WebApplication',
    };
  }

  // 4. Contact & Media RFP
  if (activeTab === 'contact') {
    return {
      title: 'Contact Sign Art Media | Canadian Billboard Rentals & Media RFP',
      description: 'Contact Sign Art Media outdoor advertising team in Toronto, ON. Request custom highway media kits, reserve location holds, or submit agency RFPs. Call (416) 555-SIGN.',
      keywords: 'contact sign art media, billboard company Toronto, outdoor media agency Canada, billboard RFP, outdoor advertising sales phone',
      canonicalUrl: `${origin}/?tab=contact`,
      ogType: 'website',
      ogImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'ContactPage',
    };
  }

  // 5. Category-specific filter on explore/home page
  if (categoryFilter === 'digital') {
    return {
      title: 'Digital LED Billboard Rentals Canada | High Nits Roadside Displays',
      description: 'Book prime Digital LED Spectacular billboards across Highway 401, Gardiner Expressway, and downtown Vancouver. 10s rotation, zero vinyl print fees, 24-hour turnaround.',
      keywords: 'digital billboard rental Canada, LED highway spectaculars, Toronto digital billboards, digital outdoor media',
      canonicalUrl: `${origin}/?category=digital`,
      ogType: 'website',
      ogImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'LocalBusiness',
    };
  }

  if (categoryFilter === 'superboard') {
    return {
      title: 'Highway Superboard Rentals Canada | 1,200 sq ft Massive Impact',
      description: 'Dominant 20ft x 60ft Highway Superboard rentals near Toronto Pearson Airport and key expressway junctions. Visible from 800+ meters with over 510,000 weekly viewers.',
      keywords: 'superboard advertising, highway superboard rental, 1200 sq ft billboard Canada, airport approach billboards',
      canonicalUrl: `${origin}/?category=superboard`,
      ogType: 'website',
      ogImage: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1200&q=80',
      schemaType: 'LocalBusiness',
    };
  }

  // 6. Default Home / Locations Map
  return {
    title: 'Sign Art Media | Billboard Rentals & Outdoor Advertising Canada',
    description: 'Premier Canadian billboard rental company. Prime digital spectaculars & static bulletins across Highway 401, Gardiner, QEW, Vancouver, Montreal, and Calgary. Instant online booking.',
    keywords: 'billboard rentals Canada, Toronto billboard advertising, highway 401 billboards, outdoor advertising rates, sign art media, digital billboards Ontario',
    canonicalUrl: `${origin}/`,
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'LocalBusiness',
  };
}
