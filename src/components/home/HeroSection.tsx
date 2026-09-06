import React from 'react';
import { ArrowRight, Star, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MENU_ITEMS } from '../../data/mockData';

interface HeroSectionProps {
  onOrderOnline: () => void;
  onViewMenu: () => void;
  onOpenMegaCombo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOrderOnline,
  onViewMenu,
  onOpenMegaCombo,
}) => {
  const { addToCart } = useCart();
  const megaComboItem = MENU_ITEMS.find(item => item.id === 'm7') || MENU_ITEMS[0];

  return (
    <section className="relative w-full bg-[#0c0c0e] overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 -right-10 w-[400px] h-[400px] bg-orange-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Left Column: Headline & Action Triggers */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow badge matching reference */}
            <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="text-amber-500 font-black">―</span>
              <span>Big Flavor. Fast Delivery.</span>
              <span className="text-amber-500 font-black">―</span>
            </div>

            {/* Giant Title matching reference exact wording & casing */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.08] font-display">
              FAST FOOD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 drop-shadow-sm">
                MADE FRESH,
              </span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 drop-shadow-sm">
                MADE FOR YOU!
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
              Delicious meals made with quality ingredients and delivered fast to your door. Freshly grilled patties, crispy sides, and ice-cold refreshments.
            </p>

            {/* CTA Action Buttons matching reference */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-order-online-btn"
                onClick={onOrderOnline}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all"
              >
                <span>ORDER ONLINE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-view-menu-btn"
                onClick={onViewMenu}
                className="px-7 py-3.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/15 hover:border-amber-400/50 hover:text-amber-400 transition-all"
              >
                VIEW MENU
              </button>
            </div>

            {/* Social Proof matching reference: Avatars + 25,000+ Happy Customers + 5 Gold Stars */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-3 text-neutral-300">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0c0c0e] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0c0c0e] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0c0c0e] object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-[#0c0c0e] object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                  alt="Customer"
                />
              </div>

              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Join 25,000+ Happy Customers</span>
                </p>
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="text-[11px] text-neutral-400 font-semibold ml-1">(4.9/5.0)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Staging with Badge */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-6 lg:pt-0">
            {/* Circular Quality Stamp badge matching reference "FRESH 100% QUALITY" */}
            <div className="absolute top-0 right-2 sm:right-8 z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-amber-500/80 bg-neutral-900/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-2 shadow-2xl shadow-amber-500/20 transform rotate-12 hover:rotate-0 transition-transform">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">FRESH</span>
              <span className="text-base sm:text-lg font-black text-white leading-none font-display">100%</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-neutral-300">QUALITY</span>
              <div className="flex gap-0.5 mt-0.5">
                <Star className="w-2 h-2 fill-amber-400 text-amber-400" />
                <Star className="w-2 h-2 fill-amber-400 text-amber-400" />
                <Star className="w-2 h-2 fill-amber-400 text-amber-400" />
              </div>
            </div>

            {/* Main Burger + Fries + Drink composite graphic */}
            <div className="relative group cursor-pointer" onClick={onOpenMegaCombo}>
              {/* Wooden board background effect */}
              <div className="relative max-w-[500px] w-full rounded-3xl overflow-hidden bg-gradient-to-t from-black via-neutral-950 to-transparent p-3 sm:p-4 border border-white/10 shadow-2xl shadow-black">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=1000&q=85"
                    alt="QuickBite Gourmet Burger, Golden Fries and Cold Drink"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Hot Offer Tag Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">Special Feast</span>
                      <p className="text-sm font-bold text-white">Classic Burger + Fries + Drink</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-neutral-400 line-through mr-1.5">$13.99</span>
                      <span className="text-base font-black text-amber-400 font-display">$9.99</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating interactive tooltip */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[11px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                <span>CLICK TO CUSTOMIZE MEGA COMBO</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
