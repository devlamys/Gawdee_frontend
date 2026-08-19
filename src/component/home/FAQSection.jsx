import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What makes Gawdee A2 Gir Cow Ghee different from regular ghee?",
      a: "Gawdee A2 Ghee is prepared using the traditional 5-step Vedic Bilona process—boiling whole milk from Gir cows, converting to curd, hand-churning curd to obtain fresh makkhan, and heating gently into golden granular ghee. Commercial ghee uses direct cream separation."
    },
    {
      q: "Is Gawdee Forest Honey 100% raw and unpasteurized?",
      a: "Yes! Our raw forest honey is directly harvested from wild bee colonies without heating, fine filtering, or adding sugar syrup. It retains all natural enzymes, pollen, and propolis."
    },
    {
      q: "Do you ship across India? How long does delivery take?",
      a: "We ship to over 26,000 pincodes across India. Metro cities usually receive orders within 2–4 business days, while other regions take 4–6 business days."
    },
    {
      q: "How should I store A2 Bilona Ghee?",
      a: "Store Gawdee Ghee at room temperature in a clean, dry glass jar. Do not refrigerate. Always use a clean dry spoon to prevent moisture contamination."
    }
  ];

  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
          Got Questions?
        </span>
        <h2 className="text-3xl font-extrabold font-serif text-[#1C2421] mt-1 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-sm font-bold text-[#1C2421] hover:text-[#113826] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#113826]' : 'text-gray-400'}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-gray-600 font-light leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
