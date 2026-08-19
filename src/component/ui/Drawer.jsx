import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function Drawer({ isOpen, onClose, title, children, position = 'right' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const slideVariants = {
    right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
    left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
  };

  const posClasses = {
    right: 'right-0 top-0 bottom-0 max-w-md w-full',
    left: 'left-0 top-0 bottom-0 max-w-md w-full',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[8000] flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />
          <motion.div
            initial={slideVariants[position].initial}
            animate={slideVariants[position].animate}
            exit={slideVariants[position].exit}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed ${posClasses[position]} bg-white shadow-2xl z-10 flex flex-col`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#FAF8F5]">
              <h3 className="text-lg font-bold font-serif text-[#113826]">{title}</h3>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-[#113826] hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
