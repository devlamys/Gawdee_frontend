import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { ApiGet } from '@/helper/axios';
import { Package, ChevronRight, FileText, RotateCcw, Clock, AlertCircle } from 'lucide-react';
import { Meta } from '@/component/common/Meta';
import { Badge } from '@/component/ui/Badge';

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await ApiGet(`/order/user/${userId}`);
        const list = res?.orders || res?.data?.orders || res?.data || [];
        setOrders(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Fetch orders error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta title="My Orders | Gawdee Organic Farm Products" />
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold font-serif text-[#113826]">My Orders</h1>
            <p className="text-xs text-gray-500 mt-1">Track your Gawdee purchases & view order history</p>
          </div>
          <Link to="/all-products" className="px-4 py-2 bg-[#113826] text-white text-xs font-bold rounded-xl">
            Shop More
          </Link>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-3">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#113826] rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-gray-500">Fetching order history...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-[#113826]/10 text-[#113826] rounded-2xl flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold font-serif text-[#1C2421]">No Orders Yet</h3>
            <p className="text-xs text-gray-500">
              You haven't placed any orders with Gawdee yet. Start exploring our pure A2 Ghee and wellness range.
            </p>
            <Link to="/all-products" className="inline-block px-6 py-3 bg-[#113826] text-white font-bold rounded-xl text-xs">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => {
              const orderId = order._id || order.id || `GW-${idx}`;
              const status = order.status || order.orderStatus || "Processing";
              const items = order.items || [];
              const totalAmount = order.totalAmount || order.total || 0;
              const dateStr = new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <div
                  key={orderId}
                  className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Order ID</span>
                      <h3 className="text-sm font-bold font-mono text-[#113826]">{orderId}</h3>
                      <p className="text-[11px] text-gray-500">Placed on {dateStr}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant={status.toLowerCase() === 'delivered' ? 'success' : 'primary'}>
                        {status}
                      </Badge>
                      <span className="text-base font-extrabold text-[#113826]">₹{totalAmount}</span>
                    </div>
                  </div>

                  {/* Order Items Snippet */}
                  <div className="flex items-center gap-3 overflow-x-auto py-1">
                    {items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-2 flex-shrink-0 bg-[#FAF8F5] p-2 rounded-xl border border-gray-100 text-xs">
                        <img src={item.image || "/vite.svg"} alt="Product" className="w-8 h-8 object-contain" />
                        <div>
                          <p className="font-bold text-[#1C2421] line-clamp-1">{item.name || "Gawdee Item"}</p>
                          <span className="text-[10px] text-gray-500">Qty: {item.quantity || item.qty || 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100 text-xs">
                    <Link
                      to={`/my-orders/order-details/${orderId}`}
                      className="font-bold text-[#113826] hover:underline flex items-center gap-1"
                    >
                      View Order Details <ChevronRight className="w-4 h-4" />
                    </Link>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/my-orders/invoice/${orderId}`}
                        className="text-gray-600 hover:text-[#113826] font-semibold flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> Invoice
                      </Link>
                      {status.toLowerCase() !== 'delivered' && status.toLowerCase() !== 'cancelled' && (
                        <Link
                          to={`/my-orders/cancel/${orderId}`}
                          className="text-red-500 hover:text-red-700 font-semibold"
                        >
                          Cancel Order
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
