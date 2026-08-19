import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-[#113826] hover:bg-[#1b4d3e] text-white focus:ring-[#113826] shadow-sm hover:shadow-md',
    gold: 'bg-[#D4AF37] hover:bg-[#B89525] text-white focus:ring-[#D4AF37] shadow-sm',
    secondary: 'bg-[#FAF8F5] hover:bg-[#F2EDE4] text-[#113826] border border-[#E5E7EB] focus:ring-[#113826]',
    outline: 'border border-[#113826] text-[#113826] hover:bg-[#113826] hover:text-white focus:ring-[#113826]',
    ghost: 'text-[#113826] hover:bg-[#FAF8F5] focus:ring-[#113826]',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold gap-2',
    lg: 'px-7 py-3.5 text-base font-semibold gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
}
