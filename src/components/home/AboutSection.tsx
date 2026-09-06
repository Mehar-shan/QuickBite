import React from 'react';
import { ShieldCheck, Sparkles, ChefHat, Heart, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="w-full bg-[#f8f9fa] py-16 sm:py-20 px-4 sm:px-8 text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Visual: Restaurant Ambiance Photo with "Good Food Good Mood" vibe */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                alt="QuickBite Restaurant Ambiance - Good Food Good Mood"
                className="w-full h-full object-cover"
              />
              
              {/* Neon sign overlay tag */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-500/40 text-left">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Our Philosophy</span>
                <span className="text-sm font-black text-amber-400 tracking-wide font-display">Good Food, Good Mood</span>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-5 -right-4 sm:right-6 bg-white p-4 rounded-2xl shadow-xl border border-neutral-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-black flex items-center justify-center font-black text-xl font-display">
                10+
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900">Years of Excellence</p>
                <p className="text-[11px] text-neutral-500">Over 500k Happy Deliveries</p>
              </div>
            </div>
          </div>

          {/* Right Text & 4 Badges matching reference layout */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-xs font-black tracking-widest uppercase text-amber-600">
                About Us
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-neutral-950 font-display mt-1">
                GOOD FOOD, GOOD MOOD!
              </h2>
            </div>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              At QuickBite, we're passionate about serving delicious, high-quality food that satisfies your cravings. From our kitchen to your door, we ensure a fast, fresh and flavorful experience every single time.
            </p>

            <p className="text-neutral-600 text-sm leading-relaxed">
              Every burger patty is ground fresh daily from 100% prime cut beef, our buns are baked locally every morning, and our secret blend spices have been perfected over a decade of culinary love.
            </p>

            {/* 4 Feature Badges matching reference */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200/80 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Hygienic & Safe</h4>
                  <p className="text-[11px] text-neutral-500">100% Sanitized</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200/80 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Quality Ingredients</h4>
                  <p className="text-[11px] text-neutral-500">Farm Fresh</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200/80 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <ChefHat className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Experienced Chefs</h4>
                  <p className="text-[11px] text-neutral-500">Master Crafters</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200/80 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Loved by Thousands</h4>
                  <p className="text-[11px] text-neutral-500">25k+ 5-Star Reviews</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
