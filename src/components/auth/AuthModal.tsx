import React, { useState } from 'react';
import { X, ShieldCheck, User, Lock, Mail, Phone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode,
    loginAsCustomer,
    loginAsManager,
    register
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'manager_login') {
      loginAsManager();
    } else if (authModalMode === 'register') {
      register(name || 'New Customer', email || 'customer@example.com', phone || '(212) 555-0199', address || '123 Main St');
    } else {
      loginAsCustomer(name || 'Sarah Jenkins', email || 'sarah.j@example.com');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-[#141418] text-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border border-white/10 shadow-2xl animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              {authModalMode === 'manager_login' ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <h2 className="text-base sm:text-lg font-black uppercase text-white font-display">
              {authModalMode === 'manager_login'
                ? 'Manager Staff Login'
                : authModalMode === 'register'
                ? 'Create QuickBite Account'
                : 'Customer Sign In'}
            </h2>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setAuthModalMode('login')}
            className={`py-2 rounded-xl transition-all ${
              authModalMode === 'login' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthModalMode('register')}
            className={`py-2 rounded-xl transition-all ${
              authModalMode === 'register' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => setAuthModalMode('manager_login')}
            className={`py-2 rounded-xl transition-all ${
              authModalMode === 'manager_login' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Manager
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
          {authModalMode === 'register' && (
            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Jenkins"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          <div>
            <label className="text-neutral-300 font-semibold block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={authModalMode === 'manager_login' ? 'manager@quickbite.com' : 'sarah.j@example.com'}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="text-neutral-300 font-semibold block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {authModalMode === 'register' && (
            <>
              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(212) 555-0199"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Default Delivery Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="128 W 44th St, Apt 6C, New York"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </>
          )}

          {/* Quick Demo Pre-fill helper */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-400">
            <span className="font-bold">Phase 1 Demo Credentials:</span> Click submit to instantly sign in as{' '}
            {authModalMode === 'manager_login' ? 'Restaurant Manager' : 'Verified Customer'}.
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {authModalMode === 'manager_login'
              ? 'ACCESS MANAGER DASHBOARD'
              : authModalMode === 'register'
              ? 'CREATE ACCOUNT & SIGN IN'
              : 'CONTINUE TO QUICKBITE'}
          </button>
        </form>
      </div>
    </div>
  );
};
