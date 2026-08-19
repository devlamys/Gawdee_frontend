import React from 'react';

export function Skeleton({ className = '', variant = 'rectangular' }) {
  const variants = {
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    text: 'rounded-md h-4 w-3/4',
  };

  return (
    <div
      className={`animate-pulse bg-gray-200 ${variants[variant]} ${className}`}
    />
  );
}

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-4">
      <Skeleton className="w-full h-48 rounded-xl" />
      <Skeleton variant="text" className="w-2/3 h-5" />
      <Skeleton variant="text" className="w-1/3 h-4" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="w-20 h-6 rounded-lg" />
        <Skeleton className="w-24 h-9 rounded-xl" />
      </div>
    </div>
  );
}
