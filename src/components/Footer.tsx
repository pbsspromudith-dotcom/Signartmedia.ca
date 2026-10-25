import React from 'react';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBooking }) => {
  return (
    <footer className="bg-[#111111] text-[#888888] text-xs border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eb3b14]" />
              <span className="text-xl font-black text-white font-display uppercase tracking-tight">
                SIGN ART MEDIA
              </span>
              <span className="text-[10px] text-[#666666] font-mono pl-1">signartmedia.ca</span>
            </div>

            <p className="text-xs text-[#aaaaaa] leading-relaxed max-w-sm">
              Premier Canadian outdoor billboard rental company. Verified highway traffic counts, massive high-impact digital spectaculars, and premier static bulletins across Ontario, Quebec, BC, and Alberta.
            </p>

            <div className="text-[11px] text-[#666666]">
              COMMB Audited Audience • Ministry of Transportation (MTO) Verified Counts
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest font-mono">
              Locations & Formats
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Interactive Canadian Network Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Highway 401 & QEW Corridors
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('3d-simulator')}
                  className="hover:text-[#eb3b14] transition-colors cursor-pointer"
                >
                  3D Billboard Ad Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Transparent Billboard Rates
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest font-mono">
              Direct Contact
            </h4>
            <div className="space-y-2 text-[#aaaaaa]">
              <div>
                <strong className="text-white block">Toronto Headquarters</strong>
                <span>100 University Ave, 8th Fl, Toronto, ON M5J 1V6</span>
              </div>
              <div>
                <a href="tel:4165557446" className="text-white hover:text-[#eb3b14] block font-mono">
                  (416) 555-SIGN / (416) 555-7446
                </a>
                <a href="mailto:info@signartmedia.ca" className="text-white hover:text-[#eb3b14] block">
                  info@signartmedia.ca
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666666]">
          <div>
            © {new Date().getFullYear()} Sign Art Media (https://signartmedia.ca/). All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Toronto • Montreal • Vancouver • Calgary • Ottawa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
