import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  ShoppingBag, 
  Building2, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';

export const RoleSelectModal: React.FC = () => {
  const { 
    isRoleModalOpen, 
    setIsRoleModalOpen, 
    setCurrentRole, 
    setBuyerType, 
    setSplitMode 
  } = useApp();

  if (!isRoleModalOpen) return null;

  const handleSelectFarmer = () => {
    setCurrentRole('farmer');
    setSplitMode(false);
    setIsRoleModalOpen(false);
  };

  const handleSelectBuyerIndividual = () => {
    setCurrentRole('buyer');
    setBuyerType('individual');
    setSplitMode(false);
    setIsRoleModalOpen(false);
  };

  const handleSelectBuyerBulk = () => {
    setCurrentRole('buyer');
    setBuyerType('bulk');
    setSplitMode(false);
    setIsRoleModalOpen(false);
  };

  const handleSelectSplitDemo = () => {
    setSplitMode(true);
    setIsRoleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-sky-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={() => setIsRoleModalOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <Sprout className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                <Sparkles className="w-3 h-3" /> Step 1: Start → Select User Type
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                Welcome to Farm2Market
              </h2>
            </div>
          </div>
          <p className="text-emerald-100 text-sm max-w-2xl mt-2 leading-relaxed">
            Eliminating unnecessary intermediaries to give farmers better prices and consumers fresher produce. Select how you would like to participate in the platform today:
          </p>
        </div>

        {/* Roles Grid matching Flowchart */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* FARMER TRACK CARD (Green) */}
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/40 p-6 flex flex-col justify-between hover:border-emerald-600 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-md shadow-emerald-600/30">
                    👨‍🌾
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-200 text-emerald-800">
                    Farmer Track
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  Sell Your Produce
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  For individual farmers, farmer producer groups (FPOs), and rural agricultural cooperatives.
                </p>

                {/* Workflow checklist */}
                <div className="mt-4 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Farmer Profile & Farm Geo-location</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Add Produce (Retail & Bulk wholesale rates)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>AI & Quality Photo Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Real-time Order Alerts & Notification Bell</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold text-emerald-800">Stock Availability Check (Slide 5 Core)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Shipment Dispatch & Logistics Partner</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSelectFarmer}
                className="mt-6 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition group-hover:scale-[1.02]"
              >
                <span>Enter as Farmer (Patil Farms)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* BUYER TRACK CARD (Blue) */}
            <div className="rounded-2xl border-2 border-sky-500/40 bg-sky-50/40 p-6 flex flex-col justify-between hover:border-sky-600 hover:shadow-lg transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center text-2xl shadow-md shadow-sky-600/30">
                    🛒
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-200 text-sky-800">
                    Buyer Track
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition">
                  Buy Fresh Products
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Direct sourcing for household consumers, restaurants, catering services, and bulk food retail.
                </p>

                {/* Workflow checklist */}
                <div className="mt-4 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>Buyer Profile & Delivery Address</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>Browse Farm Direct Vegetables, Fruits & Grains</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>Tiered Bulk Discounts (Up to 30% Wholesale Savings)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>Secure UPI QR, Cards & Escrow Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>Live Order Tracking from Farm to Doorstep</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  onClick={handleSelectBuyerIndividual}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition group-hover:scale-[1.01]"
                >
                  <span>Enter as Household Buyer (Priya)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleSelectBuyerBulk}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-sky-300 hover:bg-sky-100/60 text-sky-900 font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Building2 className="w-3.5 h-3.5 text-sky-700" />
                  <span>Enter as Bulk Buyer (Hotel Taj / Restaurant)</span>
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Banner: Hackathon Split View Presentation Mode */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-600 text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-900">
                  Judges & Hackathon Presentation Mode
                </h4>
                <p className="text-xs text-purple-700">
                  Open dual side-by-side view to witness buyer orders trigger live farmer alerts in real-time.
                </p>
              </div>
            </div>

            <button
              onClick={handleSelectSplitDemo}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition"
            >
              <span>Launch Live Split-Screen Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
