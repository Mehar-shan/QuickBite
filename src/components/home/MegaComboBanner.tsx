import React from 'react';
import { ArrowRight, Truck, Percent, Sparkles } from 'lucide-react';
import { MenuItem } from '../../types';
import { MENU_ITEMS } from '../../data/mockData';

interface MegaComboBannerProps {
  onOrderMegaCombo: (item: MenuItem) => void;
}

export const MegaComboBanner: React.FC<MegaComboBannerProps> = ({ onOrderMegaCombo }) => {
  const megaComboItem = MENU_ITEMS.find(i => i.id === 'm7') || MENU_ITEMS[0];

  return (
    <section className="w-full bg-[#0c0c0e] py-12 sm:py-16 px-4 sm:px-8 border-y border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#141418] via-[#1a1a22] to-[#121216] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Special Info */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TODAY'S SPECIAL</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-display">
                MEGA COMBO
              </h2>

              <p className="text-base sm:text-lg font-semibold text-neutral-300">
                Burger + Fries + Drink
              </p>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-amber-400 font-display">
                  $9.99
                </span>
                <span className="text-lg sm:text-xl text-neutral-400 line-through">
                  $13.99
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
                  Save 28%
                </span>
              </div>

              <div className="pt-2">
                <button
                  id="mega-combo-order-btn"
                  onClick={() => onOrderMegaCombo(megaComboItem)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>ORDER NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle Col: Juicy Image */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative group cursor-pointer" onClick={() => onOrderMegaCombo(megaComboItem)}>
                <div className="w-64 sm:w-72 aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80"
                    alt="Mega Combo Meal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap shadow-md">
                  Best Value Combo
                </div>
              </div>
            </div>

            {/* Right Col: 2 Promo Value Badges matching reference */}
            <div className="lg:col-span-3 space-y-4">
              {/* Badge 1: FREE DELIVERY */}
              <div className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    FREE DELIVERY
                  </h4>
                  <p className="text-xs text-neutral-400">
                    On orders over $15
                  </p>
                </div>
              </div>

              {/* Badge 2: 20% OFF */}
              <div className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <Percent className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    20% OFF
                  </h4>
                  <p className="text-xs text-neutral-400">
                    On your first order with code <span className="text-amber-400 font-bold">QUICK20</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
