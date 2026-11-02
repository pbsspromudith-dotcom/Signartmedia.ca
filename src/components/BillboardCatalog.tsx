'use client';

import React, { useState } from 'react';
import { ExtendedBillboardLocation } from '../data/billboards';
import { Eye, ArrowRight, Check, MapPin, Sparkles, Filter } from 'lucide-react';

interface BillboardCatalogProps {
  billboards: ExtendedBillboardLocation[];
  selectedBillboards: ExtendedBillboardLocation[];
  onToggleSelect: (billboard: ExtendedBillboardLocation) => void;
  onOpen3DViewer: (billboard: ExtendedBillboardLocation) => void;
  onBookNow: (billboard: ExtendedBillboardLocation) => void;
  onOpenMap: () => void;
  selectedFilter?: string;
  onFilterChange?: (filterId: string) => void;
}

export const BillboardCatalog: React.FC<BillboardCatalogProps> = ({
  billboards,
  selectedBillboards,
  onToggleSelect,
  onOpen3DViewer,
  onBookNow,
  onOpenMap,
  selectedFilter: controlledFilter,
  onFilterChange,
}) => {
  const [internalFilter, setInternalFilter] = useState('all');
  const currentFilter = controlledFilter !== undefined ? controlledFilter : internalFilter;

  const handleFilterClick = (filterId: string) => {
    setInternalFilter(filterId);
    if (onFilterChange) {
      onFilterChange(filterId);
    }
  };

  const filtered = billboards.filter((b) => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'toronto') return b.city === 'Toronto' || b.city === 'Mississauga';
    if (currentFilter === 'vancouver') return b.city === 'Vancouver';
    if (currentFilter === 'montreal') return b.city === 'Montreal';
    if (currentFilter === 'calgary') return b.city === 'Calgary';
    if (currentFilter === 'superboard') return b.type === 'superboard';
    if (currentFilter === 'digital') return b.type === 'digital';
    return true;
  });

  return (
    <section id="locations" className="py-16 bg-[#f5f2eb] border-b border-[#e5e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#555555]">
            <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
            <span>FEATURED BILLBOARD INVENTORY</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-6xl font-black text-[#111111] leading-none font-display uppercase tracking-tight">
                GOOD LOCATIONS, GREAT EXPOSURE.
              </h2>
              <p className="text-sm text-[#555555] mt-2 max-w-xl">
                Top-tier spots across the country, audited by COMMB for maximum daily vehicular and pedestrian exposure.
              </p>
            </div>

            <button
              onClick={onOpenMap}
              className="text-xs font-bold text-[#eb3b14] hover:text-[#c42d0c] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer shrink-0 pb-1"
            >
              <span>Explore Interactive Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills (matching reference) */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#e5e0d3] pb-4 text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'all', label: 'All Locations' },
            { id: 'toronto', label: 'Toronto 401 & QEW' },
            { id: 'vancouver', label: 'Vancouver Burrard' },
            { id: 'montreal', label: 'Montreal Décarie' },
            { id: 'calgary', label: 'Calgary Deerfoot' },
            { id: 'digital', label: 'Digital LED Displays' },
            { id: 'superboard', label: 'Highway Superboards' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => handleFilterClick(pill.id)}
              className={`px-4 py-2 border transition-all cursor-pointer ${
                currentFilter === pill.id
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#555555] border-[#d8d3c5] hover:text-[#111111] hover:border-[#111111]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* 3-Card Grid Matching Reference Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((board) => {
            const isSelected = selectedBillboards.some((b) => b.id === board.id);

            return (
              <div
                key={board.id}
                className="bg-white border border-[#d8d3c5] hover:border-[#111111] transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  {/* Photo with Tag */}
                  <div className="relative h-64 overflow-hidden bg-[#111111]">
                    <img
                      src={board.imageUrl}
                      alt={board.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#111111]/90 text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                      {board.tag || board.format.split(' ')[0]}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-[#eb3b14] text-white text-[10px] font-mono font-bold">
                      {board.code}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-[#111111] font-display uppercase tracking-tight group-hover:text-[#eb3b14] transition-colors leading-tight">
                        {board.name}
                      </h3>
                      <p className="text-xs text-[#666666] mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#eb3b14]" />
                        <span>
                          {board.road}, {board.city}, {board.province}
                        </span>
                      </p>
                    </div>

                    {/* Metadata lines matching reference */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#f0ece1] text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                          Daily Traffic
                        </span>
                        <strong className="text-sm font-black text-[#111111]">
                          {board.dailyTraffic.toLocaleString()} cars
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                          Weekly Reach
                        </span>
                        <strong className="text-sm font-black text-[#111111]">
                          {board.weeklyImpressions.toLocaleString()} views
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                          Dimensions
                        </span>
                        <span className="text-xs font-semibold text-[#444444]">{board.dimensions}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                          Illumination
                        </span>
                        <span className="text-xs font-semibold text-[#444444] truncate block">
                          {board.illumination.split(' ')[0]} 24/7
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer with Price and Actions */}
                <div className="p-5 pt-0 border-t border-[#f0ece1] mt-2 space-y-3">
                  <div className="pt-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">
                        Rate Card
                      </span>
                      <div className="text-2xl font-black text-[#111111] font-display">
                        ${board.weeklyRate}{' '}
                        <span className="text-xs font-normal text-[#666666] font-sans">CAD / wk</span>
                      </div>
                    </div>
                    {board.productionFee > 0 ? (
                      <span className="text-[10px] text-[#666666]">
                        Print: <strong className="text-[#111111]">${board.productionFee}</strong>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#eb3b14] uppercase">0 Print Fee</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onOpen3DViewer(board)}
                      className="py-2.5 px-3 bg-[#f5f2eb] hover:bg-[#eae6dc] text-[#111111] text-xs font-bold uppercase tracking-wider border border-[#d8d3c5] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#eb3b14]" />
                      <span>View in 3D</span>
                    </button>

                    <button
                      onClick={() => onToggleSelect(board)}
                      className={`py-2.5 px-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#111111] text-white'
                          : 'bg-[#eb3b14] hover:bg-[#d4320e] text-white shadow-sm'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Selected
                        </>
                      ) : (
                        '+ Book Board'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
