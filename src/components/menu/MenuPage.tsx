import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Flame, 
  ShoppingBag, 
  SlidersHorizontal,
  Sparkles,
  Check,
  Plus
} from 'lucide-react';
import { MenuItem, CategoryId } from '../../types';
import { CATEGORIES, MENU_ITEMS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

interface MenuPageProps {
  onSelectItemForModal: (item: MenuItem) => void;
  initialCategory?: CategoryId;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onSelectItemForModal,
  initialCategory = 'all',
}) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category Match
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Search Match
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Dietary filter match
      const matchesDietary =
        dietaryFilter === 'all' ||
        (item.dietary && item.dietary.includes(dietaryFilter as any));

      return matchesCategory && matchesSearch && matchesDietary;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, dietaryFilter, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    addToCart(item, 1);
    setQuickAddedId(item.id);
    setTimeout(() => {
      setQuickAddedId(null);
    }, 1000);
  };

  return (
    <div className="w-full bg-[#0c0c0e] min-h-screen py-10 px-4 sm:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero Banner for Menu */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#18181c] via-[#202028] to-[#141418] p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div className="max-w-2xl space-y-3 relative z-10 text-left">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Our Delicious Kitchen</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-display">
              QuickBite <span className="text-amber-500">Menu</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Every item is freshly cooked to order with premium grade ingredients, crispy golden sides, and cold refreshing beverages.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block opacity-40">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
              alt="Menu Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#18181c] via-transparent to-transparent" />
          </div>
        </div>

        {/* Search, Category Filters, and Sort Controls Bar */}
        <div className="space-y-4 bg-[#141418] p-5 rounded-2xl border border-white/10 shadow-xl">
          
          {/* Top Row: Search input + Dietary pills + Sort dropdown */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search juicy burgers, cheesy pizzas, crispy wings, shakes..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Diets' },
                { id: 'bestseller', label: '⭐ Bestsellers' },
                { id: 'vegetarian', label: '🌱 Veg' },
                { id: 'spicy', label: '🔥 Spicy' },
              ].map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setDietaryFilter(tag.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    dietaryFilter === tag.id
                      ? 'bg-amber-500 text-black'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="featured" className="bg-neutral-900">Featured & Popular</option>
                <option value="price-low" className="bg-neutral-900">Price: Low to High</option>
                <option value="price-high" className="bg-neutral-900">Price: High to Low</option>
                <option value="rating" className="bg-neutral-900">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Pills Scrollable */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/20 font-black'
                    : 'bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{category.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === category.id ? 'bg-black/30 text-black font-extrabold' : 'bg-white/10 text-neutral-400'
                }`}>
                  {category.id === 'all'
                    ? MENU_ITEMS.length
                    : MENU_ITEMS.filter(i => i.category === category.id).length}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-lg font-bold text-neutral-300">No food items found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="px-6 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => {
              const isAdded = quickAddedId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItemForModal(item)}
                  className="bg-[#141418] hover:bg-[#18181e] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  {/* Top Image Section */}
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Dietary Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.dietary?.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase tracking-wider border border-amber-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Rating pill */}
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-bold text-amber-400 border border-white/10">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Meta stats: Prep time, calories */}
                      <div className="flex items-center gap-3 text-[11px] text-neutral-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-500" />
                          {item.preparationTimeMinutes} mins
                        </span>
                        {item.calories && (
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-500" />
                            {item.calories} cal
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price & Actions Bottom Bar */}
                  <div className="p-4 pt-0 flex items-center justify-between gap-3 border-t border-white/5 mt-2">
                    <div>
                      <span className="text-lg font-black text-amber-400 font-display">
                        ${item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-neutral-500 line-through ml-1.5">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleQuickAdd(e, item)}
                        className={`p-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 hover:bg-amber-400 text-black active:scale-95 shadow-md shadow-amber-500/20'
                        }`}
                        title="Add 1 to Cart"
                      >
                        {isAdded ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span className="text-[11px]">Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
