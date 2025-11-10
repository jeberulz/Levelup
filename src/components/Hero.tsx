'use client';

import { useEffect, useRef, useState } from 'react';
import { Rocket, Play, Trophy, LineChart } from 'lucide-react';
import AuthModal from './AuthModal';
import { useRipple } from '../hooks/useRipple';

const studentImages = [
  "https://images.unsplash.com/photo-1609126396762-542d99fc7a07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256",
  "https://images.unsplash.com/photo-1758639842445-b58f639119d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256",
  "https://images.unsplash.com/photo-1594686900103-3c9698dbb31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=256"
];

export default function Hero() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const ripple = useRipple({ color: 'rgba(255, 255, 255, 0.4)' });

  useEffect(() => {
    const items = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window && items.length > 0) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.remove('opacity-0', 'translate-y-8', 'blur-md');
            el.classList.add('opacity-100', 'translate-y-0', 'blur-0');
            observerRef.current?.unobserve(el);
          }
        });
      }, { threshold: 0.15 });

      items.forEach(el => observerRef.current?.observe(el));
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <section className="sm:px-8 max-w-7xl mx-auto px-6 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left: Copy */}
        <div className="max-w-xl">
          {/* Social proof */}
          <div className="flex gap-3 mb-6 items-center transition-all duration-700 ease-out opacity-0 translate-y-8 blur-md" data-animate>
            <div className="flex -space-x-2">
              {studentImages.map((src, i) => (
                <img key={i} className="ring-2 ring-white w-7 h-7 object-cover rounded-full" src={src} alt={`Student ${i + 1}`} />
              ))}
            </div>
            <p className="text-sm text-neutral-600">
              <span className="font-medium text-neutral-900">200,000+</span> learners leveling up money skills
            </p>
          </div>

          {/* Headline */}
          <h1 className="sm:text-5xl lg:text-[64px] leading-[1.05] text-4xl font-bold tracking-tighter mb-6 transition-all duration-700 ease-out delay-150 opacity-0 translate-y-8 blur-md" data-animate>
            Turn money skills into a daily streak
          </h1>

          <p className="sm:text-lg leading-relaxed text-base text-neutral-700 mb-8 transition-all duration-700 ease-out delay-300 opacity-0 translate-y-8 blur-md" data-animate>
            Bite-sized lessons, levels, and leaderboards. Master budgeting, investing, and credit—without the boring.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-5 mb-12 transition-all duration-700 ease-out delay-[450ms] opacity-0 translate-y-8 blur-md" data-animate>
            <button 
              onClick={(e) => {
                ripple(e);
                setIsAuthModalOpen(true);
              }}
              className="group inline-flex items-center hover:bg-neutral-800 transition-colors text-white bg-neutral-900 rounded-full pt-3 pr-3 pb-3 pl-6 shadow-lg relative overflow-hidden"
            >
              <span>Start Free</span>
              <span className="ml-3 inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 ring-1 ring-white/15 group-hover:bg-white/15">
                <Rocket className="h-4 w-4" />
              </span>
            </button>
            <button className="inline-flex items-center gap-2 text-neutral-900 font-medium hover:opacity-80">
              Watch 60s demo
              <Play className="h-4 w-4" />
            </button>
          </div>

          {/* Partners / Trust */}
          <div className="transition-all duration-700 ease-out delay-[600ms] opacity-0 translate-y-8 blur-md" data-animate>
            <p className="text-sm text-neutral-500 mb-4">Trusted by campuses and creators</p>
          </div>
        </div>

        {/* Right: Media card with overlays */}
        <div className="relative">
          <div className="relative overflow-hidden ring-1 ring-black/10 bg-neutral-50 rounded-[28px] shadow-lg">
            <style>{`
              @keyframes marquee-vertical-hero {
                from { transform: translateY(0); }
                to { transform: translateY(-50%); }
              }
              .animate-marquee-vertical-hero { 
                animation: marquee-vertical-hero 40s linear infinite; 
              }
            `}</style>
            <div className="relative sm:h-[760px] h-[600px] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1730818875087-182c15e1e7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600" 
                alt="App preview background" 
                className="absolute inset-0 w-full h-full object-cover" 
              />

              {/* Top-right pills */}
              <div className="absolute top-4 right-4 flex gap-2 z-20 items-center">
                <span className="sm:px-4 sm:text-sm ring-white/10 ring-1 text-xs text-white bg-black/60 rounded-full pt-2 pr-3 pb-2 pl-3 backdrop-blur-md">Budget</span>
                <span className="sm:px-4 ring-1 ring-white/10 sm:text-sm text-xs text-white bg-black/60 rounded-full pt-2 pr-3 pb-2 pl-3 backdrop-blur-md">Invest</span>
                <span className="px-3 sm:px-4 py-2 rounded-full bg-black/75 backdrop-blur-md ring-1 ring-white/15 text-xs sm:text-sm text-white font-medium hover:bg-black/85 transition">Credit</span>
              </div>

              {/* Scrolling container with mask */}
              <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
                <div className="animate-marquee-vertical-hero">
                  {/* Screen Set 1 */}
                  <div className="sm:h-[760px] w-full h-[600px] relative">
                    {/* Quote bubble */}
                    <div className="absolute left-4 sm:left-6 top-20 sm:top-64 max-w-[260px] sm:max-w-xs">
                      <div className="flex gap-3 sm:px-5 sm:py-4 ring-white/10 ring-1 bg-black/70 rounded-3xl pt-3 pr-4 pb-3 pl-4 backdrop-blur-md items-start">
                        <img className="w-8 h-8 object-cover rounded-full" src={studentImages[0]} alt="Student headshot" />
                        <p className="text-[13px] sm:text-sm leading-snug text-white/90">"I finally stuck to a budget—30-day streak!"</p>
                      </div>
                    </div>

                    {/* Watch demo */}
                    <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2">
                      <a href="#demo" className="flex gap-3 bg-black/70 ring-white/10 ring-1 rounded-full pt-2 pr-2 pb-2 pl-4 shadow backdrop-blur-md items-center">
                        <span className="text-[13px] sm:text-sm text-white/90">Watch 60s demo</span>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:bg-white/90 transition">
                          <Play className="h-4 w-4" />
                        </span>
                      </a>
                    </div>

                    {/* Bottom-left label */}
                    <div className="absolute left-4 sm:left-6 bottom-6">
                      <div className="px-3.5 py-2 rounded-full bg-black/70 backdrop-blur-md ring-1 ring-white/10 text-[12px] sm:text-xs text-white/90 shadow-sm">
                        Streaks, levels, and real progress
                      </div>
                    </div>

                    {/* Bottom-right: Leaderboard */}
                    <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-32 w-[230px] sm:w-[260px]">
                      <div className="bg-black/70 ring-white/10 ring-1 rounded-3xl pt-4 pr-4 pb-4 pl-4 shadow backdrop-blur-md">
                        <p className="font-medium text-white mb-1 tracking-tight">Leaderboard</p>
                        <p className="text-[13px] text-white/80 leading-snug mb-3">Compete with friends and campus clubs. Keep your streak alive.</p>
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {studentImages.map((src, i) => (
                              <img key={i} className="h-7 w-7 rounded-full ring-2 ring-black object-cover" src={src} alt={`Avatar ${i + 1}`} />
                            ))}
                            <img className="h-7 w-7 rounded-full ring-2 ring-black object-cover" src={studentImages[0]} alt="Avatar 4" />
                          </div>
                          <div className="flex items-center gap-1 text-white/80">
                            <Trophy className="h-4 w-4" />
                            <span className="text-sm font-medium">Top 1%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Screen Set 2 */}
                  <div className="relative w-full sm:h-[760px] h-[600px]">
                    <div className="absolute left-4 sm:left-6 top-20 sm:top-24 max-w-[260px] sm:max-w-xs">
                      <div className="flex gap-3 sm:px-5 sm:py-4 bg-black/70 ring-white/10 ring-1 rounded-3xl pt-3 pr-4 pb-3 pl-4 backdrop-blur-md items-start">
                        <img className="h-8 w-8 rounded-full object-cover" src={studentImages[1]} alt="Student headshot" />
                        <p className="text-[13px] sm:text-sm text-white/90 leading-snug">"Investing finally makes sense."</p>
                      </div>
                    </div>

                    <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2">
                      <a href="#demo" className="flex gap-3 ring-white/10 ring-1 bg-black/70 rounded-full pt-2 pr-2 pb-2 pl-4 shadow-sm backdrop-blur-md items-center">
                        <span className="text-[13px] sm:text-sm text-white/90">Watch 60s demo</span>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-black hover:bg-white/90 transition">
                          <Play className="h-4 w-4" />
                        </span>
                      </a>
                    </div>

                    <div className="absolute left-4 sm:left-6 bottom-6">
                      <div className="px-3.5 py-2 rounded-full bg-black/70 backdrop-blur-md ring-1 ring-white/10 text-[12px] sm:text-xs text-white/90 shadow-sm">
                        Learn by doing—no risk
                      </div>
                    </div>

                    <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 w-[230px] sm:w-[260px]">
                      <div className="ring-1 ring-white/10 bg-black/70 rounded-3xl pt-4 pr-4 pb-4 pl-4 shadow-sm backdrop-blur-md">
                        <p className="font-medium text-white mb-1 tracking-tight">Invest Quest</p>
                        <p className="text-[13px] text-white/80 leading-snug mb-3">Simulate portfolios, understand risk, and build confidence.</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-white/80">
                            <LineChart className="h-4 w-4" />
                            <span className="text-sm font-medium">+12 lessons</span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs rounded-full bg-white/10 px-2 py-1 ring-1 ring-white/10">New</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
}