'use client';

import React, { useState } from 'react';
import { BillboardLocation } from '../types/billboard';
import { calculateCampaignPricing, formatCAD, generateBookingId } from '../utils/pricing';
import { X, Calendar, User, Building, Mail, Phone, Upload, CheckCircle2, FileText, ArrowRight, Printer, Sparkles, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBillboards: BillboardLocation[];
  onRemoveBillboard: (id: string) => void;
  initialWeeks?: number;
  initialNeedsPrint?: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedBillboards,
  onRemoveBillboard,
  initialWeeks = 4,
  initialNeedsPrint = true,
}) => {
  const [durationWeeks, setDurationWeeks] = useState<number>(initialWeeks);
  const [startDate, setStartDate] = useState<string>(() => {
    // Default to next Monday
    const d = new Date();
    d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7 || 7));
    return d.toISOString().split('T')[0];
  });
  const [needsPrint, setNeedsPrint] = useState<boolean>(initialNeedsPrint);
  const [artworkOption, setArtworkOption] = useState<'upload' | 'request-design'>('upload');
  const [artworkFileName, setArtworkFileName] = useState<string>('');

  // Advertiser form fields
  const [advertiserName, setAdvertiserName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Submitted confirmation state
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const pricing = calculateCampaignPricing(selectedBillboards, durationWeeks, needsPrint);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!advertiserName.trim()) {
      setErrorMessage('Please enter your full contact name.');
      return;
    }
    if (!companyName.trim()) {
      setErrorMessage('Please enter your company or brand name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid work email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please provide a contact phone number.');
      return;
    }

    const bookingId = generateBookingId();
    setConfirmedBookingId(bookingId);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border-2 border-[#111111] shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-[#111111] text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eb3b14]" />
              <h3 className="text-2xl font-black font-display uppercase tracking-wider">
                {confirmedBookingId ? 'RESERVATION CONFIRMATION' : 'ONLINE BILLBOARD BOOKING'}
              </h3>
            </div>
            <p className="text-xs text-[#888888] mt-0.5">
              Sign Art Media Outdoor Network • Direct Reservation Hold
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#888888] hover:text-white transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {confirmedBookingId ? (
          /* Confirmation Success Screen */
          <div className="p-8 space-y-6 bg-[#fbf9f5]">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#eb3b14]/10 text-[#eb3b14] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-3xl font-black text-[#111111] font-display uppercase">
                YOUR LOCATIONS ARE RESERVED!
              </h4>
              <p className="text-xs text-[#555555] max-w-md mx-auto">
                Thank you, <strong className="text-[#111111]">{advertiserName}</strong>. Your billboard reservation hold has
                been confirmed with Sign Art Media.
              </p>
            </div>

            {/* Formal Booking Receipt Card */}
            <div className="p-6 bg-white border border-[#111111] space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-3">
                <div>
                  <span className="text-[10px] text-[#777777] block uppercase">Booking Reference</span>
                  <span className="text-lg font-bold text-[#eb3b14]">{confirmedBookingId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#777777] block uppercase">Flight Schedule</span>
                  <span className="text-[#111111] font-bold">
                    Starts {startDate} ({durationWeeks} Weeks)
                  </span>
                </div>
              </div>

              {/* Reserved Boards */}
              <div className="space-y-1.5 font-sans">
                <span className="text-[10px] text-[#777777] uppercase block font-mono">Reserved Locations:</span>
                {selectedBillboards.map((b) => (
                  <div key={b.id} className="flex justify-between text-[#222222]">
                    <span>
                      {b.code} - {b.name} ({b.city})
                    </span>
                    <span className="text-[#eb3b14] font-semibold">${b.weeklyRate}/wk</span>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="pt-3 border-t border-[#e5e0d3] space-y-1">
                <div className="flex justify-between text-[#666666]">
                  <span>Gross Rental:</span>
                  <span>{formatCAD(pricing.baseWeeklyTotal * durationWeeks)}</span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between text-[#eb3b14]">
                    <span>Duration Discount ({pricing.discountPercentage}%):</span>
                    <span>-{formatCAD(pricing.discountAmount)}</span>
                  </div>
                )}
                {pricing.productionCost > 0 && (
                  <div className="flex justify-between text-[#666666]">
                    <span>Vinyl Production & Rigging:</span>
                    <span>{formatCAD(pricing.productionCost)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#666666]">
                  <span>HST (13%):</span>
                  <span>{formatCAD(pricing.taxAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#111111] pt-2 border-t border-[#e5e0d3]">
                  <span>Grand Total (CAD):</span>
                  <span className="text-[#eb3b14]">{formatCAD(pricing.grandTotal)}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#777777] border-t border-[#e5e0d3] font-sans">
                Confirmation details and digital ad specs sent to: <strong className="text-[#111111]">{email}</strong>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-4 bg-white border border-[#d8d3c5] space-y-2 text-xs text-[#555555]">
              <div className="font-bold text-[#111111] uppercase tracking-wider">
                What Happens Next?
              </div>
              <p>
                1. A dedicated Sign Art Media campaign coordinator will review your flight dates and reserve the display slots.
              </p>
              <p>
                2. You will receive digital art specs (dimensions, DPI, bleed) or our creative design kickoff email within 4 business hours.
              </p>
              <p>
                3. Your formal contract & corporate invoicing agreement will be emailed to finalize your flight.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="py-2.5 px-4 bg-white hover:bg-[#eae6dc] text-[#111111] text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#111111] cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print Receipt
              </button>
              <button
                onClick={onClose}
                className="py-2.5 px-6 bg-[#eb3b14] hover:bg-[#d4320e] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          /* Form Entry Screen */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 bg-[#fbf9f5]">
            {errorMessage && (
              <div className="p-3 bg-[#eb3b14]/10 border border-[#eb3b14] text-[#eb3b14] text-xs flex items-center gap-2 font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Selected Locations Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                  1. Selected Locations ({selectedBillboards.length})
                </label>
                <span className="text-[11px] text-[#666666]">
                  {selectedBillboards.length === 0 ? 'Select at least one board' : 'Locations included in this booking'}
                </span>
              </div>

              {selectedBillboards.length === 0 ? (
                <div className="p-4 bg-white border border-dashed border-[#d8d3c5] text-center text-xs text-[#777777]">
                  No billboards selected yet. Please select a board from the map or catalog first.
                </div>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedBillboards.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 bg-white border border-[#d8d3c5] flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#111111] block">{b.name}</span>
                        <span className="text-[11px] text-[#666666]">
                          {b.code} • {b.format} • {b.city}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#eb3b14]">${b.weeklyRate}/wk</span>
                        {selectedBillboards.length > 1 && (
                          <button
                            type="button"
                            onClick={() => onRemoveBillboard(b.id)}
                            className="text-[#888888] hover:text-[#eb3b14]"
                            title="Remove board"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Flight Timing & Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#e5e0d3]">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#444444] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#eb3b14]" /> Campaign Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#444444] uppercase tracking-wider">Campaign Duration</label>
                <select
                  value={durationWeeks}
                  onChange={(e) => setDurationWeeks(parseInt(e.target.value, 10))}
                  className="w-full bg-white border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14] cursor-pointer"
                  aria-label="Select campaign duration"
                >
                  <option value={1}>1 Week (Flash Flight)</option>
                  <option value={2}>2 Weeks</option>
                  <option value={4}>4 Weeks (Standard Flight - 10% Off)</option>
                  <option value={8}>8 Weeks (10% Off)</option>
                  <option value={12}>12 Weeks (Quarterly - 18% Off)</option>
                  <option value={26}>26 Weeks (Semi-Annual - 25% Off)</option>
                  <option value={52}>52 Weeks (Annual Takeover - 25% Off)</option>
                </select>
              </div>
            </div>

            {/* Artwork Preference */}
            <div className="space-y-2 pt-2 border-t border-[#e5e0d3]">
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                2. Billboard Artwork & Creative
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setArtworkOption('upload')}
                  className={`p-3 border text-left text-xs font-semibold cursor-pointer transition-all ${
                    artworkOption === 'upload'
                      ? 'border-[#111111] bg-white text-[#111111]'
                      : 'border-[#d8d3c5] bg-[#f5f2eb] text-[#666666]'
                  }`}
                >
                  <span className="block font-bold text-[#eb3b14]">I have my own artwork</span>
                  <span className="text-[11px] font-normal text-[#666666]">Ready to upload or submit later</span>
                </button>

                <button
                  type="button"
                  onClick={() => setArtworkOption('request-design')}
                  className={`p-3 border text-left text-xs font-semibold cursor-pointer transition-all ${
                    artworkOption === 'request-design'
                      ? 'border-[#111111] bg-white text-[#111111]'
                      : 'border-[#d8d3c5] bg-[#f5f2eb] text-[#666666]'
                  }`}
                >
                  <span className="block font-bold text-[#eb3b14]">Sign Art Media Design</span>
                  <span className="text-[11px] font-normal text-[#666666]">Creative team designs artwork</span>
                </button>
              </div>

              {artworkOption === 'upload' && (
                <div className="pt-1">
                  <label className="w-full border border-dashed border-[#d8d3c5] bg-white p-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#eae6dc] transition-colors text-xs text-[#666666]">
                    <Upload className="w-4 h-4 text-[#eb3b14]" />
                    <span>{artworkFileName || 'Click to attach design files (PDF, TIFF, AI, PNG)'}</span>
                    <input
                      type="file"
                      onChange={(e) => setArtworkFileName(e.target.files?.[0]?.name || '')}
                      className="hidden"
                      aria-label="Upload artwork files"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Advertiser Contact Details */}
            <div className="space-y-3 pt-2 border-t border-[#e5e0d3]">
              <label className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                3. Advertiser & Contact Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-[#666666] uppercase tracking-wider block">
                    Contact Full Name *
                  </label>
                  <input
                    type="text"
                    value={advertiserName}
                    onChange={(e) => setAdvertiserName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-white border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#666666] uppercase tracking-wider block">
                    Company / Brand Name *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Motors Canada"
                    className="w-full bg-white border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#666666] uppercase tracking-wider block">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.ca"
                    className="w-full bg-white border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-[#666666] uppercase tracking-wider block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(416) 555-0199"
                    className="w-full bg-white border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[#666666] uppercase tracking-wider block">
                  Campaign Objective & Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your campaign goals, target demographics, or specific timing requirements..."
                  rows={2}
                  className="w-full bg-white border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14] resize-none"
                />
              </div>
            </div>

            {/* Financial Summary & Submit CTA */}
            <div className="p-4 bg-white border border-[#111111] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-wider block">Total Estimated Amount</span>
                <span className="text-3xl font-black text-[#111111] font-display">
                  {formatCAD(pricing.grandTotal)}
                </span>
                <span className="text-[10px] text-[#777777] block">
                  Includes 13% HST • {pricing.discountPercentage}% Discount Applied
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 bg-white text-[#666666] hover:text-[#111111] text-xs font-bold uppercase tracking-wider cursor-pointer border border-[#d8d3c5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={selectedBillboards.length === 0}
                  className="py-2.5 px-6 bg-[#eb3b14] hover:bg-[#d4320e] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Confirm Reservation Hold</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
