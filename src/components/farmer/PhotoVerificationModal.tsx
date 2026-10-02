import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  RefreshCw,
  Search,
  Check
} from 'lucide-react';
import { Product } from '../../types';

export const PhotoVerificationModal: React.FC = () => {
  const { 
    isPhotoVerifyModalOpen, 
    setIsPhotoVerifyModalOpen, 
    productForPhotoVerify,
    verifyProductPhoto 
  } = useApp();

  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [freshnessScore, setFreshnessScore] = useState(97);
  const [grade, setGrade] = useState<Product['qualityGrade']>('Grade A (Export / Premium)');
  const [notes, setNotes] = useState('High coloration consistency, firm surface texture, zero visible mold or transport bruising.');

  if (!isPhotoVerifyModalOpen || !productForPhotoVerify) return null;

  const handleStartAnalysis = () => {
    setAnalyzing(true);
    setAnalyzed(false);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      setFreshnessScore(Math.floor(94 + Math.random() * 5));
    }, 1200);
  };

  const handleConfirmVerification = () => {
    verifyProductPhoto(
      productForPhotoVerify.id,
      freshnessScore,
      grade,
      notes
    );
    setIsPhotoVerifyModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            onClick={() => setIsPhotoVerifyModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
              <Camera className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                Step 3 of Farmer Track
              </span>
              <h3 className="text-xl font-extrabold">Photo Verification</h3>
            </div>
          </div>
          <p className="text-xs text-emerald-100 mt-1">
            Digital produce inspection & quality verification badge generator for "{productForPhotoVerify.name}".
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Produce Image Card with Scanning Overlay */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-900 flex items-center justify-center">
            <img
              src={productForPhotoVerify.images[0] || 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=600'}
              alt={productForPhotoVerify.name}
              className={`w-full h-full object-cover transition-opacity ${analyzing ? 'opacity-80' : 'opacity-100'}`}
            />

            {/* Scanning beam animation */}
            {analyzing && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent animate-pulse flex items-center justify-center">
                <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-2 border border-emerald-400/40">
                  <Search className="w-4 h-4 text-emerald-400 animate-spin" />
                  Analyzing produce color spectrum, texture & freshness...
                </div>
              </div>
            )}

            {/* Verified badge watermark preview */}
            {(analyzed || productForPhotoVerify.photoVerified) && !analyzing && (
              <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg border border-white/20">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Verified Farm Produce</span>
              </div>
            )}
          </div>

          {/* Verification Results & Controls */}
          {!analyzed && !productForPhotoVerify.photoVerified ? (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-xs text-slate-600 mb-3">
                Run the automated digital quality scanner to evaluate surface defects, freshness grade, and enable the verified badge on buyer listings.
              </p>
              <button
                type="button"
                onClick={handleStartAnalysis}
                disabled={analyzing}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-sm transition"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Scanning Produce Image...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Run Digital Inspection Scan</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                    Freshness Index
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-900 mt-0.5 flex items-baseline gap-1">
                    {freshnessScore}<span className="text-xs text-emerald-600 font-medium">/ 100</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
                    Crisp, farm-harvested state
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                  <div className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">
                    Assigned Quality Grade
                  </div>
                  <div className="text-sm font-extrabold text-sky-950 mt-1 truncate">
                    {grade}
                  </div>
                  <div className="text-[10px] text-sky-700 font-medium mt-0.5">
                    Eligible for Retail & Bulk
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quality Inspector Notes (Visible to Buyers)
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed flex items-start gap-2">
                <span className="font-bold text-amber-700 text-xs mt-0.5">ℹ</span>
                <span>
                  <strong>Hackathon Quality Protocol:</strong> Photo verification provides digital traceability and surface inspection. Physical harvest cross-checking is additionally executed at <strong>Step 5 (Check Quantity)</strong> before dispatch.
                </span>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t">
            <button
              type="button"
              onClick={() => setIsPhotoVerifyModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Close
            </button>
            {(analyzed || productForPhotoVerify.photoVerified) && (
              <button
                type="button"
                onClick={handleConfirmVerification}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition"
              >
                <Check className="w-4 h-4" />
                <span>Issue & Publish Verified Badge</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
