import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { ApiPost } from '@/helper/axios';
import { RotateCcw, CheckCircle2 } from 'lucide-react';

export default function ReturnPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState('Damaged package on delivery');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReturn = async (e) => {
    e.preventDefault();
    try {
      await ApiPost('/order/return-request', { orderId: id, reason, notes });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Header />
      <main className="max-w-xl mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 text-[#113826]">
            <RotateCcw className="w-6 h-6" />
            <h1 className="text-xl font-bold font-serif">Return Request for Order #{id}</h1>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-[#113826]">Return Request Submitted</h3>
              <p className="text-xs text-gray-500">Our quality control team will inspect your request.</p>
              <button onClick={() => navigate('/my-orders')} className="px-6 py-2.5 bg-[#113826] text-white text-xs font-bold rounded-xl">
                Go to My Orders
              </button>
            </div>
          ) : (
            <form onSubmit={handleReturn} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Return Reason</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                >
                  <option value="Damaged package on delivery">Damaged package on delivery</option>
                  <option value="Wrong item received">Wrong item received</option>
                  <option value="Seal broken">Seal broken</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Notes / Description</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                />
              </div>

              <button type="submit" className="w-full py-3.5 bg-[#113826] text-white font-bold rounded-xl text-xs">
                Submit Return Request
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
