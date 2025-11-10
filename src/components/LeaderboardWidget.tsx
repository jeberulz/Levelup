'use client';

import { Trophy, Medal, Award, Users } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  isCurrentUser?: boolean;
}

interface LeaderboardWidgetProps {
  entries: LeaderboardEntry[];
  userRank: number;
  userXP: number;
  onViewCommunity?: () => void;
}

export default function LeaderboardWidget({ entries, userRank, userXP, onViewCommunity }: LeaderboardWidgetProps) {
  const getRankIcon = (rank: number) => {
    switch(rank) {
      case 1: return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 2: return <Medal className="h-4 w-4 text-neutral-400" />;
      case 3: return <Award className="h-4 w-4 text-orange-600" />;
      default: return <span className="text-xs text-neutral-500">#{rank}</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-neutral-900">Leaderboard</h3>
        <span className="px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-700">
          This Week
        </span>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              entry.isCurrentUser 
                ? 'bg-neutral-100 ring-2 ring-neutral-900' 
                : 'hover:bg-neutral-50'
            }`}
          >
            <div className="w-8 flex items-center justify-center">
              {getRankIcon(entry.rank)}
            </div>
            <img
              src={entry.avatar}
              alt={entry.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className={`truncate ${
                entry.isCurrentUser ? 'text-neutral-900' : 'text-neutral-700'
              }`}>
                {entry.name}
                {entry.isCurrentUser && <span className="text-xs text-neutral-500 ml-2">(You)</span>}
              </p>
            </div>
            <span className="text-neutral-900">{entry.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </div>

      {userRank > 5 && (
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-neutral-100">
            <div className="w-8 flex items-center justify-center">
              <span className="text-xs text-neutral-700">#{userRank}</span>
            </div>
            <div className="flex-1">
              <p className="text-neutral-700">Your Position</p>
            </div>
            <span className="text-neutral-900">{userXP.toLocaleString()} XP</span>
          </div>
        </div>
      )}

      {onViewCommunity && (
        <div className="mt-4">
          <button
            className="flex items-center gap-2 px-3 py-2 bg-neutral-100 rounded-full text-xs text-neutral-700 hover:bg-neutral-200"
            onClick={onViewCommunity}
          >
            <Users className="h-4 w-4" />
            View Community
          </button>
        </div>
      )}
    </div>
  );
}