import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export default function AlertBanner({ type = 'error', title, message, onClose }) {
  if (!message && !title) return null;

  const isError = type === 'error';
  const isSuccess = type === 'success';

  return (
    <div
      className={`relative w-full mb-6 p-4 rounded-xl border animate-slide-up flex items-start gap-3 transition-all duration-300 ${
        isError
          ? 'bg-rose-950/40 border-rose-500/30 text-rose-200'
          : isSuccess
          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
          : 'bg-slate-800/60 border-slate-700/60 text-slate-200'
      }`}
    >
      <div className="shrink-0 mt-0.5">
        {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
        {!isError && !isSuccess && <Info className="w-5 h-5 text-brand-400" />}
      </div>

      <div className="flex-1 pr-2">
        {title && <h4 className="font-semibold text-sm leading-tight mb-0.5">{title}</h4>}
        <p className="text-xs text-slate-300 leading-relaxed">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          type="button"
          aria-label="Close notification"
          className="shrink-0 text-slate-400 hover:text-white transition-colors p-0.5 rounded hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
