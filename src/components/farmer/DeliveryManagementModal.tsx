import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Truck, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Package, 
  Send 
} from 'lucide-react';

const CARRIERS = [
  {
    name: 'Kisan Rural Express',
    type: 'Cold-chain Temperature Controlled Van',
    vehicle: 'MH-15-EG-4412',
    driver: 'Santosh Shinde',
    phone: '+91 98223 77124'
  },
  {
    name: 'Mandi Farm-to-City Bulk Freight',
    type: 'Heavy Agri Goods Carrier (Truck)',
    vehicle: 'MH-14-BT-9021',
    driver: 'Ganesh Jadhav',
    phone: '+91 94220 55182'
  },
  {
    name: 'AgroLogistics Rapid Green Transit',
    type: 'Electric Hyperlocal Cargo',
    vehicle: 'MH-12-EV-3104',
    driver: 'Rahul Potdar',
    phone: '+91 91580 44299'
  },
  {
    name: 'Farmer Self-Dispatch',
    type: 'Patil Farms Pickup Utility',
    vehicle: 'MH-15-AB-1201',
    driver: 'Ramesh Patil',
    phone: '+91 98220 14592'
  }
];

export const DeliveryManagementModal: React.FC = () => {
  const {
    isDeliveryModalOpen,
    setIsDeliveryModalOpen,
    activeOrderForDelivery,
    farmerDispatchOrder,
    setSelectedOrderForTracking
  } = useApp();

  const [selectedCarrierIndex, setSelectedCarrierIndex] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState(`F2M-TRK-${Math.floor(10000 + Math.random() * 90000)}`);
  const [estimatedEta, setEstimatedEta] = useState('Today by 5:30 PM');
  const [sealChecked, setSealChecked] = useState(true);

  if (!isDeliveryModalOpen || !activeOrderForDelivery) return null;

  const order = activeOrderForDelivery;
  const carrier = CARRIERS[selectedCarrierIndex];

  const handleDispatch = () => {
    farmerDispatchOrder(
      order.id,
      `${carrier.name} (${carrier.vehicle})`,
      trackingNumber,
      estimatedEta
    );
    setIsDeliveryModalOpen(false);
    setSelectedOrderForTracking({
      ...order,
      status: 'DISPATCHED',
      logisticsPartner: `${carrier.name} (${carrier.vehicle})`,
      trackingNumber,
      estimatedDeliveryDate: estimatedEta
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            onClick={() => setIsDeliveryModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
              <Truck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                Step 6 of Farmer Track
              </span>
              <h3 className="text-xl font-extrabold">Delivery & Shipment Dispatch</h3>
            </div>
          </div>
          <p className="text-xs text-emerald-100 mt-1">
            Assign logistics carrier and generate live transit tracking for Order #{order.id}.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Destination Preview */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Customer Delivery Destination
            </div>
            <div className="text-xs font-bold text-slate-800">{order.buyerName}</div>
            <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{order.deliveryAddress}</div>
          </div>

          {/* Logistics Partner Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Logistics Partner / Vehicle
            </label>
            <div className="space-y-2">
              {CARRIERS.map((c, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCarrierIndex(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    selectedCarrierIndex === idx
                      ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedCarrierIndex === idx ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-500">{c.type} • {c.vehicle}</div>
                    </div>
                  </div>
                  <div className="text-right text-[11px]">
                    <div className="font-semibold text-slate-800">{c.driver}</div>
                    <div className="text-slate-400">{c.phone}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking ID & ETA */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Consignment Tracking ID
              </label>
              <input
                type="text"
                value={trackingNumber}
                onChange={e => setTrackingNumber(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Estimated Arrival
              </label>
              <input
                type="text"
                value={estimatedEta}
                onChange={e => setEstimatedEta(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Quality & Packing Confirmation */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="sealChecked"
              checked={sealChecked}
              onChange={e => setSealChecked(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <label htmlFor="sealChecked" className="text-xs text-emerald-950 font-medium cursor-pointer leading-relaxed">
              Produce is packed in farm-graded containers with Farm2Market batch QR barcode and tamper-evident seal.
            </label>
          </div>

          {/* Footer action */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t">
            <button
              type="button"
              onClick={() => setIsDeliveryModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!sealChecked}
              onClick={handleDispatch}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition"
            >
              <Send className="w-4 h-4" />
              <span>Hand Over & Dispatch Shipment</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
