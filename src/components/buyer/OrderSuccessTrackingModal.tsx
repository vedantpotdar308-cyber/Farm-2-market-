import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Boxes, 
  Package, 
  MapPin, 
  Printer, 
  ArrowRight, 
  ShieldCheck,
  Building2,
  User,
  Phone,
  Calendar
} from 'lucide-react';
import { OrderStatus } from '../../types';

export const OrderSuccessTrackingModal: React.FC = () => {
  const { 
    selectedOrderForTracking, 
    setSelectedOrderForTracking, 
    setCurrentRole,
    setSplitMode,
    farmer
  } = useApp();

  if (!selectedOrderForTracking) return null;

  const order = selectedOrderForTracking;

  // Print invoice handler
  const handlePrintReceipt = () => {
    window.print();
  };

  const handleSwitchToFarmerToProgress = () => {
    setCurrentRole('farmer');
    setSelectedOrderForTracking(null);
  };

  const stepsConfig: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
    { status: 'ORDER_PLACED', label: 'Order Placed', icon: <CheckCircle2 className="w-4 h-4" /> },
    { status: 'ORDER_RECEIVED', label: 'Farmer Alerted', icon: <Clock className="w-4 h-4" /> },
    { status: 'QUANTITY_CONFIRMED', label: 'Stock Cross-Checked', icon: <Boxes className="w-4 h-4" /> },
    { status: 'PACKED', label: 'Graded & Packed', icon: <Package className="w-4 h-4" /> },
    { status: 'DISPATCHED', label: 'In Transit', icon: <Truck className="w-4 h-4" /> },
    { status: 'DELIVERED', label: 'Delivered', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  // Helper to determine status progression level
  const statusLevels: Record<OrderStatus, number> = {
    'ORDER_PLACED': 1,
    'ORDER_RECEIVED': 2,
    'QUANTITY_CONFIRMED': 3,
    'PACKED': 4,
    'DISPATCHED': 5,
    'DELIVERED': 6
  };

  const currentLevel = statusLevels[order.status] || 1;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-sky-800 text-white p-6 relative">
          <button
            onClick={() => setSelectedOrderForTracking(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
              <CheckCircle2 className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                  Step 5 of Buyer Track
                </span>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.2 rounded-full border border-emerald-400/30">
                  Live Farm Dispatch Tracking
                </span>
              </div>
              <h3 className="text-xl font-extrabold mt-0.5">
                Order Placed Successfully — Track Order Status
              </h3>
            </div>
          </div>
          <p className="text-xs text-emerald-100 mt-1">
            Tracking ID: <strong className="font-mono text-white">{order.id}</strong> • Direct from {farmer.farmName}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Progress Bar / Milestone Timeline */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Live Order Journey</span>
              <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full text-[10px] capitalize">
                Status: {order.status.replace('_', ' ')}
              </span>
            </div>

            {/* Stepper Dots */}
            <div className="grid grid-cols-6 gap-2 text-center relative">
              {/* Connecting Line behind */}
              <div className="absolute top-4 left-[8%] right-[8%] h-0.5 bg-slate-200 -z-0">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${((currentLevel - 1) / 5) * 100}%` }}
                ></div>
              </div>

              {stepsConfig.map((s, idx) => {
                const stepNum = idx + 1;
                const isPassed = currentLevel >= stepNum;
                const isCurrent = currentLevel === stepNum;

                return (
                  <div key={s.status} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                        isCurrent
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/20 scale-110'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
                    </div>
                    <div className={`text-[10px] font-bold mt-2 leading-tight ${
                      isCurrent ? 'text-emerald-800 font-extrabold' : isPassed ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Events Details */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Chronological Status Updates
            </h4>
            <div className="space-y-3 pl-2 border-l-2 border-emerald-300">
              {order.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-4">
                  <div className={`absolute -left-[9px] top-1.5 w-3 h-3 rounded-full border-2 bg-white ${
                    event.completed ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                  }`}></div>
                  <div className="flex items-center justify-between">
                    <div className={`text-xs font-bold ${event.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                      {event.title}
                    </div>
                    <span className="text-[10px] text-slate-400">{event.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics & Dispatch Card (If in transit) */}
          {order.trackingNumber && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-indigo-950">
                    Carrier: {order.logisticsPartner}
                  </div>
                  <div className="text-[11px] text-indigo-700 mt-0.5 font-mono">
                    Consignment Tracking: <strong>{order.trackingNumber}</strong>
                  </div>
                </div>
              </div>
              <div className="text-right text-xs">
                <div className="text-slate-500">Expected Delivery:</div>
                <div className="font-bold text-indigo-900">{order.estimatedDeliveryDate || 'Today by 5:00 PM'}</div>
              </div>
            </div>
          )}

          {/* Order Items Table */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Produce Items in this Consignment
            </h4>
            <div className="divide-y divide-slate-200/70 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{item.productName}</div>
                      <div className="text-[11px] text-slate-500">
                        {item.quantity} {item.unit} @ ₹{item.unitPrice}/{item.unit} ({item.isBulk ? 'Bulk Wholesale' : 'Retail'})
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800">
                    ₹{item.totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}

              <div className="pt-2 flex justify-between text-slate-600 font-medium">
                <span>Subtotal ({order.items.length} items):</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {order.savings > 0 && (
                <div className="py-1 flex justify-between text-emerald-700 font-bold">
                  <span>Wholesale Discount Applied:</span>
                  <span>- ₹{order.savings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="py-1 flex justify-between text-slate-600">
                <span>Delivery Logistics:</span>
                <span>₹{order.deliveryFee}</span>
              </div>
              <div className="pt-2 flex justify-between text-sm font-extrabold text-slate-900">
                <span>Total Paid via {order.paymentMethod}:</span>
                <span className="text-emerald-700">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-2">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-slate-800">Delivery Address: </span>
              <span className="text-slate-600">{order.deliveryAddress}</span>
            </div>
          </div>

          {/* Demonstration Action Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h5 className="text-xs font-bold text-purple-900">
                Presentation Tip: Experience the Real-Time Handshake
              </h5>
              <p className="text-[11px] text-purple-700">
                Switch to <strong>Farmer Track</strong> to check quantity & confirm stock availability, pack, or dispatch this order!
              </p>
            </div>
            <button
              onClick={handleSwitchToFarmerToProgress}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 whitespace-nowrap shadow-sm transition"
            >
              <span>Switch to Farmer View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <button
              onClick={handlePrintReceipt}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Invoice / Mandi Receipt</span>
            </button>

            <button
              onClick={() => setSelectedOrderForTracking(null)}
              className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
            >
              Close Tracker
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
