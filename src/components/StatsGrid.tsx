'use client';

import { useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

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
  
  // Extract numeric value if it's a number or contains numbers
  const numericValue = typeof value === 'number' 
    ? value 
    : parseInt(value.toString().replace(/\D/g, '')) || 0;
  
  // Only animate if value is numeric and not a string like "8/24"
  const shouldAnimate = typeof value === 'number' || /^\d+$/.test(value.toString());
  const animatedValue = shouldAnimate ? useCountUp(numericValue) : value;
  
  return (
    <Component
      onClick={onClick}
      className={`bg-white rounded-xl border border-neutral-200 p-6 text-left w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
        isClickable ? 'cursor-pointer hover:border-neutral-300 group' : ''
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
      <p className="text-neutral-900 mb-1">{animatedValue}</p>
      <p className="text-neutral-600">{label}</p>
    </Component>
  );
}

interface StatsGridProps {
  stats: StatCardProps[];
  onAchievementsClick?: () => void;
}

export default function StatsGrid({ stats, onAchievementsClick }: StatsGridProps) {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="opacity-0 translate-y-4 transition-all duration-500 ease-out"
          style={{
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'forwards'
          }}
          data-animate-stagger
        >
          <StatCard 
            {...stat} 
            onClick={stat.label === 'Achievements' ? onAchievementsClick : undefined}
            isClickable={stat.label === 'Achievements'}
          />
        </div>
      ))}
    </div>
  );
}