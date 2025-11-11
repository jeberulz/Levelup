import Dashboard from './components/Dashboard';

export default function AppDashboard() {
  const handleLogout = () => {
    console.log('Logout clicked');
    window.location.href = '/';
  };

  return <Dashboard onLogout={handleLogout} />;
}