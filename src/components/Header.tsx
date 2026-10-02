import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  ShoppingCart, 
  Bell, 
  Columns, 
  Users, 
  Check, 
  Package, 
  Building2, 
  User as UserIcon,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    buyerType,
    setBuyerType,
    splitMode,
    setSplitMode,
    farmer,
    activeBuyer,
    cartCount,
    setIsCartOpen,
    setIsRoleModalOpen,
    notifications,
    unreadFarmerNotifications,
    unreadBuyerNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    resetDemoData,
    setSelectedOrderForTracking,
    orders
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const relevantNotifications = notifications.filter(n => n.targetRole === currentRole);
  const unreadCount = currentRole === 'farmer' ? unreadFarmerNotifications : unreadBuyerNotifications;

  const handleNotificationClick = (orderId?: string, notifId?: string) => {
    if (notifId) markNotificationRead(notifId);
    if (orderId) {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        setSelectedOrderForTracking(order);
      }
    }
    setIsNotifOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center gap-2 group text-left"
              title="Click to Switch Role / View Start Screen"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">Farm<span className="text-emerald-600">2</span>Market</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                    SIH 2026
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Direct Producer to Consumer & Bulk Hub</p>
              </div>
            </button>
          </div>

          {/* Center Navigation: Track Switcher */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => {
                setCurrentRole('farmer');
                if (splitMode) setSplitMode(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                currentRole === 'farmer' && !splitMode
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>👨‍🌾 Farmer Track</span>
              {unreadFarmerNotifications > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-xs font-bold ${
                  currentRole === 'farmer' && !splitMode ? 'bg-white text-emerald-700' : 'bg-emerald-500 text-white animate-pulse'
                }`}>
                  {unreadFarmerNotifications}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setCurrentRole('buyer');
                if (splitMode) setSplitMode(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                currentRole === 'buyer' && !splitMode
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>🛒 Buyer Track</span>
              {unreadBuyerNotifications > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-xs font-bold ${
                  currentRole === 'buyer' && !splitMode ? 'bg-white text-sky-700' : 'bg-sky-500 text-white animate-pulse'
                }`}>
                  {unreadBuyerNotifications}
                </span>
              )}
            </button>

            <button
              onClick={() => setSplitMode(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition ml-1 ${
                splitMode
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-purple-700 hover:bg-purple-50'
              }`}
              title="Dual Screen: Side-by-side Farmer and Buyer view"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split Demo</span>
            </button>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* If in Buyer Mode: Quick switch between Individual vs Bulk */}
            {currentRole === 'buyer' && !splitMode && (
              <div className="hidden lg:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  onClick={() => setBuyerType('individual')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition ${
                    buyerType === 'individual' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <UserIcon className="w-3 h-3 text-sky-600" />
                  <span>Household</span>
                </button>
                <button
                  onClick={() => setBuyerType('bulk')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition ${
                    buyerType === 'bulk' ? 'bg-white text-sky-700 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Building2 className="w-3 h-3 text-sky-600" />
                  <span>Bulk Business</span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] px-1 rounded font-bold">Wholesale</span>
                </button>
              </div>
            )}

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition ${
                  unreadCount > 0 ? 'text-amber-600' : ''
                }`}
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Drawer Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                      <p className="text-xs text-slate-400 capitalize">{currentRole} Channel</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => markAllNotificationsRead(currentRole)}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {relevantNotifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        No notifications for {currentRole} yet.
                      </div>
                    ) : (
                      relevantNotifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n.orderId, n.id)}
                          className={`p-3.5 hover:bg-slate-50 cursor-pointer transition flex items-start gap-3 ${
                            !n.read ? 'bg-amber-50/50' : ''
                          }`}
                        >
                          <div className={`mt-0.5 p-1.5 rounded-lg ${
                            n.type === 'order' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'
                          }`}>
                            <Package className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-xs font-semibold ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>
                                {n.title}
                              </p>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                              {n.message}
                            </p>
                            {n.orderId && (
                              <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-600 hover:underline">
                                View Order Details <ExternalLink className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button (Buyer Mode) */}
            {(currentRole === 'buyer' || splitMode) && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-semibold text-xs transition"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[11px] font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* User Profile Pill / Switch Role Modal Button */}
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
              title="Click to switch profile or user type"
            >
              <img
                src={currentRole === 'farmer' ? farmer.avatarUrl : activeBuyer.avatarUrl}
                alt="Profile"
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-200"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {currentRole === 'farmer' ? farmer.name.split(' ')[0] + ' (Farmer)' : activeBuyer.name.split(' ')[0]}
                </div>
                <div className="text-[10px] text-slate-400 capitalize">
                  {currentRole === 'farmer' ? 'Patil Farms' : activeBuyer.category === 'bulk' ? 'Bulk Buyer' : 'Household'}
                </div>
              </div>
              <Users className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {/* Reset Demo Data Button (Handy for presentations) */}
            <button
              onClick={() => {
                if (window.confirm('Reset all demo orders and product stock to fresh start?')) {
                  resetDemoData();
                }
              }}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
              title="Reset Demo Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
