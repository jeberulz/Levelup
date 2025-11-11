'use client';

import { Trophy, Home, BookOpen, Target, Award, Users, Settings, LogOut, Flame, TrendingUp } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';
import { useState } from 'react';

interface DashboardSidebarProps {
  userName: string;
  userLevel: number;
  currentStreak: number;
  userAvatar?: string;
  currentXP: number;
  xpToNextLevel: number;
  onLogout: () => void;
  onProfileClick?: () => void;
  onAchievementsClick?: () => void;
}

export default function DashboardSidebar({ 
  userName, 
  userLevel, 
  currentStreak, 
  userAvatar,
  currentXP,
  xpToNextLevel,
  onLogout,
  onProfileClick,
  onAchievementsClick
}: DashboardSidebarProps) {
  const animatedStreak = useCountUp(currentStreak);
  const animatedLevel = useCountUp(userLevel);
  const animatedXP = useCountUp(currentXP);
  const progressPercentage = (currentXP / xpToNextLevel) * 100;
  const [activeNav, setActiveNav] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'learning', label: 'Learning Paths', icon: BookOpen },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'achievements', label: 'Achievements', icon: Award, onClick: onAchievementsClick },
    { id: 'community', label: 'Community', icon: Users },
  ];

  return (
    <aside className="w-80 bg-white border-r border-neutral-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-neutral-900 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-neutral-900 font-bold tracking-tight">LevelUp Money</h1>
            <p className="text-xs text-neutral-500">Financial Mastery</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-neutral-200">
        <button
          onClick={onProfileClick}
          className="w-full group"
        >
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={userAvatar || "https://images.unsplash.com/photo-1609126396762-542d99fc7a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256"} 
              alt={userName}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-neutral-200 group-hover:ring-neutral-400 transition-all"
            />
            <div className="flex-1 text-left">
              <p className="text-neutral-900 font-semibold">{userName}</p>
              <p className="text-sm text-neutral-600">Level {animatedLevel}</p>
            </div>
          </div>
        </button>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-neutral-600">
              {animatedXP} / {xpToNextLevel} XP
            </span>
            <span className="text-xs text-neutral-900 font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neutral-900 to-neutral-700 rounded-full transition-all duration-600 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Streak Badge */}
        <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg border border-orange-200">
          <Flame className="h-4 w-4 text-orange-500" />
          <span className="text-sm text-orange-900 font-medium">{animatedStreak} day streak</span>
          <div className="ml-auto">
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id);
                item.onClick?.();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeNav === item.id
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-neutral-200 space-y-2">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-all"
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}