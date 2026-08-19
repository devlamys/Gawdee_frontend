import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { ApiGet } from '@/helper/axios';
import { Meta } from '@/component/common/Meta';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await ApiGet('/admin/blogs');
        const list = res?.blog || res?.blogs || res?.data || [];
        setBlogs(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error('Fetch blogs error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta title="Gawdee Wellness Blog | Natural Living & A2 Ghee" />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            Gawdee Journal
          </span>
          <h1 className="text-4xl font-extrabold font-serif text-[#113826]">
            Natural Wellness & Healthy Living
          </h1>
          <p className="text-xs text-gray-600 font-light">
            Insights on ethical farming, ancient Bilona methods, and daily health recipes.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => {
              const slug = blog.slug || blog._id || idx;
              const img = blog.image?.url || blog.image || blog.featuredImage || "/vite.svg";
              return (
                <div
                  key={blog._id || idx}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={img}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = "/vite.svg"; }}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                        {blog.category || "Wellness"}
                      </span>
                      <h3 className="text-base font-bold font-serif text-[#1C2421] mt-1 line-clamp-2">
                        {blog.title || "The Secret of A2 Gir Cow Ghee"}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#113826]" /> {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                      <Link
                        to={`/blog-details/${slug}`}
                        className="font-bold text-[#113826] hover:underline flex items-center gap-1"
                      >
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
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
