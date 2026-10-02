import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FarmerProfileView } from './FarmerProfileView';
import { OrderReceivedView } from './OrderReceivedView';
import { 
  Sprout, 
  PlusCircle, 
  Camera, 
  Bell, 
  Boxes, 
  Truck, 
  User, 
  CheckCircle2, 
  Tag, 
  TrendingUp, 
  Layers,
  Sparkles,
  Award
} from 'lucide-react';
import { Product } from '../../types';

export const FarmerTrackView: React.FC = () => {
  const { 
    farmer, 
    products, 
    orders, 
    setIsAddProductModalOpen, 
    setIsPhotoVerifyModalOpen, 
    setProductForPhotoVerify,
    deleteProduct
  } = useApp();

  const [activeTab, setActiveTab] = useState<'PRODUCTS' | 'ORDERS' | 'PROFILE'>('PRODUCTS');

  // Stats
  const totalStockKg = products.reduce((sum, p) => sum + (p.unit === 'kg' ? p.availableQuantity : p.availableQuantity * 20), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'ORDER_RECEIVED').length;
  const verifiedProductsCount = products.filter(p => p.photoVerified).length;
  const totalEarnings = orders
    .filter(o => o.status === 'DELIVERED' || o.status === 'DISPATCHED' || o.status === 'QUANTITY_CONFIRMED')
    .reduce((sum, o) => sum + o.subtotal, 0);

  const handleLaunchPhotoVerify = (product: Product) => {
    setProductForPhotoVerify(product);
    setIsPhotoVerifyModalOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Farmer Identity & KPIs */}
      <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Abstract background decorative circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-32 -mb-16 w-48 h-48 rounded-full bg-teal-400/10 blur-2xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Farmer Track Dashboard (Sell Your Produce)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {farmer.farmName}
            </h1>
            <p className="text-emerald-200/80 text-xs sm:text-sm mt-1 flex items-center gap-2 flex-wrap">
              <span>Producer: <strong>{farmer.name}</strong></span>
              <span>•</span>
              <span>{farmer.village}, {farmer.district} ({farmer.state})</span>
              <span>•</span>
              <span>{farmer.farmSizeAcres} Acres Farmed</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Step 2: Add New Produce</span>
            </button>
            <button
              onClick={() => setActiveTab('PROFILE')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition"
            >
              <User className="w-4 h-4" />
              <span>Step 1: Farmer Detail</span>
            </button>
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] font-semibold text-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Active Listings
            </div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {products.length}
            </div>
            <div className="text-[10px] text-emerald-300 mt-0.5">
              {verifiedProductsCount} Photo Verified
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              Step 4: New Orders
            </div>
            <div className="text-2xl font-extrabold text-white mt-1 flex items-baseline gap-2">
              {orders.length}
              {pendingOrdersCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-bold animate-pulse">
                  {pendingOrdersCount} Check Needed
                </span>
              )}
            </div>
            <div className="text-[10px] text-amber-200/80 mt-0.5">
              Direct from buyers
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] font-semibold text-teal-200 uppercase tracking-wider flex items-center gap-1.5">
              <Boxes className="w-3.5 h-3.5 text-teal-400" />
              Available Stock
            </div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {totalStockKg.toLocaleString('en-IN')} <span className="text-xs font-normal text-teal-200">kg</span>
            </div>
            <div className="text-[10px] text-teal-200/80 mt-0.5">
              Across crops & veggies
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] font-semibold text-sky-200 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
              Direct Earnings
            </div>
            <div className="text-2xl font-extrabold text-white mt-1">
              ₹{totalEarnings.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-sky-200/80 mt-0.5">
              0% Mandi Commission lost
            </div>
          </div>
        </div>
      </div>

      {/* Tabs matching Farmer Workflow */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('PRODUCTS')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'PRODUCTS'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Listed Produce & Verification (Steps 2 & 3)</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
            {products.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'ORDERS'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Orders & Stock Verification (Steps 4, 5 & 6)</span>
          {pendingOrdersCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-amber-950 font-extrabold animate-pulse">
              {pendingOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('PROFILE')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'PROFILE'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Farmer Profile & Farm Geo-Address (Step 1)</span>
        </button>
      </div>

      {/* Tab 1: Listed Produce & Verification */}
      {activeTab === 'PRODUCTS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Your Produce Inventory
              </h3>
              <p className="text-xs text-slate-500">
                Manage harvest stocks, update retail/wholesale rates, and trigger Step 3 Photo Quality Verification.
              </p>
            </div>

            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Produce</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />

                    {/* Category pill */}
                    <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                      {product.category}
                    </span>

                    {/* Verification Status Badge */}
                    {product.photoVerified ? (
                      <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                        <Award className="w-3 h-3 text-amber-300" />
                        <span>Verified {product.freshnessScore}%</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleLaunchPhotoVerify(product)}
                        className="absolute top-2.5 right-2.5 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm animate-pulse"
                      >
                        <Camera className="w-3 h-3" />
                        <span>Run Step 3 Verify</span>
                      </button>
                    )}

                    {product.isOrganic && (
                      <span className="absolute bottom-2.5 left-2.5 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                        100% Organic
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition">
                      {product.name}
                    </h4>

                    {/* Two-tier pricing */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400">Retail Rate</div>
                        <div className="font-extrabold text-slate-800">
                          ₹{product.pricePerUnit}<span className="text-[10px] font-normal text-slate-500">/{product.unit}</span>
                        </div>
                      </div>

                      <div className="border-l border-slate-200 pl-3">
                        <div className="text-[10px] text-emerald-600 font-semibold">Bulk Wholesale</div>
                        <div className="font-extrabold text-emerald-700">
                          ₹{product.bulkPricePerUnit}<span className="text-[10px] font-normal text-emerald-600">/{product.unit}</span>
                        </div>
                        <div className="text-[9px] text-slate-400">Min {product.bulkMinQuantity} {product.unit}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span>In Stock: <strong className="text-slate-800">{product.availableQuantity} {product.unit}</strong></span>
                      <span>Harvest: {product.harvestDate}</span>
                    </div>

                    {product.photoVerified && (
                      <div className="text-[11px] text-slate-500 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                        <span className="font-bold text-emerald-800">{product.qualityGrade}:</span> {product.aiInspectionNotes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                  <button
                    onClick={() => handleLaunchPhotoVerify(product)}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 py-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{product.photoVerified ? 'Re-inspect' : 'Verify Photo'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${product.name} from catalog?`)) {
                        deleteProduct(product.id);
                      }
                    }}
                    className="text-xs text-rose-500 hover:text-rose-700 py-1.5"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Orders Received & Quantity Check */}
      {activeTab === 'ORDERS' && (
        <OrderReceivedView />
      )}

      {/* Tab 3: Farmer Profile & Address */}
      {activeTab === 'PROFILE' && (
        <FarmerProfileView />
      )}

    </div>
  );
};
