import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenBooking: () => void;
  onOpen3D: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenBooking, onOpen3D }) => {
  return (
    <section className="py-20 bg-[#f5f2eb] border-b border-[#e5e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Step 1-3 Section (matching reference "BIG DOESN'T HAVE TO BE COMPLICATED.") */}
        <div className="space-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#555555]">
              <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
              <span>THE 3-STEP RESERVATION PROCESS</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-4xl sm:text-6xl font-black text-[#111111] leading-none font-display uppercase tracking-tight">
                BIG DOESN'T HAVE TO BE COMPLICATED.
              </h2>

              <button
                onClick={onOpenBooking}
                className="text-xs font-bold text-[#eb3b14] hover:text-[#c42d0c] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer shrink-0 pb-1"
              >
                <span>Online Booking System</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#d8d3c5] p-6 sm:p-8 space-y-3 shadow-sm">
              <span className="text-4xl sm:text-5xl font-black text-[#eb3b14] font-display">01</span>
              <h3 className="text-xl font-black text-[#111111] font-display uppercase tracking-tight">
                FIND YOUR PLACE
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Browse our interactive Canadian network map. Filter by city, corridor, daily traffic count, and clear upfront weekly rates.
              </p>
            </div>

            <div className="bg-white border border-[#d8d3c5] p-6 sm:p-8 space-y-3 shadow-sm">
              <span className="text-4xl sm:text-5xl font-black text-[#eb3b14] font-display">02</span>
              <h3 className="text-xl font-black text-[#111111] font-display uppercase tracking-tight">
                MAKE IT YOURS
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Upload your creative files or work with Sign Art Media’s in-house studio. Test your ads in realistic 3D lighting before signing.
              </p>
            </div>

            <div className="bg-white border border-[#d8d3c5] p-6 sm:p-8 space-y-3 shadow-sm">
              <span className="text-4xl sm:text-5xl font-black text-[#eb3b14] font-display">03</span>
              <h3 className="text-xl font-black text-[#111111] font-display uppercase tracking-tight">
                MEET THE WORLD
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Your flight goes live with camera-verified proof of performance. Receive weekly impression reports and commuter dwell statistics.
              </p>
            </div>
          </div>
        </div>

        {/* Case Study Spotlight Card (matching reference "A LOCAL RUN CLUB. A CITYWIDE MOVEMENT.") */}
        <div className="bg-[#111111] border border-[#222222] text-white grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-xl">
          {/* Left Column: Billboard Wall Photo */}
          <div className="lg:col-span-5 relative h-80 lg:h-auto min-h-[340px]">
            <img
              src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80"
              alt="Outdoor Urban Billboard Wall"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#111111]/90 text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
              • Toronto Queen West Wallscape
            </div>
          </div>

          {/* Right Column: Dark Stats & Story Card */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#888888]">
                <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
                <span>COMMUNITY SPOTLIGHT • CAMPAIGN RESULT</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight leading-none">
                A LOCAL RUN CLUB. <br />
                A CITYWIDE MOVEMENT.
              </h3>

              <p className="text-xs sm:text-sm text-[#aaaaaa] leading-relaxed max-w-lg">
                How a Toronto athletic collective turned a single high-dwell Queen West corner into 2,400 new community members and a 310% surge in monthly retail store visits.
              </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#262626]">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#eb3b14] font-display">1.8M</span>
                <span className="text-[10px] text-[#777777] uppercase block mt-0.5">Total Eyeballs</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-display">3 WKS</span>
                <span className="text-[10px] text-[#777777] uppercase block mt-0.5">Campaign Flight</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-display">310%</span>
                <span className="text-[10px] text-[#777777] uppercase block mt-0.5">Foot Traffic Lift</span>
              </div>
            </div>

            {/* Quote */}
            <div className="pt-2 border-t border-[#262626] flex items-center justify-between text-xs text-[#aaaaaa]">
              <span className="italic">“Billboard advertising gave us instant credibility that digital ads never could.”</span>
              <button
                onClick={onOpen3D}
                className="font-bold text-[#eb3b14] hover:text-[#ff5533] uppercase tracking-wider shrink-0 ml-4 cursor-pointer"
              >
                Test in 3D →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
