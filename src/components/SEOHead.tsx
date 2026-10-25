import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BillboardLocation } from '../types/billboard';
import { getSeoMetadata } from '../utils/seo';

export interface SEOHeadProps {
  activeTab?: string;
  selectedBoard?: BillboardLocation | null;
  categoryFilter?: string;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string;
  customCanonical?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  activeTab = 'explore',
  selectedBoard = null,
  categoryFilter = 'all',
  customTitle,
  customDescription,
  customKeywords,
  customCanonical,
}) => {
  const meta = getSeoMetadata(activeTab, selectedBoard, categoryFilter);

  const title = customTitle || meta.title;
  const description = customDescription || meta.description;
  const keywords = customKeywords || meta.keywords;
  const canonicalUrl = customCanonical || meta.canonicalUrl;
  const ogImage = meta.ogImage;

  // Schema.org Structured Data (JSON-LD)
  const schemaJsonLd = selectedBoard && activeTab === '3d-simulator'
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: selectedBoard.name,
        image: ogImage,
        description: `Premium billboard located at ${selectedBoard.road}, ${selectedBoard.city}. Weekly reach: ${selectedBoard.weeklyImpressions.toLocaleString()} views.`,
        sku: selectedBoard.code,
        brand: {
          '@type': 'Brand',
          name: 'Sign Art Media',
        },
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'CAD',
          price: selectedBoard.weeklyRate,
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'Sign Art Media Canada',
          },
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'AdvertisingAgency'],
        name: 'Sign Art Media Canada',
        url: 'https://signartmedia.ca/',
        logo: 'https://signartmedia.ca/logo.png',
        image: ogImage,
        description:
          'Sign Art Media is a premier Canadian outdoor advertising and billboard rental company operating along Highway 401, QEW, Gardiner Expressway, and top metropolitan centers.',
        telephone: '+1-416-555-7446',
        email: 'info@signartmedia.ca',
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '100 University Avenue, 8th Floor',
          addressLocality: 'Toronto',
          addressRegion: 'ON',
          postalCode: 'M5J 1V6',
          addressCountry: 'CA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 43.6472,
          longitude: -79.3861,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:30',
          },
        ],
        areaServed: [
          'Toronto',
          'Mississauga',
          'Markham',
          'Burlington',
          'Ottawa',
          'Montreal',
          'Vancouver',
          'Calgary',
        ],
      };

  return (
    <Helmet>
      {/* Standard HTML Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph / Facebook Social Sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Sign Art Media" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">{JSON.stringify(schemaJsonLd)}</script>
    </Helmet>
  );
};

export default SEOHead;
