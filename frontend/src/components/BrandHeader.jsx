import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

export default function BrandHeader({ subtitle = "Sign in to access your intelligent workspace" }) {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      {/* Brand Icon & Glow */}
      <div className="relative mb-4 group">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-500 via-pulse-violet to-pulse-cyan rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
        <div className="relative w-14 h-14 bg-slate-900 border border-slate-700/80 rounded-2xl flex items-center justify-center shadow-2xl">
          <Zap className="w-7 h-7 text-brand-400 transform group-hover:rotate-12 transition-transform duration-300" />
        </div>
      </div>

      {/* Brand Name */}
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Nova<span className="text-brand-400">Pulse</span>
        </h1>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-950/80 border border-brand-500/30 text-brand-300">
          <ShieldCheck className="w-3 h-3" /> v2.4
        </span>
      </div>

      {/* Subtitle */}
      <p className="mt-2 text-sm text-slate-400 max-w-sm">
        {subtitle}
      </p>
    </div>
  );
}
