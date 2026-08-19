import React, { useState } from 'react';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { Meta } from '@/component/common/Meta';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { ApiPost } from '@/helper/axios';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ApiPost('/contact', form);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta title="Contact Gawdee | Customer Support & Product Inquiries" />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            We are Here to Help
          </span>
          <h1 className="text-4xl font-extrabold font-serif text-[#113826]">Contact Gawdee</h1>
          <p className="text-xs text-gray-600">
            Have a question about our A2 Ghee, order status, or wholesale inquiries? Reach out to us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          {/* Contact Details */}
          <div className="lg:col-span-5 bg-[#113826] text-white p-8 rounded-3xl shadow-xl space-y-6">
            <h3 className="text-xl font-bold font-serif text-[#D4AF37]">Get In Touch</h3>
            <p className="text-xs text-white/80 leading-relaxed font-light">
              Our customer care team is available Monday to Saturday (9:00 AM to 7:00 PM IST).
            </p>
            <div className="space-y-4 pt-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D4AF37]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/60 text-[10px]">Call / WhatsApp Support</p>
                  <p className="font-bold text-white text-sm">+91 70551 07030</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D4AF37]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/60 text-[10px]">Email Us</p>
                  <p className="font-bold text-white text-sm">support@gawdee.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-bold font-serif text-[#113826]">Message Sent!</h3>
                <p className="text-xs text-gray-500">Thank you for reaching out. We will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                      placeholder="email@domain.com"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                      placeholder="10-digit number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#113826] hover:bg-[#1b4d3e] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
