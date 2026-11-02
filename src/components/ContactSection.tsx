'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState('rate-card');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast can a billboard campaign go live in Canada?',
      a: 'For our Digital LED Spectacular network, approved creative can go live in under 24 hours. For static vinyl bulletins, production, heavyweight 14oz UV printing, and union rigging take 5 to 7 business days from final art approval.',
    },
    {
      q: 'Can I swap digital billboard artwork during the campaign flight?',
      a: 'Yes, absolutely. Digital billboard flights come with unlimited free creative updates. You can also deploy automated dayparting (e.g. morning coffee commute creative vs. evening retail message) at no extra charge.',
    },
    {
      q: 'What proof of posting documentation is provided?',
      a: 'Every client receives official verification. Digital boards include camera-verified daily playback timestamp logs, and static bulletins include geotagged high-resolution daytime and nighttime photographs.',
    },
    {
      q: 'How do volume and duration discounts work?',
      a: 'Discounts apply automatically when calculating or reserving online: 10% off for 4-11 weeks, 18% off for 12-25 weeks, and 25% off for 26+ weeks. Booking 2+ locations adds an additional 5% to 8% multi-market credit.',
    },
    {
      q: 'Are rates billed in Canadian Dollars (CAD)?',
      a: 'Yes, all rates, production fees, and invoicing are in Canadian Dollars (CAD) plus applicable 13% Ontario HST / federal taxes.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#f5f2eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* FAQ Section (matching reference "GOOD QUESTIONS, STRAIGHT ANSWERS.") */}
        <div className="space-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#555555]">
              <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
              <span>COMMONLY ASKED QUESTIONS</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-[#111111] leading-none font-display uppercase tracking-tight">
              GOOD QUESTIONS. <br />
              STRAIGHT ANSWERS.
            </h2>
          </div>

          <div className="divide-y divide-[#d8d3c5] border-y border-[#d8d3c5] max-w-4xl">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#111111] font-display uppercase tracking-wider group-hover:text-[#eb3b14] transition-colors">
                      {faq.q}
                    </span>
                    <span className="p-1 rounded-full text-[#eb3b14]">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-[#555555] leading-relaxed pr-6">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form & Canadian Headquarters Section */}
        <div className="pt-8 border-t border-[#d8d3c5] space-y-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#555555]">
              <span className="w-2 h-2 rounded-full bg-[#eb3b14]" />
              <span>DIRECT INQUIRIES & AGENCY RFPS</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-[#111111] leading-none font-display uppercase tracking-tight">
              CONTACT OUR MEDIA DESK.
            </h2>
            <p className="text-sm text-[#555555] max-w-xl">
              Need custom corridor takeovers, agency RFP submissions, or immediate hold confirmation? Speak directly with our Canadian outdoor media planners.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Canadian Office Details */}
            <div className="lg:col-span-5 bg-white border border-[#d8d3c5] p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-black text-[#111111] font-display uppercase tracking-tight">
                SIGN ART MEDIA HEADQUARTERS
              </h3>

              <div className="space-y-4 text-xs text-[#444444]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block">Toronto Corporate Office</strong>
                    <span>100 University Avenue, 8th Floor</span>
                    <span className="block text-[#777777]">Toronto, Ontario M5J 1V6</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block">Direct Telephone</strong>
                    <a href="tel:4165557446" className="text-[#eb3b14] font-bold hover:underline block">
                      (416) 555-SIGN / (416) 555-7446
                    </a>
                    <span className="text-[#777777]">Toll-Free Across Canada: 1-800-555-SIGN</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#eb3b14] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block">Direct Electronic Mail</strong>
                    <a href="mailto:info@signartmedia.ca" className="text-[#eb3b14] font-bold hover:underline block">
                      info@signartmedia.ca
                    </a>
                    <span className="text-[#777777]">Media Kits & Avails: media@signartmedia.ca</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#f0ece1] text-[11px] text-[#777777] leading-relaxed">
                Coverage across Highway 401, QEW, Gardiner Expressway, Highway 417, Autoroute 15, and Deerfoot Trail.
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-white border border-[#d8d3c5] p-6 sm:p-8 shadow-sm">
              {isSubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#eb3b14]/10 text-[#eb3b14] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-black text-[#111111] font-display uppercase">
                    INQUIRY RECEIVED.
                  </h4>
                  <p className="text-xs text-[#555555] max-w-md mx-auto">
                    Thank you, <strong className="text-[#111111]">{name}</strong>. A Sign Art Media campaign coordinator will reply with full rate cards and corridor availability within 2 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="py-2.5 px-6 bg-[#111111] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-[#fbf9f5] border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company or agency"
                        className="w-full bg-[#fbf9f5] border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.ca"
                        className="w-full bg-[#fbf9f5] border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14]"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(416) 555-0123"
                        className="w-full bg-[#fbf9f5] border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      Inquiry Subject
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-[#fbf9f5] border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14] cursor-pointer"
                      aria-label="Inquiry subject"
                    >
                      <option value="rate-card">Request Rate Card & Media Kit</option>
                      <option value="hold">Reserve Specific Billboard Location Hold</option>
                      <option value="enterprise">Multi-Market Enterprise / Annual Contract</option>
                      <option value="agency">Agency Partnership / Media Buyer Discount</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666]">
                      Campaign Details & Target Corridors *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="Tell us about desired highway corridors (e.g. 401 Toronto, QEW, A-15 Montreal), campaign budget, flight dates, or questions..."
                      className="w-full bg-[#fbf9f5] border border-[#d8d3c5] px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#eb3b14] resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#eb3b14] hover:bg-[#d4320e] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Sign Art Media</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
