'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import FeaturesSection from '@/components/FeaturesSection';
import PricingSection from '@/components/PricingSection';
import SocialProofSection from '@/components/SocialProofSection';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import DemoModal from '@/components/DemoModal';

export default function HomePage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and redirect to dashboard
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      router.push('/dashboard');
      return;
    }

    // Scroll-in animations
    const items = document.querySelectorAll('[data-animate]');
    if (!('IntersectionObserver' in window) || items.length === 0) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.remove('opacity-0', 'translate-y-8', 'blur-md');
          el.classList.add('opacity-100', 'translate-y-0', 'blur-0');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(el => io.observe(el));

    return () => io.disconnect();
  }, [router]);

  return (
    <div className="antialiased bg-white text-neutral-900 min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <PricingSection />
        <SocialProofSection />
        <FAQSection />
        <FinalCTA onOpenDemo={() => setIsDemoOpen(true)} />
      </main>
      <Footer />
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}

