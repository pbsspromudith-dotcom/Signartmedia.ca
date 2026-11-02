'use client';

import React, { useState } from 'react';
import { BillboardLocation } from '../types/billboard';
import { MapPin, Box, DollarSign, Calculator, Mail, Phone, CalendarCheck, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedBillboards: BillboardLocation[];
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedBillboards,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f5f2eb]/95 border-b border-[#e5e0d3] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo - Clean Editorial style */}
        <button
          onClick={() => handleNavClick('explore')}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-3 h-3 rounded-full bg-[#eb3b14] group-hover:scale-125 transition-transform" />
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#111111] font-display">
            SIGN ART MEDIA
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-[#888888] pl-1">
            signartmedia.ca
          </span>
        </button>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-[#444444] uppercase tracking-wider">
          <button
            onClick={() => handleNavClick('explore')}
            className={`transition-colors cursor-pointer py-1 ${
              activeTab === 'explore' ? 'text-[#eb3b14] font-bold border-b-2 border-[#eb3b14]' : 'hover:text-[#111111]'
            }`}
          >
            Locations & Map
          </button>

          <button
            onClick={() => handleNavClick('pricing')}
            className={`transition-colors cursor-pointer py-1 ${
              activeTab === 'pricing' ? 'text-[#eb3b14] font-bold border-b-2 border-[#eb3b14]' : 'hover:text-[#111111]'
            }`}
          >
            Formats & Rates
          </button>

          <button
            onClick={() => handleNavClick('3d-simulator')}
            className={`transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
              activeTab === '3d-simulator' ? 'text-[#eb3b14] font-bold border-b-2 border-[#eb3b14]' : 'hover:text-[#111111]'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-[#eb3b14]" />
            3D Ad Simulator
          </button>

          <button
            onClick={() => handleNavClick('calculator')}
            className={`transition-colors cursor-pointer py-1 ${
              activeTab === 'calculator' ? 'text-[#eb3b14] font-bold border-b-2 border-[#eb3b14]' : 'hover:text-[#111111]'
            }`}
          >
            ROI Calculator
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors cursor-pointer py-1 ${
              activeTab === 'contact' ? 'text-[#eb3b14] font-bold border-b-2 border-[#eb3b14]' : 'hover:text-[#111111]'
            }`}
          >
            Contact & RFP
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="tel:4165557446"
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:text-[#eb3b14] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#eb3b14]" />
            <span>(416) 555-SIGN</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 rounded-none bg-[#eb3b14] hover:bg-[#d4320e] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Book Billboard</span>
            {selectedBillboards.length > 0 ? (
              <span className="w-5 h-5 rounded-full bg-white text-[#eb3b14] flex items-center justify-center font-mono text-[10px]">
                {selectedBillboards.length}
              </span>
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#111111] hover:text-[#eb3b14]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f5f2eb] border-b border-[#e5e0d3] px-6 py-4 space-y-3 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => handleNavClick('explore')}
            className={`w-full py-2.5 text-left border-b border-[#e5e0d3] ${
              activeTab === 'explore' ? 'text-[#eb3b14]' : 'text-[#222222]'
            }`}
          >
            Locations & Map
          </button>
          <button
            onClick={() => handleNavClick('pricing')}
            className={`w-full py-2.5 text-left border-b border-[#e5e0d3] ${
              activeTab === 'pricing' ? 'text-[#eb3b14]' : 'text-[#222222]'
            }`}
          >
            Formats & Rates
          </button>
          <button
            onClick={() => handleNavClick('3d-simulator')}
            className={`w-full py-2.5 text-left border-b border-[#e5e0d3] flex items-center gap-2 ${
              activeTab === '3d-simulator' ? 'text-[#eb3b14]' : 'text-[#222222]'
            }`}
          >
            <Box className="w-4 h-4 text-[#eb3b14]" />
            3D Ad Simulator
          </button>
          <button
            onClick={() => handleNavClick('calculator')}
            className={`w-full py-2.5 text-left border-b border-[#e5e0d3] ${
              activeTab === 'calculator' ? 'text-[#eb3b14]' : 'text-[#222222]'
            }`}
          >
            ROI Calculator
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full py-2.5 text-left ${
              activeTab === 'contact' ? 'text-[#eb3b14]' : 'text-[#222222]'
            }`}
          >
            Contact & RFP
          </button>

          <div className="pt-2 text-[11px] text-[#777777] flex items-center justify-between">
            <span>Direct Phone: (416) 555-SIGN</span>
            <a href="tel:4165557446" className="text-[#eb3b14] font-bold">
              Call Sales
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
