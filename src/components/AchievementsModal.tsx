'use client';

import { useState } from 'react';
import { 
  X, 
  Trophy, 
  Flame, 
  Target, 
  BookOpen, 
  Zap, 
  Star,
  Award,
  Crown,
  Sparkles,
  TrendingUp,
  Calendar,
  Lock,
  Check
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'streak' | 'quest' | 'learning' | 'quiz' | 'special';
  xpReward: number;
  progress: number;
  total: number;
  isUnlocked: boolean;
  unlockedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userXP: number;
}

export default function AchievementsModal({ isOpen, onClose, userXP }: AchievementsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Achievement data - in production this would come from API/database
  const achievements: Achievement[] = [
    // Streak Achievements
    {
      id: 'streak-3',
      title: 'Getting Started',
      description: 'Complete quests for 3 days in a row',
      icon: Flame,
      category: 'streak',
      xpReward: 50,
      progress: 3,
      total: 3,
      isUnlocked: true,
      unlockedDate: '2025-10-15',
      rarity: 'common'
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: Flame,
      category: 'streak',
      xpReward: 100,
      progress: 7,
      total: 7,
      isUnlocked: true,
      unlockedDate: '2025-10-22',
      rarity: 'common'
    },
    {
      id: 'streak-30',
      title: 'Streak Master',
      description: 'Achieve a 30-day streak',
      icon: Flame,
      category: 'streak',
      xpReward: 500,
      progress: 12,
      total: 30,
      isUnlocked: false,
      rarity: 'epic'
    },
    {
      id: 'streak-100',
      title: 'Century Club',
      description: 'Maintain a 100-day streak',
      icon: Crown,
      category: 'streak',
      xpReward: 2000,
      progress: 12,
      total: 100,
      isUnlocked: false,
      rarity: 'legendary'
    },
    
    // Quest Achievements
    {
      id: 'quest-1',
      title: 'First Steps',
      description: 'Complete your first quest',
      icon: Target,
      category: 'quest',
      xpReward: 25,
      progress: 1,
      total: 1,
      isUnlocked: true,
      unlockedDate: '2025-10-13',
      rarity: 'common'
    },
    {
      id: 'quest-10',
      title: 'Quest Hunter',
      description: 'Complete 10 quests',
      icon: Target,
      category: 'quest',
      xpReward: 150,
      progress: 10,
      total: 10,
      isUnlocked: true,
      unlockedDate: '2025-10-28',
      rarity: 'rare'
    },
    {
      id: 'quest-50',
      title: 'Quest Master',
      description: 'Complete 50 quests',
      icon: Award,
      category: 'quest',
      xpReward: 750,
      progress: 15,
      total: 50,
      isUnlocked: false,
      rarity: 'epic'
    },
    {
      id: 'quest-perfect-week',
      title: 'Perfect Week',
      description: 'Complete all quests for 7 consecutive days',
      icon: Star,
      category: 'quest',
      xpReward: 300,
      progress: 12,
      total: 7,
      isUnlocked: false,
      rarity: 'rare'
    },

    // Learning Path Achievements
    {
      id: 'path-started',
      title: 'Eager Learner',
      description: 'Start your first learning path',
      icon: BookOpen,
      category: 'learning',
      xpReward: 50,
      progress: 1,
      total: 1,
      isUnlocked: true,
      unlockedDate: '2025-10-14',
      rarity: 'common'
    },
    {
      id: 'path-complete-1',
      title: 'Path Completer',
      description: 'Complete your first learning path',
      icon: BookOpen,
      category: 'learning',
      xpReward: 250,
      progress: 9,
      total: 12,
      isUnlocked: false,
      rarity: 'rare'
    },
    {
      id: 'path-complete-all',
      title: 'Master Scholar',
      description: 'Complete all available learning paths',
      icon: Crown,
      category: 'learning',
      xpReward: 1000,
      progress: 1,
      total: 3,
      isUnlocked: false,
      rarity: 'legendary'
    },
    {
      id: 'lessons-25',
      title: 'Knowledge Seeker',
      description: 'Complete 25 lessons',
      icon: BookOpen,
      category: 'learning',
      xpReward: 200,
      progress: 15,
      total: 25,
      isUnlocked: false,
      rarity: 'rare'
    },

    // Quiz Achievements
    {
      id: 'quiz-perfect-1',
      title: 'Perfect Score',
      description: 'Get 100% on your first quiz',
      icon: Zap,
      category: 'quiz',
      xpReward: 75,
      progress: 1,
      total: 1,
      isUnlocked: true,
      unlockedDate: '2025-10-15',
      rarity: 'common'
    },
    {
      id: 'quiz-perfect-10',
      title: 'Quiz Master',
      description: 'Get perfect scores on 10 quizzes',
      icon: Zap,
      category: 'quiz',
      xpReward: 400,
      progress: 3,
      total: 10,
      isUnlocked: false,
      rarity: 'epic'
    },
    {
      id: 'quiz-speed',
      title: 'Speed Demon',
      description: 'Complete a quiz in under 30 seconds',
      icon: Zap,
      category: 'quiz',
      xpReward: 100,
      progress: 0,
      total: 1,
      isUnlocked: false,
      rarity: 'rare'
    },

    // Special Achievements
    {
      id: 'early-adopter',
      title: 'Early Adopter',
      description: 'Join LevelUp Money in its first month',
      icon: Sparkles,
      category: 'special',
      xpReward: 150,
      progress: 1,
      total: 1,
      isUnlocked: true,
      unlockedDate: '2025-10-13',
      rarity: 'rare'
    },
    {
      id: 'level-10',
      title: 'Rising Star',
      description: 'Reach level 10',
      icon: TrendingUp,
      category: 'special',
      xpReward: 300,
      progress: 7,
      total: 10,
      isUnlocked: false,
      rarity: 'epic'
    },
    {
      id: 'weekend-warrior',
      title: 'Weekend Warrior',
      description: 'Complete quests on 10 weekends',
      icon: Calendar,
      category: 'special',
      xpReward: 250,
      progress: 4,
      total: 10,
      isUnlocked: false,
      rarity: 'rare'
    },
    {
      id: 'xp-5000',
      title: 'XP Champion',
      description: 'Earn 5,000 total XP',
      icon: Trophy,
      category: 'special',
      xpReward: 500,
      progress: Math.min(userXP, 5000),
      total: 5000,
      isUnlocked: userXP >= 5000,
      unlockedDate: userXP >= 5000 ? '2025-11-01' : undefined,
      rarity: 'epic'
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: Trophy },
    { id: 'streak', label: 'Streaks', icon: Flame },
    { id: 'quest', label: 'Quests', icon: Target },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'quiz', label: 'Quizzes', icon: Zap },
    { id: 'special', label: 'Special', icon: Sparkles }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const recentUnlocks = achievements
    .filter(a => a.isUnlocked)
    .sort((a, b) => new Date(b.unlockedDate!).getTime() - new Date(a.unlockedDate!).getTime())
    .slice(0, 3);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch(rarity) {
      case 'common': return 'from-neutral-500 to-neutral-600';
      case 'rare': return 'from-blue-500 to-blue-600';
      case 'epic': return 'from-purple-500 to-purple-600';
      case 'legendary': return 'from-yellow-500 to-orange-600';
    }
  };

  const getRarityBorder = (rarity: Achievement['rarity']) => {
    switch(rarity) {
      case 'common': return 'border-neutral-300';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            aria-label="Close achievements"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="pr-12">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <h2 className="text-white font-bold tracking-tight">Achievements</h2>
            </div>
            <p className="text-white/80 mb-4">
              Track your progress and unlock rewards
            </p>
            
            {/* Progress Overview */}
            <div className="flex items-center gap-6">
              <div>
                <p className="text-white/60 mb-1">Unlocked</p>
                <p className="text-white">
                  {unlockedCount} / {totalCount}
                </p>
              </div>
              <div className="flex-1 max-w-md">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-white/80">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-neutral-200 bg-white px-6">
          <div className="flex gap-2 py-4 flex-wrap">
            {categories.map(category => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Recent Unlocks */}
          {selectedCategory === 'all' && recentUnlocks.length > 0 && (
            <div className="mb-8">
              <h3 className="text-neutral-900 mb-4 font-bold tracking-tight">Recently Unlocked</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentUnlocks.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={achievement.id}
                      className="bg-gradient-to-br from-neutral-50 to-white border-2 border-neutral-200 rounded-xl p-4 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl" />
                      <div className="relative">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${getRarityColor(achievement.rarity)} mb-3`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-neutral-900 mb-1 font-bold tracking-tight">{achievement.title}</h4>
                        <p className="text-xs text-neutral-600 mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <Sparkles className="h-3 w-3" />
                          <span>+{achievement.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Achievements Grid */}
          <div>
            <h3 className="text-neutral-900 mb-4 font-bold tracking-tight">
              {selectedCategory === 'all' ? 'All Achievements' : `${categories.find(c => c.id === selectedCategory)?.label} Achievements`}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => {
                const Icon = achievement.icon;
                const progressPercent = (achievement.progress / achievement.total) * 100;
                const isInProgress = !achievement.isUnlocked && achievement.progress > 0;

                return (
                  <div
                    key={achievement.id}
                    className={`bg-white rounded-xl border-2 p-5 transition-all ${
                      achievement.isUnlocked 
                        ? `${getRarityBorder(achievement.rarity)} shadow-sm hover:shadow-md` 
                        : 'border-neutral-200 opacity-75'
                    } relative overflow-hidden`}
                  >
                    {/* Rarity Glow Effect */}
                    {achievement.isUnlocked && (
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getRarityColor(achievement.rarity)} opacity-10 rounded-full blur-3xl`} />
                    )}

                    <div className="relative">
                      {/* Icon */}
                      <div className="flex items-start justify-between mb-3">
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${
                          achievement.isUnlocked 
                            ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}` 
                            : 'bg-neutral-200'
                        }`}>
                          {achievement.isUnlocked ? (
                            <Icon className="h-7 w-7 text-white" />
                          ) : (
                            <Lock className="h-7 w-7 text-neutral-400" />
                          )}
                        </div>
                        
                        {achievement.isUnlocked && (
                          <div className="bg-green-100 rounded-full p-1">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <h4 className={`mb-2 font-bold tracking-tight ${achievement.isUnlocked ? 'text-neutral-900' : 'text-neutral-600'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs mb-3 ${achievement.isUnlocked ? 'text-neutral-600' : 'text-neutral-500'}`}>
                        {achievement.description}
                      </p>

                      {/* Progress or Completion */}
                      {achievement.isUnlocked ? (
                        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                          <div className="flex items-center gap-1 text-xs text-neutral-600">
                            <Sparkles className="h-3 w-3 text-yellow-500" />
                            <span>+{achievement.xpReward} XP</span>
                          </div>
                          <span className="text-xs text-neutral-500">
                            {new Date(achievement.unlockedDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      ) : (
                        <div className="pt-3 border-t border-neutral-100">
                          <div className="flex items-center justify-between mb-2 text-xs">
                            <span className="text-neutral-600">
                              {achievement.progress} / {achievement.total}
                            </span>
                            <span className="text-neutral-500">
                              {Math.round(progressPercent)}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-neutral-400 rounded-full transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          {isInProgress && (
                            <div className="flex items-center gap-1 text-xs text-neutral-500 mt-2">
                              <Sparkles className="h-3 w-3" />
                              <span>{achievement.xpReward} XP when unlocked</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
