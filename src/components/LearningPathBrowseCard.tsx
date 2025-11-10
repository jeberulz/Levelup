'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Lock, Clock, Sparkles, Play } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface LearningPathBrowseCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  locked: boolean;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTotalTime: string;
  totalXPReward: number;
  tags: string[];
  onContinue: () => void;
}

export default function LearningPathBrowseCard({
  title,
  description,
  icon: Icon,
  progress,
  totalLessons,
  completedLessons,
  locked,
  category,
  difficulty,
  estimatedTotalTime,
  totalXPReward,
  onContinue
}: LearningPathBrowseCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 50);
    return () => clearTimeout(timer);
  }, [progress]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <button
      onClick={locked ? undefined : onContinue}
      disabled={locked}
      className={`w-full text-left bg-white rounded-xl border border-neutral-200 p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-neutral-300 ${
        locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {/* Header with Icon and Category */}
      <div className="flex items-start justify-between mb-4">
        <div className={`h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
          locked ? 'bg-neutral-100' : 'bg-neutral-900'
        }`}>
          {locked ? (
            <Lock className="h-7 w-7 text-neutral-400" />
          ) : (
            <Icon className="h-7 w-7 text-white" />
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md font-medium">
            {category}
          </span>
          <span className={`px-2 py-1 text-xs rounded-md font-medium ${getDifficultyColor(difficulty)}`}>
            {getDifficultyLabel(difficulty)}
          </span>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mb-4">
        <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 tracking-tight">{title}</h4>
        <p className="text-sm text-neutral-600 line-clamp-2">{description}</p>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4 mb-4 text-xs text-neutral-600">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{estimatedTotalTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-yellow-600" />
          <span className="text-yellow-700 font-medium">{totalXPReward} XP</span>
        </div>
        <div className="flex items-center gap-1">
          <span>{totalLessons} lessons</span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-4">
        {locked ? (
          <p className="text-xs text-neutral-500">Complete previous path to unlock</p>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neutral-600">
                {completedLessons} of {totalLessons} lessons
              </span>
              <span className="text-xs font-medium text-neutral-900">{progress}%</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-600 ease-out will-change-transform"
                style={{ width: `${isMounted ? animatedProgress : 0}%` }}
              />
            </div>
          </>
        )}
      </div>

      {/* Action Button */}
      {!locked && (
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <span className="text-sm font-medium text-neutral-900">
            {progress === 0 ? 'Start Learning' : progress === 100 ? 'Review' : 'Continue'}
          </span>
          <div className="flex items-center gap-2">
            {progress === 0 && <Play className="h-4 w-4 text-neutral-600" />}
            <ChevronRight className="h-5 w-5 text-neutral-400" />
          </div>
        </div>
      )}
    </button>
  );
}

