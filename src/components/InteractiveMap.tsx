import React, { useState } from 'react';
import { BillboardLocation } from '../types/billboard';
import { MapPin, Navigation, Eye, Sparkles, Filter, Layers } from 'lucide-react';

interface InteractiveMapProps {
  billboards: BillboardLocation[];
  selectedBillboard: BillboardLocation | null;
  onSelectBillboard: (billboard: BillboardLocation) => void;
  onOpen3DViewer: (billboard: BillboardLocation) => void;
  onBookNow: (billboard: BillboardLocation) => void;
}

type RegionFilter = 'all' | 'gta' | 'montreal' | 'ottawa' | 'western';

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  billboards,
  selectedBillboard,
  onSelectBillboard,
  onOpen3DViewer,
  onBookNow,
}) => {
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [hoveredBillboard, setHoveredBillboard] = useState<BillboardLocation | null>(null);

  // Filter billboard list
  const filteredBillboards = billboards.filter((b) => {
    if (typeFilter !== 'all' && b.type !== typeFilter) return false;
    if (regionFilter === 'gta') return b.city === 'Toronto' || b.city === 'Mississauga' || b.city === 'Markham' || b.city === 'Burlington';
    if (regionFilter === 'montreal') return b.city === 'Montreal';
    if (regionFilter === 'ottawa') return b.city === 'Ottawa';
    if (regionFilter === 'western') return b.city === 'Vancouver' || b.city === 'Calgary';
    return true;
  });

  const getPinColor = (type: string, isSelected: boolean) => {
    if (isSelected) return 'bg-[#eb3b14] text-white ring-4 ring-[#eb3b14]/40 scale-125 z-30';
    switch (type) {
      case 'digital':
        return 'bg-[#eb3b14] text-white hover:bg-[#d4320e] ring-2 ring-[#eb3b14]/30';
      case 'superboard':
        return 'bg-[#111111] text-white hover:bg-black ring-2 ring-[#111111]/30';
      case 'poster':
        return 'bg-[#555555] text-white hover:bg-[#333333] ring-2 ring-[#555555]/30';
      default:
        return 'bg-[#111111] text-white hover:bg-[#222222] ring-2 ring-[#111111]/30';
    }
  };

  return (
    <div className="relative w-full border-2 border-[#111111] bg-[#111111] shadow-xl flex flex-col">
      {/* Top Map Filter Controls */}
      <div className="p-4 bg-[#111111] border-b border-[#262626] flex flex-wrap items-center justify-between gap-3 z-10 text-white">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#eb3b14]" />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider font-display">
              CANADIAN NETWORK MAP ({filteredBillboards.length} LOCATIONS)
            </h3>
            <p className="text-[11px] text-[#888888]">Highway 401, QEW, Gardiner, 417, A-15, Deerfoot & Burrard</p>
          </div>
        </div>

        {/* Region Shortcuts */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[#888888] text-[11px] font-bold uppercase tracking-wider mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Market:
          </span>
          {[
            { id: 'all', label: 'All Canada' },
            { id: 'gta', label: 'Toronto 401 & QEW' },
            { id: 'montreal', label: 'Montreal A-15' },
            { id: 'ottawa', label: 'Ottawa 417' },
            { id: 'western', label: 'Vancouver & Calgary' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setRegionFilter(r.id as RegionFilter)}
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                regionFilter === r.id
                  ? 'bg-[#eb3b14] text-white'
                  : 'bg-[#222222] text-[#aaaaaa] hover:text-white hover:bg-[#333333]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Format Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[#888888] text-[11px] font-bold uppercase tracking-wider mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3" /> Format:
          </span>
          {[
            { id: 'all', label: 'All' },
            { id: 'digital', label: 'Digital LED' },
            { id: 'superboard', label: 'Superboard' },
            { id: 'static', label: 'Static Bulletin' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTypeFilter(t.id)}
              className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                typeFilter === t.id
                  ? 'bg-white text-[#111111]'
                  : 'bg-[#222222] text-[#888888] hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Vector Map Canvas Viewport */}
      <div className="relative w-full h-[520px] bg-[#0c1017] overflow-hidden select-none">
        {/* Stylized SVG Map Base: Highway Corridors & Geography */}
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <defs>
            <pattern id="grid-editorial" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1000" height="600" fill="url(#grid-editorial)" />

          {/* Canada Landmass Stylized Silhouette Boundaries */}
          <path
            d="M 50,220 Q 150,180 250,240 T 450,280 T 650,290 T 800,260 T 950,320 L 980,590 L 30,590 Z"
            fill="#121824"
            stroke="#1f2937"
            strokeWidth="1.5"
          />

          {/* St Lawrence / Great Lakes waterway */}
          <path
            d="M 520,440 Q 550,420 580,440 T 640,430 T 720,410 T 820,380 T 920,350"
            fill="none"
            stroke="#0284c7"
            strokeWidth="12"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />

          {/* Highway 401 & QEW Corridors */}
          <path
            d="M 490,440 L 520,420 L 560,410 L 610,395 L 670,380 L 730,340"
            fill="none"
            stroke="#eb3b14"
            strokeWidth="4"
            strokeOpacity="0.8"
          />
          {/* Trans-Canada Highway */}
          <path
            d="M 120,380 Q 240,360 380,390 T 560,400 T 720,360 T 820,340"
            fill="none"
            stroke="#6b7280"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.5"
          />

          {/* Metro Labels */}
          <text x="590" y="390" fill="#9ca3af" fontSize="12" fontWeight="bold" fontFamily="Space Grotesk">
            GREATER TORONTO AREA (401 / QEW)
          </text>
          <text x="740" y="320" fill="#9ca3af" fontSize="12" fontWeight="bold" fontFamily="Space Grotesk">
            OTTAWA (417)
          </text>
          <text x="790" y="375" fill="#9ca3af" fontSize="12" fontWeight="bold" fontFamily="Space Grotesk">
            MONTREAL (A-15)
          </text>
          <text x="130" y="360" fill="#9ca3af" fontSize="12" fontWeight="bold" fontFamily="Space Grotesk">
            VANCOUVER (BURRARD)
          </text>
          <text x="250" y="350" fill="#9ca3af" fontSize="12" fontWeight="bold" fontFamily="Space Grotesk">
            CALGARY (DEERFOOT)
          </text>
        </svg>

        {/* Dynamic Location Marker Pins */}
        {filteredBillboards.map((b) => {
          const isSelected = selectedBillboard?.id === b.id;
          const isHovered = hoveredBillboard?.id === b.id;

          return (
            <div
              key={b.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200"
              style={{
                left: `${b.mapPosition.x}%`,
                top: `${b.mapPosition.y}%`,
                zIndex: isSelected ? 40 : isHovered ? 35 : 20,
              }}
              onClick={() => onSelectBillboard(b)}
              onMouseEnter={() => setHoveredBillboard(b)}
              onMouseLeave={() => setHoveredBillboard(null)}
            >
              {/* Pin Button */}
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform ${getPinColor(
                  b.type,
                  isSelected
                )}`}
                aria-label={`Select billboard ${b.name}`}
              >
                <MapPin className="w-4 h-4" />
              </button>

              {/* Pin mini label */}
              <div
                className={`mt-1 text-center whitespace-nowrap px-2 py-0.5 text-[10px] font-mono font-bold shadow-md transition-all ${
                  isSelected
                    ? 'bg-[#eb3b14] text-white'
                    : 'bg-[#111111] text-white border border-[#333333]'
                }`}
              >
                ${b.weeklyRate}/wk
              </div>
            </div>
          );
        })}

        {/* Hover / Selected Info Card Floating Over Map */}
        {(hoveredBillboard || selectedBillboard) && (
          <div className="absolute top-4 left-4 z-30 max-w-sm w-full bg-white border-2 border-[#111111] p-5 shadow-2xl space-y-3 pointer-events-auto text-[#111111]">
            {(() => {
              const current = hoveredBillboard || selectedBillboard!;
              return (
                <>
                  <div className="flex items-start justify-between gap-2 border-b border-[#f0ece1] pb-3">
                    <div>
                      <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#111111] text-white mb-1 font-mono">
                        {current.code}
                      </span>
                      <h4 className="text-base font-black text-[#111111] font-display uppercase leading-tight">
                        {current.name}
                      </h4>
                      <p className="text-xs text-[#666666] mt-0.5">{current.road}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-black text-[#eb3b14] font-display">${current.weeklyRate}</div>
                      <div className="text-[10px] text-[#777777]">per week</div>
                    </div>
                  </div>

                  {/* Quick specs grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#f5f2eb] p-2.5 border border-[#e5e0d3]">
                    <div>
                      <span className="text-[10px] text-[#777777] block uppercase font-bold">Daily Traffic</span>
                      <strong className="text-[#111111]">{current.dailyTraffic.toLocaleString()} cars</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#777777] block uppercase font-bold">Weekly Reach</span>
                      <strong className="text-[#eb3b14]">{current.weeklyImpressions.toLocaleString()} views</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#777777] block uppercase font-bold">Dimensions</span>
                      <span className="font-semibold text-[#444444]">{current.dimensions}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#777777] block uppercase font-bold">Illumination</span>
                      <span className="font-semibold text-[#111111]">{current.illumination.split(' ')[0]} 24/7</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onOpen3DViewer(current)}
                      className="flex-1 py-2 px-3 bg-[#f5f2eb] hover:bg-[#eae6dc] text-[#111111] text-xs font-bold uppercase tracking-wider border border-[#111111] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#eb3b14]" />
                      <span>3D Preview</span>
                    </button>
                    <button
                      onClick={() => onBookNow(current)}
                      className="flex-1 py-2 px-3 bg-[#eb3b14] hover:bg-[#d4320e] text-white text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Book Location</span>
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Bottom Legend */}
        <div className="absolute bottom-3 right-3 z-10 bg-[#111111]/95 border border-[#333333] px-3 py-2 text-[11px] text-white flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#eb3b14]" /> Digital Spectacular
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white" /> Highway Superboard
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#555555]" /> Static Bulletin
          </div>
        </div>
      </div>
    </div>
  );
};
