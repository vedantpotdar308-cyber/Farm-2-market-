import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  PlusCircle, 
  Image as ImageIcon, 
  Calendar, 
  Tag, 
  Check, 
  Sparkles,
  Camera
} from 'lucide-react';
import { ProductCategory } from '../../types';

const SAMPLE_PHOTO_PRESETS = [
  {
    name: 'Fresh Potatoes',
    url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    category: 'Vegetables' as ProductCategory,
    defaultPrice: 22,
    defaultBulk: 16
  },
  {
    name: 'Organic Spinach (Palak)',
    url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80',
    category: 'Vegetables' as ProductCategory,
    defaultPrice: 30,
    defaultBulk: 20
  },
  {
    name: 'Nagpur Oranges (Santra)',
    url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80',
    category: 'Fruits' as ProductCategory,
    defaultPrice: 70,
    defaultBulk: 52
  },
  {
    name: 'Basmati Paddy Rice (1121)',
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    category: 'Grains & Cereals' as ProductCategory,
    defaultPrice: 65,
    defaultBulk: 50
  },
  {
    name: 'Organic Green Peas (Matar)',
    url: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=600&auto=format&fit=crop&q=80',
    category: 'Vegetables' as ProductCategory,
    defaultPrice: 55,
    defaultBulk: 38
  }
];

export const AddProductModal: React.FC = () => {
  const { 
    isAddProductModalOpen, 
    setIsAddProductModalOpen, 
    addProduct,
    setProductForPhotoVerify,
    setIsPhotoVerifyModalOpen 
  } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Vegetables');
  const [unit, setUnit] = useState<'kg' | 'quintal' | 'box' | 'crate' | 'litre'>('kg');
  const [availableQuantity, setAvailableQuantity] = useState<number>(200);
  const [pricePerUnit, setPricePerUnit] = useState<number>(35);
  const [bulkPricePerUnit, setBulkPricePerUnit] = useState<number>(25);
  const [bulkMinQuantity, setBulkMinQuantity] = useState<number>(50);
  const [harvestDate, setHarvestDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [shelfLifeDays, setShelfLifeDays] = useState<number>(10);
  const [isOrganic, setIsOrganic] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=600&auto=format&fit=crop&q=80');
  const [description, setDescription] = useState('');
  const [runPhotoVerifyImmediately, setRunPhotoVerifyImmediately] = useState(true);

  if (!isAddProductModalOpen) return null;

  const handleApplyPreset = (preset: typeof SAMPLE_PHOTO_PRESETS[0]) => {
    setName(preset.name);
    setCategory(preset.category);
    setImageUrl(preset.url);
    setPricePerUnit(preset.defaultPrice);
    setBulkPricePerUnit(preset.defaultBulk);
    setDescription(`Freshly harvested ${preset.name} direct from Patil Organic Farms.`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const createdProduct = addProduct({
      name: name.trim() || 'Farm Fresh Produce',
      category,
      unit,
      availableQuantity: Number(availableQuantity) || 100,
      pricePerUnit: Number(pricePerUnit) || 30,
      bulkPricePerUnit: Number(bulkPricePerUnit) || 22,
      bulkMinQuantity: Number(bulkMinQuantity) || 40,
      harvestDate,
      shelfLifeDays: Number(shelfLifeDays) || 7,
      isOrganic,
      images: [imageUrl],
      photoVerified: false, // will be verified in Step 3!
      qualityGrade: 'Grade B (Standard)',
      freshnessScore: 92,
      aiInspectionNotes: 'Awaiting digital photo inspection check.',
      description: description || 'Fresh produce harvested with care directly for consumer and wholesale buyers.'
    });

    setIsAddProductModalOpen(false);

    if (runPhotoVerifyImmediately) {
      setProductForPhotoVerify(createdProduct);
      setIsPhotoVerifyModalOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-green-700 text-white p-6 relative">
          <button
            onClick={() => setIsAddProductModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
              <PlusCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                Step 2 of Farmer Track
              </span>
              <h3 className="text-xl font-extrabold">Add New Farm Produce</h3>
            </div>
          </div>
          <p className="text-xs text-emerald-100 mt-1">
            Specify produce variety, available harvest quantity, single retail and wholesale bulk rates.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Quick Presets for Demo */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Quick Fill Sample Produce (1-Click Preset)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PHOTO_PRESETS.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => handleApplyPreset(p)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-medium transition"
                >
                  + {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Produce / Crop Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Nashik Red Onions, Kesar Mango"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category (Produce Type)</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ProductCategory)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains & Cereals">Grains & Cereals</option>
                <option value="Pulses">Pulses</option>
                <option value="Spices">Spices</option>
                <option value="Dairy & Natural">Dairy & Natural</option>
              </select>
            </div>
          </div>

          {/* Quantity & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Available Quantity</label>
              <input
                type="number"
                value={availableQuantity}
                onChange={e => setAvailableQuantity(Number(e.target.value))}
                min="1"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Measurement Unit</label>
              <select
                value={unit}
                onChange={e => setUnit(e.target.value as any)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="quintal">Quintal (100 kg)</option>
                <option value="box">Box / Crate</option>
                <option value="litre">Litre (l)</option>
              </select>
            </div>
          </div>

          {/* Pricing: Retail vs Bulk */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                Two-Tier Pricing Structure
              </span>
              <span className="text-[10px] text-slate-500">Retail & Wholesale slabs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Single / Retail (₹/{unit})</label>
                <input
                  type="number"
                  value={pricePerUnit}
                  onChange={e => setPricePerUnit(Number(e.target.value))}
                  min="1"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Bulk Wholesale (₹/{unit})</label>
                <input
                  type="number"
                  value={bulkPricePerUnit}
                  onChange={e => setBulkPricePerUnit(Number(e.target.value))}
                  min="1"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none text-emerald-700 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Bulk Min Qty ({unit})</label>
                <input
                  type="number"
                  value={bulkMinQuantity}
                  onChange={e => setBulkMinQuantity(Number(e.target.value))}
                  min="5"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Harvest Date & Shelf Life */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Harvest Date
              </label>
              <input
                type="date"
                value={harvestDate}
                onChange={e => setHarvestDate(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Shelf Life (Days)</label>
              <input
                type="number"
                value={shelfLifeDays}
                onChange={e => setShelfLifeDays(Number(e.target.value))}
                min="1"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
            </div>
          </div>

          {/* Photo & Image URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
              Produce Photograph URL
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="url"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
              <img
                src={imageUrl}
                alt="Preview"
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                onError={e => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=600';
                }}
              />
            </div>
          </div>

          {/* Organic checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="organicCheck"
              checked={isOrganic}
              onChange={e => setIsOrganic(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <label htmlFor="organicCheck" className="text-xs font-medium text-slate-700 cursor-pointer">
              Grown using 100% Organic / Natural Zero-Chemical Farming Practices (Prakritik Krishi)
            </label>
          </div>

          {/* Step 3 Auto-trigger toggle */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-700" />
              <div className="text-xs font-semibold text-emerald-900">
                Immediately Launch Step 3: Photo Verification
              </div>
            </div>
            <input
              type="checkbox"
              checked={runPhotoVerifyImmediately}
              onChange={e => setRunPhotoVerifyImmediately(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t">
            <button
              type="button"
              onClick={() => setIsAddProductModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition"
            >
              <Check className="w-4 h-4" />
              <span>List Product to Marketplace</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
