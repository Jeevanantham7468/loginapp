import React from 'react';
import { UserCheck, Sparkles, Key } from 'lucide-react';

const FALLBACK_DEMO_USERS = [
  {
    name: "Alex Dev",
    email: "alex.dev@novapulse.io",
    password: "Password123!",
    role: "Cloud Architect"
  },
  {
    name: "Elena Rostova",
    email: "elena.lead@novapulse.io",
    password: "SuperNova2026#",
    role: "Product Director"
  },
  {
    name: "Marcus Vance",
    email: "marcus@novapulse.io",
    password: "MockPassword2026",
    role: "Full Stack Engineer"
  }
];

export default function QuickDemoUsers({ onSelectUser, users = [] }) {
  const displayUsers = users.length > 0 ? users : FALLBACK_DEMO_USERS;

  return (
    <div className="mt-8 pt-6 border-t border-slate-800/80">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Quick Demo Accounts
        </span>
        <span className="text-[11px] text-slate-500">1-click autofill</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {displayUsers.map((user, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectUser(user.email, user.password)}
            className="group relative text-left p-2.5 rounded-lg bg-slate-900/60 hover:bg-brand-950/40 border border-slate-800 hover:border-brand-500/40 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-200 group-hover:text-brand-300 truncate">
                {user.name}
              </span>
              <UserCheck className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-400 shrink-0" />
            </div>
            <p className="text-[11px] text-slate-400 truncate">{user.role}</p>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500 font-mono truncate">
              <Key className="w-2.5 h-2.5" /> {user.email.split('@')[0]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
