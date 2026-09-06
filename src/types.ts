export type CategoryId = 'all' | 'burgers' | 'pizzas' | 'chicken' | 'sides' | 'wraps' | 'drinks' | 'desserts' | 'combos';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  itemCount: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  isSpecial?: boolean;
  isAvailable: boolean;
  preparationTimeMinutes: number;
  calories?: number;
  dietary?: ('spicy' | 'vegetarian' | 'non-veg' | 'bestseller' | 'halal')[];
  customizations?: {
    sizes?: { name: string; extraPrice: number }[];
    extras?: { name: string; price: number }[];
  };
}

export interface CartItem {
  id: string; // unique item cart instance ID
  menuItemId: string;
  item: MenuItem;
  quantity: number;
  selectedSize?: string;
  selectedExtras?: string[];
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderCustomerInfo {
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  apartmentSuite?: string;
  city: string;
  zipCode: string;
  orderNotes?: string;
  deliveryOption: 'delivery' | 'pickup';
}

export type PaymentMethod = 'credit_card' | 'cash_on_delivery' | 'google_pay' | 'apple_pay';

export interface Order {
  id: string;
  orderNumber: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  driver?: {
    name: string;
    phone: string;
    vehicle: string;
  };
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrderAmount: number;
  description: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  openingHours: string;
  rating: number;
  reviewsCount: number;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  taxRate: number;
}
