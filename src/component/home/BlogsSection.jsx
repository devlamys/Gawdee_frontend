import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiGet } from '@/helper/axios';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function BlogsSection() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await ApiGet('/admin/blogs');
        const list = res?.blog || res?.blogs || res?.data || [];
        setBlogs(Array.isArray(list) ? list.slice(0, 3) : []);
      } catch {
        setBlogs([]);
      }
    };
    fetchBlogs();
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 text-center sm:text-left gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Wellness Journal
            </span>
            <h2 className="text-3xl font-extrabold font-serif text-[#1C2421] mt-1">
              Articles on Natural Living & Ayurveda
            </h2>
          </div>
          <Link
            to="/blogs"
            className="text-xs font-bold uppercase tracking-wider text-[#113826] hover:text-[#1b4d3e] flex items-center gap-1.5 group"
          >
            Read All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

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
                      {blog.category || "Ayurvedic Health"}
                    </span>
                    <h3 className="text-base font-bold font-serif text-[#1C2421] mt-1 line-clamp-2">
                      {blog.title || "The Benefits of A2 Gir Cow Ghee"}
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
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
