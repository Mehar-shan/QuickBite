import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Truck, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RESTAURANT_INFO } from '../../data/mockData';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    discount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    deliveryOption,
    setDeliveryOption,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const freeDeliveryThreshold = RESTAURANT_INFO.freeDeliveryThreshold;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121216] text-white shadow-2xl border-l border-white/10 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0e0e12]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black uppercase text-white font-display">Your Delicious Cart</h2>
                <span className="text-xs text-neutral-400">
                  {cart.length} unique item{cart.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-neutral-400 hover:text-red-400 transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Free Delivery Goal Bar */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                  <Truck className="w-3.5 h-3.5 text-amber-500" />
                  {remainingForFreeDelivery > 0 ? (
                    <>Add <span className="text-amber-400 font-bold">${remainingForFreeDelivery.toFixed(2)}</span> for FREE Delivery</>
                  ) : (
                    <span className="text-emerald-400 font-bold">🎉 You unlocked FREE Delivery!</span>
                  )}
                </span>
                <span className="text-[11px] text-neutral-400">Goal: ${freeDeliveryThreshold}</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>

            {/* Delivery vs Pickup switch */}
            <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setDeliveryOption('delivery')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  deliveryOption === 'delivery'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                🛵 Delivery (30 mins)
              </button>
              <button
                type="button"
                onClick={() => setDeliveryOption('pickup')}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  deliveryOption === 'pickup'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                🏬 Store Pickup (15 mins)
              </button>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-14 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">Your cart is empty</p>
                  <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                    Delicious burgers, crispy fries and cold shakes are waiting for you!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    onContinueShopping();
                  }}
                  className="px-6 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 hover:bg-amber-400"
                >
                  Browse Delicious Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-center gap-3.5"
                  >
                    {/* Food thumbnail */}
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                          {cartItem.item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(cartItem.id)}
                          className="text-neutral-500 hover:text-red-400 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      {cartItem.selectedSize && (
                        <p className="text-[10px] text-amber-400/90 truncate">
                          Size: {cartItem.selectedSize}
                        </p>
                      )}
                      {cartItem.selectedExtras && cartItem.selectedExtras.length > 0 && (
                        <p className="text-[10px] text-neutral-400 truncate">
                          +{cartItem.selectedExtras.join(', ')}
                        </p>
                      )}

                      {/* Stepper & Price */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                        <span className="font-black text-amber-400 text-xs sm:text-sm font-display">
                          ${cartItem.totalPrice.toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-xl border border-white/10">
                          <button
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                            className="w-5 h-5 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white w-4 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                            className="w-5 h-5 rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Coupon Code Section */}
            {cart.length > 0 && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Promo Coupon</span>
                  </span>
                  <span className="text-[10px] text-neutral-400">Try QUICK20 or FREESHIP</span>
                </div>

                {appliedCoupon ? (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <CheckCircle className="w-4 h-4" />
                      <span>{appliedCoupon.code} applied (-${discount.toFixed(2)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-neutral-400 hover:text-red-400 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white uppercase placeholder:normal-case placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && !appliedCoupon && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{couponFeedback.message}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer Order Summary & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#0a0a0d] border-t border-white/10 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount Promo</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-black text-white pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="text-amber-400 font-display text-lg">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                id="cart-proceed-checkout-btn"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
