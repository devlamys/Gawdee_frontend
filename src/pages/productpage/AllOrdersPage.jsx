import React, { useEffect, useState } from 'react';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { ApiGet } from '@/helper/axios';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { Badge } from '@/component/ui/Badge';

export default function AllOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        const res = await ApiGet('/order/user/all');
        const list = res?.orders || res?.data || res || [];
        setOrders(Array.isArray(list) ? list : []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <h1 className="text-3xl font-extrabold font-serif text-[#113826]">All Account Orders</h1>

        {loading ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-gray-100">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#113826] rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-gray-500">Loading order records...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-gray-100">
            <p className="text-xs text-gray-500">No orders recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order, idx) => (
              <div key={order._id || idx} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#113826]">Order #{order._id}</p>
                  <p className="text-gray-500">{new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>{order.status || 'Placed'}</Badge>
                  <span className="font-bold">₹{order.totalAmount || 0}</span>
                  <Link to={`/my-orders/order-details/${order._id}`} className="text-[#113826] font-bold">
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
