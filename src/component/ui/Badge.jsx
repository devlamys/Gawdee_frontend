import React from 'react';

export function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-[#113826]/10 text-[#113826] border border-[#113826]/20',
    gold: 'bg-[#D4AF37]/15 text-[#8A711E] border border-[#D4AF37]/30',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </span>
  );
}
