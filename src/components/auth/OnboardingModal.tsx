import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  MapPin, 
  Phone, 
  LandPlot, 
  CreditCard, 
  Building2, 
  Check, 
  Sparkles, 
  FileText 
} from 'lucide-react';
import { BuyerCategory } from '../../types';

export const OnboardingModal: React.FC = () => {
  const { 
    isOnboardingOpen, 
    currentRole, 
    farmer, 
    individualBuyer, 
    bulkBuyer, 
    buyerType, 
    setBuyerType, 
    completeOnboarding 
  } = useApp();

  // Farmer form state
  const [farmerData, setFarmerData] = useState({
    name: farmer.name || '',
    farmName: farmer.farmName || '',
    phone: farmer.phone || '',
    village: farmer.village || '',
    district: farmer.district || '',
    state: farmer.state || 'Maharashtra',
    pincode: farmer.pincode || '',
    farmSizeAcres: farmer.farmSizeAcres || 5,
    bankAccountOrUpi: farmer.bankAccountOrUpi || ''
  });

  // Buyer form state
  const [buyerData, setBuyerData] = useState({
    name: individualBuyer.name || '',
    category: buyerType,
    businessName: bulkBuyer.businessName || '',
    gstin: bulkBuyer.gstin || '',
    phone: individualBuyer.phone || '',
    deliveryAddress: individualBuyer.deliveryAddress || '',
    city: individualBuyer.city || '',
    state: individualBuyer.state || 'Maharashtra',
    pincode: individualBuyer.pincode || ''
  });

  if (!isOnboardingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole === 'farmer') {
      completeOnboarding(farmerData);
    } else {
      completeOnboarding({
        ...buyerData,
        category: buyerData.category
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className={`p-6 text-white ${
          currentRole === 'farmer' 
            ? 'bg-gradient-to-r from-emerald-800 to-teal-900' 
            : 'bg-gradient-to-r from-sky-800 to-blue-900'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{currentRole === 'farmer' ? '👨‍🌾' : '🛒'}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Welcome to Farm2Market
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold">
            {currentRole === 'farmer' ? 'Complete Your Farm Profile' : 'Complete Your Customer Profile'}
          </h3>
          <p className="text-xs text-white/80 mt-1">
            {currentRole === 'farmer' 
              ? 'Provide your farm location, land details, and payout information so buyers can purchase from you.'
              : 'Add your primary delivery address and procurement requirements to start sourcing fresh farm produce.'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* FARMER ONBOARDING */}
          {currentRole === 'farmer' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Farmer / Owner Full Name</label>
                <input
                  type="text"
                  value={farmerData.name}
                  onChange={e => setFarmerData({ ...farmerData, name: e.target.value })}
                  placeholder="e.g. Ramesh Balasaheb Patil"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Farm / Estate / FPO Name</label>
                <input
                  type="text"
                  value={farmerData.farmName}
                  onChange={e => setFarmerData({ ...farmerData, farmName: e.target.value })}
                  placeholder="e.g. Patil Agro Fresh & Orchards"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    value={farmerData.phone}
                    onChange={e => setFarmerData({ ...farmerData, phone: e.target.value })}
                    placeholder="+91 98220 14592"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Land Size (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={farmerData.farmSizeAcres}
                    onChange={e => setFarmerData({ ...farmerData, farmSizeAcres: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Village / Gram Panchayat</label>
                  <input
                    type="text"
                    value={farmerData.village}
                    onChange={e => setFarmerData({ ...farmerData, village: e.target.value })}
                    placeholder="e.g. Dindori"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                  <input
                    type="text"
                    value={farmerData.district}
                    onChange={e => setFarmerData({ ...farmerData, district: e.target.value })}
                    placeholder="e.g. Nashik"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={farmerData.state}
                    onChange={e => setFarmerData({ ...farmerData, state: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={farmerData.pincode}
                    onChange={e => setFarmerData({ ...farmerData, pincode: e.target.value })}
                    placeholder="422202"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">UPI ID or Bank Account (For direct payouts)</label>
                <input
                  type="text"
                  value={farmerData.bankAccountOrUpi}
                  onChange={e => setFarmerData({ ...farmerData, bankAccountOrUpi: e.target.value })}
                  placeholder="e.g. rameshpatil@oksbi"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>
            </div>
          )}

          {/* BUYER ONBOARDING */}
          {currentRole === 'buyer' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Buyer Category</label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => {
                      setBuyerData({ ...buyerData, category: 'individual' });
                      setBuyerType('individual');
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      buyerData.category === 'individual'
                        ? 'border-sky-600 bg-sky-50 ring-2 ring-sky-600/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Household Family</div>
                    <div className="text-[10px] text-slate-500">Retail fresh kitchen produce</div>
                  </div>

                  <div
                    onClick={() => {
                      setBuyerData({ ...buyerData, category: 'bulk' });
                      setBuyerType('bulk');
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition ${
                      buyerData.category === 'bulk'
                        ? 'border-sky-600 bg-sky-50 ring-2 ring-sky-600/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Commercial / Bulk</div>
                    <div className="text-[10px] text-slate-500">Restaurants, hotels, supermarkets</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name / Contact Person</label>
                <input
                  type="text"
                  value={buyerData.name}
                  onChange={e => setBuyerData({ ...buyerData, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                  required
                />
              </div>

              {buyerData.category === 'bulk' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Business / Hotel Name</label>
                    <input
                      type="text"
                      value={buyerData.businessName}
                      onChange={e => setBuyerData({ ...buyerData, businessName: e.target.value })}
                      placeholder="e.g. Royal Spice Hotel"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN / Trade License</label>
                    <input
                      type="text"
                      value={buyerData.gstin}
                      onChange={e => setBuyerData({ ...buyerData, gstin: e.target.value })}
                      placeholder="27AABCR8921N1ZS"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none uppercase font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={buyerData.phone}
                  onChange={e => setBuyerData({ ...buyerData, phone: e.target.value })}
                  placeholder="+91 94231 88921"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Delivery Address</label>
                <textarea
                  value={buyerData.deliveryAddress}
                  onChange={e => setBuyerData({ ...buyerData, deliveryAddress: e.target.value })}
                  placeholder="Flat/Unit, Building, Street, Landmark"
                  rows={2}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={buyerData.city}
                    onChange={e => setBuyerData({ ...buyerData, city: e.target.value })}
                    placeholder="Pune"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={buyerData.state}
                    onChange={e => setBuyerData({ ...buyerData, state: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={buyerData.pincode}
                    onChange={e => setBuyerData({ ...buyerData, pincode: e.target.value })}
                    placeholder="411038"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-2 shadow-md transition ${
                currentRole === 'farmer' 
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' 
                  : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Save Profile & Enter Platform</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
