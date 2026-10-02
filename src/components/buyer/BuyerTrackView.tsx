import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrowseProductsView } from './BrowseProductsView';
import { BuyerProfileView } from './BuyerProfileView';
import { 
  ShoppingBag, 
  Truck, 
  User, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  TrendingDown, 
  ExternalLink 
} from 'lucide-react';

export const BuyerTrackView: React.FC = () => {
  const { 
    activeBuyer, 
    buyerType, 
    orders, 
    setSelectedOrderForTracking,
    setIsCartOpen,
    cartCount 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'BROWSE' | 'ORDERS' | 'PROFILE'>('BROWSE');

  // Filter orders made by buyer
  const buyerOrders = orders;
  const inTransitCount = orders.filter(o => o.status === 'DISPATCHED').length;
  const totalSaved = orders.reduce((sum, o) => sum + (o.savings || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Buyer Context */}
      <div className="bg-gradient-to-br from-sky-800 via-blue-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 mb-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              Buyer Track Dashboard (Buy Fresh Products)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {buyerType === 'bulk' && activeBuyer.businessName 
                ? activeBuyer.businessName 
                : `Welcome, ${activeBuyer.name}`}
            </h1>
            <p className="text-sky-200/80 text-xs sm:text-sm mt-1 flex items-center gap-2 flex-wrap">
              <span>Account: <strong>{buyerType === 'bulk' ? 'Commercial Bulk Buyer' : 'Individual Household'}</strong></span>
              <span>•</span>
              <span>Delivery Hub: {activeBuyer.city}, {activeBuyer.state}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/25 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Basket ({cartCount})</span>
            </button>
            <button
              onClick={() => setActiveTab('PROFILE')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition"
            >
              <User className="w-4 h-4" />
              <span>Step 1: Profile & Address</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] font-semibold text-sky-200 uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-sky-400" />
              Total Orders Sourced
            </div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {buyerOrders.length} Orders
            </div>
            <div className="text-[10px] text-sky-300 mt-0.5">
              Direct from verified farmers
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              Live Deliveries
            </div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {inTransitCount} In Transit
            </div>
            <div className="text-[10px] text-amber-200/80 mt-0.5">
              Trackable live
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] font-semibold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              Direct Sourcing Savings
            </div>
            <div className="text-2xl font-extrabold text-white mt-1">
              ₹{totalSaved.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-emerald-300 mt-0.5">
              Saved via wholesale slabs
            </div>
          </div>
        </div>
      </div>

      {/* Tabs matching Buyer Track */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('BROWSE')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'BROWSE'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse & Buy Products (Step 2)</span>
        </button>

        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'ORDERS'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Track Order Status (Step 5)</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
            {buyerOrders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('PROFILE')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'PROFILE'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Buyer Detail & Address (Step 1)</span>
        </button>
      </div>

      {/* Tab 1: Browse Products */}
      {activeTab === 'BROWSE' && (
        <BrowseProductsView />
      )}

      {/* Tab 2: Track Orders */}
      {activeTab === 'ORDERS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Your Order History & Live Tracking
              </h3>
              <p className="text-xs text-slate-500">
                Step 5: Follow your consignments as the farmer checks availability, packs, and dispatches them.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {buyerOrders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-sky-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {order.id}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${
                      order.status === 'DELIVERED' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : order.status === 'DISPATCHED'
                        ? 'bg-indigo-100 text-indigo-800'
                        : order.status === 'QUANTITY_CONFIRMED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 ml-2">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 font-medium text-slate-700">
                        {item.quantity} {item.unit} {item.productName}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedOrderForTracking(order)}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto shadow-sm transition"
                  >
                    <span>Step 5: Track Status</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Buyer Profile */}
      {activeTab === 'PROFILE' && (
        <BuyerProfileView />
      )}

    </div>
  );
};
