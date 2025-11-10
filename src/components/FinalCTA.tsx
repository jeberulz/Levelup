'use client';

import { Rocket, Play } from 'lucide-react';

interface FinalCTAProps {
  onOpenDemo: () => void;
}

export default function FinalCTA({ onOpenDemo }: FinalCTAProps) {
  return (
    <section className="sm:px-8">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-16 -left-10 h-64 w-64 bg-blue-500/30 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-16 -right-10 h-64 w-64 bg-amber-400/30 blur-[120px] rounded-full"></div>
        </div>
        <div className="relative px-6 py-14 sm:px-10 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Your money game starts today</h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto leading-relaxed">Join free in 60 seconds. No credit card required. Cancel anytime.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/dashboard" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-neutral-900 font-medium hover:bg-white/90 transition">
              Start Free
              <Rocket className="h-4 w-4" />
            </a>
            <button 
              onClick={onOpenDemo}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white/10 ring-1 ring-white/20 text-white hover:bg-white/15 transition"
            >
              Watch Demo
              <Play className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-3 text-sm text-white/70">30-day money-back guarantee on Premium.</p>
        </div>
      </div>
    </section>
  );
}
