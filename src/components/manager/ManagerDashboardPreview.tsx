import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Trash2, 
  Flame, 
  Bell, 
  Filter, 
  Search, 
  BarChart3, 
  Layers, 
  Settings, 
  ArrowLeft,
  X,
  Check,
  Bike,
  Star,
  Users
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useOrders } from '../../context/OrderContext';
import { MENU_ITEMS, CATEGORIES, RESTAURANT_INFO } from '../../data/mockData';
import { MenuItem, OrderStatus, CategoryId } from '../../types';

interface ManagerDashboardProps {
  onBackToCustomerView: () => void;
}

export const ManagerDashboardPreview: React.FC<ManagerDashboardProps> = ({
  onBackToCustomerView,
}) => {
  const { orders, updateOrderStatus, unreadManagerAlert, clearManagerAlert } = useOrders();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'menu' | 'analytics' | 'settings'>('overview');
  
  // Menu management local state
  const [menuItemsList, setMenuItemsList] = useState<MenuItem[]>(MENU_ITEMS);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [menuFilterCategory, setMenuFilterCategory] = useState<CategoryId>('all');

  // New Item Form state
  const [newItemForm, setNewItemForm] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    category: 'burgers',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    preparationTimeMinutes: 12,
    calories: 650,
    isAvailable: true,
    rating: 4.8,
    reviewsCount: 1,
  });

  // Calculate high-level KPIs
  const totalSales = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;
  const todaySales = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;
  const completedOrdersCount = orders.filter(o => o.status === 'delivered').length;
  const popularItemName = 'Classic Angus Burger';

  // Analytics Chart Data
  const salesTrendData = [
    { time: '10:00 AM', sales: 120, orders: 8 },
    { time: '12:00 PM', sales: 480, orders: 28 },
    { time: '02:00 PM', sales: 690, orders: 42 },
    { time: '04:00 PM', sales: 380, orders: 22 },
    { time: '06:00 PM', sales: 920, orders: 58 },
    { time: '08:00 PM', sales: 1140, orders: 69 },
    { time: '10:00 PM', sales: 740, orders: 45 },
  ];

  const categoryDistributionData = [
    { name: 'Burgers', value: 45, color: '#f59e0b' },
    { name: 'Combos', value: 25, color: '#ea580c' },
    { name: 'Chicken', value: 15, color: '#10b981' },
    { name: 'Pizzas', value: 10, color: '#3b82f6' },
    { name: 'Drinks', value: 5, color: '#8b5cf6' },
  ];

  const topItemsData = [
    { name: 'Classic Burger', count: 142 },
    { name: 'Mega Combo', count: 118 },
    { name: 'Cheesy Pizza', count: 98 },
    { name: 'Fried Chicken', count: 85 },
    { name: 'French Fries', count: 210 },
  ];

  // Menu action handlers
  const handleToggleAvailability = (id: string) => {
    setMenuItemsList(prev =>
      prev.map(item => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
    );
  };

  const handleDeleteItem = (id: string) => {
    setMenuItemsList(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemForm.name || !newItemForm.price) return;

    const created: MenuItem = {
      id: `m-${Date.now()}`,
      name: newItemForm.name,
      description: newItemForm.description || 'Delicious freshly prepared meal.',
      category: newItemForm.category as CategoryId || 'burgers',
      price: Number(newItemForm.price),
      image: newItemForm.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviewsCount: 1,
      isAvailable: true,
      preparationTimeMinutes: Number(newItemForm.preparationTimeMinutes || 10),
      calories: Number(newItemForm.calories || 500),
      isPopular: true,
    };

    setMenuItemsList(prev => [created, ...prev]);
    setIsAddItemModalOpen(false);
    setNewItemForm({
      name: '',
      description: '',
      category: 'burgers',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      preparationTimeMinutes: 12,
      calories: 650,
      isAvailable: true,
    });
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    setMenuItemsList(prev =>
      prev.map(item => (item.id === editingItem.id ? editingItem : item))
    );
    setEditingItem(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#08080a] text-white">
      {/* Top Manager Banner */}
      <div className="bg-[#111115] border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold shadow-lg shadow-amber-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-display flex items-center gap-2">
              <span>QuickBite Manager Command Center</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                LIVE STORE ONLINE
              </span>
            </h1>
            <p className="text-xs text-neutral-400">Branch #01 &bull; 123 Food Street, New York, NY</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCustomerView}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Customer Store View</span>
          </button>
        </div>
      </div>

      {/* Real-time Order Alert Toast if new order arrived */}
      {unreadManagerAlert && (
        <div className="bg-amber-500 text-black px-4 py-3 font-bold text-xs sm:text-sm flex items-center justify-between shadow-xl animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2 max-w-4xl">
            <Bell className="w-5 h-5 fill-black shrink-0 animate-bounce" />
            <span>{unreadManagerAlert}</span>
          </div>
          <button
            onClick={clearManagerAlert}
            className="p-1 hover:bg-black/10 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-white/10 scrollbar-none">
          {[
            { id: 'overview', label: '📊 Dashboard Overview' },
            { id: 'orders', label: `📦 Live Orders (${orders.length})` },
            { id: 'menu', label: `🍔 Menu Management (${menuItemsList.length})` },
            { id: 'analytics', label: '📈 Sales & Analytics' },
            { id: 'settings', label: '⚙️ Store Settings' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-[#141418] text-neutral-400 hover:text-white hover:bg-[#1a1a20] border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Dashboard Overview */}
      {activeTab === 'overview' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
          {/* 6 KPI Stat Cards matching specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            
            {/* Total Sales */}
            <div className="bg-[#141418] p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Total Sales</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-white font-display">
                ${totalSales.toFixed(2)}
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold">+18.4% this week</span>
            </div>

            {/* Total Orders */}
            <div className="bg-[#141418] p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
                <ShoppingBag className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-black text-white font-display">
                {totalOrdersCount}
              </p>
              <span className="text-[10px] text-amber-400 font-semibold">Active volume</span>
            </div>

            {/* Today's Sales */}
            <div className="bg-[#141418] p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Today's Sales</span>
                <TrendingUp className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-2xl font-black text-amber-400 font-display">
                ${todaySales.toFixed(2)}
              </p>
              <span className="text-[10px] text-neutral-400 font-semibold">Updated 1m ago</span>
            </div>

            {/* Pending Orders */}
            <div className="bg-[#141418] p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Pending Orders</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-amber-400 font-display">
                {pendingOrdersCount}
              </p>
              <span className="text-[10px] text-amber-500 font-semibold">Requires Kitchen Action</span>
            </div>

            {/* Completed Orders */}
            <div className="bg-[#141418] p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Completed Orders</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-emerald-400 font-display">
                {completedOrdersCount}
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold">100% On-time</span>
            </div>

            {/* Popular Food Item */}
            <div className="bg-[#141418] p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Top Seller</span>
                <Flame className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-sm font-black text-white truncate font-display">
                {popularItemName}
              </p>
              <span className="text-[10px] text-red-400 font-semibold">142 orders sold</span>
            </div>

          </div>

          {/* Quick Chart & Incoming Orders Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sales Hourly Performance */}
            <div className="lg:col-span-7 bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  Today's Hourly Revenue Trend ($)
                </h3>
                <span className="text-xs text-amber-400 font-bold">Peak: 8:00 PM</span>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesTrendData}>
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#666" fontSize={11} />
                    <YAxis stroke="#666" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#18181c', borderColor: '#333' }} />
                    <Area type="monotone" dataKey="sales" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#salesGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Live Orders Queue Preview */}
            <div className="lg:col-span-5 bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  Latest Kitchen Queue
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-amber-400 hover:underline"
                >
                  View All Orders &rarr;
                </button>
              </div>

              <div className="space-y-3">
                {orders.slice(0, 3).map(order => (
                  <div key={order.id} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">#{order.orderNumber}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          order.status === 'delivered'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : order.status === 'out_for_delivery'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        {order.customer.name} &bull; {order.items.length} items
                      </p>
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-400">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Order Management (Full Real-Time Status Manager) */}
      {activeTab === 'orders' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white font-display">
                Real-Time Orders Management
              </h2>
              <p className="text-xs text-neutral-400">Incoming tickets, customer details, and status update controls</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">Orders count:</span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs">
                {orders.length} total
              </span>
            </div>
          </div>

          {/* Orders Table Cards */}
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-[#141418] p-5 sm:p-6 rounded-3xl border border-white/10 shadow-xl space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-amber-400 font-display">
                      #{order.orderNumber}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider ${
                      order.status === 'delivered'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : order.status === 'out_for_delivery'
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : order.status === 'preparing'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Status update quick buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                    {(['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'] as OrderStatus[]).map(st => (
                      <button
                        key={st}
                        onClick={() => updateOrderStatus(order.id, st)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                          order.status === st
                            ? 'bg-amber-500 text-black shadow-md'
                            : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2-Col Breakdown: Customer Info & Order Items */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Customer details */}
                  <div className="md:col-span-5 space-y-1.5 text-xs text-left bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="font-bold text-white text-sm">{order.customer.name}</p>
                    <p className="text-neutral-300">{order.customer.phone} &bull; {order.customer.email}</p>
                    <p className="text-neutral-400">{order.customer.deliveryAddress}, {order.customer.city}</p>
                    {order.customer.orderNotes && (
                      <p className="text-amber-400 text-[11px] pt-1">
                        Note: "{order.customer.orderNotes}"
                      </p>
                    )}
                    <div className="pt-2 flex items-center justify-between border-t border-white/5 text-[11px] text-neutral-400">
                      <span>Payment: {order.paymentMethod.replace('_', ' ')}</span>
                      <span className="text-emerald-400 font-semibold">{order.paymentStatus.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Items summary */}
                  <div className="md:col-span-7 space-y-2 text-left">
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                          <span className="text-neutral-200">
                            <strong className="text-amber-400">{it.quantity}x</strong> {it.item.name}
                            {it.selectedSize && ` (${it.selectedSize})`}
                          </span>
                          <span className="font-mono text-neutral-400">${it.totalPrice.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-baseline justify-between pt-2 border-t border-white/10">
                      <span className="text-xs text-neutral-400">Grand Total Amount</span>
                      <span className="text-lg font-black text-amber-400 font-display">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Menu Management */}
      {activeTab === 'menu' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white font-display">
                Food Menu Catalog Management
              </h2>
              <p className="text-xs text-neutral-400">Add food items, update prices, availability toggles, and photos</p>
            </div>

            <button
              onClick={() => setIsAddItemModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Food Item</span>
            </button>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Search menu items to edit..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <select
              value={menuFilterCategory}
              onChange={(e) => setMenuFilterCategory(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id} className="bg-neutral-900">{c.name}</option>
              ))}
            </select>
          </div>

          {/* Menu Items Table */}
          <div className="bg-[#141418] rounded-3xl border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0e0e12] text-neutral-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-4">Item & Visual</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Prep Time</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  {menuItemsList
                    .filter(i => (menuFilterCategory === 'all' || i.category === menuFilterCategory) &&
                      (!menuSearch || i.name.toLowerCase().includes(menuSearch.toLowerCase())))
                    .map(item => (
                      <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                              <p className="font-bold text-white text-xs">{item.name}</p>
                              <p className="text-[11px] text-neutral-500 line-clamp-1">{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 uppercase font-bold text-[11px] text-amber-400">{item.category}</td>
                        <td className="p-4 font-mono font-bold text-white text-sm">${item.price.toFixed(2)}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleToggleAvailability(item.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                              item.isAvailable
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {item.isAvailable ? 'In Stock' : 'Sold Out'}
                          </button>
                        </td>
                        <td className="p-4 text-neutral-400">{item.preparationTimeMinutes} mins</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingItem(item)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 transition-colors"
                              title="Edit item"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-400 transition-colors"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Analytics & Charts */}
      {activeTab === 'analytics' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white font-display">
              Restaurant Analytics & Sales Intelligence
            </h2>
            <p className="text-xs text-neutral-400">Interactive charts and sales breakdown for fast-food operations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Chart 1: Sales by Category Pie */}
            <div className="lg:col-span-5 bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Sales by Category (%)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    >
                      {categoryDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#18181c', borderColor: '#333' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Top Selling Items Bar Chart */}
            <div className="lg:col-span-7 bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Most Popular Food Items (Units Sold)
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topItemsData}>
                    <XAxis dataKey="name" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#18181c', borderColor: '#333' }} />
                    <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Restaurant Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-6 text-left">
          <h2 className="text-xl font-black uppercase tracking-tight text-white font-display">
            Restaurant Configuration & Settings
          </h2>

          <div className="bg-[#141418] p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Store Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Restaurant Name</label>
                <input type="text" defaultValue={RESTAURANT_INFO.name} className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white" />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Phone Number</label>
                <input type="text" defaultValue={RESTAURANT_INFO.phone} className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-neutral-400 block mb-1">Physical Address</label>
                <input type="text" defaultValue={RESTAURANT_INFO.address} className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white" />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Free Delivery Threshold ($)</label>
                <input type="number" defaultValue={RESTAURANT_INFO.freeDeliveryThreshold} className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white" />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Standard Delivery Fee ($)</label>
                <input type="number" defaultValue={RESTAURANT_INFO.standardDeliveryFee} className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white" />
              </div>
            </div>
            <div className="pt-3">
              <button className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wider">
                Save Store Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Item Modal */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSaveNewItem}
            className="bg-[#141418] text-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-black uppercase text-amber-400">Add New Food Item</h3>
              <button onClick={() => setIsAddItemModalOpen(false)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>

            <div className="space-y-3 text-xs text-left">
              <div>
                <label className="text-neutral-400 block mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  value={newItemForm.name}
                  onChange={(e) => setNewItemForm({ ...newItemForm, name: e.target.value })}
                  placeholder="e.g. Double Truffle Burger"
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Category</label>
                  <select
                    value={newItemForm.category}
                    onChange={(e) => setNewItemForm({ ...newItemForm, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id} className="bg-neutral-900">{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newItemForm.price}
                    onChange={(e) => setNewItemForm({ ...newItemForm, price: parseFloat(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Description</label>
                <textarea
                  value={newItemForm.description}
                  onChange={(e) => setNewItemForm({ ...newItemForm, description: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Image URL</label>
                <input
                  type="text"
                  value={newItemForm.image}
                  onChange={(e) => setNewItemForm({ ...newItemForm, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddItemModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-neutral-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase"
              >
                Save Food Item
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleUpdateItem}
            className="bg-[#141418] text-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-white/10 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-black uppercase text-amber-400">Edit Item: {editingItem.name}</h3>
              <button onClick={() => setEditingItem(null)}><X className="w-5 h-5 text-neutral-400" /></button>
            </div>

            <div className="space-y-3 text-xs text-left">
              <div>
                <label className="text-neutral-400 block mb-1">Item Name</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-neutral-400 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Prep Time (mins)</label>
                  <input
                    type="number"
                    value={editingItem.preparationTimeMinutes}
                    onChange={(e) => setEditingItem({ ...editingItem, preparationTimeMinutes: parseInt(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Description</label>
                <textarea
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-neutral-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase"
              >
                Update Item
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
