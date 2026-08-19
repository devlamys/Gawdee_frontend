import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[50000] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100 p-6 text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold font-serif text-[#1C2421]">Confirm Logout</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Are you sure you want to log out of your Gawdee account?
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
