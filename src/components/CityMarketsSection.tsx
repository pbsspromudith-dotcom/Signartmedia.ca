import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface CityMarketsSectionProps {
  onSelectMarket: (market: string) => void;
  onOpenBooking: () => void;
}

export const CityMarketsSection: React.FC<CityMarketsSectionProps> = ({
  onSelectMarket,
  onOpenBooking,
}) => {
  const markets = [
    { name: 'Toronto & Greater Area (401, QEW, Gardiner)', key: 'toronto', rate: 'From $2,150 / wk', spots: '42 Spots' },
    { name: 'Vancouver & Waterfront (Burrard St)', key: 'vancouver', rate: 'From $3,400 / wk', spots: '18 Spots' },
    { name: 'Montreal & Metro (Autoroute 15 Décarie)', key: 'montreal', rate: 'From $2,400 / wk', spots: '24 Spots' },
    { name: 'Calgary & Energy Hub (Deerfoot Trail)', key: 'calgary', rate: 'From $2,650 / wk', spots: '16 Spots' },
    { name: 'Ottawa & Capital Corridor (The Queensway 417)', key: 'ottawa', rate: 'From $2,400 / wk', spots: '14 Spots' },
  ];

  return (
    <section className="bg-[#111111] text-white py-20 border-y border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#888888]">
              <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
              <span>COMMUTER CORRIDORS & METRO HUBS</span>
            </div>

            <h2 className="text-5xl sm:text-7xl font-black text-white leading-[0.92] font-display uppercase tracking-tight">
              OWN A CORNER. <br />
              MOVE A CITY.
            </h2>

            <p className="text-sm text-[#aaaaaa] leading-relaxed pt-2 max-w-md">
              Target high-income neighborhoods, executive highway commutes, and downtown entertainment districts that reflect your exact audience. We help you choose the right place at the right price.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#eb3b14] hover:text-[#ff5533] cursor-pointer"
              >
                <span>Reserve a Market Takeover</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Market Rows (matching reference) */}
          <div className="lg:col-span-7 divide-y divide-[#262626] border-y border-[#262626]">
            {markets.map((m) => (
              <button
                key={m.key}
                onClick={() => onSelectMarket(m.key)}
                className="w-full py-5 flex items-center justify-between text-left group hover:bg-[#1a1a1a] px-3 sm:px-4 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#333333] group-hover:bg-[#eb3b14] transition-colors" />
                  <div>
                    <span className="text-base sm:text-lg font-bold font-display uppercase tracking-wider text-white group-hover:text-[#eb3b14] transition-colors block">
                      {m.name}
                    </span>
                    <span className="text-xs text-[#777777] font-sans">{m.spots} available now</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#eb3b14]">
                    {m.rate}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-[#333333] group-hover:border-[#eb3b14] group-hover:bg-[#eb3b14] group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4 text-[#888888] group-hover:text-white transition-colors" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
