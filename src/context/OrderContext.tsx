import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, OrderCustomerInfo, CartItem, PaymentMethod } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';

interface OrderContextType {
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  createOrder: (customer: OrderCustomerInfo, items: CartItem[], subtotal: number, deliveryFee: number, tax: number, discount: number, total: number, paymentMethod: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  unreadManagerAlert: string | null;
  clearManagerAlert: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('quickbite_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [activeOrderId, setActiveOrderId] = useState<string | null>(() => {
    try {
      return localStorage.getItem('quickbite_active_order_id') || 'ord-1001';
    } catch {
      return 'ord-1001';
    }
  });

  const [unreadManagerAlert, setUnreadManagerAlert] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('quickbite_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (activeOrderId) {
        localStorage.setItem('quickbite_active_order_id', activeOrderId);
      }
    } catch {
      // ignore
    }
  }, [activeOrderId]);

  const activeOrder = orders.find(o => o.id === activeOrderId) || orders[0] || null;

  const createOrder = (
    customer: OrderCustomerInfo,
    items: CartItem[],
    subtotal: number,
    deliveryFee: number,
    tax: number,
    discount: number,
    total: number,
    paymentMethod: PaymentMethod
  ): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `QB-${randomSuffix}`,
      customer,
      items,
      subtotal,
      deliveryFee,
      tax,
      discount,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'paid',
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: '25-35 mins',
      driver: {
        name: 'Carlos Mendez',
        phone: '(212) 555-4819',
        vehicle: 'Yellow QuickBite Scooter #12',
      },
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    setUnreadManagerAlert(`🔔 New Order #${newOrder.orderNumber} received from ${customer.name} ($${newOrder.total.toFixed(2)})!`);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(order => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId || o.orderNumber.toLowerCase() === orderId.toLowerCase());
  };

  const clearManagerAlert = () => {
    setUnreadManagerAlert(null);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrder,
        setActiveOrder: (ord) => setActiveOrderId(ord ? ord.id : null),
        createOrder,
        updateOrderStatus,
        getOrderById,
        unreadManagerAlert,
        clearManagerAlert,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
