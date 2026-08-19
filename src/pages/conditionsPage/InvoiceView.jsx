import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiGet } from '@/helper/axios';
import { Printer, ArrowLeft } from 'lucide-react';

export function InvoiceView() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        setLoading(true);
        const res = await ApiGet(`/order/${orderId}`);
        setOrder(res?.order || res?.data || res);
      } catch (err) {
        console.error("Fetch invoice error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoiceData();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#113826] rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-gray-500">Generating Gawdee Tax Invoice...</p>
        </div>
      </div>
    );
  }

  const items = order?.items || [];
  const address = order?.shippingAddress || {};
  const dateStr = new Date(order?.createdAt || Date.now()).toLocaleDateString('en-IN');

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      {/* Top Action Bar (hidden during print) */}
      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 font-bold text-xs rounded-xl shadow-sm border"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#113826] text-white font-bold text-xs rounded-xl shadow-md"
        >
          <Printer className="w-4 h-4" /> Print / Save PDF
        </button>
      </div>

      {/* Printable Tax Invoice Container */}
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-200 print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-black font-serif text-[#113826]">GAWDEE.</h1>
            <p className="text-xs text-gray-500 mt-1">Pure A2 Gir Cow Ghee & Natural Foods</p>
            <p className="text-[11px] text-gray-400">Gawdee Organics Pvt. Ltd.</p>
          </div>
          <div className="text-right text-xs space-y-1">
            <span className="px-3 py-1 bg-[#113826]/10 text-[#113826] font-bold rounded-lg uppercase tracking-wider text-[10px]">
              TAX INVOICE
            </span>
            <p className="font-bold text-[#1C2421] mt-2">Invoice #: {orderId}</p>
            <p className="text-gray-500">Date: {dateStr}</p>
          </div>
        </div>

        {/* Billed To / Shipped To */}
        <div className="grid grid-cols-2 gap-6 text-xs mb-8">
          <div>
            <p className="font-bold uppercase tracking-wider text-gray-400 text-[10px] mb-1">Customer / Shipping Address</p>
            <p className="font-bold text-[#1C2421]">{address.name || "Valued Customer"}</p>
            <p className="text-gray-600">{address.address}</p>
            <p className="text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
            <p className="text-gray-600">Phone: {address.phone}</p>
          </div>
          <div className="text-right">
            <p className="font-bold uppercase tracking-wider text-gray-400 text-[10px] mb-1">Seller Details</p>
            <p className="font-bold text-[#1C2421]">Gawdee Farm Operations</p>
            <p className="text-gray-600">Support: +91 70551 07030</p>
            <p className="text-gray-600">Email: support@gawdee.com</p>
          </div>
        </div>

        {/* Invoice Table */}
        <table className="w-full text-xs text-left border-collapse mb-8">
          <thead>
            <tr className="bg-[#FAF8F5] border-y border-gray-200 text-[#113826] font-bold uppercase tracking-wider">
              <th className="py-3 px-3">Item Description</th>
              <th className="py-3 px-3 text-center">Qty</th>
              <th className="py-3 px-3 text-right">Unit Price</th>
              <th className="py-3 px-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item, idx) => {
              const qty = item.quantity || item.qty || 1;
              const unitPrice = item.price || 0;
              return (
                <tr key={idx}>
                  <td className="py-3 px-3 font-semibold text-[#1C2421]">
                    {item.name || "Gawdee Product"}
                    {item.variant && <span className="block text-[10px] text-gray-400">Variant: {item.variant}</span>}
                  </td>
                  <td className="py-3 px-3 text-center">{qty}</td>
                  <td className="py-3 px-3 text-right">₹{unitPrice}</td>
                  <td className="py-3 px-3 text-right font-bold text-[#113826]">₹{unitPrice * qty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end border-t border-gray-200 pt-4 mb-8">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#1C2421]">₹{order?.subtotal || order?.totalAmount || 0}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxes (5% GST Incl.):</span>
              <span>₹{Math.round((order?.totalAmount || 0) * 0.05)}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-[#113826] border-t border-gray-200 pt-2">
              <span>Grand Total:</span>
              <span>₹{order?.totalAmount || 0}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center border-t border-gray-100 pt-6 text-[11px] text-gray-400">
          <p className="font-semibold text-gray-600">Thank you for choosing Gawdee for pure natural living.</p>
          <p>This is a computer generated tax invoice and does not require a physical signature.</p>
        </div>
      </div>
    </div>
  );
}

export default InvoiceView;
