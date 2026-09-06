import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles, Mail } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <section className="w-full bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 py-10 sm:py-12 px-4 sm:px-8 text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Headline & Icon matching reference */}
        <div className="flex items-center gap-4 text-left max-w-xl">
          <div className="w-14 h-14 rounded-2xl bg-black text-amber-400 flex items-center justify-center shrink-0 shadow-xl">
            <Mail className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black font-display">
              GET EXCLUSIVE DEALS & OFFERS!
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-black/80 mt-0.5">
              Subscribe to our newsletter and never miss a deal or secret menu drop!
            </p>
          </div>
        </div>

        {/* Right Side: Email input + French fries graphic matching reference */}
        <div className="flex items-center gap-6 w-full lg:w-auto">
          {isSubscribed ? (
            <div className="bg-black text-amber-400 px-6 py-3.5 rounded-full flex items-center gap-2 font-bold text-xs sm:text-sm shadow-xl animate-in zoom-in-95">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>You're subscribed! Check your inbox for 20% coupon code.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              <input
                id="newsletter-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full sm:w-72 md:w-80 px-5 py-3 rounded-full bg-white text-neutral-900 placeholder:text-neutral-400 text-xs sm:text-sm font-medium border-2 border-transparent focus:outline-none focus:border-black shadow-lg"
              />
              <button
                id="newsletter-subscribe-btn"
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-black hover:bg-neutral-900 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                SUBSCRIBE
              </button>
            </form>
          )}

          {/* Golden French Fries Box illustration */}
          <div className="hidden xl:block shrink-0 -mr-2">
            <div className="w-16 h-16 rounded-2xl bg-neutral-950/20 backdrop-blur-md p-1 flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform">
              <img
                src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=150&q=80"
                alt="Fries"
                className="w-14 h-14 object-cover rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
