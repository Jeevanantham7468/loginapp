import React, { useState, useEffect } from 'react';
import BrandHeader from './components/BrandHeader';
import LoginForm from './components/LoginForm';
import QuickDemoUsers from './components/QuickDemoUsers';
import Dashboard from './components/Dashboard';
import AlertBanner from './components/AlertBanner';
import { loginApi, fetchDemoUsersApi, checkHealthApi } from './api/auth';
import { Server, Wifi, ShieldAlert } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('novapulse_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('novapulse_token') || null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'error' | 'success' | 'info', title: string, message: string }
  const [demoUsers, setDemoUsers] = useState([]);
  const [fillEmail, setFillEmail] = useState('');
  const [fillPassword, setFillPassword] = useState('');
  const [serverStatus, setServerStatus] = useState('checking'); // 'online' | 'offline' | 'checking'

  // Check backend server status and fetch demo accounts
  useEffect(() => {
    const checkServer = async () => {
      try {
        const isOnline = await checkHealthApi();
        if (isOnline) {
          setServerStatus('online');
          const users = await fetchDemoUsersApi();
          if (users && users.length) setDemoUsers(users);
        } else {
          setServerStatus('offline');
        }
      } catch (e) {
        setServerStatus('offline');
      }
    };
    checkServer();
  }, []);

  const handleLogin = async ({ email, password, rememberMe }) => {
    setIsLoading(true);
    setAlert(null);

    // Call backend login endpoint
    const result = await loginApi(email, password);
    setIsLoading(false);

    if (result.success) {
      setCurrentUser(result.user);
      setAuthToken(result.token);
      if (rememberMe) {
        localStorage.setItem('novapulse_user', JSON.stringify(result.user));
        localStorage.setItem('novapulse_token', result.token);
      }
      setAlert({
        type: 'success',
        title: 'Authentication Successful',
        message: `Welcome back, ${result.user.name}! Access granted to workspace.`,
      });
    } else {
      setAlert({
        type: 'error',
        title: result.error || 'Authentication Failed',
        message: result.message || 'Please verify your credentials and try again.',
      });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem('novapulse_user');
    localStorage.removeItem('novapulse_token');
    setAlert({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been safely signed out of your session.',
    });
  };

  const handleDemoSelect = (email, password) => {
    setFillEmail(email);
    setFillPassword(password);
    setAlert({
      type: 'info',
      title: 'Demo Credentials Loaded',
      message: `Selected account: ${email}. Click "Sign In" to proceed.`,
    });
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 glow-ambient-1 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 glow-ambient-2 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 right-1/3 w-80 h-80 glow-ambient-3 rounded-full blur-3xl pointer-events-none"></div>

      {/* Backend Status Badge in corner */}
      <div className="absolute top-4 right-4 z-50">
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border backdrop-blur-md transition-colors ${
            serverStatus === 'online'
              ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
              : serverStatus === 'offline'
              ? 'bg-rose-950/60 border-rose-500/30 text-rose-400'
              : 'bg-slate-900/60 border-slate-700 text-slate-400'
          }`}
          title="Backend Express Gateway status"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              serverStatus === 'online'
                ? 'bg-emerald-400 animate-pulse'
                : serverStatus === 'offline'
                ? 'bg-rose-400'
                : 'bg-amber-400'
            }`}
          ></span>
          <span>API: {serverStatus.toUpperCase()}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {currentUser ? (
          /* Logged In: Dummy Dashboard View */
          <Dashboard user={currentUser} token={authToken} onLogout={handleLogout} />
        ) : (
          /* Logged Out: Modern Login Page View */
          <div className="w-full max-w-md animate-fade-in">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl">
              <BrandHeader subtitle="Next-Generation Cloud Intelligence & Developer Workspace" />

              {/* Alert Notification */}
              {alert && (
                <AlertBanner
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  onClose={() => setAlert(null)}
                />
              )}

              {/* Login Form */}
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                initialEmail={fillEmail}
                initialPassword={fillPassword}
              />

              {/* Quick Demo Autofill Section */}
              <QuickDemoUsers
                users={demoUsers}
                onSelectUser={handleDemoSelect}
              />
            </div>

            {/* Footer note */}
            <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <Server className="w-3.5 h-3.5" />
              <span>Full-Stack Integration (React 18 + Vite + Express.js API)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
