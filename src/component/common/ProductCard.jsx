import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { addItemToGuestCart } from '@/utils/cartStorage';
import { ApiPost } from '@/helper/axios';
import { getProductThumb } from '@/utils/media';

export default function ProductCard({ product, onAddToCartSuccess }) {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const id = product._id || product.id;
  const name = product.name || product.title || "Gawdee Product";
  const slug = product.slug || id;
  const price = Number(product.salePrice || product.sellingPrice || product.price || 0);
  const mrp = Number(product.price || product.originalPrice || product.mrp || price);
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const image = getProductThumb(product) || product.images?.[0] || product.image || "/vite.svg";
  const rating = product.rating || 5;
  const reviewsCount = product.reviewsCount || product.reviews?.length || 24;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsAdding(true);
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const userId = localStorage.getItem("userId");

      const cartItem = {
        productId: id,
        name,
        slug,
        image,
        price,
        mrp,
        quantity: 1,
        qty: 1,
        selectedColor: product.selectedColor || product.variant || null,
      };

      if (isLoggedIn && userId) {
        await ApiPost("/cart", {
          userId,
          items: [{
            productId: id,
            quantity: 1,
            selectedColor: cartItem.selectedColor,
            selectedColorImage: image,
          }],
        });
        window.dispatchEvent(new CustomEvent("cart-updated"));
      } else {
        addItemToGuestCart(cartItem);
      }

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);

      if (onAddToCartSuccess) {
        onAddToCartSuccess(cartItem);
      }
    } catch (err) {
      console.error("Add to cart error:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-[#FAF8F5] p-6 overflow-hidden flex items-center justify-center">
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-[#D4AF37] text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-sm">
            {discountPercent}% OFF
          </span>
        )}
        <span className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-[#113826]/10 text-[#113826] text-[10px] font-bold rounded-lg border border-[#113826]/20">
          100% Pure
        </span>

        <Link to={`/product/${slug}`} className="w-full h-full flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-[11px] text-gray-400 font-medium">({reviewsCount})</span>
          </div>

          <Link to={`/product/${slug}`}>
            <h3 className="text-sm font-bold text-[#1C2421] group-hover:text-[#113826] transition-colors line-clamp-2 leading-snug">
              {name}
            </h3>
          </Link>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-[#113826]">
                ₹{price}
              </span>
              {mrp > price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{mrp}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-600 font-semibold">Taxes included</p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#113826] hover:bg-[#1b4d3e] text-white'
            }`}
          >
            {added ? (
              <>
                <CheckCircle className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
