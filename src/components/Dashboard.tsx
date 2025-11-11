'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from './DashboardSidebar';
import QuestCard from './QuestCard';
import ProgressWidget from './ProgressWidget';
import LearningPathCard from './LearningPathCard';
import LeaderboardWidget from './LeaderboardWidget';
import StatsGrid from './StatsGrid';
import QuestModule from './QuestModule';
import AchievementsModal from './AchievementsModal';
import ProfileModal from './ProfileModal';
import BudgetSimulator from './BudgetSimulator';
import SocialFeed from './SocialFeed';
import LearningPathModule from './LearningPathModule';
import { Wallet, TrendingUp, CreditCard, BookOpen, Target, Award, Flame, Calculator, Users, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const router = useRouter();
  const [questCompleted, setQuestCompleted] = useState(false);

  useEffect(() => {
    // Stagger animation observer
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('[data-animate-stagger]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  
  const [isQuestModuleOpen, setIsQuestModuleOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBudgetSimulatorOpen, setIsBudgetSimulatorOpen] = useState(false);
  const [isSocialFeedOpen, setIsSocialFeedOpen] = useState(false);
  const [isLearningPathOpen, setIsLearningPathOpen] = useState(false);
  const [selectedLearningPath, setSelectedLearningPath] = useState<any>(null);
  const [userData, setUserData] = useState({
    name: 'Sarah Chen',
    level: 7,
    currentXP: 1250,
    xpToNextLevel: 2000,
    streak: 12,
    avatar: 'https://images.unsplash.com/photo-1609126396762-542d99fc7a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256'
  });

  // Calculate total XP earned (mock calculation based on level)
  const totalXPEarned = (userData.level - 1) * 2000 + userData.currentXP;

  const todayQuest = {
    title: 'Track Your Daily Spending',
    description: 'Log today\'s expenses and categorize them to build awareness of your spending patterns.',
    xpReward: 50,
    estimatedTime: '5 min',
    completed: questCompleted
  };

  const learningPaths = [
    {
      title: 'Budget Basics',
      description: 'Master the 50/30/20 rule and expense tracking',
      icon: Wallet,
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      locked: false
    },
    {
      title: 'Investing 101',
      description: 'Learn stocks, ETFs, and portfolio building',
      icon: TrendingUp,
      progress: 40,
      totalLessons: 15,
      completedLessons: 6,
      locked: false
    },
    {
      title: 'Credit Mastery',
      description: 'Build and maintain excellent credit',
      icon: CreditCard,
      progress: 0,
      totalLessons: 10,
      completedLessons: 0,
      locked: true
    }
  ];

  const leaderboardData = [
    { rank: 1, name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', xp: 3450 },
    { rank: 2, name: 'Jordan Kim', avatar: 'https://images.unsplash.com/photo-1594686900103-3c9698dbb31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', xp: 3200 },
    { rank: 3, name: 'Sarah Chen', avatar: userData.avatar, xp: 2890, isCurrentUser: true },
    { rank: 4, name: 'Marcus Lee', avatar: 'https://images.unsplash.com/photo-1609126396762-542d99fc7a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', xp: 2750 },
    { rank: 5, name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', xp: 2600 }
  ];

  const stats = [
    {
      label: 'Lessons Completed',
      value: '15',
      icon: BookOpen,
      trend: { value: '3 this week', isPositive: true }
    },
    {
      label: 'Current Streak',
      value: `${userData.streak} days`,
      icon: Flame,
      trend: { value: 'Personal best', isPositive: true }
    },
    {
      label: 'XP This Week',
      value: '450',
      icon: Target,
      trend: { value: '12%', isPositive: true }
    },
    {
      label: 'Achievements',
      value: '8/24',
      icon: Award
    }
  ];

  const handleStartQuest = () => {
    console.log('Starting quest...');
    setIsQuestModuleOpen(true);
  };

  const handleCompleteQuest = (xpEarned: number) => {
    setQuestCompleted(true);
    
    // Update user XP
    const newXP = userData.currentXP + xpEarned;
    let newLevel = userData.level;
    let remainingXP = newXP;
    const leveledUp = newXP >= userData.xpToNextLevel;
    
    // Check if leveled up
    if (leveledUp) {
      newLevel = userData.level + 1;
      remainingXP = newXP - userData.xpToNextLevel;
      toast.success('Level Up!', {
        description: `Congratulations! You reached Level ${newLevel}`,
        duration: 4000,
      });
    }
    
    setUserData({
      ...userData,
      currentXP: remainingXP,
      level: newLevel
    });
    
    if (!leveledUp) {
      toast.success('XP Earned!', {
        description: `+${xpEarned} XP added to your progress`,
        duration: 3000,
      });
    }
  };

  const handleContinuePath = (path: string) => {
    const selectedPath = learningPaths.find(p => p.title === path);
    if (selectedPath && !selectedPath.locked) {
      setSelectedLearningPath(selectedPath);
      setIsLearningPathOpen(true);
    }
  };

  const handleUpdateProfile = (data: { name: string; avatar: string; bio: string }) => {
    setUserData({
      ...userData,
      name: data.name,
      avatar: data.avatar
    });
    console.log('Profile updated:', data);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <DashboardSidebar
        userName={userData.name}
        userLevel={userData.level}
        currentStreak={userData.streak}
        userAvatar={userData.avatar}
        currentXP={userData.currentXP}
        xpToNextLevel={userData.xpToNextLevel}
        onLogout={onLogout}
        onProfileClick={() => setIsProfileOpen(true)}
        onAchievementsClick={() => setIsAchievementsOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                Welcome back, {userData.name.split(' ')[0]}!
              </h1>
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-neutral-600 text-lg">
              You're on a {userData.streak}-day streak. Keep the momentum going! 🔥
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8">
            <StatsGrid 
              stats={stats} 
              onAchievementsClick={() => setIsAchievementsOpen(true)}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Quest & Learning Paths */}
            <div className="lg:col-span-2 space-y-8">
              {/* Today's Quest */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Today's Quest</h2>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    Daily Challenge
                  </span>
                </div>
                <div
                  className="opacity-0 translate-y-4 transition-all duration-500 ease-out"
                  style={{
                    animationDelay: '0ms',
                    animationFillMode: 'forwards'
                  }}
                  data-animate-stagger
                >
                  <QuestCard
                    {...todayQuest}
                    onStart={handleStartQuest}
                    onComplete={() => {}}
                  />
                </div>
              </div>

              {/* Learning Paths */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Learning Paths</h2>
                  <button 
                    onClick={() => router.push('/learning-paths')}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-medium"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {learningPaths.map((path, index) => (
                    <div
                      key={index}
                      className="opacity-0 translate-y-4 transition-all duration-500 ease-out"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: 'forwards'
                      }}
                      data-animate-stagger
                    >
                      <LearningPathCard
                        {...path}
                        onContinue={() => handleContinuePath(path.title)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Tools */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4 tracking-tight">Interactive Tools</h2>
                <button
                  onClick={() => setIsBudgetSimulatorOpen(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl p-6 transition-all shadow-lg hover:shadow-xl group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 text-left">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Calculator className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Budget Simulator</h3>
                        <p className="text-white/90 text-sm mb-3">
                          Create a personalized budget using the 50/30/20 rule. Visualize your spending and get AI-powered recommendations.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="px-3 py-1 bg-white/20 rounded-full">Interactive</span>
                          <span className="px-3 py-1 bg-white/20 rounded-full">Earn XP</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Target className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column - Leaderboard */}
            <div className="space-y-6">
              <LeaderboardWidget
                entries={leaderboardData}
                userRank={3}
                userXP={2890}
                onViewCommunity={() => setIsSocialFeedOpen(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Quest Module */}
      <QuestModule
        isOpen={isQuestModuleOpen}
        onClose={() => setIsQuestModuleOpen(false)}
        onComplete={handleCompleteQuest}
        questTitle={todayQuest.title}
        xpReward={todayQuest.xpReward}
      />

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        userXP={totalXPEarned}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userData={userData}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Budget Simulator */}
      <BudgetSimulator
        isOpen={isBudgetSimulatorOpen}
        onClose={() => setIsBudgetSimulatorOpen(false)}
        onComplete={handleCompleteQuest}
      />

      {/* Social Feed */}
      <SocialFeed
        isOpen={isSocialFeedOpen}
        onClose={() => setIsSocialFeedOpen(false)}
        currentUser={userData}
      />

      {/* Learning Path Module */}
      {selectedLearningPath && (
        <LearningPathModule
          isOpen={isLearningPathOpen}
          onClose={() => setIsLearningPathOpen(false)}
          pathTitle={selectedLearningPath.title}
          pathIcon={selectedLearningPath.icon}
          onComplete={handleCompleteQuest}
        />
      )}
    </div>
  );
}