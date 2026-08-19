import React, { useEffect, useState } from 'react';
import { ApiGet } from '@/helper/axios';
import ProductCard from '../common/ProductCard';
import { ProductSkeleton } from '../ui/Skeleton';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNew = async () => {
      try {
        setLoading(true);
        const res = await ApiGet('/admin/product');
        const list = res?.product || res?.products || res?.data?.product || res?.data || [];
        setProducts(Array.isArray(list) ? list.slice().reverse().slice(0, 4) : []);
      } catch (err) {
        console.error('New products error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNew();
  }, []);

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 text-center sm:text-left gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              New Arrivals
            </span>
            <h2 className="text-3xl font-extrabold font-serif text-[#1C2421] mt-1">
              Fresh From Our Farm & Kitchen
            </h2>
          </div>
          <Link
            to="/all-products"
            className="text-xs font-bold uppercase tracking-wider text-[#113826] hover:text-[#1b4d3e] flex items-center gap-1.5 group"
          >
            Browse All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod, idx) => (
              <ProductCard key={prod._id || idx} product={prod} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
