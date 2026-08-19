import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import { ApiGet } from '@/helper/axios';
import { Meta } from '@/component/common/Meta';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        const res = await ApiGet(`/admin/blog/${slug}`);
        setBlog(res?.blog || res?.data || res);
      } catch (err) {
        console.error("Fetch blog detail error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <Header />
        <div className="max-w-3xl mx-auto py-20 text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#113826] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-500">Loading blog article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const title = blog?.title || "Natural Health & Vedic Bilona Ghee";
  const img = blog?.image?.url || blog?.image || blog?.featuredImage || "/vite.svg";
  const content = blog?.content || blog?.description || "Gawdee's commitment to unadulterated food essentials ensures that every spoon of A2 Ghee delivers maximum health benefits.";

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta title={`${title} | Gawdee Wellness Blog`} />
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <Link to="/blogs" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#113826] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              {blog?.category || "Natural Health"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#113826]">
              {title}
            </h1>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 justify-center sm:justify-start pt-2">
              <Calendar className="w-4 h-4 text-[#113826]" /> Published on {new Date(blog?.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>

          <div className="w-full h-80 bg-gray-100 rounded-2xl overflow-hidden">
            <img src={img} alt={title} className="w-full h-full object-cover" onError={(e) => { e.target.src = "/vite.svg"; }} />
          </div>

          <div className="prose max-w-none text-sm text-gray-700 leading-relaxed space-y-4 font-light pt-4 border-t border-gray-100">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
