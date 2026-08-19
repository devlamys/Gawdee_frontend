import React from 'react';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { Meta } from '@/component/common/Meta';
import { ShieldCheck, Award, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta
        title="About Gawdee | Ethical Farming & Vedic Bilona Craftsmanship"
        description="Discover the story behind Gawdee, our dedication to ethical Gir cow care, ancient Indian Bilona method, and pure farm-fresh foods."
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Story Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#113826]/10 text-[#113826] rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Our Heritage & Vision
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-[#113826] leading-tight">
            Nourishing Homes With Traditional Indian Goodness
          </h1>
          <p className="text-base text-gray-600 font-light leading-relaxed">
            Gawdee was born out of a desire to restore authenticity to the Indian kitchen. In an era dominated by high-heat processed foods and chemical additives, we honor ancient Vedic wisdom.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
            <div className="w-14 h-14 bg-[#113826] text-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#1C2421]">Ethical Cow Care</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Our Gir cows free-graze in open pastures and are fed organic, natural fodder. We treat them with love, reverence, and ethical care.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
            <div className="w-14 h-14 bg-[#113826] text-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#1C2421]">Vedic Bilona Churning</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              We slow-cook cultured curd in clay pots and hand-churn in two bi-directional motions. This preserves vital A2 nutrients and golden granular texture.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
            <div className="w-14 h-14 bg-[#113826] text-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#1C2421]">Zero Adulteration</h3>
            <p className="text-xs text-gray-600 font-light leading-relaxed">
              Every single batch of Gawdee Ghee and Raw Honey undergoes rigorous lab testing to guarantee zero chemicals, starch, or preservatives.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
