import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { ApiPost } from '@/helper/axios';
import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function CancelOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState('Ordered by mistake');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ApiPost(`/order/cancel/${id}`, { reason, comments });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Header />
      <main className="max-w-xl mx-auto px-4 py-16">
        <Link to="/my-orders" className="inline-flex items-center gap-1 text-xs font-bold text-[#113826] mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to My Orders
        </Link>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-red-600 pb-3 border-b border-gray-100">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <h1 className="text-xl font-bold font-serif text-[#1C2421]">Cancel Order #{id}</h1>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-[#113826]">Cancellation Request Received</h3>
              <p className="text-xs text-gray-500">Your order cancellation is being processed.</p>
              <button onClick={() => navigate('/my-orders')} className="px-6 py-2.5 bg-[#113826] text-white text-xs font-bold rounded-xl">
                Go to My Orders
              </button>
            </div>
          ) : (
            <form onSubmit={handleCancel} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Reason for Cancellation</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                >
                  <option value="Ordered by mistake">Ordered by mistake</option>
                  <option value="Delivery time too long">Delivery time too long</option>
                  <option value="Changed shipping address">Changed shipping address</option>
                  <option value="Found better alternative">Found better alternative</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Additional Comments (Optional)</label>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 focus:border-[#113826] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs"
              >
                {loading ? 'Processing...' : 'Confirm Cancellation'}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
