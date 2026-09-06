import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Star, Plus, Check } from 'lucide-react';
import { MenuItem } from '../../types';
import { MENU_ITEMS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

interface PopularPicksSectionProps {
  onViewFullMenu: () => void;
  onSelectItemForModal: (item: MenuItem) => void;
}

export const PopularPicksSection: React.FC<PopularPicksSectionProps> = ({
  onViewFullMenu,
  onSelectItemForModal,
}) => {
  const { addToCart } = useCart();
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});

  const popularItems = MENU_ITEMS.slice(0, 6);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    addToCart(item, 1);
    
    // Quick visual button flash
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-16 sm:py-20 px-4 sm:px-8 text-neutral-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header matching reference */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
          <div>
            <span className="text-xs font-black tracking-widest uppercase text-amber-600">Fresh & Hot</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 font-display">
              POPULAR PICKS
            </h2>
          </div>

          <button
            id="popular-picks-view-all-btn"
            onClick={onViewFullMenu}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-black text-amber-600 hover:text-amber-700 tracking-wider uppercase transition-colors"
          >
            <span>VIEW FULL MENU</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Grid Cards exactly matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 sm:gap-6">
          {popularItems.map((item) => {
            const isAdded = !!addedItemIds[item.id];

            return (
              <div
                key={item.id}
                onClick={() => onSelectItemForModal(item)}
                className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-200/80 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
              >
                {/* Top Image */}
                <div className="space-y-3">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Rating Pill */}
                    <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-bold text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  {/* Name and Price */}
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base sm:text-lg font-black text-amber-600 font-display">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button matching reference orange pill button */}
                <div className="pt-3">
                  <button
                    id={`quick-add-btn-${item.id}`}
                    onClick={(e) => handleQuickAdd(e, item)}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-95'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>ADDED!</span>
                      </>
                    ) : (
                      <>
                        <span>ADD TO CART</span>
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
