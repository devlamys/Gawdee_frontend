import React from 'react';
import { Award, Users, CheckCircle, Flame, ShieldCheck } from 'lucide-react';

export default function GawdeeKPISection() {
  const stats = [
    { icon: Award, title: "100% Authentic", desc: "Vedic Bilona Method" },
    { icon: Users, title: "50,000+ Happy Families", desc: "Trusted Across India" },
    { icon: ShieldCheck, title: "NABL Lab Certified", desc: "Zero Adulteration" },
    { icon: Flame, title: "Ethical Farming", desc: "Free Grazing Gir Cows" },
  ];

  return (
    <section className="bg-[#113826] text-white py-12 border-y border-[#1b4d3e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-serif">{stat.title}</h4>
                  <p className="text-xs text-white/70 mt-0.5">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
