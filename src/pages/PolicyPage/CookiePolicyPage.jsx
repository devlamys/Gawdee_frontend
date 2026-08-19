import React from 'react';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { Meta } from '@/component/common/Meta';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta title="Cookie Policy | Gawdee Data Privacy" />
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h1 className="text-3xl font-extrabold font-serif text-[#113826]">Cookie Policy</h1>
          <p className="text-xs text-gray-500">Last updated: August 2026</p>
          <div className="text-xs text-gray-700 leading-relaxed space-y-4 font-light border-t border-gray-100 pt-4">
            <p>
              Gawdee uses essential cookies and local storage to keep track of your shopping cart, preserve your login session, and deliver a smooth checkout experience.
            </p>
            <h3 className="text-sm font-bold text-[#1C2421]">1. How We Use Cookies</h3>
            <p>
              Cookies help us remember items in your cart when you navigate between pages, analyze web traffic anonymously, and optimize mobile responsiveness.
            </p>
            <h3 className="text-sm font-bold text-[#1C2421]">2. Managing Cookies</h3>
            <p>
              You can disable cookies in your browser settings at any time; however, certain features such as persistent cart synchronization may be limited.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
