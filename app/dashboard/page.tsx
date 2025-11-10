'use client';

import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  const handleLogout = () => {
    // For prototype - just redirect to home
    window.location.href = '/';
  };

  return <Dashboard onLogout={handleLogout} />;
}

