'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, X, Filter, ChevronDown } from 'lucide-react';
import LearningPathBrowseCard from '@/components/LearningPathBrowseCard';
import LearningPathModule from '@/components/LearningPathModule';
import { 
  Wallet, 
  TrendingUp, 
  CreditCard, 
  AlertCircle, 
  PiggyBank, 
  Building2, 
  Receipt, 
  Home,
  BookOpen
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface LearningPath {
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
}

export default function LearningPathsPage() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed' | 'available' | 'locked'>('all');
  const [sortBy, setSortBy] = useState<'progress' | 'title' | 'lessons' | 'xp'>('progress');
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [isLearningPathOpen, setIsLearningPathOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Expanded learning paths data
  const allLearningPaths: LearningPath[] = [
    {
      id: 'budget-basics',
      title: 'Budget Basics',
      description: 'Master the 50/30/20 rule and expense tracking',
      icon: Wallet,
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      locked: false,
      category: 'Budgeting',
      difficulty: 'beginner',
      estimatedTotalTime: '2 hours',
      totalXPReward: 1200,
      tags: ['budgeting', 'basics', 'expenses']
    },
    {
      id: 'investing-101',
      title: 'Investing 101',
      description: 'Learn stocks, ETFs, and portfolio building',
      icon: TrendingUp,
      progress: 40,
      totalLessons: 15,
      completedLessons: 6,
      locked: false,
      category: 'Investing',
      difficulty: 'intermediate',
      estimatedTotalTime: '3 hours',
      totalXPReward: 1500,
      tags: ['investing', 'stocks', 'portfolio']
    },
    {
      id: 'credit-mastery',
      title: 'Credit Mastery',
      description: 'Build and maintain excellent credit',
      icon: CreditCard,
      progress: 0,
      totalLessons: 10,
      completedLessons: 0,
      locked: true,
      category: 'Credit',
      difficulty: 'beginner',
      estimatedTotalTime: '1.5 hours',
      totalXPReward: 1000,
      tags: ['credit', 'credit-score', 'debt']
    },
    {
      id: 'debt-management',
      title: 'Debt Management',
      description: 'Strategies to pay off debt and stay debt-free',
      icon: AlertCircle,
      progress: 0,
      totalLessons: 11,
      completedLessons: 0,
      locked: false,
      category: 'Debt',
      difficulty: 'beginner',
      estimatedTotalTime: '2 hours',
      totalXPReward: 1100,
      tags: ['debt', 'payoff', 'strategies']
    },
    {
      id: 'savings-strategies',
      title: 'Savings Strategies',
      description: 'Build emergency funds and save for goals',
      icon: PiggyBank,
      progress: 0,
      totalLessons: 9,
      completedLessons: 0,
      locked: false,
      category: 'Savings',
      difficulty: 'beginner',
      estimatedTotalTime: '1.5 hours',
      totalXPReward: 900,
      tags: ['savings', 'emergency-fund', 'goals']
    },
    {
      id: 'retirement-planning',
      title: 'Retirement Planning',
      description: 'Plan for a secure financial future',
      icon: Building2,
      progress: 0,
      totalLessons: 14,
      completedLessons: 0,
      locked: false,
      category: 'Retirement',
      difficulty: 'intermediate',
      estimatedTotalTime: '2.5 hours',
      totalXPReward: 1400,
      tags: ['retirement', '401k', 'ira', 'planning']
    },
    {
      id: 'tax-basics',
      title: 'Tax Basics',
      description: 'Understand taxes and maximize your refund',
      icon: Receipt,
      progress: 0,
      totalLessons: 8,
      completedLessons: 0,
      locked: false,
      category: 'Taxes',
      difficulty: 'intermediate',
      estimatedTotalTime: '1.5 hours',
      totalXPReward: 800,
      tags: ['taxes', 'deductions', 'filing']
    },
    {
      id: 'real-estate-fundamentals',
      title: 'Real Estate Fundamentals',
      description: 'Navigate buying, selling, and investing in property',
      icon: Home,
      progress: 0,
      totalLessons: 13,
      completedLessons: 0,
      locked: false,
      category: 'Real Estate',
      difficulty: 'advanced',
      estimatedTotalTime: '3 hours',
      totalXPReward: 1300,
      tags: ['real-estate', 'mortgage', 'investing']
    }
  ];

  // Filter and sort learning paths
  const filteredAndSortedPaths = useMemo(() => {
    let filtered = allLearningPaths;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(path => 
        path.title.toLowerCase().includes(query) ||
        path.description.toLowerCase().includes(query) ||
        path.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    switch (filter) {
      case 'in-progress':
        filtered = filtered.filter(path => path.progress > 0 && path.progress < 100);
        break;
      case 'completed':
        filtered = filtered.filter(path => path.progress === 100);
        break;
      case 'available':
        filtered = filtered.filter(path => !path.locked);
        break;
      case 'locked':
        filtered = filtered.filter(path => path.locked);
        break;
      default:
        break;
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return b.progress - a.progress;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'lessons':
          return b.totalLessons - a.totalLessons;
        case 'xp':
          return b.totalXPReward - a.totalXPReward;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, filter, sortBy]);

  const handlePathClick = (path: LearningPath) => {
    if (path.locked) return;
    setSelectedPath(path);
    setIsLearningPathOpen(true);
  };

  const handleCloseLearningPath = () => {
    setIsLearningPathOpen(false);
    setSelectedPath(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-5 w-5 text-neutral-600" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                All Learning Paths
              </h1>
              <p className="text-neutral-600 mt-1">
                Explore all available courses and continue your learning journey
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search learning paths..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              />
              {searchInput && (
                <button
                  onClick={() => {
                    setSearchInput('');
                    setSearchQuery('');
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-neutral-100 rounded"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-neutral-400" />
                </button>
              )}
            </div>

            {/* Filter */}
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="appearance-none pl-4 pr-10 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent bg-white cursor-pointer"
              >
                <option value="all">All Paths</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="available">Available</option>
                <option value="locked">Locked</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none pl-4 pr-10 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent bg-white cursor-pointer"
              >
                <option value="progress">Sort by Progress</option>
                <option value="title">Sort by Title</option>
                <option value="lessons">Sort by Lessons</option>
                <option value="xp">Sort by XP</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredAndSortedPaths.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-20 w-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-10 w-10 text-neutral-400" />
            </div>
            <h3 className="text-neutral-900 mb-2 font-bold tracking-tight">No Learning Paths Found</h3>
            <p className="text-neutral-600 max-w-sm mx-auto">
              {searchQuery 
                ? `No paths match "${searchQuery}". Try adjusting your search or filters.`
                : 'No learning paths match your current filters. Try selecting a different filter.'}
            </p>
            {(searchInput || filter !== 'all') && (
              <button
                onClick={() => {
                  setSearchInput('');
                  setSearchQuery('');
                  setFilter('all');
                }}
                className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedPaths.map((path) => (
              <LearningPathBrowseCard
                key={path.id}
                {...path}
                onContinue={() => handlePathClick(path)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Learning Path Module */}
      {selectedPath && (
        <LearningPathModule
          isOpen={isLearningPathOpen}
          onClose={handleCloseLearningPath}
          pathTitle={selectedPath.title}
          pathIcon={selectedPath.icon}
          onComplete={() => {
            // Handle completion - could update progress here
            console.log('Path completed');
          }}
        />
      )}
    </div>
  );
}

