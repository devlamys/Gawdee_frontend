import React from 'react';
import { Check, X } from 'lucide-react';

export default function QualitySection() {
  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
          The Gawdee Distinction
        </span>
        <h2 className="text-3xl font-extrabold font-serif text-[#1C2421] mt-1 mb-12">
          Gawdee Traditional Bilona vs Commercial Ghee
        </h2>

        <div className="max-w-4xl mx-auto bg-[#FAF8F5] rounded-3xl p-8 border border-gray-100 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Gawdee Way */}
            <div className="bg-white p-6 rounded-2xl border border-emerald-200 text-left space-y-4 shadow-sm">
              <span className="inline-block px-3 py-1 bg-[#113826] text-white text-xs font-bold rounded-full">
                Gawdee Vedic A2 Ghee
              </span>
              <ul className="space-y-3 text-xs text-[#1C2421] font-medium">
                <li className="flex items-center gap-2 text-emerald-700">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Made from A2 Milk of Pure Gir Cows
                </li>
                <li className="flex items-center gap-2 text-emerald-700">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Cultured Curd Churned (Traditional Bilona)
                </li>
                <li className="flex items-center gap-2 text-emerald-700">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Rich Granular (Danedar) Texture & Aroma
                </li>
                <li className="flex items-center gap-2 text-emerald-700">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" /> Zero Preservatives, Additives, or Chemicals
                </li>
              </ul>
            </div>

            {/* Commercial Way */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-left space-y-4 opacity-75">
              <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">
                Commercial Market Ghee
              </span>
              <ul className="space-y-3 text-xs text-gray-500 font-medium">
                <li className="flex items-center gap-2 text-gray-400">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Mixed Milk from Hybrid/Jersey Cows
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Direct Cream Separation via High Heat
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Pale, Processed & Liquid Consistency
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0" /> May Contain Synthetic Aromas & Dyes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
