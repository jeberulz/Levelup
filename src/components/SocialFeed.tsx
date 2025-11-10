'use client';

import { useState } from 'react';
import { 
  X, 
  Heart,
  MessageCircle,
  Share2,
  Trophy,
  Target,
  TrendingUp,
  Flame,
  Award,
  BookOpen,
  DollarSign,
  Users,
  ChevronDown,
  Sparkles,
  Send,
  MoreHorizontal,
  UserPlus,
  Check
} from 'lucide-react';

interface SocialFeedProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    name: string;
    avatar: string;
  };
}

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: number;
  };
  type: 'achievement' | 'quest' | 'level_up' | 'streak' | 'lesson' | 'budget' | 'milestone';
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  metadata?: {
    achievementName?: string;
    achievementRarity?: string;
    questName?: string;
    level?: number;
    streakDays?: number;
    lessonName?: string;
    xpEarned?: number;
  };
}

export default function SocialFeed({ isOpen, onClose, currentUser }: SocialFeedProps) {
  const [filterTab, setFilterTab] = useState<'all' | 'friends' | 'achievements'>('all');
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set([
    'Alex Rivera',
    'Jordan Kim',
    'Sarah Chen'
  ]));
  
  // Mock activity data
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      user: {
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
        level: 12
      },
      type: 'achievement',
      content: 'Just unlocked the "Quest Master" achievement! 50 quests completed! 🎉',
      timestamp: '2 minutes ago',
      likes: 24,
      comments: 5,
      isLiked: false,
      metadata: {
        achievementName: 'Quest Master',
        achievementRarity: 'epic',
        xpEarned: 300
      }
    },
    {
      id: '2',
      user: {
        name: 'Jordan Kim',
        avatar: 'https://images.unsplash.com/photo-1594686900103-3c9698dbb31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
        level: 9
      },
      type: 'level_up',
      content: 'Level 9 unlocked! The grind continues 💪',
      timestamp: '15 minutes ago',
      likes: 18,
      comments: 3,
      isLiked: true,
      metadata: {
        level: 9,
        xpEarned: 0
      }
    },
    {
      id: '3',
      user: {
        name: 'Sarah Chen',
        avatar: currentUser.avatar,
        level: 7
      },
      type: 'streak',
      content: '🔥 Hit a 30-day streak! Consistency is key!',
      timestamp: '1 hour ago',
      likes: 45,
      comments: 12,
      isLiked: false,
      metadata: {
        streakDays: 30,
        achievementName: 'Month Master'
      }
    },
    {
      id: '4',
      user: {
        name: 'Marcus Lee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
        level: 11
      },
      type: 'budget',
      content: 'Created my first budget using the 50/30/20 rule! Feeling more in control of my finances 📊',
      timestamp: '2 hours ago',
      likes: 31,
      comments: 8,
      isLiked: true,
      metadata: {
        xpEarned: 100
      }
    },
    {
      id: '5',
      user: {
        name: 'Priya Patel',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
        level: 8
      },
      type: 'lesson',
      content: 'Finished "Investing 101" learning path! Ready to start building my portfolio 🚀',
      timestamp: '3 hours ago',
      likes: 27,
      comments: 6,
      isLiked: false,
      metadata: {
        lessonName: 'Investing 101',
        xpEarned: 500
      }
    },
    {
      id: '6',
      user: {
        name: 'Chris Anderson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
        level: 15
      },
      type: 'milestone',
      content: '🎊 Reached 10,000 total XP! This app has changed my relationship with money!',
      timestamp: '5 hours ago',
      likes: 89,
      comments: 23,
      isLiked: true,
      metadata: {
        xpEarned: 10000
      }
    },
    {
      id: '7',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
        level: 6
      },
      type: 'quest',
      content: 'Completed my first daily quest! Small steps lead to big changes 🎯',
      timestamp: '6 hours ago',
      likes: 15,
      comments: 4,
      isLiked: false,
      metadata: {
        questName: 'Track Your Daily Spending',
        xpEarned: 50
      }
    },
    {
      id: '8',
      user: {
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256',
        level: 12
      },
      type: 'achievement',
      content: 'Earned "Knowledge Seeker" badge! Learning never stops 📚',
      timestamp: '1 day ago',
      likes: 34,
      comments: 7,
      isLiked: false,
      metadata: {
        achievementName: 'Knowledge Seeker',
        achievementRarity: 'rare',
        xpEarned: 150
      }
    }
  ]);

  // Mock comments data
  const commentsData: Record<string, any[]> = {
    '1': [
      { user: 'Jordan Kim', avatar: 'https://images.unsplash.com/photo-1594686900103-3c9698dbb31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', text: 'Congrats! That\'s amazing! 🎉', time: '1 min ago' },
      { user: 'Marcus Lee', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', text: 'Inspiring! How long did it take?', time: '5 mins ago' },
      { user: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', text: 'Well deserved! 💪', time: '8 mins ago' }
    ],
    '3': [
      { user: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', text: 'You\'re crushing it! 🔥', time: '45 mins ago' },
      { user: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', text: 'So motivating! Can\'t wait to hit 30 days too!', time: '50 mins ago' }
    ]
  };

  const handleLike = (activityId: string) => {
    setActivities(activities.map(activity => 
      activity.id === activityId
        ? { 
            ...activity, 
            likes: activity.isLiked ? activity.likes - 1 : activity.likes + 1,
            isLiked: !activity.isLiked 
          }
        : activity
    ));
  };

  const handleComment = (activityId: string) => {
    setCommentingOn(activityId);
    setCommentText('');
  };

  const handleSubmitComment = (activityId: string) => {
    if (commentText.trim()) {
      // In a real app, this would send the comment to the backend
      console.log('Submitting comment:', commentText, 'on activity:', activityId);
      
      // Update comment count
      setActivities(activities.map(activity => 
        activity.id === activityId
          ? { ...activity, comments: activity.comments + 1 }
          : activity
      ));
      
      setCommentingOn(null);
      setCommentText('');
    }
  };

  const toggleComments = (activityId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(activityId)) {
      newExpanded.delete(activityId);
    } else {
      newExpanded.add(activityId);
    }
    setExpandedComments(newExpanded);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return Trophy;
      case 'quest':
        return Target;
      case 'level_up':
        return TrendingUp;
      case 'streak':
        return Flame;
      case 'lesson':
        return BookOpen;
      case 'budget':
        return DollarSign;
      case 'milestone':
        return Sparkles;
      default:
        return Award;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'bg-yellow-100 text-yellow-600';
      case 'quest':
        return 'bg-blue-100 text-blue-600';
      case 'level_up':
        return 'bg-purple-100 text-purple-600';
      case 'streak':
        return 'bg-orange-100 text-orange-600';
      case 'lesson':
        return 'bg-green-100 text-green-600';
      case 'budget':
        return 'bg-emerald-100 text-emerald-600';
      case 'milestone':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'common':
        return 'from-neutral-500 to-neutral-600';
      case 'rare':
        return 'from-blue-500 to-blue-600';
      case 'epic':
        return 'from-purple-500 to-purple-600';
      case 'legendary':
        return 'from-yellow-500 to-orange-600';
      default:
        return 'from-neutral-500 to-neutral-600';
    }
  };

  const handleFollowToggle = (userName: string) => {
    const newFollowed = new Set(followedUsers);
    if (newFollowed.has(userName)) {
      newFollowed.delete(userName);
    } else {
      newFollowed.add(userName);
    }
    setFollowedUsers(newFollowed);
  };

  // Filter activities based on selected tab
  const getFilteredActivities = () => {
    switch (filterTab) {
      case 'friends':
        return activities.filter(activity => followedUsers.has(activity.user.name));
      case 'achievements':
        return activities.filter(activity => 
          activity.type === 'achievement' || 
          activity.type === 'level_up' || 
          activity.type === 'milestone'
        );
      default:
        return activities;
    }
  };

  const filteredActivities = getFilteredActivities();

  // Suggested friends (users not followed)
  const allUsers = [
    { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', level: 12, xp: 3240 },
    { name: 'Jordan Kim', avatar: 'https://images.unsplash.com/photo-1594686900103-3c9698dbb31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', level: 9, xp: 2150 },
    { name: 'Sarah Chen', avatar: currentUser.avatar, level: 7, xp: 1680 },
    { name: 'Marcus Lee', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', level: 11, xp: 2890 },
    { name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', level: 8, xp: 1950 },
    { name: 'Chris Anderson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', level: 15, xp: 4320 },
    { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256', level: 6, xp: 1420 }
  ];

  const suggestedFriends = allUsers.filter(user => 
    !followedUsers.has(user.name) && user.name !== currentUser.name
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            aria-label="Close social feed"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="pr-12">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-8 w-8 text-blue-400" />
              <h2 className="text-white">Community Feed</h2>
            </div>
            <p className="text-white/80">
              See what your friends are achieving and share your own progress
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="border-b border-neutral-200 bg-white px-6">
          <div className="flex gap-6">
            {[
              { id: 'all', label: 'All Activity', icon: Users },
              { id: 'friends', label: 'Friends', icon: Heart },
              { id: 'achievements', label: 'Achievements', icon: Trophy }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = filterTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    isActive
                      ? 'border-neutral-900 text-neutral-900'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area - Activity Feed */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Post Something */}
          <div className="bg-white border border-neutral-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <img 
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <button
                className="flex-1 text-left px-4 py-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg text-neutral-500 transition-colors"
                onClick={() => alert('Share feature coming soon! Post your achievements and progress.')}
              >
                Share your progress...
              </button>
            </div>
          </div>

          {/* Friends Tab Content */}
          {filterTab === 'friends' && (
            <>
              {/* Friend Suggestions */}
              {suggestedFriends.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-neutral-900 mb-3">Suggested Friends</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {suggestedFriends.map(user => (
                      <div key={user.name} className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img 
                                src={user.avatar}
                                alt={user.name}
                                className="h-12 w-12 rounded-full object-cover"
                              />
                              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center ring-2 ring-white">
                                {user.level}
                              </div>
                            </div>
                            <div>
                              <p className="text-neutral-900">{user.name}</p>
                              <p className="text-xs text-neutral-500">{user.xp.toLocaleString()} XP</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleFollowToggle(user.name)}
                            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                          >
                            <UserPlus className="h-4 w-4" />
                            <span className="text-sm">Follow</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Following List */}
              <div className="mb-6">
                <h3 className="text-neutral-900 mb-3">Following ({followedUsers.size})</h3>
                <div className="grid grid-cols-1 gap-3">
                  {allUsers.filter(u => followedUsers.has(u.name)).map(user => (
                    <div key={user.name} className="bg-white border border-neutral-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img 
                              src={user.avatar}
                              alt={user.name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center ring-2 ring-white">
                              {user.level}
                            </div>
                          </div>
                          <div>
                            <p className="text-neutral-900">{user.name}</p>
                            <p className="text-xs text-neutral-500">{user.xp.toLocaleString()} XP</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleFollowToggle(user.name)}
                          className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
                        >
                          <Check className="h-4 w-4" />
                          <span className="text-sm">Following</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Activity Items or Empty State */}
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="h-20 w-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                {filterTab === 'friends' ? (
                  <Heart className="h-10 w-10 text-neutral-400" />
                ) : (
                  <Trophy className="h-10 w-10 text-neutral-400" />
                )}
              </div>
              <h3 className="text-neutral-900 mb-2">No Activity Yet</h3>
              <p className="text-neutral-600 max-w-sm mx-auto">
                {filterTab === 'friends' 
                  ? "Follow some friends to see their activity in your feed!"
                  : "No achievement posts to show. Check back later!"
                }
              </p>
            </div>
          ) : (
          <div className="space-y-4">
              {filteredActivities.map(activity => {
              const Icon = getActivityIcon(activity.type);
              const colorClass = getActivityColor(activity.type);
              const hasComments = commentsData[activity.id] && commentsData[activity.id].length > 0;
              const showComments = expandedComments.has(activity.id);

              return (
                <div key={activity.id} className="bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  {/* User Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center ring-2 ring-white">
                          {activity.user.level}
                        </div>
                      </div>
                      <div>
                        <p className="text-neutral-900">{activity.user.name}</p>
                        <p className="text-xs text-neutral-500">{activity.timestamp}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {activity.user.name !== currentUser.name && (
                        <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                          <UserPlus className="h-4 w-4 text-neutral-600" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-neutral-600" />
                      </button>
                    </div>
                  </div>

                  {/* Activity Content */}
                  <div className="mb-4">
                    <p className="text-neutral-800 mb-3">{activity.content}</p>
                    
                    {/* Activity Badge/Card */}
                    {activity.metadata && (
                      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-12 w-12 rounded-lg ${colorClass} flex items-center justify-center`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            {activity.metadata.achievementName && (
                              <div>
                                <p className="text-neutral-900">{activity.metadata.achievementName}</p>
                                {activity.metadata.achievementRarity && (
                                  <p className="text-xs text-neutral-500 capitalize">{activity.metadata.achievementRarity} Achievement</p>
                                )}
                              </div>
                            )}
                            {activity.metadata.questName && (
                              <p className="text-neutral-900">{activity.metadata.questName}</p>
                            )}
                            {activity.metadata.lessonName && (
                              <p className="text-neutral-900">{activity.metadata.lessonName}</p>
                            )}
                            {activity.metadata.level && (
                              <p className="text-neutral-900">Level {activity.metadata.level}</p>
                            )}
                            {activity.metadata.streakDays && (
                              <p className="text-neutral-900">{activity.metadata.streakDays} Day Streak</p>
                            )}
                            {activity.type === 'budget' && (
                              <p className="text-neutral-900">Budget Created</p>
                            )}
                            {activity.type === 'milestone' && (
                              <p className="text-neutral-900">Milestone Reached</p>
                            )}
                          </div>
                          {activity.metadata.xpEarned && activity.metadata.xpEarned > 0 && (
                            <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 rounded-full">
                              <Sparkles className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm text-yellow-700">+{activity.metadata.xpEarned}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Interaction Buttons */}
                  <div className="flex items-center gap-1 pt-3 border-t border-neutral-200">
                    <button
                      onClick={() => handleLike(activity.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        activity.isLiked
                          ? 'bg-red-50 text-red-600'
                          : 'hover:bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${activity.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{activity.likes}</span>
                    </button>
                    
                    <button
                      onClick={() => toggleComments(activity.id)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 text-neutral-600 rounded-lg transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{activity.comments}</span>
                    </button>

                    <button
                      onClick={() => alert('Share feature coming soon!')}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-100 text-neutral-600 rounded-lg transition-colors ml-auto"
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm hidden sm:inline">Share</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {showComments && (
                    <div className="mt-4 pt-4 border-t border-neutral-200 space-y-3">
                      {hasComments && commentsData[activity.id].map((comment, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <img 
                            src={comment.avatar}
                            alt={comment.user}
                            className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 bg-neutral-50 rounded-lg p-3">
                            <p className="text-sm text-neutral-900 mb-1">{comment.user}</p>
                            <p className="text-sm text-neutral-700">{comment.text}</p>
                            <p className="text-xs text-neutral-500 mt-1">{comment.time}</p>
                          </div>
                        </div>
                      ))}

                      {/* Add Comment */}
                      <div className="flex items-start gap-3 mt-3">
                        <img 
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            value={commentingOn === activity.id ? commentText : ''}
                            onChange={(e) => {
                              setCommentingOn(activity.id);
                              setCommentText(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSubmitComment(activity.id);
                              }
                            }}
                            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                          />
                          <button
                            onClick={() => handleSubmitComment(activity.id)}
                            disabled={!commentText.trim()}
                            className="px-3 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          )}

          {/* Load More */}
          {filteredActivities.length > 0 && (
          <button className="w-full py-3 mt-6 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-colors flex items-center justify-center gap-2">
            <ChevronDown className="h-4 w-4" />
            <span>Load More Activities</span>
          </button>
          )}
        </div>
      </div>
    </div>
  );
}
