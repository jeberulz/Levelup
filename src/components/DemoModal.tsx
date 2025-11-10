'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative mx-auto my-10 w-[92%] max-w-3xl rounded-2xl overflow-hidden ring-1 ring-white/10 bg-neutral-900">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-white">LevelUp Money — 60s demo</p>
          <button 
            onClick={onClose}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/10 text-white hover:bg-white/20" 
            aria-label="Close demo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="aspect-video bg-black">
          <iframe 
            className="w-full h-full" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1" 
            title="LevelUp Money demo video" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
