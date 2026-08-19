import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, Tag, ShoppingBag, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { ApiGet, ApiPost } from '@/helper/axios';
import { updateGuestCartQty, removeItemFromGuestCart } from '@/utils/cartStorage';

const removeCartItemApi = async (payload) => {
  const res = await ApiPost("/cart/remove-item", payload);
  return res?.data?.data || res?.data;
};

const updateCartItemQtyApi = async (payload) => {
  const res = await ApiPost("/cart/update-item-qty", payload);
  return res?.data?.data || res?.data;
};

const getCouponsApi = async () => {
  try {
    const res = await ApiGet(`/admin/coupon`);
    return res?.coupon || res?.data?.data || res?.coupons || res?.data || [];
  } catch {
    return [];
  }
};

const applyCouponApi = async (couponCode, cartItems = []) => {
  const firstItem = cartItems?.[0];
  const productId = firstItem?.productId?._id || firstItem?.productId || "";
  const categoryId = firstItem?.categoryId?._id || firstItem?.categoryId || "";

  const res = await ApiPost(`/apply`, {
    couponCode: couponCode?.toUpperCase(),
    productId,
    categoryId,
  });

  return res?.data?.data || res?.data || res;
};

export default function CartDrawer({
  isOpen,
  onClose,
  cartData,
  onProceedToCheckout,
}) {
  const [cart, setCart] = useState([]);
  const [couponInput, setCouponInput] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const isGuestCart = cartData?._id === "guest-cart" || cartData?.id === "guest-cart";

  useEffect(() => {
    if (!cartData) {
      setCart([]);
      setAppliedCoupon(null);
      setCouponInput("");
      setCouponError("");
      return;
    }

    const finalItems = Array.isArray(cartData) ? cartData : cartData?.items || [];

    const normalizedItems = finalItems.map((item) => {
      const sellingPrice = Number(
        item?.price || item?.salePrice || item?.productId?.salePrice || 0
      );
      const originalPrice = Number(
        item?.originalPrice ||
          item?.mrp ||
          item?.productId?.originalPrice ||
          item?.productId?.mrp ||
          item?.productId?.price ||
          sellingPrice
      );

      return {
        ...item,
        price: sellingPrice,
        mrp: originalPrice,
        originalPrice,
        discountAmount: Math.max(originalPrice - sellingPrice, 0),
      };
    });

    setCart(normalizedItems);
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  }, [cartData]);

  useEffect(() => {
    if (isOpen) {
      fetchCoupons();
    }
  }, [isOpen]);

  const fetchCoupons = async () => {
    try {
      setCouponLoading(true);
      const data = await getCouponsApi();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const activeCoupons = Array.isArray(data)
        ? data.filter((item) => {
            if (!item?.couponCode) return false;
            const startDate = item?.startDate ? new Date(item.startDate) : null;
            const endDate = item?.endDate ? new Date(item.endDate) : null;
            if (startDate) startDate.setHours(0, 0, 0, 0);
            if (endDate) endDate.setHours(23, 59, 59, 999);
            const isStarted = !startDate || startDate <= today;
            const isNotExpired = !endDate || endDate >= today;
            return item?.isActive !== false && item?.showOnWebsite === true && isStarted && isNotExpired;
          })
        : [];

      setCoupons(activeCoupons);
    } catch {
      setCoupons([]);
    } finally {
      setCouponLoading(false);
    }
  };

  const getItemQty = (item) => Number(item?.quantity || item?.qty || 1);
  const getItemPrice = (item) => Number(item?.price || item?.salePrice || item?.productId?.salePrice || item?.productId?.price || 0);
  const getItemMrp = (item) => Number(item?.originalPrice || item?.mrp || item?.productId?.originalPrice || item?.productId?.mrp || item?.productId?.price || item?.price || 0);
  const getItemName = (item) => item?.name || item?.productName || item?.productId?.name || "Gawdee Product";
  const getItemImage = (item) => item?.image || item?.selectedColorImage || item?.productId?.images?.[0] || item?.productId?.productImages?.[0] || "";

  const updateQty = async (item, type) => {
    const currentQty = getItemQty(item);
    const newQty = type === "inc" ? currentQty + 1 : Math.max(currentQty - 1, 1);

    if (isGuestCart) {
      const guestCart = updateGuestCartQty(item, newQty);
      setCart(guestCart?.items || []);
      return;
    }

    try {
      const payload = {
        cartId: cartData?._id,
        cartItemId: item?.cartItemId,
        productId: item?.productId,
        selectedColor: item?.selectedColor || item?.variant || "",
        quantity: newQty,
      };
      await updateCartItemQtyApi(payload);
      setCart((prev) =>
        prev.map((cartItem) => {
          const isSameItem = payload.cartItemId
            ? cartItem.cartItemId === payload.cartItemId
            : cartItem.productId === payload.productId;
          return isSameItem ? { ...cartItem, quantity: newQty, qty: newQty } : cartItem;
        })
      );
    } catch (err) {
      console.error("Update cart qty error:", err);
    }
  };

  const removeItem = async (item) => {
    if (isGuestCart) {
      const guestCart = removeItemFromGuestCart(item);
      setCart(guestCart?.items || []);
      return;
    }

    try {
      const payload = {
        cartId: cartData?._id,
        cartItemId: item?.cartItemId,
        productId: item?.productId,
        selectedColor: item?.selectedColor || item?.variant || "",
      };
      await removeCartItemApi(payload);
      setCart((prev) => prev.filter((cartItem) => cartItem.cartItemId !== payload.cartItemId));
    } catch (err) {
      console.error("Remove item error:", err);
    }
  };

  const originalSubtotal = cart.reduce((acc, item) => acc + getItemMrp(item) * getItemQty(item), 0);
  const subtotal = cart.reduce((acc, item) => acc + getItemPrice(item) * getItemQty(item), 0);
  const productDiscount = Math.max(originalSubtotal - subtotal, 0);

  const calculateCouponDiscount = (selectedCoupon) => {
    if (!selectedCoupon) return 0;
    const amount = Number(selectedCoupon.amount || 0);
    if (selectedCoupon.amountType === "percentage") {
      return Math.round((subtotal * amount) / 100);
    }
    return amount;
  };

  const couponDiscount = calculateCouponDiscount(appliedCoupon);
  const discount = productDiscount + couponDiscount;
  const total = Math.max(originalSubtotal - discount, 0);

  const handleApplyCoupon = async (selectedCouponCode = couponInput) => {
    try {
      setCouponError("");
      const finalCode = selectedCouponCode?.trim()?.toUpperCase();
      if (!finalCode) {
        setCouponError("Please enter coupon code");
        return;
      }

      const visibleMatchedCoupon = coupons.find(
        (item) => item?.couponCode?.toLowerCase() === finalCode.toLowerCase()
      );

      if (visibleMatchedCoupon) {
        setCouponInput(visibleMatchedCoupon.couponCode);
        setAppliedCoupon(visibleMatchedCoupon);
        return;
      }

      const manualRes = await applyCouponApi(finalCode, cart);
      const manualCoupon = manualRes?.coupon || manualRes?.data?.coupon || manualRes?.data;
      if (!manualCoupon || !manualCoupon?.couponCode) {
        setAppliedCoupon(null);
        setCouponError("Invalid coupon code");
        return;
      }

      setCouponInput(manualCoupon.couponCode);
      setAppliedCoupon(manualCoupon);
    } catch (error) {
      setAppliedCoupon(null);
      setCouponError("Invalid coupon code");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const checkoutData = {
      cart: cartData,
      cartId: cartData?._id || cartData?.id || null,
      isGuestCart,
      items: cart.map((item) => ({
        ...item,
        price: getItemPrice(item),
        mrp: getItemMrp(item),
        originalPrice: getItemMrp(item),
      })),
      originalSubtotal,
      subtotal,
      productDiscount,
      couponDiscount,
      discount,
      total,
      coupon: appliedCoupon
        ? {
            id: appliedCoupon._id || appliedCoupon.id,
            name: appliedCoupon.name,
            couponCode: appliedCoupon.couponCode,
            amountType: appliedCoupon.amountType,
            amount: appliedCoupon.amount,
          }
        : null,
    };

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    if (checkoutData.cartId) {
      localStorage.setItem("cartId", checkoutData.cartId);
    }

    if (onProceedToCheckout) {
      onProceedToCheckout(checkoutData);
      return;
    }

    onClose?.();
    window.location.href = "/checkout";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[45000] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-[#113826] text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                  <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold font-serif">Your Cart</h2>
                  <p className="text-xs text-white/70">
                    {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Selected
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-[#113826]/5 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-[#113826]" />
                  </div>
                  <h3 className="text-lg font-bold font-serif text-[#1C2421]">Your cart is empty</h3>
                  <p className="text-xs text-gray-500 max-w-xs mt-1 mb-6">
                    Explore Gawdee's range of pure A2 Ghee, natural forest honey, and wellness essentials.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-[#113826] hover:bg-[#1b4d3e] text-white font-semibold rounded-xl text-xs tracking-wider uppercase transition-all shadow-md"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => {
                  const price = getItemPrice(item);
                  const mrp = getItemMrp(item);
                  const qty = getItemQty(item);

                  return (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center p-2 overflow-hidden border border-gray-100 flex-shrink-0">
                        {getItemImage(item) ? (
                          <img
                            src={getItemImage(item)}
                            alt={getItemName(item)}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <ShoppingBag className="w-8 h-8 text-gray-300" />
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-[#1C2421] line-clamp-2">
                              {getItemName(item)}
                            </h4>
                            <button
                              onClick={() => removeItem(item)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {item.variant && (
                            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                              Variant: {item.variant}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-extrabold text-[#113826]">
                              ₹{price * qty}
                            </span>
                            {mrp > price && (
                              <span className="text-xs text-gray-400 line-through">
                                ₹{mrp * qty}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                            <button
                              onClick={() => updateQty(item, "dec")}
                              className="p-1 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-[#1C2421]">
                              {qty}
                            </span>
                            <button
                              onClick={() => updateQty(item, "inc")}
                              className="p-1 text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100 shadow-lg space-y-4">
                {/* Coupon Input */}
                <div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Coupon Code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-xl focus:border-[#113826] focus:outline-none uppercase font-bold"
                      />
                    </div>
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="px-4 py-2 bg-[#113826] text-white text-xs font-semibold rounded-xl hover:bg-[#1b4d3e] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Coupon '{appliedCoupon.couponCode}' Applied (-₹{couponDiscount})
                    </p>
                  )}
                  {couponError && (
                    <p className="text-xs text-red-500 font-medium mt-1">{couponError}</p>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1C2421]">₹{originalSubtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Total Savings</span>
                      <span className="font-semibold">-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-extrabold text-[#113826] pt-2 border-t border-gray-100">
                    <span>Grand Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#113826] hover:bg-[#1b4d3e] text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
