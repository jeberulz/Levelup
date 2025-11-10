import { Trophy, Flame, LogOut, Settings } from 'lucide-react';

interface DashboardHeaderProps {
  userName: string;
  userLevel: number;
  currentStreak: number;
  userAvatar?: string;
  onLogout: () => void;
  onProfileClick?: () => void;
}

export default function DashboardHeader({ 
  userName, 
  userLevel, 
  currentStreak, 
  userAvatar,
  onLogout,
  onProfileClick
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-neutral-900 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-neutral-900">LevelUp Money</h1>
              <p className="text-xs text-neutral-500">Financial Mastery</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            {/* Streak */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
              <Flame className="h-5 w-5 text-orange-500" />
              <div className="flex flex-col">
                <span className="text-orange-900">{currentStreak} day streak</span>
              </div>
            </div>

            {/* Level Badge */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
              <div className="h-6 w-6 rounded-full bg-neutral-900 flex items-center justify-center">
                <span className="text-white text-xs">{userLevel}</span>
              </div>
              <span className="text-neutral-700">Level {userLevel}</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <button 
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5 text-neutral-600" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-neutral-200">
                <button
                  onClick={onProfileClick}
                  className="relative group"
                  aria-label="View profile"
                >
                  <img 
                    src={userAvatar || "https://images.unsplash.com/photo-1609126396762-542d99fc7a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256"} 
                    alt={userName}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-neutral-200 group-hover:ring-neutral-400 transition-all cursor-pointer"
                  />
                </button>
                <button
                  onClick={onProfileClick}
                  className="hidden md:block hover:text-neutral-600 transition-colors"
                >
                  <p className="text-neutral-900">{userName}</p>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4 text-neutral-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}