import { TrendingUp } from 'lucide-react';

interface ProgressWidgetProps {
  currentXP: number;
  xpToNextLevel: number;
  currentLevel: number;
}

export default function ProgressWidget({ 
  currentXP, 
  xpToNextLevel, 
  currentLevel 
}: ProgressWidgetProps) {
  const progressPercentage = (currentXP / xpToNextLevel) * 100;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-neutral-900 mb-1">Level {currentLevel}</h3>
          <p className="text-neutral-600">
            {currentXP} / {xpToNextLevel} XP
          </p>
        </div>
        <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center">
          <TrendingUp className="h-6 w-6 text-neutral-900" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-neutral-100 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-neutral-900 to-neutral-700 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-100">
        <p className="text-xs text-neutral-500">
          {xpToNextLevel - currentXP} XP until Level {currentLevel + 1}
        </p>
      </div>
    </div>
  );
}
