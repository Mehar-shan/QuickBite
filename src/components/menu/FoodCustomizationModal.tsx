import React, { useState } from 'react';
import { X, Plus, Minus, Star, Clock, Flame, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';

interface FoodCustomizationModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const FoodCustomizationModal: React.FC<FoodCustomizationModalProps> = ({
  item,
  onClose,
}) => {
  const { addToCart } = useCart();

  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    item.customizations?.sizes?.[0]?.name || ''
  );
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Compute total price
  let sizePrice = 0;
  if (selectedSize && item.customizations?.sizes) {
    const sizeObj = item.customizations.sizes.find(s => s.name === selectedSize);
    if (sizeObj) sizePrice = sizeObj.extraPrice;
  }

  let extrasPrice = 0;
  if (selectedExtras.length > 0 && item.customizations?.extras) {
    extrasPrice = selectedExtras.reduce((sum, extraName) => {
      const extraObj = item.customizations?.extras?.find(e => e.name === extraName);
      return sum + (extraObj ? extraObj.price : 0);
    }, 0);
  }

  const unitPrice = item.price + sizePrice + extrasPrice;
  const totalPrice = Number((unitPrice * quantity).toFixed(2));

  const handleToggleExtra = (extraName: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraName) ? prev.filter(e => e !== extraName) : [...prev, extraName]
    );
  };

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedSize || undefined, selectedExtras, notes);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-[#141418] text-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/10 flex flex-col animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Image */}
        <div className="relative aspect-video w-full bg-neutral-900 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/60" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dietary tags & Rating */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.dietary?.map(tag => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-black text-white font-display">{item.name}</h2>
              <div className="flex items-center gap-3 text-xs text-neutral-300 mt-1">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {item.rating} ({item.reviewsCount} reviews)
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  {item.preparationTimeMinutes} mins
                </span>
                {item.calories && (
                  <>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      {item.calories} kcal
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-320px)]">
          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {item.description}
          </p>

          {/* Size Selection */}
          {item.customizations?.sizes && item.customizations.sizes.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center justify-between">
                <span>Select Size / Portion</span>
                <span className="text-[10px] text-neutral-400 font-normal">Required</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {item.customizations.sizes.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedSize(s.name)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      selectedSize === s.name
                        ? 'bg-amber-500/15 border-amber-400 text-white font-bold'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/25'
                    }`}
                  >
                    <span className="block text-xs font-semibold">{s.name}</span>
                    <span className="block text-[11px] text-amber-400 mt-1">
                      {s.extraPrice > 0 ? `+$${s.extraPrice.toFixed(2)}` : 'Base price'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extras / Add-ons */}
          {item.customizations?.extras && item.customizations.extras.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center justify-between">
                <span>Add Extra Delicious Toppings</span>
                <span className="text-[10px] text-neutral-400 font-normal">Optional</span>
              </h4>
              <div className="space-y-2">
                {item.customizations.extras.map((extra) => {
                  const isChecked = selectedExtras.includes(extra.name);
                  return (
                    <div
                      key={extra.name}
                      onClick={() => handleToggleExtra(extra.name)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/60 text-white'
                          : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-amber-500 border-amber-500 text-black'
                              : 'border-neutral-500 bg-transparent'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{extra.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-400">
                        +${extra.price.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Special Instructions / Allergy Notes
            </h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. No pickles, extra napkins, sauce on the side..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Footer Actions with Quantity & Add to Cart */}
        <div className="p-5 bg-[#0e0e11] border-t border-white/10 flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-white/5 px-3 py-2 rounded-2xl border border-white/10">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors disabled:opacity-30"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm text-white w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Submit Button */}
          <button
            id="modal-add-to-cart-btn"
            onClick={handleAddToCart}
            className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
              isAddedSuccess
                ? 'bg-emerald-600 text-white shadow-emerald-600/40'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-amber-500/25 hover:scale-[1.02] active:scale-95'
            }`}
          >
            {isAddedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>ADDED TO CART!</span>
              </>
            ) : (
              <>
                <span>ADD TO CART</span>
                <span>&bull;</span>
                <span className="font-display font-extrabold text-sm sm:text-base">${totalPrice.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
