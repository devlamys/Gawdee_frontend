import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, ArrowRight, Award, ShoppingBag } from 'lucide-react';
import { ApiGet } from '@/helper/axios';
import { getProductThumb } from '@/utils/media';
import { extractProductsList, normalizeProduct } from '@/utils/productHelper';

export default function HeroSection() {
  const [featuredProduct, setFeaturedProduct] = useState(null);

  useEffect(() => {
    const fetchHeroProduct = async () => {
      try {
        let res;
        try {
          res = await ApiGet('/admin/products');
        } catch {
          res = await ApiGet('/products');
        }
        const rawList = extractProductsList(res);
        if (rawList.length > 0) {
          setFeaturedProduct(normalizeProduct(rawList[0]));
        }
      } catch (err) {
        console.error('Hero product fetch error:', err);
      }
    };
    fetchHeroProduct();
  }, []);

  const name = featuredProduct?.name || featuredProduct?.title || "A2 Gir Cow Desi Ghee";
  const price = Number(featuredProduct?.salePrice || featuredProduct?.price || 999);
  const mrp = Number(featuredProduct?.originalPrice || featuredProduct?.mrp || 1299);
  const image = featuredProduct ? getProductThumb(featuredProduct) : "";
  const slug = featuredProduct?.slug || featuredProduct?._id || "desi-ghee";

  return (
    <section className="relative bg-[#FAF8F5] pt-12 pb-20 overflow-hidden border-b border-gray-100">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#113826]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#113826]/10 text-[#113826] border border-[#113826]/20 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              TRADITIONAL BILONA METHOD A2 GHEE
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-[#1C2421] leading-tight tracking-tight">
              Purity & Heritage in Every Single Spoon.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Crafted from the milk of ethically raised Gir cows using ancient Indian Vedic Bilona craftsmanship. 100% Natural, raw, unadulterated food essentials for your family.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/all-products"
                className="w-full sm:w-auto px-8 py-4 bg-[#113826] hover:bg-[#1b4d3e] text-white font-bold text-sm rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                Shop Pure A2 Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about-us"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-[#113826] border border-gray-200 font-bold text-sm rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Our Bilona Process
              </Link>
            </div>

            {/* Badges */}
            <div className="pt-6 border-t border-gray-200/60 flex items-center justify-center lg:justify-start gap-8 text-xs font-semibold text-gray-600">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#113826]" /> Lab Tested Purity
              </span>
              <span className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4AF37]" /> Vedic Craftsmanship
              </span>
            </div>
          </motion.div>

          {/* Hero Visual Card Showcase (Dynamic Product from Local Database) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl bg-white p-8 shadow-2xl border border-gray-100 overflow-hidden text-center space-y-6">
              <div className="absolute top-0 right-0 bg-[#D4AF37] text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-bl-2xl shadow-sm">
                Featured Flagship
              </div>

              <div className="w-56 h-56 mx-auto bg-[#FAF8F5] rounded-2xl flex items-center justify-center p-4">
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <ShoppingBag className="w-20 h-20 text-[#113826]/30" />
                )}
              </div>

              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">100% Pure Organic</span>
                <h3 className="text-xl font-bold font-serif text-[#113826] mt-1 line-clamp-1">{name}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {featuredProduct?.description || "Aromatic, Granular (Danedar) & Rich in Nutrients"}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-left">
                  {mrp > price && (
                    <span className="text-xs text-gray-400 line-through">₹{mrp}</span>
                  )}
                  <p className="text-xl font-extrabold text-[#113826]">₹{price}</p>
                </div>
                <Link
                  to={featuredProduct ? `/product/${slug}` : '/all-products'}
                  className="px-6 py-3 bg-[#113826] text-white text-xs font-bold rounded-xl hover:bg-[#1b4d3e] transition-colors shadow-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
