'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Lock } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface LearningPathCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  locked?: boolean;
  onContinue: () => void;
}

export default function LearningPathCard({
  title,
  description,
  icon: Icon,
  progress,
  totalLessons,
  completedLessons,
  locked = false,
  onContinue
}: LearningPathCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    // Animate progress bar on mount
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 50);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <button
      onClick={locked ? undefined : onContinue}
      disabled={locked}
      className={`w-full text-left bg-white rounded-xl border border-neutral-200 p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-neutral-300 ${
        locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
          locked ? 'bg-neutral-100' : 'bg-neutral-900'
        }`}>
          {locked ? (
            <Lock className="h-6 w-6 text-neutral-400" />
          ) : (
            <Icon className="h-6 w-6 text-white" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1 tracking-tight">{title}</h4>
              <p className="text-neutral-700">{description}</p>
            </div>
            {!locked && (
              <ChevronRight className="h-5 w-5 text-neutral-400 flex-shrink-0 mt-1" />
            )}
          </div>

          <div className="mt-4">
            {locked ? (
              <p className="text-xs text-neutral-500">Complete previous path to unlock</p>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-600">
                    {completedLessons} of {totalLessons} lessons
                  </span>
                  <span className="text-xs text-neutral-900">{progress}%</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neutral-900 rounded-full transition-all duration-600 ease-out will-change-transform"
                    style={{ width: `${isMounted ? animatedProgress : 0}%` }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
