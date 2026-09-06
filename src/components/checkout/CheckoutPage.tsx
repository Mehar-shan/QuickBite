import React, { useState } from 'react';
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Truck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { OrderCustomerInfo, PaymentMethod } from '../../types';

interface CheckoutPageProps {
  onBackToCart: () => void;
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onBackToCart,
  onOrderSuccess,
}) => {
  const { cart, subtotal, deliveryFee, tax, discount, grandTotal, deliveryOption, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    deliveryAddress: user?.address || '',
    apartmentSuite: '',
    city: user?.city || 'New York',
    zipCode: '10001',
    orderNotes: '',
    deliveryOption: deliveryOption || 'delivery',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (deliveryOption === 'delivery' && !formData.deliveryAddress.trim()) {
      errs.deliveryAddress = 'Delivery address is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // Create new order in OrderContext
      const newOrder = createOrder(
        formData,
        cart,
        subtotal,
        deliveryFee,
        tax,
        discount,
        grandTotal,
        paymentMethod
      );

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ea580c', '#ffffff', '#10b981'],
        });
      } catch {
        // ignore
      }

      clearCart();
      setIsProcessing(false);
      onOrderSuccess(newOrder.id);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-[60vh] bg-[#0c0c0e] flex items-center justify-center p-4 text-white">
        <div className="text-center space-y-4 bg-[#141418] p-8 rounded-3xl border border-white/10 max-w-md">
          <p className="text-lg font-bold">No active items to checkout.</p>
          <button
            onClick={onBackToCart}
            className="px-6 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0c0c0e] py-10 px-4 sm:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <button
            onClick={onBackToCart}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-display">
              Secure Checkout
            </h1>
            <p className="text-xs text-neutral-400">Complete your details to place the fast-food order</p>
          </div>
        </div>

        {/* 2-Column Form Layout */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Customer & Delivery & Payment */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Contact Information */}
            <div className="bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                  Customer Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-500" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    id="checkout-name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Johnathan Smith"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-500" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    id="checkout-email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2 space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Phone Number (For Rider Delivery Updates) *</span>
                  </label>
                  <input
                    id="checkout-phone-input"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(212) 555-0199"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  {errors.phone && <p className="text-[11px] text-red-400">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Address & Instructions */}
            <div className="bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h2 className="text-sm font-black uppercase tracking-wider text-white">
                    Delivery Address & Instructions
                  </h2>
                </div>
                <span className="text-xs text-amber-400 font-semibold uppercase">
                  {deliveryOption === 'delivery' ? '🛵 Doorstep Delivery' : '🏬 Store Pickup'}
                </span>
              </div>

              {deliveryOption === 'delivery' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>Street Address *</span>
                    </label>
                    <input
                      id="checkout-address-input"
                      type="text"
                      required
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      placeholder="e.g. 742 Evergreen Terrace"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                    {errors.deliveryAddress && <p className="text-[11px] text-red-400">{errors.deliveryAddress}</p>}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-neutral-300">
                      Apartment / Suite / Floor
                    </label>
                    <input
                      type="text"
                      value={formData.apartmentSuite || ''}
                      onChange={(e) => setFormData({ ...formData, apartmentSuite: e.target.value })}
                      placeholder="Apt 4B, 3rd Floor"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-neutral-300">
                      City & Zip Code
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-500" />
                      <span>Special Delivery Notes for Rider</span>
                    </label>
                    <input
                      type="text"
                      value={formData.orderNotes || ''}
                      onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                      placeholder="e.g. Leave at door, buzz code #1234, ring bell twice"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2">
                  <p className="text-xs font-bold text-amber-400">Pickup Location: QuickBite Downtown Store #01</p>
                  <p className="text-xs text-neutral-300">123 Food Street, New York, NY 10001</p>
                  <p className="text-[11px] text-neutral-400">Estimated prep time: Ready in 15-20 minutes after placing order.</p>
                </div>
              )}
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                  Payment Method
                </h2>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-4 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                    paymentMethod === 'credit_card'
                      ? 'bg-amber-500/15 border-amber-400 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="block text-xs font-bold">Credit / Debit</span>
                    <span className="block text-[10px] text-neutral-400">Instant & Secure</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`p-4 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'bg-amber-500/15 border-amber-400 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="block text-xs font-bold">Cash on Delivery</span>
                    <span className="block text-[10px] text-neutral-400">Pay upon arrival</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-4 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-amber-500/15 border-amber-400 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-purple-400" />
                  <div>
                    <span className="block text-xs font-bold">Digital Wallet</span>
                    <span className="block text-[10px] text-neutral-400">Apple / Google Pay</span>
                  </div>
                </button>
              </div>

              {/* Credit Card inputs preview */}
              {paymentMethod === 'credit_card' && (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 mt-2">
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] text-neutral-400 font-semibold">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1 text-left">
                      <label className="text-[11px] text-neutral-400 font-semibold">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-mono"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-[11px] text-neutral-400 font-semibold">Security CVC</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Order Recap & Place Order CTA */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-5 shadow-2xl sticky top-28">
              <h3 className="text-sm font-black uppercase tracking-wider text-white font-display pb-3 border-b border-white/10">
                Order Items ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>

              {/* Items summary list */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((c) => (
                  <div key={c.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {c.quantity}x
                      </span>
                      <div className="truncate text-left">
                        <span className="font-semibold text-white block truncate">{c.item.name}</span>
                        {c.selectedSize && <span className="text-[10px] text-neutral-400 block truncate">{c.selectedSize}</span>}
                      </div>
                    </div>
                    <span className="font-mono text-neutral-300 shrink-0 font-bold">
                      ${c.totalPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-neutral-300">
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
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount Coupon</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="text-2xl font-black text-amber-400 font-display">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="place-order-submit-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>TRANSMITTING ORDER...</span>
                  </>
                ) : (
                  <>
                    <span>PLACE ORDER NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 text-center">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Estimated Delivery Time: 25 - 35 Minutes</span>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
