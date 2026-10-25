import React, { useState } from 'react';
import { BillboardLocation } from '../types/billboard';
import { calculateCampaignPricing, formatCAD, formatImpressionNumber } from '../utils/pricing';
import { Calculator, Check, ArrowRight } from 'lucide-react';

interface RoiCalculatorProps {
  allBillboards: BillboardLocation[];
  selectedBillboards: BillboardLocation[];
  onSetSelectedBillboards: (billboards: BillboardLocation[]) => void;
  onProceedToBook: (weeks: number, needsPrint: boolean) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  allBillboards,
  selectedBillboards,
  onSetSelectedBillboards,
  onProceedToBook,
}) => {
  const [durationWeeks, setDurationWeeks] = useState<number>(4);
  const [needsPrint, setNeedsPrint] = useState<boolean>(true);

  // Active boards to calculate for: if none explicitly selected, default to top 2 premier boards
  const activeBoards = selectedBillboards.length > 0 ? selectedBillboards : [allBillboards[0], allBillboards[1]];

  const pricing = calculateCampaignPricing(activeBoards, durationWeeks, needsPrint);

  const toggleBoardInActive = (board: BillboardLocation) => {
    const exists = activeBoards.some((b) => b.id === board.id);
    let updated: BillboardLocation[];
    if (exists) {
      if (activeBoards.length === 1) return; // Keep at least one board
      updated = activeBoards.filter((b) => b.id !== board.id);
    } else {
      updated = [...activeBoards, board];
    }
    onSetSelectedBillboards(updated);
  };

  return (
    <section id="calculator" className="py-20 bg-[#f5f2eb] border-b border-[#e5e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#555555]">
            <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
            <span>ESTIMATE YOUR FLIGHT</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-[#111111] leading-none font-display uppercase tracking-tight">
            CAMPAIGN ROI & PRICING CALCULATOR.
          </h2>
          <p className="text-sm text-[#555555] max-w-xl">
            Configure your billboard flight, adjust duration, and inspect total audience reach, automated discounts, and cost per thousand impressions (CPM).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configuration Controls */}
          <div className="lg:col-span-7 bg-white border border-[#d8d3c5] p-6 sm:p-8 space-y-6 shadow-sm">
            {/* Step 1: Duration Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#111111] text-white flex items-center justify-center text-[10px] font-black">
                    1
                  </span>
                  Campaign Duration
                </label>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#eb3b14] font-display">{durationWeeks} WEEKS</span>
                  <span className="text-[10px] text-[#666666] block uppercase">
                    {durationWeeks >= 26
                      ? '25% Annual Discount'
                      : durationWeeks >= 12
                      ? '18% Quarterly Discount'
                      : durationWeeks >= 4
                      ? '10% Monthly Discount'
                      : 'Standard Flight'}
                  </span>
                </div>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min="1"
                max="52"
                value={durationWeeks}
                onChange={(e) => setDurationWeeks(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-[#eae6dc] appearance-none cursor-pointer accent-[#eb3b14]"
                aria-label="Campaign duration slider in weeks"
              />

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[
                  { weeks: 2, label: '2 Wks (Flash)' },
                  { weeks: 4, label: '4 Wks (Month)' },
                  { weeks: 12, label: '12 Wks (Qtr)' },
                  { weeks: 26, label: '26 Wks (Semi)' },
                ].map((p) => (
                  <button
                    key={p.weeks}
                    onClick={() => setDurationWeeks(p.weeks)}
                    className={`py-1.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      durationWeeks === p.weeks
                        ? 'border-[#111111] bg-[#111111] text-white'
                        : 'border-[#d8d3c5] bg-[#fbf9f5] text-[#555555] hover:text-[#111111]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Selected Billboard Locations */}
            <div className="space-y-3 pt-4 border-t border-[#f0ece1]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#111111] text-white flex items-center justify-center text-[10px] font-black">
                    2
                  </span>
                  Select Billboard Locations ({activeBoards.length} Active)
                </label>
                <span className="text-[11px] text-[#777777]">Click to add/remove</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                {allBillboards.map((b) => {
                  const isActive = activeBoards.some((ab) => ab.id === b.id);
                  return (
                    <button
                      key={b.id}
                      onClick={() => toggleBoardInActive(b)}
                      className={`p-3 border text-left flex items-start justify-between gap-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#111111] bg-[#fbf9f5]'
                          : 'border-[#d8d3c5] bg-white text-[#777777] hover:border-[#888888]'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs truncate max-w-[170px] text-[#111111]">{b.name}</div>
                        <div className="text-[10px] text-[#666666]">{b.road} • {b.city}</div>
                        <div className="text-[10px] text-[#eb3b14] font-bold mt-0.5">${b.weeklyRate}/wk</div>
                      </div>
                      <div
                        className={`w-4 h-4 flex items-center justify-center shrink-0 mt-0.5 ${
                          isActive ? 'bg-[#eb3b14] text-white' : 'border border-[#cccccc]'
                        }`}
                      >
                        {isActive && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Production Printing Option */}
            <div className="pt-4 border-t border-[#f0ece1] flex items-center justify-between">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block">
                  Include Vinyl Printing & Installation
                </label>
                <p className="text-[11px] text-[#666666]">
                  Heavyweight 14oz UV vinyl & union rigging (Digital boards are always $0)
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsPrint}
                  onChange={(e) => setNeedsPrint(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#d8d3c5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#eb3b14]"></div>
              </label>
            </div>
          </div>

          {/* Right Column: Instant Cost & ROI Summary Card */}
          <div className="lg:col-span-5 bg-[#111111] text-white border-2 border-[#111111] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#eb3b14]">
                LIVE ESTIMATE SUMMARY
              </span>
              <span className="text-[10px] font-mono text-[#888888]">CAD CURRENCY</span>
            </div>

            {/* Grand Total Highlight */}
            <div className="space-y-1">
              <span className="text-[10px] text-[#888888] uppercase tracking-wider block">Estimated Total Investment</span>
              <div className="text-4xl sm:text-5xl font-black text-white font-display">
                {formatCAD(pricing.grandTotal)}
              </div>
              <div className="text-xs text-[#888888]">
                Includes HST (13%) & all duration discounts
              </div>
            </div>

            {/* ROI Metrics */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#1a1a1a] border border-[#262626]">
              <div>
                <span className="text-[10px] text-[#888888] block uppercase">Total Impressions</span>
                <span className="text-2xl font-black text-[#eb3b14] font-display">
                  {formatImpressionNumber(pricing.totalImpressions)}
                </span>
                <span className="text-[10px] text-[#777777] block">Verified Viewers</span>
              </div>

              <div>
                <span className="text-[10px] text-[#888888] block uppercase">Calculated CPM</span>
                <span className="text-2xl font-black text-white font-display">
                  ${pricing.cpm}
                </span>
                <span className="text-[10px] text-[#777777] block">Per 1,000 Impressions</span>
              </div>
            </div>

            {/* Itemized Breakdown */}
            <div className="space-y-2 text-xs border-t border-[#262626] pt-3 text-[#cccccc]">
              <div className="flex justify-between">
                <span>Base Weekly Rate ({activeBoards.length} boards)</span>
                <span className="font-mono">{formatCAD(pricing.baseWeeklyTotal)} / wk</span>
              </div>
              <div className="flex justify-between">
                <span>Gross Rental ({durationWeeks} weeks)</span>
                <span className="font-mono">{formatCAD(pricing.baseWeeklyTotal * durationWeeks)}</span>
              </div>
              {pricing.discountAmount > 0 && (
                <div className="flex justify-between text-[#eb3b14] font-semibold">
                  <span>Duration Savings ({pricing.discountPercentage}%)</span>
                  <span className="font-mono">-{formatCAD(pricing.discountAmount)}</span>
                </div>
              )}
              {pricing.productionCost > 0 && (
                <div className="flex justify-between">
                  <span>Vinyl Printing & Install</span>
                  <span className="font-mono">{formatCAD(pricing.productionCost)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>HST Tax (13%)</span>
                <span className="font-mono">{formatCAD(pricing.taxAmount)}</span>
              </div>
            </div>

            {/* CTA to Book */}
            <div className="pt-2">
              <button
                onClick={() => onProceedToBook(durationWeeks, needsPrint)}
                className="w-full py-3.5 bg-[#eb3b14] hover:bg-[#d4320e] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Proceed to Book Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
