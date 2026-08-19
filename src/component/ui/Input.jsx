import React from 'react';

export function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  type = 'text',
  icon: Icon,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[#1C2421]/80">
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`
            w-full rounded-xl border border-gray-200 bg-white py-2.5 px-3.5 text-sm text-[#1C2421] 
            placeholder-gray-400 transition-all duration-200
            focus:border-[#113826] focus:outline-none focus:ring-2 focus:ring-[#113826]/20
            disabled:bg-gray-50 disabled:text-gray-500
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}
