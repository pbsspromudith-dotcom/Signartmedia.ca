import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking, onOpenContact }) => {
  return (
    <section id="pricing" className="py-20 bg-[#f5f2eb] border-b border-[#e5e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#555555]">
            <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
            <span>RATES & FORMAT SPECIFICATIONS</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-6xl font-black text-[#111111] leading-none font-display uppercase tracking-tight">
                DIFFERENT FORMATS. SAME IMPACT.
              </h2>
              <p className="text-sm text-[#555555] mt-2 max-w-xl">
                Transparent weekly pricing across static bulletins, digital LED spectaculars, and massive highway superboards.
              </p>
            </div>

            <button
              onClick={onOpenContact}
              className="text-xs font-bold text-[#eb3b14] hover:text-[#c42d0c] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer shrink-0 pb-1"
            >
              <span>Request Media Kit & RFP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Column Format Cards Matching Reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Format 1: STATIC BILLBOARDS */}
          <div className="bg-white border border-[#d8d3c5] hover:border-[#111111] transition-all flex flex-col justify-between group shadow-sm">
            <div>
              <div className="relative h-56 overflow-hidden bg-[#111111]">
                <img
                  src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80"
                  alt="Static Highway Billboard"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-wider">
                  100% Solo Share
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-[#111111] font-display uppercase tracking-tight">
                    STATIC BILLBOARDS
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                    14' x 48' Premier Highway Bulletins. 24/7 non-stop presence with zero ad rotation or competitor flips.
                  </p>
                </div>

                <div className="py-3 border-y border-[#f0ece1]">
                  <div className="text-2xl sm:text-3xl font-black text-[#111111] font-display">
                    $2,150 – $2,650
                  </div>
                  <span className="text-[11px] text-[#777777] uppercase font-mono block">CAD / week • 4-week min flight</span>
                </div>

                <ul className="space-y-2 text-xs text-[#444444]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Exclusive 100% solo brand ownership</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Seamless 14oz UV vinyl print & union rigging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Precision dusk-to-dawn LED floodlighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Geotagged proof-of-posting photography</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 bg-[#111111] hover:bg-[#eb3b14] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Book Static Bulletin
              </button>
            </div>
          </div>

          {/* Format 2: DIGITAL BILLBOARDS */}
          <div className="bg-white border-2 border-[#111111] transition-all flex flex-col justify-between group shadow-md relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#eb3b14] text-white text-[10px] font-black uppercase tracking-widest shadow-sm">
              MOST FLEXIBLE
            </div>
            <div>
              <div className="relative h-56 overflow-hidden bg-[#111111]">
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                  alt="Digital Roadside Billboard"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#eb3b14] text-white text-[10px] font-bold uppercase tracking-wider">
                  Fast 24h Go-Live
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-[#111111] font-display uppercase tracking-tight">
                    DIGITAL BILLBOARDS
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                    Ultra HD LED roadside screens. 10-second full resolution spot in a 60-second loop (1,440 displays/day).
                  </p>
                </div>

                <div className="py-3 border-y border-[#f0ece1]">
                  <div className="text-2xl sm:text-3xl font-black text-[#eb3b14] font-display">
                    $2,400 – $4,200
                  </div>
                  <span className="text-[11px] text-[#777777] uppercase font-mono block">CAD / week • $0 print fee</span>
                </div>

                <ul className="space-y-2 text-xs text-[#444444]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Zero production or vinyl printing costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Dynamic dayparting & scheduled creative swaps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Camera playback verification daily logs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Launch in under 24 hours from art approval</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 bg-[#eb3b14] hover:bg-[#d4320e] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Book Digital Board
              </button>
            </div>
          </div>

          {/* Format 3: HIGHWAY SUPERBOARDS */}
          <div className="bg-white border border-[#d8d3c5] hover:border-[#111111] transition-all flex flex-col justify-between group shadow-sm">
            <div>
              <div className="relative h-56 overflow-hidden bg-[#111111]">
                <img
                  src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80"
                  alt="Massive Highway Superboard"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-wider">
                  1,200 sq ft
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-[#111111] font-display uppercase tracking-tight">
                    HIGHWAY SUPERBOARDS
                  </h3>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                    Up to 20' x 60' landmark superboards. Dominates expressways near Pearson Airport and key junction merges.
                  </p>
                </div>

                <div className="py-3 border-y border-[#f0ece1]">
                  <div className="text-2xl sm:text-3xl font-black text-[#111111] font-display">
                    $4,600
                  </div>
                  <span className="text-[11px] text-[#777777] uppercase font-mono block">CAD / week • 510K+ weekly viewers</span>
                </div>

                <ul className="space-y-2 text-xs text-[#444444]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Visible from 800+ meters at highway speeds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Direct corporate & international traveler reach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Accommodates custom 3D cutouts & extensions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                    <span>Executive demographic density</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 bg-[#111111] hover:bg-[#eb3b14] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Book Superboard
              </button>
            </div>
          </div>
        </div>

        {/* Automatic Duration Savings Strip (matching reference) */}
        <div className="bg-white border border-[#d8d3c5] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f0ece1] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#eb3b14] block">
                VOLUME DISCOUNTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#111111] font-display uppercase tracking-tight">
                AUTOMATIC FLIGHT DURATION SAVINGS
              </h3>
            </div>
            <div className="text-xs font-bold text-[#eb3b14] uppercase tracking-wider">
              Discounts applied automatically at booking
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#f5f2eb] border border-[#e5e0d3] text-center space-y-1">
              <span className="text-[11px] font-bold text-[#777777] uppercase block">1 – 3 Weeks</span>
              <div className="text-xl sm:text-2xl font-black text-[#111111] font-display">Standard Rate</div>
              <span className="text-[10px] text-[#777777] block">Flash campaigns</span>
            </div>

            <div className="p-4 bg-[#f5f2eb] border border-[#111111] text-center space-y-1">
              <span className="text-[11px] font-bold text-[#eb3b14] uppercase block">4 – 11 Weeks</span>
              <div className="text-xl sm:text-2xl font-black text-[#eb3b14] font-display">10% OFF</div>
              <span className="text-[10px] text-[#777777] block">Monthly flights</span>
            </div>

            <div className="p-4 bg-[#f5f2eb] border border-[#111111] text-center space-y-1">
              <span className="text-[11px] font-bold text-[#eb3b14] uppercase block">12 – 25 Weeks</span>
              <div className="text-xl sm:text-2xl font-black text-[#eb3b14] font-display">18% OFF</div>
              <span className="text-[10px] text-[#777777] block">Quarterly brand recall</span>
            </div>

            <div className="p-4 bg-[#111111] text-white text-center space-y-1">
              <span className="text-[11px] font-bold text-[#eb3b14] uppercase block">26+ Weeks</span>
              <div className="text-xl sm:text-2xl font-black text-white font-display">25% OFF</div>
              <span className="text-[10px] text-[#aaaaaa] block">Semi-annual takeover</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
