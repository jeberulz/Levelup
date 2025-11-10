'use client';

import { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  onClick?: () => void;
  isClickable?: boolean;
}

function StatCard({ label, value, icon: Icon, trend, onClick, isClickable }: StatCardProps) {
  const Component = isClickable ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`bg-white rounded-xl border border-neutral-200 p-6 text-left w-full ${
        isClickable ? 'cursor-pointer hover:border-neutral-300 hover:shadow-md transition-all group' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center">
          <Icon className="h-5 w-5 text-neutral-900" />
        </div>
        {trend && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            trend.isPositive 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
        )}
        {isClickable && !trend && (
          <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
        )}
      </div>
      <p className="text-neutral-900 mb-1">{value}</p>
      <p className="text-neutral-600">{label}</p>
    </Component>
  );
}

interface StatsGridProps {
  stats: StatCardProps[];
  onAchievementsClick?: () => void;
}

export default function StatsGrid({ stats, onAchievementsClick }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard 
          key={index} 
          {...stat} 
          onClick={stat.label === 'Achievements' ? onAchievementsClick : undefined}
          isClickable={stat.label === 'Achievements'}
        />
      ))}
    </div>
  );
}