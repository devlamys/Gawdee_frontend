import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, User, LogOut, Menu, X, ChevronDown, Package, Sparkles } from 'lucide-react';
import { LoginModal } from '../LoginModal';
import LogoutModal from '../LogoutModal';
import CartDrawer from '../OrderProcess/CartDrawer';
import { ApiGet, ApiPost } from '@/helper/axios';
import { getGuestCart, clearGuestCart } from '@/utils/cartStorage';

const getCartApi = async (userId) => {
  const res = await ApiGet(`/cart/${userId}`);
  return res?.data?.data || res?.data || res;
};

const addToCartApi = async (payload) => {
  const res = await ApiPost("/cart", payload);
  return res?.data?.data || res?.data;
};

const normalizeCartItems = (items = []) => {
  return items.map((item) => ({
    cartItemId: item.cartItemId || item._id || `${item.productId}-${item.selectedColor || "default"}`,
    productId: item.productId?._id || item.productId,
    name: item.name || item.productName || item.productId?.name || item.productId?.title || "Product",
    selectedColor: item.selectedColor || item.variant || null,
    variant: item.variant || item.selectedColor || null,
    image: item.image || item.selectedColorImage || item.productId?.images?.[0] || item.productId?.productImages?.[0] || "",
    price: Number(item.price || item.salePrice || item.productId?.salePrice || item.productId?.price || 0),
    mrp: Number(item.mrp || item.originalPrice || item.productId?.price || item.price || 0),
    quantity: Number(item.quantity || item.qty || 1),
    qty: Number(item.qty || item.quantity || 1),
    slug: item.slug || item.productId?.slug || "",
  }));
};

const buildCartObject = (items = [], cartId = "guest-cart") => {
  const formattedItems = normalizeCartItems(items);
  const subtotal = formattedItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || item.qty || 1),
    0
  );
  return { _id: cartId, items: formattedItems, subtotal, total: subtotal };
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);

  const [cartData, setCartData] = useState(() => {
    if (typeof window === "undefined") return { _id: "guest-cart", items: [], subtotal: 0, total: 0 };
    return buildCartObject(getGuestCart(), "guest-cart");
  });

  const [cartCount, setCartCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    return getGuestCart().reduce((acc, item) => acc + Number(item.quantity || item.qty || 1), 0);
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await ApiGet("/admin/categories");
        setCategories(res?.category || []);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const syncCart = async (event) => {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      const userId = localStorage.getItem("userId");
      setIsLoggedIn(loginStatus);

      if (loginStatus && userId) {
        await mergeGuestCartToUserCart(userId);
        const finalCart = await fetchCart();
        setCartData(finalCart);
        setCartCount((finalCart?.items || []).reduce((acc, i) => acc + Number(i.quantity || i.qty || 1), 0));
        return;
      }

      const eventItems = event?.type === "guest-cart-updated" && Array.isArray(event?.detail?.items)
        ? event.detail.items
        : null;

      const guestCart = eventItems ? buildCartObject(eventItems, "guest-cart") : buildCartObject(getGuestCart(), "guest-cart");
      setCartData(guestCart);
      setCartCount(guestCart.items.reduce((acc, i) => acc + Number(i.quantity || i.qty || 1), 0));
    };

    syncCart();
    window.addEventListener("storage", syncCart);
    window.addEventListener("guest-cart-updated", syncCart);
    window.addEventListener("cart-updated", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("guest-cart-updated", syncCart);
      window.removeEventListener("cart-updated", syncCart);
    };
  }, []);

  const mergeGuestCartToUserCart = async (userId) => {
    try {
      const guestItems = getGuestCart();
      if (!guestItems || guestItems.length === 0) return;

      const payload = {
        userId,
        items: guestItems.map((item) => ({
          productId: item.productId,
          quantity: Number(item.quantity || item.qty || 1),
          selectedColor: item.selectedColor || null,
          selectedColorImage: item.image || item.selectedColorImage || "",
        })),
      };
      await addToCartApi(payload);
      clearGuestCart();
    } catch (error) {
      console.error("Merge cart error:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const loginStatus = localStorage.getItem("isLoggedIn") === "true";
      const userId = localStorage.getItem("userId");
      if (!loginStatus || !userId) {
        const guestCart = buildCartObject(getGuestCart(), "guest-cart");
        setCartData(guestCart);
        return guestCart;
      }

      const res = await getCartApi(userId);
      const items = normalizeCartItems(res?.items || []);
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const formatted = { _id: res?._id || null, items, subtotal, total: res?.total || subtotal };
      setCartData(formatted);
      return formatted;
    } catch {
      return { _id: null, items: [], subtotal: 0, total: 0 };
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("gawdee_token");
    localStorage.removeItem("token");
    localStorage.removeItem("gawdee_user");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("gawdee_logged_in");
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    setUserDropdownOpen(false);
    setIsLogoutOpen(false);
    window.dispatchEvent(new CustomEvent("cart-updated"));
    navigate("/");
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#113826] text-white text-[11px] font-semibold tracking-wide py-2 text-center border-b border-[#1b4d3e]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" /> 100% Pure Traditional Bilona Method A2 Ghee
          </span>
          <span className="mx-auto sm:mx-0">
            Free All-India Express Shipping on Orders Above ₹499
          </span>
          <a href="tel:+917055107030" className="hidden md:inline-block text-[#D4AF37] hover:underline font-bold">
            Support: +91 70551 07030
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <header className={`sticky top-0 z-[30000] bg-[#FAF8F5] transition-all duration-300 ${isScrolled ? 'shadow-md py-3' : 'py-4'} border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#113826] hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/imges/Logo-green-text.png"
              alt="Gawdee - The Mother of Organic Nutrition"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Category Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-[#1C2421]">
            <Link to="/all-products" className="hover:text-[#113826] transition-colors py-1">
              Shop All
            </Link>
            <Link to="/products/desi-ghee" className="hover:text-[#113826] transition-colors py-1 flex items-center gap-1">
              A2 Ghee <span className="px-1.5 py-0.5 bg-[#D4AF37]/20 text-[#8A711E] rounded text-[9px]">BEST</span>
            </Link>
            <Link to="/products/honey" className="hover:text-[#113826] transition-colors py-1">
              Raw Honey
            </Link>
            <Link to="/products/drops" className="hover:text-[#113826] transition-colors py-1">
              Taral Drops
            </Link>
            <Link to="/products/mix-me" className="hover:text-[#113826] transition-colors py-1">
              Mix Me
            </Link>
            <Link to="/about-us" className="hover:text-[#113826] transition-colors py-1">
              About Us
            </Link>
            <Link to="/blogs" className="hover:text-[#113826] transition-colors py-1">
              Blogs
            </Link>
          </nav>

          {/* Search Bar & Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Search Input */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative w-52 lg:w-64">
              <input
                type="text"
                placeholder="Search A2 Ghee, Honey..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 text-xs text-[#1C2421] pl-9 pr-3 py-2 rounded-xl focus:border-[#113826] focus:outline-none transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </form>

            {/* Account Trigger */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-xl hover:bg-gray-100 text-[#113826] transition-colors"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <Link
                      to="/my-orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-[#1C2421] hover:bg-gray-50 transition-colors"
                    >
                      <Package className="w-4 h-4 text-[#113826]" /> My Orders
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setIsLogoutOpen(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-4 py-2 bg-[#113826] hover:bg-[#1b4d3e] text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
              >
                Sign In
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#113826] hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[40000] flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-xl font-black font-serif text-[#113826]">
                  GAWDEE<span className="text-[#D4AF37]">.</span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 text-xs pl-9 pr-3 py-2.5 rounded-xl focus:outline-none"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </form>

              {/* Mobile Nav Links */}
              <div className="mt-6 space-y-3 font-semibold text-sm text-[#1C2421]">
                <Link
                  to="/all-products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 border-b border-gray-100 hover:text-[#113826]"
                >
                  Shop All Products
                </Link>
                <Link
                  to="/products/desi-ghee"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 border-b border-gray-100 hover:text-[#113826]"
                >
                  A2 Gir Cow Ghee
                </Link>
                <Link
                  to="/products/honey"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 border-b border-gray-100 hover:text-[#113826]"
                >
                  Raw Forest Honey
                </Link>
                <Link
                  to="/products/drops"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 border-b border-gray-100 hover:text-[#113826]"
                >
                  Taral Ayurvedic Drops
                </Link>
                <Link
                  to="/products/mix-me"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 border-b border-gray-100 hover:text-[#113826]"
                >
                  Mix Me Nutrition
                </Link>
                <Link
                  to="/about-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 border-b border-gray-100 hover:text-[#113826]"
                >
                  About Gawdee
                </Link>
                <Link
                  to="/blogs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 border-b border-gray-100 hover:text-[#113826]"
                >
                  Wellness Blogs
                </Link>
                <Link
                  to="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 border-b border-gray-100 hover:text-[#113826]"
                >
                  Contact Support
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/my-orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 border-b border-gray-100 text-[#113826]"
                  >
                    My Orders
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartData={cartData}
        onProceedToCheckout={(checkoutData) => {
          setIsCartOpen(false);
          if (!isLoggedIn) {
            setIsLoginOpen(true);
          } else {
            navigate("/checkout");
          }
        }}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={() => {
          setIsLoggedIn(true);
          fetchCart();
        }}
      />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
