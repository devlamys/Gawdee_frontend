import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiGet } from '@/helper/axios';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true);
        const res = await ApiGet('/admin/categories');
        setCategories(res?.category || res?.data?.category || []);
      } catch (err) {
        console.error('Categories fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  const getSlug = (name) => {
    return name?.toLowerCase().trim().replace(/&/g, 'and').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  };

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 text-center sm:text-left gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Explore Collections
            </span>
            <h2 className="text-3xl font-extrabold font-serif text-[#1C2421] mt-1">
              Pure Natural Essentials
            </h2>
          </div>
          <Link
            to="/all-products"
            className="text-xs font-bold uppercase tracking-wider text-[#113826] hover:text-[#1b4d3e] flex items-center gap-1.5 group"
          >
            View All Categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => {
              const slug = getSlug(cat.name);
              const imgUrl = cat.image?.url || cat.image || cat.img || "/vite.svg";

              return (
                <Link
                  key={cat._id || idx}
                  to={`/products/${slug}`}
                  className="group relative bg-[#FAF8F5] rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div className="w-full h-40 flex items-center justify-center p-2 mb-4">
                    <img
                      src={imgUrl}
                      alt={cat.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/vite.svg";
                      }}
                    />
                  </div>
                  <div className="text-center pt-2 border-t border-gray-200/50">
                    <h3 className="text-sm font-bold font-serif text-[#1C2421] group-hover:text-[#113826] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] text-gray-500 font-medium inline-flex items-center gap-1 mt-1 group-hover:underline">
                      Explore Range <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
