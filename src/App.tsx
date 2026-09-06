/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { OrderProvider, useOrders } from './context/OrderContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { ValuePropsSection } from './components/home/ValuePropsSection';
import { PopularPicksSection } from './components/home/PopularPicksSection';
import { MegaComboBanner } from './components/home/MegaComboBanner';
import { AboutSection } from './components/home/AboutSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { NewsletterSection } from './components/home/NewsletterSection';
import { MenuPage } from './components/menu/MenuPage';
import { FoodCustomizationModal } from './components/menu/FoodCustomizationModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderTrackingPage } from './components/orders/OrderTrackingPage';
import { ManagerDashboardPreview } from './components/manager/ManagerDashboardPreview';
import { AuthModal } from './components/auth/AuthModal';
import { LocationsModal } from './components/modals/LocationsModal';
import { ContactModal } from './components/modals/ContactModal';
import { SearchModal } from './components/modals/SearchModal';
import { MenuItem, CategoryId } from './types';
import { MENU_ITEMS } from './data/mockData';

type AppView = 'home' | 'menu' | 'cart' | 'checkout' | 'tracking' | 'manager';

const MainApplication: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | undefined>();
  
  // Modals state
  const [isLocationsModalOpen, setIsLocationsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const { isManager, user } = useAuth();
  const { isCartDrawerOpen, setIsCartDrawerOpen } = useCart();
  const { activeOrder } = useOrders();

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigate = (view: string) => {
    if (view === 'specials') {
      setSelectedCategory('combos');
      setCurrentView('menu');
    } else if (view === 'orders') {
      setCurrentView('tracking');
    } else if (view === 'about') {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (view === 'menu') {
      setSelectedCategory('all');
      setCurrentView('menu');
    } else {
      setCurrentView(view as AppView);
    }
  };

  const handleNavigateToMenu = (category?: CategoryId) => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('all');
    }
    setCurrentView('menu');
  };

  const handleOpenCustomization = (item: MenuItem) => {
    setCustomizingItem(item);
  };

  const handleOrderSuccess = (orderId: string) => {
    setActiveTrackingOrderId(orderId);
    setCurrentView('tracking');
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Conditionally render Header for customer views */}
      {currentView !== 'manager' && (
        <Header
          currentView={currentView}
          setCurrentView={handleNavigate}
          onOpenLocations={() => setIsLocationsModalOpen(true)}
          onOpenContact={() => setIsContactModalOpen(true)}
          onOpenSearch={() => setIsSearchModalOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-300">
            <HeroSection
              onOrderOnline={() => handleNavigateToMenu()}
              onViewMenu={() => handleNavigateToMenu()}
              onOpenMegaCombo={() => {
                const megaItem = MENU_ITEMS.find(i => i.id === 'm7') || MENU_ITEMS[0];
                handleOpenCustomization(megaItem);
              }}
            />
            <ValuePropsSection />
            <PopularPicksSection
              onSelectItemForModal={handleOpenCustomization}
              onViewFullMenu={() => handleNavigateToMenu()}
            />
            <MegaComboBanner
              onOrderMegaCombo={handleOpenCustomization}
            />
            <AboutSection />
            <TestimonialsSection />
            <NewsletterSection />
          </div>
        )}

        {currentView === 'menu' && (
          <div className="animate-in fade-in duration-300">
            <MenuPage
              initialCategory={selectedCategory}
              onSelectItemForModal={handleOpenCustomization}
            />
          </div>
        )}

        {currentView === 'cart' && (
          <div className="animate-in fade-in duration-300">
            <CartPage
              onProceedToCheckout={() => setCurrentView('checkout')}
              onContinueShopping={() => setCurrentView('menu')}
            />
          </div>
        )}

        {currentView === 'checkout' && (
          <div className="animate-in fade-in duration-300">
            <CheckoutPage
              onBackToCart={() => setCurrentView('cart')}
              onOrderSuccess={handleOrderSuccess}
            />
          </div>
        )}

        {currentView === 'tracking' && (
          <div className="animate-in fade-in duration-300">
            <OrderTrackingPage
              orderId={activeTrackingOrderId}
              onOrderAgain={() => handleNavigateToMenu()}
            />
          </div>
        )}

        {currentView === 'manager' && (
          <div className="animate-in fade-in duration-300">
            <ManagerDashboardPreview
              onBackToCustomerView={() => setCurrentView('home')}
            />
          </div>
        )}
      </main>

      {/* Conditionally render Footer for customer views */}
      {currentView !== 'manager' && (
        <Footer
          setCurrentView={handleNavigate}
          onOpenLocations={() => setIsLocationsModalOpen(true)}
          onOpenContact={() => setIsContactModalOpen(true)}
        />
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setCurrentView('checkout')}
        onContinueShopping={() => setCurrentView('menu')}
      />

      {/* Food Customization Modal */}
      {customizingItem && (
        <FoodCustomizationModal
          item={customizingItem}
          onClose={() => setCustomizingItem(null)}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal />

      {/* Locations Modal */}
      <LocationsModal
        isOpen={isLocationsModalOpen}
        onClose={() => setIsLocationsModalOpen(false)}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectItem={handleOpenCustomization}
        onNavigateToMenu={() => setCurrentView('menu')}
      />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <MainApplication />
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}
