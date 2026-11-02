'use client';

import React, { useState } from 'react';
import { ArrowRight, Box, MapPin, Eye, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreMap: () => void;
  onLaunch3D: () => void;
  onViewPricing: () => void;
  onFilterSearch?: (city: string, type: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMap,
  onLaunch3D,
  onViewPricing,
  onFilterSearch,
}) => {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const handleSearch = () => {
    if (onFilterSearch) {
      onFilterSearch(selectedCity, selectedType);
    }
    onExploreMap();
  };

  return (
    <section className="bg-[#f5f2eb] pt-8 pb-14 border-b border-[#e5e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header Row: Headline on Left, Editorial Paragraph on Right */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#555555]">
            <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
            <span>OUTDOOR BILLBOARD RENTALS • CANADA</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#111111] leading-[0.92] tracking-tight font-display uppercase">
                BIG IDEAS. <br />
                REAL PLACES.
              </h1>
            </div>

            <div className="lg:col-span-4 space-y-3 pb-1">
              <p className="text-sm sm:text-base text-[#444444] leading-relaxed">
                Sign Art Media puts your brand where it can't be skipped. Prime billboard locations across Toronto, Vancouver, Montreal, Calgary, and Canada's busiest highway expressways.
              </p>
              <div>
                <button
                  onClick={onViewPricing}
                  className="text-xs font-bold text-[#eb3b14] hover:text-[#c42d0c] flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                >
                  <span>See billboard rates & discounts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Card: Rooftop Billboard Mockup with "MAKE SOME NOISE" (matching reference) */}
        <div className="relative rounded-none overflow-hidden border border-[#111111] bg-[#111111] shadow-xl group">
          {/* Hero Image */}
          <div className="relative h-[380px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1800&q=85"
              alt="Urban rooftop billboard in city center"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

            {/* Overlaid Billboard Mockup Graphic (matching the orange MAKE SOME NOISE aesthetic in reference) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-xl p-6 sm:p-8 bg-[#eb3b14] border-4 border-[#111111] shadow-2xl text-center space-y-2 select-none">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-black/80 block">
                SIGN ART MEDIA • HIGHWAY & URBAN NETWORK
              </span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.9] font-display uppercase tracking-tight">
                MAKE SOME NOISE.
              </h2>
              <p className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wider">
                Toronto • Vancouver • Montreal • Calgary • Ottawa
              </p>
            </div>

            {/* Bottom Photo Pill */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2">
              <div className="px-3 py-1.5 bg-[#111111]/90 text-white text-xs font-medium border border-white/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
                <span>Gardiner & Spadina • Toronto Landmark</span>
              </div>
            </div>

            {/* Bottom Right Action on Photo */}
            <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
              <button
                onClick={onLaunch3D}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-[#111111] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer transition-colors"
              >
                <Box className="w-3.5 h-3.5 text-[#eb3b14]" />
                <span>Test in 3D Simulator</span>
              </button>
            </div>
          </div>

          {/* Floating Search / Quick Filter Bar (matching reference layout directly under hero) */}
          <div className="bg-[#111111] border-t border-[#333333] p-4 sm:p-6 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888] block mb-1">
                  DISCOVER INVENTORY
                </span>
                <span className="text-lg font-bold font-display uppercase tracking-wider text-white">
                  FIND YOUR NEXT BILLBOARD.
                </span>
              </div>

              {/* City Filter */}
              <div className="lg:col-span-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block mb-1">
                  Canadian City / Market
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-[#222222] border border-[#333333] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#eb3b14] cursor-pointer"
                  aria-label="Filter by market"
                >
                  <option value="all">All Canadian Markets</option>
                  <option value="Toronto">Toronto & GTA 401</option>
                  <option value="Mississauga">Mississauga & QEW</option>
                  <option value="Vancouver">Vancouver Burrard</option>
                  <option value="Montreal">Montreal A-15</option>
                  <option value="Calgary">Calgary Deerfoot</option>
                  <option value="Ottawa">Ottawa 417</option>
                </select>
              </div>

              {/* Media Format Filter */}
              <div className="lg:col-span-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block mb-1">
                  Billboard Format
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#222222] border border-[#333333] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#eb3b14] cursor-pointer"
                  aria-label="Filter by format"
                >
                  <option value="all">All Formats</option>
                  <option value="digital">Digital LED Spectacular</option>
                  <option value="static">Static Premier Bulletin</option>
                  <option value="superboard">Highway Superboard</option>
                  <option value="poster">Urban Junior Poster</option>
                </select>
              </div>

              {/* Search CTA */}
              <div className="lg:col-span-3 sm:mt-5 lg:mt-4">
                <button
                  onClick={handleSearch}
                  className="w-full py-2.5 px-4 bg-[#eb3b14] hover:bg-[#d4320e] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Search Locations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Strip (matching reference) */}
        <div className="pt-4 border-t border-[#e5e0d3] grid grid-cols-2 lg:grid-cols-4 gap-6 text-[#111111]">
          <div className="space-y-0.5">
            <span className="text-[11px] text-[#666666] uppercase tracking-wider block font-medium">Audience Scale</span>
            <div className="text-3xl sm:text-4xl font-black font-display tracking-tight text-[#111111]">
              3.2M+
            </div>
            <span className="text-xs text-[#555555]">Daily verified Canadian impressions</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] text-[#666666] uppercase tracking-wider block font-medium">Inventory Reach</span>
            <div className="text-3xl sm:text-4xl font-black font-display tracking-tight text-[#111111]">
              1,200+
            </div>
            <span className="text-xs text-[#555555]">Active premium advertising faces</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] text-[#666666] uppercase tracking-wider block font-medium">Highway Corridors</span>
            <div className="text-3xl sm:text-4xl font-black font-display tracking-tight text-[#111111]">
              32
            </div>
            <span className="text-xs text-[#555555]">Major expressway & city centers</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] text-[#666666] uppercase tracking-wider block font-medium">Fast Execution</span>
            <div className="text-3xl sm:text-4xl font-black font-display tracking-tight text-[#eb3b14]">
              24 HRS
            </div>
            <span className="text-xs text-[#555555]">Digital campaign go-live turnaround</span>
          </div>
        </div>
      </div>
    </section>
  );
};
