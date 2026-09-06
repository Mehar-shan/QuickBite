import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  ShoppingBag, 
  User, 
  Menu as MenuIcon, 
  X, 
  Search, 
  ChevronDown, 
  ShieldCheck, 
  LogOut,
  Facebook,
  Instagram,
  Twitter,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { RESTAURANT_INFO } from '../../data/mockData';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onOpenLocations: () => void;
  onOpenContact: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onOpenLocations,
  onOpenContact,
  onOpenSearch,
}) => {
  const { totalItemsCount, setIsCartDrawerOpen } = useCart();
  const { user, isAuthenticated, isManager, logout, setIsAuthModalOpen, setAuthModalMode } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-[#0c0c0e] border-b border-white/10 sticky top-0 z-40 shadow-xl shadow-black/40">
      {/* Top Bar matching reference */}
      <div className="bg-[#08080a] border-b border-white/5 py-2 px-4 sm:px-8 text-xs text-neutral-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Location & Time & Phone */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-neutral-300">
            <button
              onClick={onOpenLocations}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{RESTAURANT_INFO.address}</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{RESTAURANT_INFO.openingHours}</span>
            </div>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>

          {/* Socials & Role Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 text-neutral-400">
              <a href="#social" className="hover:text-amber-400 transition-colors" title="Facebook"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="#social" className="hover:text-amber-400 transition-colors" title="Instagram"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="#social" className="hover:text-amber-400 transition-colors" title="Twitter"><Twitter className="w-3.5 h-3.5" /></a>
            </div>

            {/* Quick role indicator / Manager Switcher */}
            <button
              id="header-manager-toggle-btn"
              onClick={() => {
                if (currentView === 'manager') {
                  setCurrentView('home');
                } else {
                  setCurrentView('manager');
                }
              }}
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-all flex items-center gap-1 ${
                currentView === 'manager'
                  ? 'bg-amber-500 text-black border-amber-400 font-bold'
                  : 'bg-white/5 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>{currentView === 'manager' ? 'Customer View' : 'Manager Dashboard'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            {/* Burger SVG icon matching design */}
            <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11h16a1 1 0 0 0 1-1C20.5 5.5 16.5 3 12 3S3.5 5.5 3 10a1 1 0 0 0 1 1z"/>
              <path d="M4 14h16"/>
              <path d="M4 18h16a2 2 0 0 1 2 2H2a2 2 0 0 1 2-2z"/>
              <path d="M6 14v1"/>
              <path d="M10 14v1"/>
              <path d="M14 14v1"/>
              <path d="M18 14v1"/>
            </svg>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center font-display">
              Quick<span className="text-amber-500">Bite</span>
            </span>
            <span className="block text-[9px] tracking-widest uppercase font-semibold text-neutral-400 -mt-1">
              Fast Food. Big Flavor.
            </span>
          </div>
        </div>

        {/* Desktop Nav Items matching reference */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors py-1 relative ${
              currentView === 'home'
                ? 'text-amber-500 font-bold'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            HOME
            {currentView === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('menu')}
            className={`transition-colors py-1 relative ${
              currentView === 'menu'
                ? 'text-amber-500 font-bold'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            MENU
            {currentView === 'menu' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('specials')}
            className={`transition-colors py-1 relative ${
              currentView === 'specials'
                ? 'text-amber-500 font-bold'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            SPECIALS
            {currentView === 'specials' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('menu')}
            className="text-neutral-300 hover:text-white transition-colors flex items-center gap-1"
          >
            ORDER ONLINE
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          <button
            onClick={onOpenLocations}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            LOCATIONS
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors py-1 relative ${
              currentView === 'about'
                ? 'text-amber-500 font-bold'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            ABOUT US
          </button>

          <button
            onClick={onOpenContact}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            CONTACT
          </button>
        </nav>

        {/* Action Buttons: Search, Cart, User, Order Now */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Trigger */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-amber-400 flex items-center justify-center transition-all"
            title="Search menu"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart Trigger */}
          <button
            id="header-cart-btn"
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center gap-2 border border-white/10 hover:border-amber-500/40 transition-all group"
            title="View Cart"
          >
            <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs font-semibold text-neutral-200">Cart</span>
            {totalItemsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[11px] font-black flex items-center justify-center shadow-md shadow-orange-500/50">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* User Account / Auth Dropdown */}
          <div className="relative">
            <button
              id="header-user-btn"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-200 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                {user ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
              <span className="hidden md:inline max-w-[90px] truncate">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 hidden sm:inline" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#18181c] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                      <p className="text-[11px] text-neutral-400 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold uppercase">
                        {user?.role}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setCurrentView('orders');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:bg-white/5 hover:text-amber-400 transition-colors flex items-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>My Orders & Tracking</span>
                    </button>
                    {isManager && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setCurrentView('manager');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-amber-400 hover:bg-amber-500/10 transition-colors flex items-center gap-2 font-medium"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Manager Dashboard</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2 border-t border-white/5 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        setAuthModalMode('login');
                        setIsAuthModalOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full py-2 px-3 text-xs font-bold text-black bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors text-center"
                    >
                      Customer Sign In
                    </button>
                    <button
                      onClick={() => {
                        setAuthModalMode('register');
                        setIsAuthModalOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full py-2 px-3 text-xs text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-center"
                    >
                      Create Account
                    </button>
                    <button
                      onClick={() => {
                        setAuthModalMode('manager_login');
                        setIsAuthModalOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full py-2 px-3 text-[11px] text-amber-400 hover:bg-amber-500/10 rounded-xl transition-colors text-center font-medium border-t border-white/5 mt-1"
                    >
                      Restaurant Manager Portal
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Primary CTA: "ORDER NOW" matching reference */}
          <button
            id="header-order-now-btn"
            onClick={() => handleNavClick('menu')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>ORDER NOW</span>
            <ShoppingBag className="w-3.5 h-3.5 fill-black stroke-black" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111115] border-t border-white/10 px-6 py-5 space-y-3 animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2 font-bold ${
              currentView === 'home' ? 'text-amber-500' : 'text-neutral-300'
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className={`block w-full text-left py-2 font-bold ${
              currentView === 'menu' ? 'text-amber-500' : 'text-neutral-300'
            }`}
          >
            MENU & FOOD ITEMS
          </button>
          <button
            onClick={() => handleNavClick('specials')}
            className={`block w-full text-left py-2 font-bold ${
              currentView === 'specials' ? 'text-amber-500' : 'text-neutral-300'
            }`}
          >
            TODAY'S SPECIALS
          </button>
          <button
            onClick={() => handleNavClick('orders')}
            className={`block w-full text-left py-2 font-bold ${
              currentView === 'orders' ? 'text-amber-500' : 'text-neutral-300'
            }`}
          >
            MY ORDERS & TRACKING
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLocations();
            }}
            className="block w-full text-left py-2 text-neutral-300 font-medium"
          >
            LOCATIONS & HOURS
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left py-2 text-neutral-300 font-medium"
          >
            ABOUT US
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="block w-full text-left py-2 text-neutral-300 font-medium"
          >
            CONTACT & SUPPORT
          </button>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('menu')}
              className="w-full py-3 rounded-full bg-amber-500 text-black font-black text-sm tracking-wider uppercase text-center flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <ShoppingBag className="w-4 h-4" />
              ORDER ONLINE NOW
            </button>
            <button
              onClick={() => handleNavClick('manager')}
              className="w-full py-2.5 rounded-full bg-white/5 border border-amber-500/30 text-amber-400 font-bold text-xs text-center flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              SWITCH TO MANAGER DASHBOARD
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
