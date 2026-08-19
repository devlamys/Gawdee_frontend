import React from 'react';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { Meta } from '@/component/common/Meta';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta title="Privacy Policy | Gawdee Customer Protection" />
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h1 className="text-3xl font-extrabold font-serif text-[#113826]">Privacy Policy</h1>
          <p className="text-xs text-gray-500">Last updated: August 2026</p>
          <div className="text-xs text-gray-700 leading-relaxed space-y-4 font-light border-t border-gray-100 pt-4">
            <p>
              At Gawdee, we value your trust and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data.
            </p>
            <h3 className="text-sm font-bold text-[#1C2421]">Information We Collect</h3>
            <p>
              We collect your name, shipping address, mobile number, and email address solely for order processing, delivery, and customer support.
            </p>
            <h3 className="text-sm font-bold text-[#1C2421]">Data Security</h3>
            <p>
              We never sell or rent your personal information to third parties. All payment transactions are encrypted using secure SSL gateways.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
