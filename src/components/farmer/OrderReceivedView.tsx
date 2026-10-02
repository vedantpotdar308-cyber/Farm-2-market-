import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  Boxes, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Building2, 
  User, 
  ExternalLink,
  PackageCheck
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

export const OrderReceivedView: React.FC = () => {
  const { 
    orders, 
    setIsCheckQuantityModalOpen, 
    setActiveOrderForQuantityCheck,
    setIsDeliveryModalOpen,
    setActiveOrderForDelivery,
    setSelectedOrderForTracking,
    farmerPackOrder,
    markOrderDelivered 
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTION_REQUIRED' | 'TRANSIT' | 'COMPLETED'>('ALL');

  // Filter orders
  const filteredOrders = orders.filter(o => {
    if (statusFilter === 'ACTION_REQUIRED') {
      return o.status === 'ORDER_RECEIVED' || o.status === 'QUANTITY_CONFIRMED' || o.status === 'PACKED';
    }
    if (statusFilter === 'TRANSIT') return o.status === 'DISPATCHED';
    if (statusFilter === 'COMPLETED') return o.status === 'DELIVERED';
    return true;
  });

  const handleOpenQuantityCheck = (order: Order) => {
    setActiveOrderForQuantityCheck(order);
    setIsCheckQuantityModalOpen(true);
  };

  const handleOpenDelivery = (order: Order) => {
    setActiveOrderForDelivery(order);
    setIsDeliveryModalOpen(true);
  };

  const pendingChecksCount = orders.filter(o => o.status === 'ORDER_RECEIVED').length;

  return (
    <div className="space-y-4">
      {/* Header with Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900">
              Orders Received
            </h3>
            {pendingChecksCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                {pendingChecksCount} Need Stock Cross-Check
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Step 4: Customer orders arriving in real-time from Pune, Mumbai and surrounding mandi regions.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              statusFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({orders.length})
          </button>
          <button
            onClick={() => setStatusFilter('ACTION_REQUIRED')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              statusFilter === 'ACTION_REQUIRED' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Action Needed ({orders.filter(o => o.status === 'ORDER_RECEIVED' || o.status === 'QUANTITY_CONFIRMED' || o.status === 'PACKED').length})
          </button>
          <button
            onClick={() => setStatusFilter('TRANSIT')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              statusFilter === 'TRANSIT' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In Transit ({orders.filter(o => o.status === 'DISPATCHED').length})
          </button>
          <button
            onClick={() => setStatusFilter('COMPLETED')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              statusFilter === 'COMPLETED' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Delivered ({orders.filter(o => o.status === 'DELIVERED').length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Bell className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">No Orders in this category</h4>
          <p className="text-xs text-slate-500 mt-1">
            Orders placed by buyers will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map(order => {
            const isPendingCheck = order.status === 'ORDER_RECEIVED';
            const isConfirmed = order.status === 'QUANTITY_CONFIRMED';
            const isPacked = order.status === 'PACKED';
            const isDispatched = order.status === 'DISPATCHED';
            const isDelivered = order.status === 'DELIVERED';

            return (
              <div
                key={order.id}
                className={`bg-white rounded-2xl border transition-all p-5 shadow-xs ${
                  isPendingCheck 
                    ? 'border-amber-300 ring-2 ring-amber-400/20 bg-amber-50/20' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Top line: Order ID, Type, Date, Amount */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {order.id}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      order.buyerCategory === 'bulk' 
                        ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                        : 'bg-sky-100 text-sky-800 border border-sky-200'
                    }`}>
                      {order.buyerCategory === 'bulk' ? <Building2 className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {order.buyerCategory === 'bulk' ? 'Bulk Wholesale Order' : 'Household Order'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    {isPendingCheck && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        <Clock className="w-3 h-3" />
                        Step 5: Needs Stock Check
                      </span>
                    )}
                    {isConfirmed && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
                        <CheckCircle2 className="w-3 h-3" />
                        Quantity Confirmed
                      </span>
                    )}
                    {isPacked && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300">
                        <PackageCheck className="w-3 h-3" />
                        Packed & Sealed
                      </span>
                    )}
                    {isDispatched && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                        <Truck className="w-3 h-3" />
                        In Transit
                      </span>
                    )}
                    {isDelivered && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Delivered
                      </span>
                    )}

                    <span className="text-sm font-extrabold text-slate-900 ml-2">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Body: Buyer & Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 text-xs">
                  {/* Buyer details */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Customer / Dispatch Info
                    </span>
                    <div className="font-bold text-slate-900">{order.buyerName}</div>
                    <div className="text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                      {order.deliveryAddress}
                    </div>
                    <div className="text-slate-400 mt-0.5">{order.buyerPhone}</div>
                  </div>

                  {/* Items Ordered */}
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Produce Items Ordered
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-slate-800 truncate">{item.productName}</div>
                            <div className="text-[11px] text-slate-500">
                              <span className="font-bold text-slate-900">{item.quantity} {item.unit}</span> @ ₹{item.unitPrice}/{item.unit}
                            </div>
                          </div>
                          <span className="text-[11px] font-bold text-slate-800">
                            ₹{item.totalPrice}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Action buttons according to workflow step */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedOrderForTracking(order)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Customer Tracking Journey</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Step 5: Check Quantity */}
                    {isPendingCheck && (
                      <button
                        onClick={() => handleOpenQuantityCheck(order)}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
                      >
                        <Boxes className="w-4 h-4" />
                        <span>Step 5: Check Quantity & Confirm Stock</span>
                      </button>
                    )}

                    {/* Pack Produce */}
                    {isConfirmed && (
                      <button
                        onClick={() => farmerPackOrder(order.id)}
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
                      >
                        <PackageCheck className="w-4 h-4" />
                        <span>Pack Produce & Seal Containers</span>
                      </button>
                    )}

                    {/* Step 6: Dispatch / Ship */}
                    {(isConfirmed || isPacked) && (
                      <button
                        onClick={() => handleOpenDelivery(order)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
                      >
                        <Truck className="w-4 h-4" />
                        <span>Step 6: Assign Carrier & Dispatch</span>
                      </button>
                    )}

                    {/* In Transit -> Mark Delivered */}
                    {isDispatched && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 hidden sm:inline">
                          Carrier: <strong className="text-slate-800">{order.logisticsPartner}</strong>
                        </span>
                        <button
                          onClick={() => markOrderDelivered(order.id)}
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Mark as Delivered</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
