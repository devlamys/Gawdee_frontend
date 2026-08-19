import React from 'react';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { RotateCcw } from 'lucide-react';

export default function ReturnDetailsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-[#113826]/10 text-[#113826] rounded-2xl flex items-center justify-center mx-auto">
          <RotateCcw className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold font-serif text-[#113826]">Return Status & Guidelines</h1>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          Returns for Gawdee pure products are processed within 3-5 business days upon physical item inspection.
        </p>
      </main>
      <Footer />
    </div>
  );
}
