import React from 'react';
import { 
  LogOut, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Server, 
  Key, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  Database,
  Cpu
} from 'lucide-react';

export default function Dashboard({ user, token, onLogout }) {
  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      {/* Top Navigation Bar */}
      <header className="glass-panel rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-pulse-violet flex items-center justify-center shadow-md">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white">NovaPulse</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Session Active
              </span>
            </div>
            <p className="text-xs text-slate-400">Authenticated Gateway v2.4</p>
          </div>
        </div>

        {/* User profile & Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-right">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={user?.name}
              className="w-10 h-10 rounded-full border-2 border-brand-500/50 object-cover shadow-sm"
            />
            <div className="hidden sm:block">
              <h3 className="text-sm font-semibold text-white leading-tight">{user?.name || "Nova User"}</h3>
              <p className="text-xs text-brand-400">{user?.role || "Developer"}</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 text-xs font-semibold transition-all duration-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Hero Card */}
      <div className="relative overflow-hidden glass-panel rounded-3xl p-6 sm:p-8 mb-6 border border-slate-700/60 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-950/90 border border-brand-500/40 text-brand-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>{user?.tier || "Enterprise Workspace"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || "Architect"}! 👋
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-xl">
              You are successfully authenticated. All developer clusters, secure vaults, and microservices are synchronized and ready.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shrink-0 min-w-[240px]">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" /> Session Initialized
            </div>
            <div className="text-xs font-medium text-slate-200">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Account:</span>
              <span className="font-mono text-brand-300 text-[11px] truncate max-w-[140px]">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Projects</span>
            <Layers className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {user?.stats?.projectsActive || 12}
          </div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> All pipelines nominal
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">API Requests (24h)</span>
            <Activity className="w-4 h-4 text-pulse-cyan" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {user?.stats?.apiCallsToday || "128.4k"}
          </div>
          <p className="text-[11px] text-brand-400 flex items-center gap-1">
            <span className="text-slate-400">Average latency:</span> 24ms
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">System SLA</span>
            <Server className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {user?.stats?.uptime || "99.99%"}
          </div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> 0 incidents reported
          </p>
        </div>
      </div>

      {/* Auth Token and Verification Card */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800/80 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-brand-400" />
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Issued Mock JWT Bearer Token
            </h4>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">HS256 verified</span>
        </div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 font-mono text-xs text-brand-300 break-all select-all">
          {token || "np_live_sample_token_authenticated"}
        </div>
      </div>

      {/* Return to Login demo toggle */}
      <div className="text-center pt-2">
        <button
          onClick={onLogout}
          className="text-xs text-slate-400 hover:text-brand-300 underline underline-offset-4 transition-colors"
        >
          ← Return to Login Screen to test other accounts or validation
        </button>
      </div>
    </div>
  );
}
