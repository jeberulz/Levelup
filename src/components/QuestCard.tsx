'use client';

import { CheckCircle2, Circle, Clock, Coins } from 'lucide-react';
import { useRipple } from '../hooks/useRipple';

interface QuestCardProps {
  title: string;
  description: string;
  xpReward: number;
  estimatedTime: string;
  completed: boolean;
  onStart: () => void;
  onComplete: () => void;
}

export default function QuestCard({
  title,
  description,
  xpReward,
  estimatedTime,
  completed,
  onStart,
  onComplete
}: QuestCardProps) {
  const ripple = useRipple({ color: 'rgba(0, 0, 0, 0.2)' });

  return (
    <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl ${
      completed 
        ? 'border-green-200 bg-green-50' 
        : 'border-neutral-900 bg-gradient-to-br from-neutral-900 to-neutral-800 shadow-lg'
    }`}>
      {/* Decorative elements */}
      {!completed && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
      )}
      
      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {completed ? (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              ) : (
                <Circle className="h-6 w-6 text-white" />
              )}
              <span className={`px-3 py-1 rounded-full text-xs ${
                completed 
                  ? 'bg-green-200 text-green-800' 
                  : 'bg-white/10 text-white'
              }`}>
                {completed ? 'Completed' : 'Today\'s Quest'}
              </span>
            </div>
            <h3 className={`mb-2 ${completed ? 'text-neutral-900' : 'text-white'}`}>
              {title}
            </h3>
            <p className={completed ? 'text-neutral-600' : 'text-white/80'}>
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Coins className={`h-4 w-4 ${completed ? 'text-neutral-600' : 'text-yellow-400'}`} />
            <span className={completed ? 'text-neutral-700' : 'text-white'}>
              +{xpReward} XP
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${completed ? 'text-neutral-600' : 'text-white/70'}`} />
            <span className={completed ? 'text-neutral-700' : 'text-white/90'}>
              {estimatedTime}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            if (!completed) {
              ripple(e);
              onStart();
            } else {
              onComplete();
            }
          }}
          disabled={completed}
          className={`w-full py-3 px-6 rounded-lg transition-all text-center relative overflow-hidden ${
            completed
              ? 'bg-green-600 text-white cursor-not-allowed opacity-75'
              : 'bg-white text-neutral-900 hover:bg-neutral-100 shadow-lg'
          }`}
        >
          {completed ? 'Quest Completed ✓' : 'Start Quest'}
        </button>
      </div>
    </div>
  );
}