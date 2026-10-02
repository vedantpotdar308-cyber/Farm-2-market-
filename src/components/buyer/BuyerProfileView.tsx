import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Save, 
  CheckCircle2, 
  FileText,
  Sparkles
} from 'lucide-react';
import { BuyerCategory } from '../../types';

export const BuyerProfileView: React.FC = () => {
  const { 
    buyerType, 
    setBuyerType, 
    activeBuyer, 
    updateBuyerProfile 
  } = useApp();

  const [formData, setFormData] = useState({ ...activeBuyer });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync if buyerType changes
  React.useEffect(() => {
    setFormData({ ...activeBuyer });
  }, [activeBuyer, buyerType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBuyerProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-700 to-blue-800 p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={formData.avatarUrl}
            alt={formData.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight">{formData.name}</h2>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                buyerType === 'bulk' 
                  ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30' 
                  : 'bg-sky-400/20 text-sky-200 border border-sky-400/30'
              }`}>
                {buyerType === 'bulk' ? <Building2 className="w-3.5 h-3.5 text-amber-300" /> : <User className="w-3.5 h-3.5 text-sky-300" />}
                {buyerType === 'bulk' ? 'Commercial Bulk Buyer' : 'Household Individual Buyer'}
              </span>
            </div>
            {formData.businessName && (
              <p className="text-sky-100 text-xs mt-0.5 font-medium">{formData.businessName}</p>
            )}
            <p className="text-sky-200/80 text-xs flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {formData.city}, {formData.state} — {formData.pincode}
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/20 text-right">
          <div className="text-[11px] text-sky-200 uppercase font-semibold">Step 1 of Flowchart</div>
          <div className="text-sm font-bold text-white">Buyer Detail & Address</div>
        </div>
      </div>

      {/* Switch Buyer Mode in Profile */}
      <div className="p-6 pb-0">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Select Buyer Account Category
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            onClick={() => setBuyerType('individual')}
            className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
              buyerType === 'individual'
                ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className={`p-2 rounded-lg ${buyerType === 'individual' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Individual Household Customer</div>
              <div className="text-[11px] text-slate-500">Retail quantities for family cooking & kitchen</div>
            </div>
          </div>

          <div
            onClick={() => setBuyerType('bulk')}
            className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
              buyerType === 'bulk'
                ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className={`p-2 rounded-lg ${buyerType === 'bulk' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>Commercial Bulk Buyer</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded font-bold">Wholesale Slabs</span>
              </div>
              <div className="text-[11px] text-slate-500">Restaurants, Hotels, Supermarkets & Food Processors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6">
        {savedSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-sky-50 border border-sky-300 text-sky-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
            Buyer profile and delivery destination details updated!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identity Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 border-b pb-2">
              <User className="w-4 h-4 text-sky-600" />
              Contact & Business Profile
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Person Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                required
              />
            </div>

            {buyerType === 'bulk' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Business / Enterprise Name</label>
                  <input
                    type="text"
                    value={formData.businessName || ''}
                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                    placeholder="e.g. Royal Spice Grand Hotel Ltd"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    GSTIN / Trade License No
                  </label>
                  <input
                    type="text"
                    value={formData.gstin || ''}
                    onChange={e => setFormData({ ...formData, gstin: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none uppercase font-mono"
                    placeholder="27AABCR8921N1ZS"
                  />
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile (WhatsApp)</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 border-b pb-2">
              <MapPin className="w-4 h-4 text-sky-600" />
              Delivery Destination & Coordinates
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address / Floor / Flat</label>
              <textarea
                value={formData.deliveryAddress}
                onChange={e => setFormData({ ...formData, deliveryAddress: e.target.value })}
                rows={2}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={e => setFormData({ ...formData, state: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                required
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs mb-1">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Zero Middleman Sourcing Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Orders are dispatched directly from verified farmers without passing through multiple local brokers, ensuring lower prices for you and higher margins for farmers.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Buyer Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
