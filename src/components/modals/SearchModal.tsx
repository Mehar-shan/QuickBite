import React, { useState } from 'react';
import { X, Search, Plus, ArrowRight, Star } from 'lucide-react';
import { MENU_ITEMS } from '../../data/mockData';
import { MenuItem } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
  onNavigateToMenu: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
  onNavigateToMenu,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const results = searchTerm.trim()
    ? MENU_ITEMS.filter(
        i =>
          i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : MENU_ITEMS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#141418] text-white rounded-3xl max-w-xl w-full p-6 space-y-4 border border-white/10 shadow-2xl animate-in zoom-in-95">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-amber-400" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search burgers, pizzas, crispy chicken, fries..."
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-neutral-500 shrink-0">Popular:</span>
          {['Burgers', 'Combo', 'Crispy Chicken', 'Pizza', 'Fries'].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-400">
              No matching food items found for "{searchTerm}".
            </div>
          ) : (
            results.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  onClose();
                  onSelectItem(item);
                }}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/30 transition-all flex items-center justify-between gap-3 cursor-pointer group text-left"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                      <span className="capitalize">{item.category}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-0.5 text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-black text-amber-400 text-xs sm:text-sm font-display">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer link to Menu */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              onClose();
              onNavigateToMenu();
            }}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            <span>View all items on full menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
