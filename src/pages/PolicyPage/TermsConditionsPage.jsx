import React from 'react';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { Meta } from '@/component/common/Meta';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta title="Terms & Conditions | Gawdee Policies" />
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h1 className="text-3xl font-extrabold font-serif text-[#113826]">Terms & Conditions</h1>
          <p className="text-xs text-gray-500">Last updated: August 2026</p>
          <div className="text-xs text-gray-700 leading-relaxed space-y-4 font-light border-t border-gray-100 pt-4">
            <p>
              By accessing or purchasing from Gawdee, you agree to comply with our user terms and operational guidelines.
            </p>
            <h3 className="text-sm font-bold text-[#1C2421]">1. Product Quality & Variations</h3>
            <p>
              As Gawdee A2 Ghee and Raw Honey are 100% natural and unadulterated, slight natural variations in texture, color, and aroma may occur across seasonal batches.
            </p>
            <h3 className="text-sm font-bold text-[#1C2421]">2. Orders & Shipping</h3>
            <p>
              Orders are dispatched within 24-48 hours. Shipping timelines depend on pin code accessibility.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
