import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  User, 
  PlusCircle, 
  Camera, 
  Bell, 
  Boxes, 
  Truck, 
  ShoppingBag, 
  CreditCard, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';

export const WorkflowDiagramBanner: React.FC = () => {
  const { currentRole } = useApp();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Live Workflow Architecture Navigator
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              Based on Farm-to-Market Blueprint
            </span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 transition"
          >
            {isOpen ? 'Minimize Flowchart' : 'Show Blueprint Steps'}
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            {/* Top Root: Start -> Login */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                ▶ Start
              </span>
              <span className="text-slate-400 font-bold text-xs">→</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-300">
                <Lock className="w-3 h-3 text-sky-600" />
                Login (Select User Type)
              </span>
            </div>

            {/* Split Tracks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Farmer Track */}
              <div className={`p-3 rounded-xl border transition-all ${
                currentRole === 'farmer' 
                  ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/20 shadow-sm' 
                  : 'bg-slate-50/60 border-slate-200 opacity-70 hover:opacity-100'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      👨‍🌾
                    </span>
                    <span className="font-bold text-emerald-900 text-sm">Farmer Track</span>
                    <span className="text-[11px] text-emerald-700 font-normal">(Sell Your Produce)</span>
                  </div>
                  {currentRole === 'farmer' && (
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Active View
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 pt-1">
                  <div className="bg-white p-1.5 rounded-lg border border-emerald-200 text-center shadow-2xs">
                    <User className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                    <div className="font-semibold text-slate-800 text-[10px] leading-tight">Farmer Detail & Address</div>
                    <div className="text-[9px] text-slate-400">Profile Info</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-emerald-200 text-center shadow-2xs">
                    <PlusCircle className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                    <div className="font-semibold text-slate-800 text-[10px] leading-tight">Add Product</div>
                    <div className="text-[9px] text-slate-400">Price & Qty</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-emerald-200 text-center shadow-2xs">
                    <Camera className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                    <div className="font-semibold text-slate-800 text-[10px] leading-tight">Photo Verification</div>
                    <div className="text-[9px] text-slate-400">Quality Check</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-emerald-200 text-center shadow-2xs">
                    <Bell className="w-3.5 h-3.5 mx-auto text-amber-500 mb-0.5" />
                    <div className="font-semibold text-slate-800 text-[10px] leading-tight">Order Received</div>
                    <div className="text-[9px] text-slate-400">Live Alert</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-emerald-200 text-center shadow-2xs">
                    <Boxes className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                    <div className="font-semibold text-slate-800 text-[10px] leading-tight">Check Quantity</div>
                    <div className="text-[9px] text-slate-400">Stock Cross-check</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-emerald-200 text-center shadow-2xs">
                    <Truck className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                    <div className="font-semibold text-slate-800 text-[10px] leading-tight">Delivery</div>
                    <div className="text-[9px] text-slate-400">Ship to Buyer</div>
                  </div>
                </div>
              </div>

              {/* Buyer Track */}
              <div className={`p-3 rounded-xl border transition-all ${
                currentRole === 'buyer' 
                  ? 'bg-sky-50/80 border-sky-400 ring-2 ring-sky-500/20 shadow-sm' 
                  : 'bg-slate-50/60 border-slate-200 opacity-70 hover:opacity-100'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold">
                      🛒
                    </span>
                    <span className="font-bold text-sky-900 text-sm">Buyer Track</span>
                    <span className="text-[11px] text-sky-700 font-normal">(Individual & Bulk Buyers)</span>
                  </div>
                  {currentRole === 'buyer' && (
                    <span className="bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Active View
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-1">
                  <div className="bg-white p-1.5 rounded-lg border border-sky-200 text-center shadow-2xs">
                    <User className="w-3.5 h-3.5 mx-auto text-sky-600 mb-0.5" />
                    <div className="font-semibold text-slate-800 text-[10px] leading-tight">Buyer Detail & Address</div>
                    <div className="text-[9px] text-slate-400">Profile / Business</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-sky-200 text-center shadow-2xs">
                    <ShoppingBag className="w-3.5 h-3.5 mx-auto text-sky-600 mb-0.5" />
                    <div className="font-semibold text-slate-800 text-[10px] leading-tight">Browse & Buy</div>
                    <div className="text-[9px] text-slate-400">Single & Bulk Cart</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-sky-200 text-center shadow-2xs">
                    <CreditCard className="w-3.5 h-3.5 mx-auto text-sky-600 mb-0.5" />
                    <div className="font-semibold text-slate-800 text-[10px] leading-tight">Address & Payment</div>
                    <div className="text-[9px] text-slate-400">UPI / Escrow / COD</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-sky-200 text-center shadow-2xs">
                    <CheckCircle className="w-3.5 h-3.5 mx-auto text-sky-600 mb-0.5" />
                    <div className="font-semibold text-slate-800 text-[10px] leading-tight">Place Order</div>
                    <div className="text-[9px] text-slate-400">Confirm & Submit</div>
                  </div>
                  <div className="bg-white p-1.5 rounded-lg border border-emerald-300 text-center shadow-2xs bg-emerald-50/50">
                    <Truck className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                    <div className="font-semibold text-emerald-900 text-[10px] leading-tight">Order Placed Successfully</div>
                    <div className="text-[9px] text-emerald-700">Track Order Live</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
