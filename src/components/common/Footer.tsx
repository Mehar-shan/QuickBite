import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Gauge
} from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/mockData';

interface FooterProps {
  setCurrentView: (view: string) => void;
  onOpenLocations: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentView,
  onOpenLocations,
  onOpenContact,
}) => {
  return (
    <footer className="w-full bg-[#08080a] text-neutral-400 border-t border-white/10 relative overflow-hidden">
      {/* Top Accent Stripe */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11h16a1 1 0 0 0 1-1C20.5 5.5 16.5 3 12 3S3.5 5.5 3 10a1 1 0 0 0 1 1z"/>
                  <path d="M4 14h16"/>
                  <path d="M4 18h16a2 2 0 0 1 2 2H2a2 2 0 0 1 2-2z"/>
                  <path d="M6 14v1"/>
                  <path d="M10 14v1"/>
                  <path d="M14 14v1"/>
                  <path d="M18 14v1"/>
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-display">
                Quick<span className="text-amber-500">Bite</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed text-neutral-400 max-w-sm">
              Delicious meals, fast delivery and big flavors – every time! Crafted with 100% fresh ingredients, secret spices, and served piping hot right to your doorstep.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#facebook" className="w-8 h-8 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all text-neutral-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#instagram" className="w-8 h-8 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all text-neutral-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all text-neutral-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-full bg-white/5 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all text-neutral-300">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* Fast Delivery Speedometer Badge matching reference */}
            <div className="pt-4 flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border border-amber-500/40 bg-amber-500/10 flex flex-col items-center justify-center text-amber-400">
                <Gauge className="w-6 h-6 animate-pulse-subtle" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-amber-400">FAST FOOD</p>
                <p className="text-[11px] font-bold text-white tracking-wider uppercase">FAST DELIVERY &bull; 30 MINS</p>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-widest uppercase text-white font-display">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('menu')} className="hover:text-amber-400 transition-colors">
                  Menu & Food
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('specials')} className="hover:text-amber-400 transition-colors">
                  Specials & Combos
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('orders')} className="hover:text-amber-400 transition-colors">
                  Track My Order
                </button>
              </li>
              <li>
                <button onClick={onOpenLocations} className="hover:text-amber-400 transition-colors">
                  Find Locations
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-amber-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Menu Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-widest uppercase text-white font-display">
              MENU
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('menu')} className="hover:text-amber-400 transition-colors">
                  Burgers & Combos
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('menu')} className="hover:text-amber-400 transition-colors">
                  Cheesy Pizzas
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('menu')} className="hover:text-amber-400 transition-colors">
                  Crispy Fried Chicken
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('menu')} className="hover:text-amber-400 transition-colors">
                  Wraps & Rolls
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('menu')} className="hover:text-amber-400 transition-colors">
                  French Fries & Sides
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('menu')} className="hover:text-amber-400 transition-colors">
                  Milkshakes & Drinks
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-black tracking-widest uppercase text-white font-display">
              CONTACT US
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2 text-neutral-300">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{RESTAURANT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{RESTAURANT_INFO.email}</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-300">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{RESTAURANT_INFO.openingHours}</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setCurrentView('manager')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 text-[11px] font-semibold border border-amber-500/30 transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Restaurant Manager Access</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 QuickBite Fast Food. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-neutral-300 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
