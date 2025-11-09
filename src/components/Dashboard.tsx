import { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import QuestCard from './QuestCard';
import ProgressWidget from './ProgressWidget';
import LearningPathCard from './LearningPathCard';
import LeaderboardWidget from './LeaderboardWidget';
import StatsGrid from './StatsGrid';
import QuestModule from './QuestModule';
import { Wallet, TrendingUp, CreditCard, BookOpen, Target, Award, Flame } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [questCompleted, setQuestCompleted] = useState(false);
  const [isQuestModuleOpen, setIsQuestModuleOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Sarah Chen',
    level: 7,
    currentXP: 1250,
    xpToNextLevel: 2000,
    streak: 12,
    avatar: 'https://images.unsplash.com/photo-1609126396762-542d99fc7a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256'
  });

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
    
    // Check if leveled up
    if (newXP >= userData.xpToNextLevel) {
      newLevel = userData.level + 1;
      remainingXP = newXP - userData.xpToNextLevel;
    }
    
    setUserData({
      ...userData,
      currentXP: remainingXP,
      level: newLevel
    });
    
    console.log(`Quest completed! +${xpEarned} XP earned!`);
  };

  const handleContinuePath = (path: string) => {
    console.log(`Continuing path: ${path}`);
    alert(`Opening ${path}... In a real app, this would navigate to the learning module.`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <DashboardHeader
        userName={userData.name}
        userLevel={userData.level}
        currentStreak={userData.streak}
        userAvatar={userData.avatar}
        onLogout={onLogout}
      />

      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-neutral-900 mb-2">
            Welcome back, {userData.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-neutral-600">
            You're on a {userData.streak}-day streak. Keep it going!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8">
          <StatsGrid stats={stats} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Quest & Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Quest */}
            <div>
              <h3 className="text-neutral-900 mb-4">Today's Quest</h3>
              <QuestCard
                {...todayQuest}
                onStart={handleStartQuest}
                onComplete={() => {}}
              />
            </div>

            {/* Learning Paths */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-900">Learning Paths</h3>
                <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {learningPaths.map((path, index) => (
                  <LearningPathCard
                    key={index}
                    {...path}
                    onContinue={() => handleContinuePath(path.title)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Progress & Leaderboard */}
          <div className="space-y-6">
            <ProgressWidget
              currentXP={userData.currentXP}
              xpToNextLevel={userData.xpToNextLevel}
              currentLevel={userData.level}
            />

            <LeaderboardWidget
              entries={leaderboardData}
              userRank={3}
              userXP={2890}
            />
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
    </div>
  );
}