import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import ProductCard from '@/component/common/ProductCard';
import { ProductSkeleton } from '@/component/ui/Skeleton';
import { ApiGet } from '@/helper/axios';
import { Meta } from '@/component/common/Meta';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

export default function DesiGheeProduct() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryTitle = (s) => {
    if (s?.includes('ghee')) return 'A2 Gir Cow Desi Ghee';
    if (s?.includes('honey')) return 'Raw Forest Honey';
    if (s?.includes('drops')) return 'Taral Ayurvedic Drops';
    if (s?.includes('mix-me')) return 'Mix Me Family Nutrition';
    return 'Gawdee Natural Products';
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await ApiGet('/admin/product');
        const list = res?.product || res?.products || res?.data || [];

        const filtered = list.filter((item) => {
          const itemCat = (item.category || item.categoryId?.name || '').toLowerCase();
          const itemSlug = (item.slug || '').toLowerCase();
          const matchSlug = slug?.toLowerCase() || '';

          return itemCat.includes(matchSlug) || itemSlug.includes(matchSlug) || matchSlug.includes(itemCat);
        });

        setProducts(filtered.length > 0 ? filtered : list);
      } catch (err) {
        console.error('Category product fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  const catTitle = getCategoryTitle(slug);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta
        title={`${catTitle} | Gawdee Traditional Indian Essentials`}
        description={`Explore Gawdee's authentic ${catTitle} collection prepared with ethical Vedic standards.`}
      />
      <Header />

      {/* Category Hero Banner */}
      <section className="bg-[#113826] text-white py-16 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Gawdee Specialty
          </span>
          <h1 className="text-4xl font-extrabold font-serif text-white">{catTitle}</h1>
          <p className="text-sm text-white/80 max-w-xl mx-auto font-light">
            Pure, unadulterated, and laboratory certified for maximum natural wellness.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      </main>

      <Footer />
    </div>
  );
}
