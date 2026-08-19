import React, { useState } from 'react';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { Meta } from '@/component/common/Meta';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';
import { ApiPost } from '@/helper/axios';

export default function GawdeeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    purpose: 'Exhibition Inquiry',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ApiPost('/exhibition-inquiry', formData);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta title="Gawdee Exhibition & Wholesale Inquiries" />
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D4AF37]/20 text-[#8A711E] rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> B2B & Exhibition
          </span>
          <h1 className="text-4xl font-extrabold font-serif text-[#113826]">
            Exhibition & Bulk Inquiry
          </h1>
          <p className="text-xs text-gray-600">
            Interested in stocking Gawdee A2 Ghee or partnering for health exhibitions? Fill out the form below.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold font-serif text-[#113826]">Inquiry Submitted</h3>
              <p className="text-xs text-gray-500">Our partnership team will get in touch with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Message / Requirements</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                  placeholder="Specify quantity or exhibition details..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#113826] text-white font-bold rounded-xl text-xs uppercase tracking-wider"
              >
                {loading ? 'Submitting...' : 'Submit Partner Inquiry'}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
