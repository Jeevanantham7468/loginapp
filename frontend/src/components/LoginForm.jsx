import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

export default function LoginForm({ onSubmit, isLoading, serverError, initialEmail = '', initialPassword = '' }) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sync when initial values change (e.g. from demo selector)
  React.useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
    if (initialPassword) setPassword(initialPassword);
    if (initialEmail || initialPassword) {
      setErrors({});
    }
  }, [initialEmail, initialPassword]);

  // Client validation helper
  const validate = (fieldsToValidate = { email, password }) => {
    const newErrors = {};

    if ('email' in fieldsToValidate) {
      if (!fieldsToValidate.email.trim()) {
        newErrors.email = 'Email address is required.';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldsToValidate.email.trim())) {
          newErrors.email = 'Please enter a valid email (e.g. name@domain.com).';
        }
      }
    }

    if ('password' in fieldsToValidate) {
      if (!fieldsToValidate.password) {
        newErrors.password = 'Password is required.';
      } else if (fieldsToValidate.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long.';
      }
    }

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validate({ [field]: field === 'email' ? email : password });
    setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
  };

  const handleChangeEmail = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      const validationErrors = validate({ email: val });
      setErrors((prev) => ({ ...prev, email: validationErrors.email }));
    }
  };

  const handleChangePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (touched.password) {
      const validationErrors = validate({ password: val });
      setErrors((prev) => ({ ...prev, password: validationErrors.password }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const validationErrors = validate({ email, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit({ email: email.trim(), password, rememberMe });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Email Input Field */}
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
          Work Email
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
            <Mail className="w-4 h-4" />
          </div>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleChangeEmail}
            onBlur={() => handleBlur('email')}
            placeholder="alex.dev@novapulse.io"
            disabled={isLoading}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.email
                ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20'
                : 'border-slate-800 focus:border-brand-500 focus:ring-brand-500/20 hover:border-slate-700'
            }`}
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-xs text-rose-400 font-medium flex items-center gap-1 animate-fade-in">
            <span>•</span> {errors.email}
          </p>
        )}
      </div>

      {/* Password Input Field */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Password
          </label>
          <button
            type="button"
            onClick={() => alert("Password recovery: Use one of the 1-click Demo Accounts below to log in.")}
            className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
            <Lock className="w-4 h-4" />
          </div>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={handleChangePassword}
            onBlur={() => handleBlur('password')}
            placeholder="••••••••••••"
            disabled={isLoading}
            className={`w-full pl-10 pr-11 py-2.5 rounded-xl bg-slate-900/80 border text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.password
                ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20'
                : 'border-slate-800 focus:border-brand-500 focus:ring-brand-500/20 hover:border-slate-700'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 text-xs text-rose-400 font-medium flex items-center gap-1 animate-fade-in">
            <span>•</span> {errors.password}
          </p>
        )}
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-brand-600 focus:ring-brand-500/40 focus:ring-offset-slate-950"
          />
          <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
            Keep me signed in for 30 days
          </span>
        </label>
      </div>

      {/* Submit Action Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full relative py-3 px-4 rounded-xl font-semibold text-sm text-white shadow-lg bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-brand-400/50 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Verifying Credentials...</span>
          </>
        ) : (
          <>
            <span>Sign In to NovaPulse</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
