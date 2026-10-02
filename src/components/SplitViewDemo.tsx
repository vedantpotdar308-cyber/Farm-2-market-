import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Columns, 
  X, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  PlusCircle, 
  Boxes, 
  Truck, 
  ShoppingCart, 
  Send 
} from 'lucide-react';
import { FarmerTrackView } from './farmer/FarmerTrackView';
import { BuyerTrackView } from './buyer/BuyerTrackView';

export const SplitViewDemo: React.FC = () => {
  const { setSplitMode } = useApp();

  return (
    <div className="space-y-4">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-800 to-slate-900 rounded-3xl p-4 sm:p-5 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md">
            <Columns className="w-6 h-6 text-purple-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-300">
                Hackathon Live Dual-Screen Demo Mode
              </span>
              <span className="text-[10px] bg-white/20 text-white px-2 py-0.2 rounded-full font-bold">
                Real-Time Synchronized
              </span>
            </div>
            <p className="text-xs text-purple-200 mt-0.5">
              Watch buyer orders placed on the right pane instantly trigger notifications & availability checks on the left farmer pane!
            </p>
          </div>
        </div>

        <button
          onClick={() => setSplitMode(false)}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition border border-white/20"
        >
          <X className="w-4 h-4" />
          <span>Exit Split View</span>
        </button>
      </div>

      {/* Dual Pane Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Left Pane: Farmer Track (Green Border) */}
        <div className="rounded-3xl border-2 border-emerald-500/50 bg-emerald-50/20 p-4 sm:p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">👨‍🌾</span>
              <div>
                <h3 className="font-extrabold text-emerald-950 text-base">Farmer Track (Sell Produce)</h3>
                <p className="text-[11px] text-emerald-700">Patil Organic Farms • Dindori, Nashik</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white">
              Producer Window
            </span>
          </div>

          <FarmerTrackView />
        </div>

        {/* Right Pane: Buyer Track (Blue Border) */}
        <div className="rounded-3xl border-2 border-sky-500/50 bg-sky-50/20 p-4 sm:p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-sky-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <div>
                <h3 className="font-extrabold text-sky-950 text-base">Buyer Track (Buy Produce)</h3>
                <p className="text-[11px] text-sky-700">Individual Household & Commercial Bulk Buyer</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-600 text-white">
              Customer Window
            </span>
          </div>

          <BuyerTrackView />
        </div>

      </div>

    </div>
  );
};
