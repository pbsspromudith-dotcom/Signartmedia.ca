'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { BILLBOARDS_DATA, ExtendedBillboardLocation } from '../data/billboards';
import { BillboardLocation } from '../types/billboard';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { InteractiveMap } from '../components/InteractiveMap';
import { BillboardCatalog } from '../components/BillboardCatalog';
import { CityMarketsSection } from '../components/CityMarketsSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { PricingSection } from '../components/PricingSection';
import { RoiCalculator } from '../components/RoiCalculator';
import { ContactSection } from '../components/ContactSection';
import { BookingModal } from '../components/BookingModal';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { CalendarCheck, ArrowRight } from 'lucide-react';

// Dynamically load the Three.js 3D Billboard Simulator with ssr disabled
const Billboard3DViewer = dynamic(
  () => import('../components/Billboard3DViewer').then((mod) => mod.Billboard3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center bg-[#111111] text-white rounded-lg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#eb3b14] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-wider font-bold text-[#888888]">
            Loading 3D WebGL Studio...
          </span>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [selectedBillboardFor3D, setSelectedBillboardFor3D] = useState<ExtendedBillboardLocation>(BILLBOARDS_DATA[0]);
  const [selectedBillboardsForBooking, setSelectedBillboardsForBooking] = useState<ExtendedBillboardLocation[]>([
    BILLBOARDS_DATA[0],
  ]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingInitialWeeks, setBookingInitialWeeks] = useState<number>(4);
  const [bookingInitialNeedsPrint, setBookingInitialNeedsPrint] = useState<boolean>(true);
  const [catalogFilter, setCatalogFilter] = useState<string>('all');

  // Switch to 3D Viewer with specified billboard
  const handleOpen3DViewer = (billboard: ExtendedBillboardLocation) => {
    setSelectedBillboardFor3D(billboard);
    setActiveTab('3d-simulator');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Toggle selection for multiple boards
  const handleToggleSelectBillboard = (billboard: ExtendedBillboardLocation) => {
    setSelectedBillboardsForBooking((prev) => {
      const exists = prev.some((b) => b.id === billboard.id);
      if (exists) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter((b) => b.id !== billboard.id);
      } else {
        return [...prev, billboard];
      }
    });
  };

  // Remove board by ID
  const handleRemoveBillboardById = (id: string) => {
    setSelectedBillboardsForBooking((prev) => prev.filter((b) => b.id !== id));
  };

  // Direct Book single board
  const handleBookSingleBoard = (billboard: BillboardLocation) => {
    setSelectedBillboardsForBooking([billboard as ExtendedBillboardLocation]);
    setIsBookingModalOpen(true);
  };

  // Open booking modal
  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  // From ROI Calculator to booking
  const handleProceedFromCalculator = (weeks: number, needsPrint: boolean) => {
    setBookingInitialWeeks(weeks);
    setBookingInitialNeedsPrint(needsPrint);
    setIsBookingModalOpen(true);
  };

  const handleSelectMarket = (marketKey: string) => {
    const matched = BILLBOARDS_DATA.find((b) => {
      if (marketKey === 'toronto') return b.city === 'Toronto';
      if (marketKey === 'vancouver') return b.city === 'Vancouver';
      if (marketKey === 'montreal') return b.city === 'Montreal';
      if (marketKey === 'calgary') return b.city === 'Calgary';
      if (marketKey === 'ottawa') return b.city === 'Ottawa';
      return false;
    });
    if (matched) {
      setSelectedBillboardFor3D(matched);
    }
    if (typeof document !== 'undefined') {
      const mapSection = document.getElementById('map-explorer');
      mapSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#121212] flex flex-col font-sans selection:bg-[#eb3b14] selection:text-white">
      {/* Dynamic Meta & Schema Tags */}
      <SEOHead
        activeTab={activeTab}
        selectedBoard={activeTab === '3d-simulator' ? selectedBillboardFor3D : null}
        categoryFilter={activeTab === 'explore' ? catalogFilter : 'all'}
      />

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedBillboards={selectedBillboardsForBooking}
        onOpenBooking={handleOpenBooking}
      />

      <main className="flex-1">
        {/* TAB 1: EXPLORE / HOME VIEW */}
        {activeTab === 'explore' && (
          <div>
            {/* Hero Section */}
            <Hero
              onExploreMap={() => {
                const mapEl = document.getElementById('locations');
                mapEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              onLaunch3D={() => handleOpen3DViewer(BILLBOARDS_DATA[0])}
              onViewPricing={() => {
                const pricingEl = document.getElementById('pricing');
                pricingEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Section 2: GOOD LOCATIONS, GREAT EXPOSURE. */}
            <BillboardCatalog
              billboards={BILLBOARDS_DATA}
              selectedBillboards={selectedBillboardsForBooking}
              onToggleSelect={handleToggleSelectBillboard}
              onOpen3DViewer={handleOpen3DViewer}
              onBookNow={handleBookSingleBoard}
              selectedFilter={catalogFilter}
              onFilterChange={setCatalogFilter}
              onOpenMap={() => {
                const mapEl = document.getElementById('map-explorer');
                mapEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Interactive Map Section */}
            <section id="map-explorer" className="py-16 bg-[#f5f2eb] border-b border-[#e5e0d3]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#555555]">
                    <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
                    <span>CANADIAN GEOGRAPHIC COVERAGE</span>
                  </div>
                  <h2 className="text-4xl sm:text-6xl font-black text-[#111111] leading-none font-display uppercase tracking-tight">
                    INTERACTIVE NETWORK MAP.
                  </h2>
                  <p className="text-sm text-[#555555] max-w-xl">
                    Click any marker to inspect commuter traffic, illumination, and instant booking rates.
                  </p>
                </div>

                <InteractiveMap
                  billboards={BILLBOARDS_DATA}
                  selectedBillboard={selectedBillboardFor3D}
                  onSelectBillboard={(b) => setSelectedBillboardFor3D(b as ExtendedBillboardLocation)}
                  onOpen3DViewer={(b) => handleOpen3DViewer(b as ExtendedBillboardLocation)}
                  onBookNow={(b) => handleBookSingleBoard(b as ExtendedBillboardLocation)}
                />
              </div>
            </section>

            {/* Section 3: OWN A CORNER. MOVE A CITY. */}
            <CityMarketsSection
              onSelectMarket={handleSelectMarket}
              onOpenBooking={handleOpenBooking}
            />

            {/* Section 4: DIFFERENT FORMATS, SAME IMPACT. */}
            <PricingSection
              onOpenBooking={handleOpenBooking}
              onOpenContact={() => {
                const cEl = document.getElementById('contact');
                cEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Section 5: BIG DOESN'T HAVE TO BE COMPLICATED. */}
            <HowItWorksSection
              onOpenBooking={handleOpenBooking}
              onOpen3D={() => handleOpen3DViewer(BILLBOARDS_DATA[0])}
            />

            {/* Section 6: ROI & CAMPAIGN CALCULATOR */}
            <RoiCalculator
              allBillboards={BILLBOARDS_DATA}
              selectedBillboards={selectedBillboardsForBooking}
              onSetSelectedBillboards={(b) => setSelectedBillboardsForBooking(b as ExtendedBillboardLocation[])}
              onProceedToBook={handleProceedFromCalculator}
            />

            {/* Section 7: GOOD QUESTIONS, STRAIGHT ANSWERS. */}
            <ContactSection />
          </div>
        )}

        {/* TAB 2: DEDICATED 3D BILLBOARD SIMULATOR */}
        {activeTab === '3d-simulator' && (
          <div className="py-12 bg-[#f5f2eb]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Simulator Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e5e0d3] pb-6">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#555555] mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
                    <span>REAL-TIME THREE.JS WEBGL STUDIO</span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-black text-[#111111] leading-none font-display uppercase tracking-tight">
                    3D BILLBOARD AD SIMULATOR.
                  </h1>
                  <p className="text-[#555555] text-sm mt-2 max-w-2xl">
                    Experience how your brand ad looks in realistic daytime, golden sunset, and illuminated night highway conditions.
                    Upload your own brand artwork or write live headlines on the display face!
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBookSingleBoard(selectedBillboardFor3D)}
                    className="py-3 px-6 bg-[#eb3b14] hover:bg-[#d4320e] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Book This Location (${selectedBillboardFor3D.weeklyRate}/wk)</span>
                  </button>
                </div>
              </div>

              {/* Location Picker Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                <span className="text-xs text-[#555555] font-bold uppercase tracking-wider shrink-0 mr-1">
                  Active Board:
                </span>
                {BILLBOARDS_DATA.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBillboardFor3D(b)}
                    className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider shrink-0 border transition-all cursor-pointer ${
                      selectedBillboardFor3D.id === b.id
                        ? 'border-[#111111] bg-[#111111] text-white'
                        : 'border-[#d8d3c5] bg-white text-[#666666] hover:text-[#111111]'
                    }`}
                  >
                    {b.code} - {b.city} ({b.format.split(' ')[0]})
                  </button>
                ))}
              </div>

              {/* Main Three.js Viewer Canvas */}
              <Billboard3DViewer
                billboard={selectedBillboardFor3D}
                onBookNow={handleBookSingleBoard}
              />

              {/* Specs & Traffic of Current Board */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 sm:p-8 bg-white border border-[#d8d3c5] shadow-sm">
                <div>
                  <span className="text-[10px] text-[#777777] uppercase font-bold tracking-wider block">
                    Location & Direction
                  </span>
                  <strong className="text-[#111111] text-sm block mt-0.5">{selectedBillboardFor3D.road}</strong>
                  <span className="text-xs text-[#555555]">{selectedBillboardFor3D.facing}</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#777777] uppercase font-bold tracking-wider block">
                    Dimensions & Area
                  </span>
                  <strong className="text-[#111111] text-sm block mt-0.5">{selectedBillboardFor3D.dimensions}</strong>
                  <span className="text-xs text-[#555555]">{selectedBillboardFor3D.format}</span>
                </div>

                <div>
                  <span className="text-[10px] text-[#777777] uppercase font-bold tracking-wider block">
                    Weekly Eyeballs
                  </span>
                  <strong className="text-[#eb3b14] text-xl font-display font-black block mt-0.5">
                    {selectedBillboardFor3D.weeklyImpressions.toLocaleString()} views
                  </strong>
                  <span className="text-xs text-[#555555]">
                    {selectedBillboardFor3D.dailyTraffic.toLocaleString()} vehicles/day
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[#777777] uppercase font-bold tracking-wider block">
                    Rental Rate
                  </span>
                  <strong className="text-[#111111] text-2xl font-display font-black block mt-0.5">
                    ${selectedBillboardFor3D.weeklyRate} CAD
                  </strong>
                  <span className="text-xs text-[#555555]">per 1-week flight</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BILLBOARD RATES & PRICING */}
        {activeTab === 'pricing' && (
          <div>
            <PricingSection
              onOpenBooking={handleOpenBooking}
              onOpenContact={() => setActiveTab('contact')}
            />
            <BillboardCatalog
              billboards={BILLBOARDS_DATA}
              selectedBillboards={selectedBillboardsForBooking}
              onToggleSelect={handleToggleSelectBillboard}
              onOpen3DViewer={handleOpen3DViewer}
              onBookNow={handleBookSingleBoard}
              onOpenMap={() => setActiveTab('explore')}
            />
            <ContactSection />
          </div>
        )}

        {/* TAB 4: CAMPAIGN CALCULATOR */}
        {activeTab === 'calculator' && (
          <div>
            <RoiCalculator
              allBillboards={BILLBOARDS_DATA}
              selectedBillboards={selectedBillboardsForBooking}
              onSetSelectedBillboards={(b) => setSelectedBillboardsForBooking(b as ExtendedBillboardLocation[])}
              onProceedToBook={handleProceedFromCalculator}
            />
            <ContactSection />
          </div>
        )}

        {/* TAB 5: CONTACT US & RFP */}
        {activeTab === 'contact' && (
          <div>
            <ContactSection />
          </div>
        )}
      </main>

      {/* Floating Booking Pill when boards selected */}
      {selectedBillboardsForBooking.length > 0 && activeTab === 'explore' && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="p-3 bg-[#111111] text-white border-2 border-[#111111] shadow-2xl flex items-center gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
                <span>{selectedBillboardsForBooking.length} Location(s) In Hold</span>
              </div>
              <div className="text-xs font-mono font-bold text-[#eb3b14]">
                ${selectedBillboardsForBooking.reduce((acc, b) => acc + b.weeklyRate, 0).toLocaleString()} CAD / wk
              </div>
            </div>

            <button
              onClick={handleOpenBooking}
              className="py-2 px-4 bg-[#eb3b14] hover:bg-[#d4320e] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Book Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedBillboards={selectedBillboardsForBooking}
        onRemoveBillboard={handleRemoveBillboardById}
        initialWeeks={bookingInitialWeeks}
        initialNeedsPrint={bookingInitialNeedsPrint}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} onOpenBooking={handleOpenBooking} />
    </div>
  );
}

