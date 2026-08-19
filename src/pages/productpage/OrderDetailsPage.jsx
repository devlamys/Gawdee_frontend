import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { ApiGet } from '@/helper/axios';
import { Package, MapPin, FileText, ArrowLeft, CheckCircle2, Truck, Clock } from 'lucide-react';
import { Meta } from '@/component/common/Meta';
import { Badge } from '@/component/ui/Badge';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const res = await ApiGet(`/order/${id}`);
        setOrder(res?.order || res?.data || res);
      } catch (err) {
        console.error("Fetch order detail error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <Header />
        <div className="max-w-4xl mx-auto py-20 text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#113826] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs text-gray-500 font-semibold">Loading order details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const items = order?.items || [];
  const status = order?.status || order?.orderStatus || "Processing";
  const address = order?.shippingAddress || {};

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta title={`Order #${id} Details | Gawdee`} />
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <Link to="/my-orders" className="inline-flex items-center gap-1 text-xs font-bold text-[#113826] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to My Orders
        </Link>

        {/* Header Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Order ID</span>
            <h1 className="text-xl font-bold font-mono text-[#113826]">{id}</h1>
            <p className="text-xs text-gray-500 mt-0.5">Placed on {new Date(order?.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={status.toLowerCase() === 'delivered' ? 'success' : 'primary'}>
              {status}
            </Badge>
            <Link
              to={`/my-orders/invoice/${id}`}
              className="px-4 py-2 bg-[#FAF8F5] hover:bg-gray-100 text-[#113826] border border-gray-200 text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" /> Invoice
            </Link>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold font-serif text-[#113826] pb-3 border-b border-gray-100">
            Order Line Items ({items.length})
          </h3>

          <div className="space-y-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center p-3 rounded-2xl bg-[#FAF8F5] border border-gray-100">
                <img src={item.image || "/vite.svg"} alt={item.name} className="w-16 h-16 object-contain bg-white p-1 rounded-xl border" />
                <div className="flex-1 text-xs">
                  <h4 className="font-bold text-[#1C2421]">{item.name || "Gawdee Product"}</h4>
                  <p className="text-gray-500">Qty: {item.quantity || item.qty || 1}</p>
                  <p className="text-gray-500">Price: ₹{item.price}</p>
                </div>
                <span className="text-sm font-extrabold text-[#113826]">
                  ₹{(item.price || 0) * (item.quantity || item.qty || 1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <h3 className="text-sm font-bold font-serif text-[#113826] flex items-center gap-2 pb-2 border-b border-gray-100">
              <MapPin className="w-4 h-4 text-[#D4AF37]" /> Delivery Address
            </h3>
            <div className="text-xs space-y-1 text-gray-600">
              <p className="font-bold text-[#1C2421]">{address.name || "Customer"}</p>
              <p>{address.address}</p>
              <p>{address.city}, {address.state} - {address.pincode}</p>
              <p>Phone: {address.phone}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <h3 className="text-sm font-bold font-serif text-[#113826] pb-2 border-b border-gray-100">
              Payment Summary
            </h3>
            <div className="text-xs space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-bold text-[#1C2421]">{order?.paymentMethod || "Cash on Delivery"}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order?.subtotal || order?.totalAmount || 0}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#113826] pt-2 border-t border-gray-100">
                <span>Total Amount Paid</span>
                <span>₹{order?.totalAmount || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
