import React from 'react';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import ProductCard from '@/component/common/ProductCard';
import { Sparkles } from 'lucide-react';

export default function ComboProductDetails() {
  const comboProduct = {
    _id: "combo-101",
    name: "Gawdee Health Combo Pack (A2 Ghee 500ml + Raw Honey 500g)",
    title: "Gawdee Health Combo Pack",
    slug: "health-combo-pack",
    salePrice: 1399,
    price: 1799,
    image: "/vite.svg",
    rating: 5,
    reviewsCount: 42,
    description: "The ultimate wellness pairing: Pure A2 Gir Cow Bilona Ghee paired with Wild Forest Honey.",
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/20 text-[#8A711E] rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Special Value Pack
          </span>
          <h1 className="text-4xl font-extrabold font-serif text-[#113826]">
            Gawdee Wellness Combos
          </h1>
          <p className="text-xs text-gray-600">
            Combine pure A2 Bilona Ghee with Raw Forest Honey and save up to 25%.
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          <ProductCard product={comboProduct} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
