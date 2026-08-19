import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShieldCheck } from 'lucide-react';

export default function GawdeePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('gawdee_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('gawdee_popup_seen', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100 p-8 text-center"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#113826] bg-white rounded-full shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#113826] text-[#D4AF37] rounded-2xl shadow-md mb-4">
            <Sparkles className="w-8 h-8" />
          </div>

          <span className="inline-block px-3 py-1 bg-[#D4AF37]/15 text-[#8A711E] text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Welcome Offer
          </span>

          <h3 className="text-2xl font-bold font-serif text-[#113826]">
            Experience Pure A2 Gir Cow Ghee
          </h3>
          <p className="text-sm text-gray-600 mt-2 mb-6 max-w-sm mx-auto">
            Crafted using traditional Bilona method from ethically cared Gir cows. Delivered fresh to your doorstep.
          </p>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex items-center justify-between">
            <div className="text-left">
              <p className="text-xs text-gray-500 font-medium">Use Promo Code</p>
              <p className="text-lg font-bold tracking-wider text-[#113826]">GAWDEE10</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              10% OFF
            </span>
          </div>

          <button
            onClick={() => {
              handleClose();
              window.location.href = '/all-products';
            }}
            className="w-full py-3.5 bg-[#113826] hover:bg-[#1b4d3e] text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg"
          >
            Explore Products
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
