import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/component/layout/Header';
import Footer from '@/component/layout/Footer';
import ProductCard from '@/component/common/ProductCard';
import { ApiGet, ApiPost } from '@/helper/axios';
import { addItemToGuestCart } from '@/utils/cartStorage';
import { Star, ShieldCheck, Truck, RotateCcw, Plus, Minus, ShoppingBag, CheckCircle, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Meta } from '@/component/common/Meta';
import { extractProductsList, normalizeProduct } from '@/utils/productHelper';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        let prodData = null;
        try {
          const res = await ApiGet(`/product/${slug}`);
          prodData = res?.product || res?.data || res;
        } catch {
          try {
            const res = await ApiGet(`/admin/product/${slug}`);
            prodData = res?.product || res?.data || res;
          } catch {
            const allRes = await ApiGet('/admin/products');
            const allList = extractProductsList(allRes);
            prodData = allList.find((p) => p.slug === slug || p._id === slug);
          }
        }

        const normalized = normalizeProduct(prodData);
        setProduct(normalized);

        const imgList = normalized?.images && normalized.images.length > 0
          ? normalized.images.slice(0, 12)
          : ["/imges/productDetails/newIdea/1.png"];

        setSelectedImg(imgList[0] || "/imges/productDetails/newIdea/1.png");

        if (normalized?.variants && normalized.variants.length > 0) {
          setSelectedVariant(normalized.variants[0]);
        }

        // Fetch related
        let allRes;
        try {
          allRes = await ApiGet('/admin/products');
        } catch {
          allRes = await ApiGet('/products');
        }
        const allList = extractProductsList(allRes).map(normalizeProduct);
        setRelatedProducts(allList.filter((p) => p.slug !== slug && p._id !== slug).slice(0, 4));
      } catch (err) {
        console.error('Fetch product detail error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#113826] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-gray-600">Loading pure product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <Header />
        <div className="max-w-md mx-auto my-20 bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold font-serif text-[#1C2421]">Product Not Found</h2>
          <p className="text-xs text-gray-500 mt-2 mb-6">The requested Gawdee product could not be loaded.</p>
          <Link to="/all-products" className="px-6 py-3 bg-[#113826] text-white text-xs font-bold rounded-xl">
            Back to Store
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const name = product.name || product.title || "Gawdee Product";
  const price = Number(selectedVariant?.price || product.salePrice || product.sellingPrice || product.price || 0);
  const mrp = Number(selectedVariant?.mrp || product.price || product.originalPrice || product.mrp || price);
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const images = (product.images && product.images.length > 0 ? product.images : ["/imges/productDetails/newIdea/1.png"]).slice(0, 12);

  const currentImgIdx = images.indexOf(selectedImg) !== -1 ? images.indexOf(selectedImg) : 0;

  const handlePrevImg = () => {
    const prevIdx = (currentImgIdx - 1 + images.length) % images.length;
    setSelectedImg(images[prevIdx]);
  };

  const handleNextImg = () => {
    const nextIdx = (currentImgIdx + 1) % images.length;
    setSelectedImg(images[nextIdx]);
  };

  const handleAddToCart = async (isBuyNow = false) => {
    try {
      setIsAdding(true);
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const userId = localStorage.getItem("userId");

      const cartItem = {
        productId: product._id || product.id,
        name,
        slug,
        image: selectedImg || images[0],
        price,
        mrp,
        quantity,
        qty: quantity,
        variant: selectedVariant?.name || null,
        selectedColor: selectedVariant?.name || null,
      };

      if (isLoggedIn && userId) {
        await ApiPost("/cart", {
          userId,
          items: [{
            productId: product._id || product.id,
            quantity,
            selectedColor: cartItem.selectedColor,
            selectedColorImage: cartItem.image,
          }],
        });
        window.dispatchEvent(new CustomEvent("cart-updated"));
      } else {
        addItemToGuestCart(cartItem);
      }

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);

      if (isBuyNow) {
        navigate('/checkout');
      }
    } catch (err) {
      console.error('Add to cart error:', err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2421]">
      <Meta
        title={`${name} | Gawdee Organic Farm Products`}
        description={product.description || `Buy 100% pure ${name} crafted with traditional Bilona method.`}
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link to="/all-products" className="hover:underline">Products</Link>
          <span>/</span>
          <span className="font-bold text-[#113826]">{name}</span>
        </div>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          {/* Gallery Column (Supports up to 12 images) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="w-full aspect-square bg-[#FAF8F5] rounded-2xl p-4 sm:p-8 flex items-center justify-center border border-gray-100 overflow-hidden relative group">
              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#D4AF37] text-white text-xs font-black rounded-xl uppercase tracking-wider z-10">
                  {discountPercent}% OFF
                </span>
              )}
              <img
                src={selectedImg}
                alt={name}
                className="w-full h-full object-contain max-h-[500px] transition-transform duration-300 group-hover:scale-105"
              />

              {/* Carousel Next / Prev Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#113826] hover:text-white transition-colors z-10"
                    title="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-[#113826] hover:text-white transition-colors z-10"
                    title="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Interactive Thumbnail Row (Supports up to 12 images) */}
            {images.length > 1 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 px-1">
                  <span>Product Gallery ({currentImgIdx + 1}/{images.length})</span>
                  <span>Max 12 Images</span>
                </div>
                <div className="flex gap-2.5 overflow-x-auto pb-2.5 scrollbar-thin">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(img)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FAF8F5] p-2 border transition-all flex-shrink-0 relative overflow-hidden ${
                        selectedImg === img
                          ? 'border-[#113826] ring-2 ring-[#113826]/20 bg-white'
                          : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Purchase Column */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-3 py-1 bg-[#113826]/10 text-[#113826] text-xs font-bold rounded-full border border-[#113826]/20">
                100% Traditional Bilona Craftsmanship
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#1C2421]">
                {name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">4.9</span>
                <span className="text-xs text-gray-400">(180 Verified Buyer Reviews)</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-black text-[#113826]">
                  ₹{price * quantity}
                </span>
                {mrp > price && (
                  <span className="text-base text-gray-400 line-through">
                    ₹{mrp * quantity}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Save ₹{(mrp - price) * quantity}
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed font-light">
                {product.description || "Crafted using traditional Indian methods, preserving natural nutrients, unpasteurized goodness, and aromatic richness."}
              </p>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Select Size / Package:
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedVariant?.name === variant.name
                            ? 'bg-[#113826] text-white border-[#113826] shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {variant.name} - ₹{variant.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="px-5 font-bold text-sm text-[#1C2421]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleAddToCart(false)}
                  disabled={isAdding}
                  className="w-full py-4 bg-[#FAF8F5] hover:bg-[#F2EDE4] text-[#113826] border border-[#113826] font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  {addedToCart ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <ShoppingBag className="w-5 h-5" />}
                  {addedToCart ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => handleAddToCart(true)}
                  disabled={isAdding}
                  className="w-full py-4 bg-[#113826] hover:bg-[#1b4d3e] text-white font-bold text-sm rounded-2xl transition-all shadow-md hover:shadow-lg"
                >
                  Buy Now
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-gray-600 bg-[#FAF8F5] p-3 rounded-2xl border border-gray-100">
                <span className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#113826]" /> 100% Pure
                </span>
                <span className="flex items-center justify-center gap-1">
                  <Truck className="w-4 h-4 text-[#113826]" /> Fast Shipping
                </span>
                <span className="flex items-center justify-center gap-1">
                  <Award className="w-4 h-4 text-[#D4AF37]" /> Lab Certified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h3 className="text-2xl font-bold font-serif text-[#113826] mb-8">
              You May Also Like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProd, idx) => (
                <ProductCard key={relProd._id || idx} product={relProd} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
