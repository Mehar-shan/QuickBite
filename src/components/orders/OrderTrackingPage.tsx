import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  Bike, 
  Home, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Receipt, 
  ShoppingBag, 
  RefreshCw,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { OrderStatus } from '../../types';

interface OrderTrackingPageProps {
  orderId?: string;
  onOrderAgain: () => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  orderId,
  onOrderAgain,
}) => {
  const { orders, activeOrder, updateOrderStatus, getOrderById } = useOrders();

  const currentOrder = orderId ? getOrderById(orderId) || activeOrder : activeOrder;

  const [simulatedMinutesLeft, setSimulatedMinutesLeft] = useState(24);

  useEffect(() => {
    const timer = setInterval(() => {
      setSimulatedMinutesLeft(prev => (prev > 1 ? prev - 1 : 1));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  if (!currentOrder) {
    return (
      <div className="w-full min-h-[60vh] bg-[#0c0c0e] flex items-center justify-center p-4 text-white">
        <div className="text-center space-y-4 bg-[#141418] p-8 rounded-3xl border border-white/10 max-w-md">
          <p className="text-lg font-bold">No active orders found.</p>
          <button
            onClick={onOrderAgain}
            className="px-6 py-2.5 rounded-full bg-amber-500 text-black font-bold text-xs"
          >
            Order Delicious Food
          </button>
        </div>
      </div>
    );
  }

  const steps: { key: OrderStatus; label: string; description: string; icon: any }[] = [
    {
      key: 'pending',
      label: 'Order Placed',
      description: 'Order received & sent to kitchen',
      icon: Clock,
    },
    {
      key: 'confirmed',
      label: 'Order Confirmed',
      description: 'Kitchen accepted your order',
      icon: CheckCircle2,
    },
    {
      key: 'preparing',
      label: 'Preparing Meal',
      description: 'Chefs grilling & frying hot',
      icon: ChefHat,
    },
    {
      key: 'out_for_delivery',
      label: 'Out for Delivery',
      description: 'Rider is on the way to you',
      icon: Bike,
    },
    {
      key: 'delivered',
      label: 'Delivered',
      description: 'Enjoy your hot meal!',
      icon: Home,
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 0;
      case 'confirmed': return 1;
      case 'preparing': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentOrder.status);

  // Status simulator helper
  const handleAdvanceStatus = () => {
    const sequence: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    const nextIdx = (currentIndex + 1) % sequence.length;
    updateOrderStatus(currentOrder.id, sequence[nextIdx]);
  };

  return (
    <div className="w-full min-h-screen bg-[#0c0c0e] py-10 px-4 sm:px-8 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Status Banner */}
        <div className="bg-gradient-to-r from-[#18181e] via-[#22222c] to-[#16161c] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Order Tracking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              Order #{currentOrder.orderNumber}
            </h1>
            <p className="text-xs text-neutral-400">
              Placed on {new Date(currentOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &bull; Estimated delivery in{' '}
              <span className="text-amber-400 font-bold">{simulatedMinutesLeft} mins</span>
            </p>
          </div>

          {/* Quick simulator tester button */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleAdvanceStatus}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-2 transition-all"
              title="Simulate status advance"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next Status Stage</span>
            </button>
            <button
              onClick={onOrderAgain}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition-all"
            >
              Order Again
            </button>
          </div>
        </div>

        {/* Timeline Progress Tracker */}
        <div className="bg-[#141418] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
          <h2 className="text-sm font-black uppercase tracking-wider text-amber-400 text-left">
            Order Progress Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {steps.map((step, idx) => {
              const isCompleted = idx <= currentIndex;
              const isCurrent = idx === currentIndex;
              const IconComp = step.icon;

              return (
                <div
                  key={step.key}
                  className={`flex sm:flex-col items-center sm:text-center gap-4 sm:gap-3 p-3.5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10'
                      : isCompleted
                      ? 'bg-white/5 border-emerald-500/40 text-neutral-300'
                      : 'bg-white/[0.02] border-white/5 opacity-40'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                      isCurrent
                        ? 'bg-amber-500 text-black animate-pulse-subtle'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-white/5 text-neutral-500'
                    }`}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="text-left sm:text-center">
                    <p className={`text-xs font-bold ${isCurrent ? 'text-amber-400' : 'text-white'}`}>
                      {step.label}
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5 leading-tight">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Info: Assigned Driver & Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Driver & Delivery Information */}
          <div className="md:col-span-5 bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-4 text-left shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Delivery Assignment
            </h3>

            {currentOrder.driver && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Bike className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{currentOrder.driver.name}</h4>
                    <p className="text-xs text-neutral-400">{currentOrder.driver.vehicle}</p>
                  </div>
                </div>

                <a
                  href={`tel:${currentOrder.driver.phone}`}
                  className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black transition-colors"
                  title="Call Driver"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            )}

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-neutral-300">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Delivery Destination</span>
                  <span>{currentOrder.customer.deliveryAddress}, {currentOrder.customer.city}</span>
                  {currentOrder.customer.orderNotes && (
                    <p className="text-amber-400/90 text-[11px] mt-1">Note: "{currentOrder.customer.orderNotes}"</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-neutral-300">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Recipient Contact</span>
                  <span>{currentOrder.customer.name} ({currentOrder.customer.phone})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Breakdown */}
          <div className="md:col-span-7 bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-4 text-left shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Receipt className="w-4 h-4" />
                <span>Receipt Summary</span>
              </h3>
              <span className="text-xs text-neutral-400">Payment: {currentOrder.paymentMethod.replace('_', ' ').toUpperCase()}</span>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-white/10 text-white font-bold text-[10px] flex items-center justify-center">
                      {item.quantity}x
                    </span>
                    <div>
                      <span className="font-semibold text-white block">{item.item.name}</span>
                      {item.selectedSize && <span className="text-[10px] text-neutral-400 block">{item.selectedSize}</span>}
                    </div>
                  </div>
                  <span className="font-mono text-amber-400 font-bold">${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-1.5 pt-2 text-xs text-neutral-300 border-t border-white/10">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">${currentOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{currentOrder.deliveryFee === 0 ? 'FREE' : `$${currentOrder.deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-mono">${currentOrder.tax.toFixed(2)}</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount</span>
                  <span>-${currentOrder.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm sm:text-base font-black text-white pt-2 border-t border-white/10">
                <span>Total Amount Paid</span>
                <span className="text-amber-400 font-display text-lg">${currentOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
