import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, Coupon } from '../types';
import { RESTAURANT_INFO, COUPONS } from '../data/mockData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, selectedSize?: string, selectedExtras?: string[], notes?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  grandTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  deliveryOption: 'delivery' | 'pickup';
  setDeliveryOption: (option: 'delivery' | 'pickup') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('quickbite_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'pickup'>('delivery');

  useEffect(() => {
    try {
      localStorage.setItem('quickbite_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    selectedSize?: string,
    selectedExtras: string[] = [],
    notes?: string
  ) => {
    // Calculate unit price with size and extras
    let extraSizePrice = 0;
    if (selectedSize && item.customizations?.sizes) {
      const sizeObj = item.customizations.sizes.find(s => s.name === selectedSize);
      if (sizeObj) extraSizePrice = sizeObj.extraPrice;
    }

    let extrasPrice = 0;
    if (selectedExtras.length > 0 && item.customizations?.extras) {
      extrasPrice = selectedExtras.reduce((sum, extraName) => {
        const extraObj = item.customizations?.extras?.find(e => e.name === extraName);
        return sum + (extraObj ? extraObj.price : 0);
      }, 0);
    }

    const unitPrice = item.price + extraSizePrice + extrasPrice;
    const totalPrice = unitPrice * quantity;

    // Check if identical item configuration exists
    const extrasKey = [...selectedExtras].sort().join(',');
    const existingIndex = cart.findIndex(
      ci => ci.menuItemId === item.id && ci.selectedSize === selectedSize && [...(ci.selectedExtras || [])].sort().join(',') === extrasKey
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      const existing = updated[existingIndex];
      const newQty = existing.quantity + quantity;
      updated[existingIndex] = {
        ...existing,
        quantity: newQty,
        totalPrice: Number((newQty * existing.unitPrice).toFixed(2)),
      };
      setCart(updated);
    } else {
      const newCartItem: CartItem = {
        id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        menuItemId: item.id,
        item,
        quantity,
        selectedSize,
        selectedExtras,
        unitPrice: Number(unitPrice.toFixed(2)),
        totalPrice: Number(totalPrice.toFixed(2)),
        notes,
      };
      setCart(prev => [...prev, newCartItem]);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: Number((newQuantity * item.unitPrice).toFixed(2)),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = Number(
    cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)
  );

  let deliveryFee = 0;
  if (deliveryOption === 'delivery' && subtotal > 0) {
    deliveryFee = subtotal >= RESTAURANT_INFO.freeDeliveryThreshold ? 0 : RESTAURANT_INFO.standardDeliveryFee;
  }

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.discountPercent) {
      discount = Number(((subtotal * appliedCoupon.discountPercent) / 100).toFixed(2));
    } else if (appliedCoupon.discountAmount) {
      discount = appliedCoupon.discountAmount;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Number((taxableAmount * RESTAURANT_INFO.taxRate).toFixed(2));
  const grandTotal = Number((taxableAmount + deliveryFee + tax).toFixed(2));

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const coupon = COUPONS.find(c => c.code.toUpperCase() === trimmed);
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code. Try QUICK20 or FREESHIP' };
    }
    if (subtotal < coupon.minOrderAmount) {
      return {
        success: false,
        message: `Minimum order of $${coupon.minOrderAmount.toFixed(2)} required for coupon ${coupon.code}`,
      };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Applied ${coupon.code} successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
