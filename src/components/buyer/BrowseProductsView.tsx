import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  Award, 
  MapPin, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  TrendingDown, 
  Building2, 
  User, 
  PhoneCall,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Product, ProductCategory } from '../../types';

export const BrowseProductsView: React.FC = () => {
  const { 
    products, 
    buyerType, 
    setBuyerType, 
    addToCart,
    setIsCartOpen 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [contactFarmerMsg, setContactFarmerMsg] = useState<string | null>(null);

  const categories = ['ALL', 'Vegetables', 'Fruits', 'Grains & Cereals', 'Pulses', 'Spices', 'Dairy & Natural'];

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.farmLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesVerified = !onlyVerified || p.photoVerified;
    const matchesOrganic = !onlyOrganic || p.isOrganic;

    return matchesSearch && matchesCategory && matchesVerified && matchesOrganic;
  });

  const getQty = (productId: string, defaultMin: number) => {
    if (quantities[productId] !== undefined) return quantities[productId];
    return buyerType === 'bulk' ? defaultMin : 2;
  };

  const handleQtyChange = (productId: string, delta: number, minThreshold: number) => {
    const current = getQty(productId, minThreshold);
    const updated = Math.max(1, current + delta);
    setQuantities(prev => ({ ...prev, [productId]: updated }));
  };

  const handleAddToCart = (product: Product) => {
    const minQty = buyerType === 'bulk' ? product.bulkMinQuantity : 2;
    const qty = getQty(product.id, minQty);
    addToCart(product, qty);
  };

  const handleDiscussWithFarmer = (product: Product) => {
    setContactFarmerMsg(`Connecting with ${product.farmerName} (${product.farmerPhone}) for ${product.name}... In a live deployment, this opens integrated secure messaging or WhatsApp!`);
    setTimeout(() => setContactFarmerMsg(null), 5000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Search Controls */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Farm Fresh Direct Marketplace
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold">
                Step 2: Browse & Buy
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Directly sourced from verified growers in Nashik, Pune & Maharashtra. 0% middleman markups.
            </p>
          </div>

          {/* Individual vs Bulk Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setBuyerType('individual')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                buyerType === 'individual'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span>Household Retail</span>
            </button>

            <button
              onClick={() => setBuyerType('bulk')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                buyerType === 'bulk'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Bulk Wholesale</span>
              <span className="bg-amber-400 text-amber-950 text-[10px] px-1.5 py-0.2 rounded font-extrabold">
                Wholesale Slabs
              </span>
            </button>
          </div>
        </div>

        {contactFarmerMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center justify-between animate-in fade-in">
            <span>{contactFarmerMsg}</span>
            <button onClick={() => setContactFarmerMsg(null)} className="text-emerald-700 hover:text-emerald-900 text-sm">✕</button>
          </div>
        )}

        {/* Search Bar & Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search onions, tomatoes, wheat, mango, farmer name..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          <div className="sm:col-span-6 flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition flex-1 justify-center">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={e => setOnlyVerified(e.target.checked)}
                className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
              />
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Only
              </span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition flex-1 justify-center">
              <input
                type="checkbox"
                checked={onlyOrganic}
                onChange={e => setOnlyOrganic(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span>🌿 Organic Only</span>
            </label>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? '🌾 All Produce' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Buyer Callout */}
      {buyerType === 'bulk' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 border border-sky-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-600 text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Bulk Wholesale Mode Activated (Commercial Pricing Unlocked)
              </h4>
              <p className="text-[11px] text-slate-600">
                Ordering above farmer batch minimum unlocks direct wholesale rates with 20% to 35% savings compared to city APMC mandis.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map(product => {
          const defaultMin = buyerType === 'bulk' ? product.bulkMinQuantity : 2;
          const currentQty = getQty(product.id, defaultMin);
          const isBulkUnlocked = buyerType === 'bulk' || currentQty >= product.bulkMinQuantity;
          const activeUnitPrice = isBulkUnlocked ? product.bulkPricePerUnit : product.pricePerUnit;
          const itemTotal = activeUnitPrice * currentQty;
          const regularPriceTotal = product.pricePerUnit * currentQty;
          const savings = isBulkUnlocked ? regularPriceTotal - itemTotal : 0;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                      {product.category}
                    </span>
                    {product.isOrganic && (
                      <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                        100% Organic
                      </span>
                    )}
                  </div>

                  {product.photoVerified && (
                    <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                      <Award className="w-3.5 h-3.5 text-amber-300" />
                      <span>Verified {product.freshnessScore}% Fresh</span>
                    </div>
                  )}

                  {/* Harvest freshness ribbon */}
                  <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                    <span>Harvested: {product.harvestDate}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-sky-700 transition">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Farmer origin info */}
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-800">{product.farmerName}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {product.farmLocation}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDiscussWithFarmer(product)}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-slate-600 transition"
                      title="Direct Producer Inquiry (Slide 6)"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Pricing Box */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Price</div>
                        <div className="text-lg font-extrabold text-slate-900 flex items-baseline gap-1">
                          ₹{activeUnitPrice}
                          <span className="text-xs font-normal text-slate-500">/{product.unit}</span>
                        </div>
                      </div>

                      {isBulkUnlocked ? (
                        <div className="text-right">
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                            <TrendingDown className="w-3 h-3" /> Wholesale Unlocked!
                          </span>
                          <div className="text-[10px] text-slate-400 line-through mt-0.5">
                            Standard ₹{product.pricePerUnit}/{product.unit}
                          </div>
                        </div>
                      ) : (
                        <div className="text-right text-[10px] text-slate-500">
                          <div>Bulk slab at ₹{product.bulkPricePerUnit}/{product.unit}</div>
                          <div className="text-sky-700 font-semibold">Order ≥ {product.bulkMinQuantity} {product.unit}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity selector */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">Select Quantity ({product.unit})</span>
                      <span className="text-[11px] text-slate-400">Stock: {product.availableQuantity} {product.unit}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden flex-1">
                        <button
                          type="button"
                          onClick={() => handleQtyChange(product.id, -1, defaultMin)}
                          className="p-2 hover:bg-slate-100 text-slate-600 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          value={currentQty}
                          onChange={e => {
                            const val = Math.max(1, Number(e.target.value) || 1);
                            setQuantities(prev => ({ ...prev, [product.id]: val }));
                          }}
                          className="w-full text-center text-xs font-bold text-slate-900 py-1.5 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleQtyChange(product.id, 1, defaultMin)}
                          className="p-2 hover:bg-slate-100 text-slate-600 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quick preset for bulk threshold */}
                      {buyerType === 'bulk' && currentQty < product.bulkMinQuantity && (
                        <button
                          type="button"
                          onClick={() => setQuantities(prev => ({ ...prev, [product.id]: product.bulkMinQuantity }))}
                          className="text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 px-2 py-2 rounded-xl whitespace-nowrap"
                        >
                          Set Min {product.bulkMinQuantity} {product.unit}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Calculated Subtotal with Savings */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <span className="text-slate-500">Item Total:</span>
                    <div className="text-right">
                      <span className="font-extrabold text-slate-900">₹{itemTotal.toLocaleString('en-IN')}</span>
                      {savings > 0 && (
                        <span className="text-[10px] text-emerald-600 font-bold block">
                          You Save ₹{savings.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition group-hover:scale-[1.01]"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add {currentQty} {product.unit} to Cart</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
