'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, User, Chrome, Apple } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signup');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - would integrate with backend
    console.log('Form submitted:', { activeTab, formData });
    
    // Set authentication state in localStorage (mock)
    localStorage.setItem('isAuthenticated', 'true');
    
    // Navigate to dashboard
    router.push('/dashboard');
    onClose();
  };

  const handleSocialLogin = (provider: string) => {
    // Mock social login
    console.log(`${provider} login clicked`);
    
    // Set authentication state in localStorage (mock)
    localStorage.setItem('isAuthenticated', 'true');
    
    // Navigate to dashboard
    router.push('/dashboard');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-neutral-600" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-neutral-900 mb-2 font-bold tracking-tight">
              {activeTab === 'signup' ? 'Create Your Account' : 'Welcome Back'}
            </h2>
            <p className="text-neutral-600">
              {activeTab === 'signup' 
                ? 'Start your financial literacy journey today' 
                : 'Continue your path to financial mastery'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-neutral-100 rounded-lg">
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 px-4 rounded-md transition-all text-center ${
                activeTab === 'signup'
                  ? 'bg-white shadow-sm text-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-2 px-4 rounded-md transition-all text-center ${
                activeTab === 'signin'
                  ? 'bg-white shadow-sm text-neutral-900'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <Chrome className="h-5 w-5 text-neutral-700" />
              <span className="text-neutral-700">Continue with Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('Apple')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <Apple className="h-5 w-5 text-neutral-700" />
              <span className="text-neutral-700">Continue with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-neutral-500">or</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-neutral-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            {activeTab === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-neutral-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                </div>
              </div>
            )}

            {activeTab === 'signin' && (
              <div className="flex items-center justify-between text-neutral-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="hover:text-neutral-900 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white py-3 px-4 rounded-lg hover:bg-neutral-800 transition-colors shadow-lg mt-6"
            >
              {activeTab === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          {activeTab === 'signup' && (
            <p className="text-center text-neutral-600 mt-6">
              By signing up, you agree to our{' '}
              <a href="#" className="text-neutral-900 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-neutral-900 hover:underline">
                Privacy Policy
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}