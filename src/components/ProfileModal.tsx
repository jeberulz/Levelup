'use client';

import { useState } from 'react';
import { 
  X, 
  User, 
  Flame, 
  Trophy,
  Calendar,
  TrendingUp,
  Target,
  Edit2,
  Check,
  ChevronRight,
  Sparkles,
  Clock,
  Award,
  BookOpen
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    level: number;
    currentXP: number;
    xpToNextLevel: number;
    streak: number;
    avatar: string;
  };
  onUpdateProfile: (data: { name: string; avatar: string; bio: string }) => void;
}

// Preset avatars for selection
const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1609126396762-542d99fc7a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
  'https://images.unsplash.com/photo-1594686900103-3c9698dbb31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
  'https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256'
];

export default function ProfileModal({ isOpen, onClose, userData, onUpdateProfile }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'stats' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userData.name);
  const [editedBio, setEditedBio] = useState('Level up your financial game, one quest at a time 🚀');
  const [selectedAvatar, setSelectedAvatar] = useState(userData.avatar);

  // Generate streak calendar data (last 365 days)
  const generateStreakCalendar = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Mock data: random activity with higher probability for recent dates
      const hasActivity = i < 100 ? Math.random() > 0.3 : Math.random() > 0.6;
      const intensity = hasActivity ? Math.floor(Math.random() * 4) + 1 : 0; // 0-4
      
      days.push({
        date: date.toISOString().split('T')[0],
        intensity,
        hasActivity,
        questsCompleted: hasActivity ? Math.floor(Math.random() * 3) + 1 : 0
      });
    }
    
    return days;
  };

  const streakData = generateStreakCalendar();
  const currentYear = new Date().getFullYear();

  // Calculate streak stats
  const longestStreak = 28; // Mock data
  const totalActiveDays = streakData.filter(d => d.hasActivity).length;
  const streakFreezes = 2; // Mock: number of streak freezes used

  // Calculate total XP
  const totalXPEarned = (userData.level - 1) * 2000 + userData.currentXP;

  // Activity timeline data
  const recentActivity = [
    { type: 'quest', title: 'Track Your Daily Spending', xp: 50, time: '2 hours ago', icon: Target },
    { type: 'achievement', title: 'Unlocked "Quest Hunter"', xp: 150, time: '1 day ago', icon: Trophy },
    { type: 'level', title: 'Reached Level 7', xp: 0, time: '3 days ago', icon: TrendingUp },
    { type: 'lesson', title: 'Completed "Budget Basics - Lesson 9"', xp: 75, time: '3 days ago', icon: BookOpen },
    { type: 'quest', title: 'Review Your Budget Categories', xp: 50, time: '4 days ago', icon: Target }
  ];

  // Personal stats
  const personalStats = [
    { label: 'Total XP Earned', value: totalXPEarned.toLocaleString(), icon: Sparkles },
    { label: 'Quests Completed', value: '15', icon: Target },
    { label: 'Lessons Finished', value: '15', icon: BookOpen },
    { label: 'Success Rate', value: '94%', icon: TrendingUp },
    { label: 'Active Days', value: totalActiveDays, icon: Calendar },
    { label: 'Achievements', value: '8/20', icon: Award }
  ];

  // Pinned achievements (mock - would be user-selectable)
  const pinnedAchievements = [
    { title: 'Week Warrior', icon: Flame, rarity: 'common' },
    { title: 'Quest Hunter', icon: Target, rarity: 'rare' },
    { title: 'Early Adopter', icon: Sparkles, rarity: 'rare' }
  ];

  const handleSaveProfile = () => {
    onUpdateProfile({
      name: editedName,
      avatar: selectedAvatar,
      bio: editedBio
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedName(userData.name);
    setSelectedAvatar(userData.avatar);
    setIsEditing(false);
  };

  const getIntensityColor = (intensity: number) => {
    switch(intensity) {
      case 0: return 'bg-neutral-100';
      case 1: return 'bg-green-200';
      case 2: return 'bg-green-400';
      case 3: return 'bg-green-600';
      case 4: return 'bg-green-800';
      default: return 'bg-neutral-100';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'from-neutral-500 to-neutral-600';
      case 'rare': return 'from-blue-500 to-blue-600';
      case 'epic': return 'from-purple-500 to-purple-600';
      case 'legendary': return 'from-yellow-500 to-orange-600';
      default: return 'from-neutral-500 to-neutral-600';
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
            aria-label="Close profile"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-6 pr-12">
            {/* Avatar */}
            <div className="relative">
              <img 
                src={isEditing ? selectedAvatar : userData.avatar}
                alt={userData.name}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-white/20"
              />
              <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-neutral-900 ring-4 ring-neutral-800 flex items-center justify-center">
                <span className="text-white text-xs">{userData.level}</span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white mb-2 w-full max-w-xs"
                  placeholder="Your name"
                />
              ) : (
                <h2 className="text-white mb-1 font-bold tracking-tight">{userData.name}</h2>
              )}
              {isEditing ? (
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white/90 text-sm w-full max-w-md resize-none"
                  rows={2}
                  placeholder="Your bio"
                />
              ) : (
                <p className="text-white/80 mb-3">{editedBio}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-white/60" />
                  <span className="text-white/80">Level {userData.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <span className="text-white/80">{userData.streak} day streak</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-white/80">{totalXPEarned.toLocaleString()} XP</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Avatar Selection (when editing) */}
        {isEditing && (
          <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
            <p className="text-sm text-neutral-700 mb-3">Choose your avatar:</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {AVATAR_OPTIONS.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`flex-shrink-0 rounded-full ring-2 transition-all ${
                    selectedAvatar === avatar
                      ? 'ring-neutral-900 ring-offset-2'
                      : 'ring-neutral-200 hover:ring-neutral-300'
                  }`}
                >
                  <img 
                    src={avatar}
                    alt={`Avatar option ${index + 1}`}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-neutral-200 bg-white px-6">
          <div className="flex gap-6">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'calendar', label: 'Streak Calendar', icon: Calendar },
              { id: 'stats', label: 'Statistics', icon: TrendingUp },
              { id: 'settings', label: 'Goals', icon: Target }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    isActive
                      ? 'border-neutral-900 text-neutral-900'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Pinned Achievements */}
              <div>
                <h3 className="text-neutral-900 mb-4 font-bold tracking-tight">Showcase Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pinnedAchievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={index}
                        className="bg-white border-2 border-neutral-200 rounded-xl p-4 text-center"
                      >
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${getRarityColor(achievement.rarity)} mb-3`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <h4 className="text-neutral-900 font-bold tracking-tight">{achievement.title}</h4>
                      </div>
                    );
                  })}
                </div>
                <button className="mt-3 text-sm text-neutral-600 hover:text-neutral-900 flex items-center gap-1 transition-colors">
                  <span>Customize showcase</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-neutral-900 mb-4 font-bold tracking-tight">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-neutral-900" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-neutral-900 truncate">{activity.title}</p>
                          <p className="text-xs text-neutral-500">{activity.time}</p>
                        </div>
                        {activity.xp > 0 && (
                          <div className="flex items-center gap-1 text-sm text-neutral-600">
                            <Sparkles className="h-4 w-4 text-yellow-500" />
                            <span>+{activity.xp}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              {/* Streak Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Flame className="h-6 w-6 text-orange-600" />
                    <h4 className="text-neutral-900 font-bold tracking-tight">Current Streak</h4>
                  </div>
                  <p className="text-neutral-900">{userData.streak} days</p>
                  <p className="text-xs text-neutral-600 mt-1">Keep it going!</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="h-6 w-6 text-green-600" />
                    <h4 className="text-neutral-900 font-bold tracking-tight">Longest Streak</h4>
                  </div>
                  <p className="text-neutral-900">{longestStreak} days</p>
                  <p className="text-xs text-neutral-600 mt-1">Personal best</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-6 w-6 text-blue-600" />
                    <h4 className="text-neutral-900 font-bold tracking-tight">Active Days</h4>
                  </div>
                  <p className="text-neutral-900">{totalActiveDays} days</p>
                  <p className="text-xs text-neutral-600 mt-1">This year</p>
                </div>
              </div>

              {/* Streak Calendar Heatmap */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-neutral-900 font-bold tracking-tight">Activity Calendar - {currentYear}</h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <span>Less</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map(intensity => (
                        <div key={intensity} className={`h-3 w-3 rounded-sm ${getIntensityColor(intensity)}`} />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-4 overflow-x-auto">
                  <div className="inline-flex flex-col gap-1">
                    {/* Days of week labels */}
                    <div className="flex gap-1 mb-1 ml-12">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                        <div key={i} className="text-xs text-neutral-500" style={{ width: '30px' }}>
                          {month}
                        </div>
                      ))}
                    </div>
                    
                    {/* Heatmap grid */}
                    {[0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => (
                      <div key={dayOfWeek} className="flex gap-1">
                        <div className="w-10 text-xs text-neutral-500 flex items-center">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek]}
                        </div>
                        <div className="flex gap-1">
                          {streakData
                            .filter(day => new Date(day.date).getDay() === dayOfWeek)
                            .map((day, index) => (
                              <div
                                key={index}
                                className={`h-3 w-3 rounded-sm ${getIntensityColor(day.intensity)} hover:ring-2 hover:ring-neutral-400 transition-all cursor-pointer`}
                                title={`${day.date}: ${day.questsCompleted} quest${day.questsCompleted !== 1 ? 's' : ''}`}
                              />
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Streak Freezes Info */}
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Flame className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-neutral-900 mb-1 font-bold tracking-tight">Streak Freezes</h4>
                      <p className="text-sm text-neutral-600 mb-2">
                        You have <span className="text-neutral-900">{streakFreezes} streak freezes</span> available. Use them to protect your streak if you miss a day!
                      </p>
                      <p className="text-xs text-neutral-500">Earn more by completing weekly challenges or reaching milestones.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-neutral-900 mb-4 font-bold tracking-tight">Personal Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {personalStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="bg-white border border-neutral-200 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-neutral-900" />
                          </div>
                          <h4 className="text-neutral-700 font-bold tracking-tight">{stat.label}</h4>
                        </div>
                        <p className="text-neutral-900">{stat.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Over Time Chart Placeholder */}
              <div>
                <h3 className="text-neutral-900 mb-4 font-bold tracking-tight">XP Progress</h3>
                <div className="bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-xl p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                    <p className="text-neutral-500">Chart visualization coming soon</p>
                    <p className="text-sm text-neutral-400 mt-1">Track your XP growth over time</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Goals Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-neutral-900 mb-4 font-bold tracking-tight">Active Goals</h3>
                
                <div className="space-y-4">
                  {/* Goal 1 */}
                  <div className="bg-white border border-neutral-200 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Target className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-neutral-900 font-bold tracking-tight">Reach Level 10</h4>
                          <p className="text-sm text-neutral-600">3 levels to go</p>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-500">70% complete</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>

                  {/* Goal 2 */}
                  <div className="bg-white border border-neutral-200 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Flame className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-neutral-900 font-bold tracking-tight">30-Day Streak</h4>
                          <p className="text-sm text-neutral-600">18 days remaining</p>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-500">40% complete</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>

                  {/* Goal 3 */}
                  <div className="bg-white border border-neutral-200 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-neutral-900 font-bold tracking-tight">Complete Budget Basics</h4>
                          <p className="text-sm text-neutral-600">3 lessons left</p>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-500">75% complete</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>

                <button className="mt-4 w-full py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-colors">
                  + Add New Goal
                </button>
              </div>

              {/* Preferences */}
              <div>
                <h3 className="text-neutral-900 mb-4 font-bold tracking-tight">Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-neutral-900">Daily Quest Reminders</p>
                      <p className="text-xs text-neutral-500">Get notified about new quests</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neutral-900"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-neutral-900">Streak Protection Alerts</p>
                      <p className="text-xs text-neutral-500">Warning when streak is at risk</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neutral-900"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-neutral-900">Weekly Progress Reports</p>
                      <p className="text-xs text-neutral-500">Summary of your achievements</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neutral-900"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
