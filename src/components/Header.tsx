import { useState, useEffect } from 'react';
import { Diamond, Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="relative">
      <div className="lg:px-8 max-w-7xl mx-auto px-6">
        <div className="flex pt-8 pb-8 items-center justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 ring-1 ring-black/5 text-white bg-neutral-900 rounded-full shadow-sm items-center justify-center">
              <Diamond className="w-4 h-4" />
            </div>
            <span className="text-[17px] uppercase font-semibold tracking-tighter">LevelUP</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600">
            <a href="#features" className="hover:text-neutral-900 transition-colors">Features</a>
            <a href="#how" className="hover:text-neutral-900 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-neutral-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-neutral-900 transition-colors">FAQ</a>
            <a href="#download" className="inline-flex items-center gap-2 hover:bg-neutral-800 transition-colors bg-neutral-900 text-white rounded-full pt-2 pr-4 pb-2 pl-4 shadow-lg">
              Start Free
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex hover:bg-neutral-100 transition-colors bg-neutral-50 w-10 h-10 rounded-full items-center justify-center"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-neutral-900" />
            ) : (
              <Menu className="w-5 h-5 text-neutral-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-50">
            <nav className="pt-6 pr-6 pb-6 pl-6 space-y-4">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block hover:text-neutral-900 transition-colors text-base text-neutral-600 pt-2 pb-2">Features</a>
              <a href="#how" onClick={() => setMobileMenuOpen(false)} className="block hover:text-neutral-900 transition-colors text-base text-neutral-600 pt-2 pb-2">How It Works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block hover:text-neutral-900 transition-colors text-base text-neutral-600 pt-2 pb-2">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block hover:text-neutral-900 transition-colors text-base text-neutral-600 pt-2 pb-2">FAQ</a>
              <div className="pt-4 border-t border-neutral-200">
                <a href="#download" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center gap-2 hover:bg-neutral-800 transition-colors justify-center text-white bg-neutral-900 w-full rounded-full pt-3 pr-4 pb-3 pl-4 shadow-lg">
                  Start Free
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
