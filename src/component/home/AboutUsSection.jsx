import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';

export default function AboutUsSection() {
  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md space-y-3 text-center">
              <div className="w-12 h-12 bg-[#113826]/10 text-[#113826] rounded-2xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold font-serif text-[#1C2421]">Gir Cow Care</h4>
              <p className="text-xs text-gray-500">Ethical free-grazing cows provided natural grass fodder & love.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md space-y-3 text-center mt-6">
              <div className="w-12 h-12 bg-[#D4AF37]/20 text-[#8A711E] rounded-2xl flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold font-serif text-[#1C2421]">Vedic Bilona</h4>
              <p className="text-xs text-gray-500">Two-way hand churning of curd to extract golden Makkhan.</p>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Our Brand Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#1C2421] leading-tight">
              Rooted in Indian Heritage, Mindfully Crafted for Contemporary Wellness.
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              Gawdee was founded with a single mission: to reconnect modern households with unadulterated Indian farm traditions. We bypass industrial short-cuts and commercial heating, churning small batches with utmost devotion.
            </p>
            <div className="pt-2">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#113826] hover:bg-[#1b4d3e] text-white font-semibold text-xs rounded-xl shadow-md transition-all group"
              >
                Read Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
