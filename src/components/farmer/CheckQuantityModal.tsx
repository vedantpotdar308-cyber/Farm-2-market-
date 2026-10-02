import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Boxes, 
  CheckCircle2, 
  AlertCircle, 
  Package, 
  Building2, 
  User, 
  Check,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const CheckQuantityModal: React.FC = () => {
  const {
    isCheckQuantityModalOpen,
    setIsCheckQuantityModalOpen,
    activeOrderForQuantityCheck,
    farmerConfirmQuantity,
    farmerPackOrder,
    setIsDeliveryModalOpen,
    setActiveOrderForDelivery,
    products
  } = useApp();

  const [confirmedCheck, setConfirmedCheck] = useState(true);
  const [harvestNote, setHarvestNote] = useState('Physically cross-checked in harvest barn. 100% available and sorted into standard ventilated crates.');

  if (!isCheckQuantityModalOpen || !activeOrderForQuantityCheck) return null;

  const order = activeOrderForQuantityCheck;

  const handleConfirm = () => {
    farmerConfirmQuantity(order.id, true, harvestNote);
    setIsCheckQuantityModalOpen(false);
  };

  const handleConfirmAndPack = () => {
    farmerConfirmQuantity(order.id, true, harvestNote);
    farmerPackOrder(order.id);
    setIsCheckQuantityModalOpen(false);
  };

  const handleConfirmAndShip = () => {
    farmerConfirmQuantity(order.id, true, harvestNote);
    farmerPackOrder(order.id);
    setIsCheckQuantityModalOpen(false);
    setActiveOrderForDelivery(order);
    setIsDeliveryModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 relative">
          <button
            onClick={() => setIsCheckQuantityModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
              <Boxes className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                Step 5 of Farmer Track (Key Differentiator)
              </span>
              <h3 className="text-xl font-extrabold">Check Quantity & Confirm Availability</h3>
            </div>
          </div>
          <p className="text-xs text-emerald-100 mt-1">
            Order #{order.id} verification: Cross-check physical barn stock before order confirmation.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Buyer Summary */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${
                order.buyerCategory === 'bulk' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {order.buyerCategory === 'bulk' ? <Building2 className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{order.buyerName}</div>
                <div className="text-[11px] text-slate-500">
                  {order.buyerCategory === 'bulk' ? 'Commercial / Bulk Buyer' : 'Household Individual Buyer'} • {order.buyerPhone}
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-800 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
              ₹{order.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Requested Items vs Available Stock Cross-Check */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-emerald-600" />
                Physical Stock Cross-Check Verification
              </h4>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Prevents Quantity Mismatch
              </span>
            </div>

            <div className="space-y-2">
              {order.items.map((item, idx) => {
                const liveProduct = products.find(p => p.id === item.productId);
                const currentStock = liveProduct ? liveProduct.availableQuantity : 100;

                return (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-11 h-11 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{item.productName}</div>
                        <div className="text-[11px] text-slate-500">
                          Requested: <span className="font-bold text-slate-800">{item.quantity} {item.unit}</span> ({item.isBulk ? 'Wholesale Slab' : 'Retail Slab'})
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>In Barn: {currentStock + item.quantity} {item.unit}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Sufficient Harvest</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Harvest & Quality Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Farmer Availability Confirmation Notes
            </label>
            <textarea
              value={harvestNote}
              onChange={e => setHarvestNote(e.target.value)}
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="e.g. Fresh stock sorted, weighed, and ready for dispatch."
            />
          </div>

          {/* Mandatory Checkbox */}
          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="confirmAvailability"
              checked={confirmedCheck}
              onChange={e => setConfirmedCheck(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <label htmlFor="confirmAvailability" className="text-xs text-emerald-950 font-medium cursor-pointer leading-relaxed">
              I have physically verified the requested produce weight in my storage barn/field. The required quantity is 100% available, fresh, and meets quality specifications.
            </label>
          </div>

          {/* Hackathon slide callout */}
          <div className="p-3 rounded-xl bg-slate-100 text-slate-600 text-[11px] leading-relaxed flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Slide 5 Value:</strong> Cross-checking quantity reduces cancellations, prevents buyer disappointment, and builds direct farm reputation.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2 border-t">
            <button
              type="button"
              onClick={() => setIsCheckQuantityModalOpen(false)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!confirmedCheck}
              onClick={handleConfirm}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Availability</span>
            </button>

            <button
              type="button"
              disabled={!confirmedCheck}
              onClick={handleConfirmAndShip}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Confirm & Ship (Step 6)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
