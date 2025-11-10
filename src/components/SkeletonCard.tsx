'use client';

import { Skeleton } from './ui/skeleton';

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-6 w-24 mb-2" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-7 w-16 mb-1" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}

export function SkeletonProgressCard() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Skeleton className="h-6 w-20 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <Skeleton className="h-3 w-full rounded-full mb-4" />
      <div className="pt-4 border-t border-neutral-100">
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

