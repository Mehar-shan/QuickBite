import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  Truck, 
  Tag, 
  CheckCircle,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { RESTAURANT_INFO } from '../../data/mockData';

interface CartPageProps {
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
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
    deliveryOption,
    setDeliveryOption,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) setCouponInput('');
  };

  const freeDeliveryThreshold = RESTAURANT_INFO.freeDeliveryThreshold;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-[70vh] bg-[#0c0c0e] flex items-center justify-center p-4 text-white">
        <div className="max-w-md w-full text-center space-y-5 bg-[#141418] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase text-white font-display">Your Cart is Empty</h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Looks like you haven't added any delicious food yet. Check out our fresh burgers, pizzas, and combos!
            </p>
          </div>
          <button
            onClick={onContinueShopping}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:scale-105 transition-all"
          >
            Explore Full Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0c0c0e] py-10 px-4 sm:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={onContinueShopping}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-display">
                Shopping Cart
              </h1>
              <p className="text-xs text-neutral-400">Review your selected items and options</p>
            </div>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Empty Cart</span>
          </button>
        </div>

        {/* Two Columns: Items Table + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Items List */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Delivery Meter */}
            <div className="p-4 rounded-2xl bg-[#141418] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="flex items-center gap-2 text-neutral-200 font-semibold">
                  <Truck className="w-4 h-4 text-amber-500" />
                  {remainingForFreeDelivery > 0 ? (
                    <>Add <span className="text-amber-400 font-bold">${remainingForFreeDelivery.toFixed(2)}</span> more to unlock FREE Delivery!</>
                  ) : (
                    <span className="text-emerald-400 font-bold">🎉 FREE Delivery unlocked!</span>
                  )}
                </span>
                <span className="text-xs text-neutral-400 font-mono">${subtotal.toFixed(2)} / ${freeDeliveryThreshold}.00</span>
              </div>
              <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>

            {/* Cart Items Cards */}
            <div className="space-y-3">
              {cart.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#141418] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-20 h-20 rounded-2xl object-cover shrink-0"
                    />
                    <div className="space-y-1 text-left">
                      <h3 className="font-bold text-sm sm:text-base text-white">
                        {cartItem.item.name}
                      </h3>
                      {cartItem.selectedSize && (
                        <p className="text-xs text-amber-400">
                          Size: {cartItem.selectedSize}
                        </p>
                      )}
                      {cartItem.selectedExtras && cartItem.selectedExtras.length > 0 && (
                        <p className="text-xs text-neutral-400">
                          Extras: {cartItem.selectedExtras.join(', ')}
                        </p>
                      )}
                      {cartItem.notes && (
                        <p className="text-[11px] text-neutral-500 italic">
                          Note: "{cartItem.notes}"
                        </p>
                      )}
                      <p className="text-xs text-neutral-400 font-mono">
                        ${cartItem.unitPrice.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    {/* Stepper */}
                    <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                      <button
                        onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs sm:text-sm font-bold text-white w-6 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right min-w-[70px]">
                      <span className="text-base sm:text-lg font-black text-amber-400 font-display">
                        ${cartItem.totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Delete item */}
                    <button
                      onClick={() => removeFromCart(cartItem.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Shopping Button */}
            <div className="pt-2">
              <button
                onClick={onContinueShopping}
                className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Add More Delicious Food Items</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Delivery Option Selector */}
            <div className="bg-[#141418] p-5 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-400">
                Fulfillment Preference
              </h3>
              <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setDeliveryOption('delivery')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                    deliveryOption === 'delivery'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  🛵 Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryOption('pickup')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                    deliveryOption === 'pickup'
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  🏬 Store Pickup
                </button>
              </div>
            </div>

            {/* Promo Voucher Box */}
            <div className="bg-[#141418] p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo Code</span>
                </h3>
                <span className="text-[11px] text-neutral-400">Available: QUICK20</span>
              </div>

              {appliedCoupon ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Coupon {appliedCoupon.code} applied!</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-neutral-400 hover:text-red-400 text-xs font-semibold"
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
                    placeholder="e.g. QUICK20"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase placeholder:normal-case placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && !appliedCoupon && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{couponFeedback.message}</span>
                </p>
              )}
            </div>

            {/* Order Breakdown Box */}
            <div className="bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-white font-display">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
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
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono">${tax.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Voucher Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-base font-bold text-white">Grand Total</span>
                  <span className="text-2xl font-black text-amber-400 font-display">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-95 transition-all mt-4"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-neutral-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Guaranteed Safe & Secure Checkout</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
