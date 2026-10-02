import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { WorkflowDiagramBanner } from './components/WorkflowDiagramBanner';
import { RoleSelectModal } from './components/RoleSelectModal';
import { FarmerTrackView } from './components/farmer/FarmerTrackView';
import { BuyerTrackView } from './components/buyer/BuyerTrackView';
import { SplitViewDemo } from './components/SplitViewDemo';
import { AddProductModal } from './components/farmer/AddProductModal';
import { PhotoVerificationModal } from './components/farmer/PhotoVerificationModal';
import { CheckQuantityModal } from './components/farmer/CheckQuantityModal';
import { DeliveryManagementModal } from './components/farmer/DeliveryManagementModal';
import { CartDrawer } from './components/buyer/CartDrawer';
import { OrderSuccessTrackingModal } from './components/buyer/OrderSuccessTrackingModal';
import { Sprout, Heart, ShieldCheck, Zap } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentRole, splitMode } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900">
      {/* Top Fixed Header */}
      <Header />

      {/* Visual Workflow Flowchart Blueprint Banner */}
      <WorkflowDiagramBanner />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {splitMode ? (
          <SplitViewDemo />
        ) : currentRole === 'farmer' ? (
          <FarmerTrackView />
        ) : (
          <BuyerTrackView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              🌱
            </div>
            <span className="font-extrabold text-slate-800">Farm2Market</span>
            <span>— Direct Farm-to-Consumer & Bulk Procurement Hub</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Produce Provenance
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Zero Middleman Commission
            </span>
            <span>•</span>
            <span>Smart India Hackathon 2026</span>
          </div>
        </div>
      </footer>

      {/* Global Modals & Drawers */}
      <RoleSelectModal />
      <AddProductModal />
      <PhotoVerificationModal />
      <CheckQuantityModal />
      <DeliveryManagementModal />
      <CartDrawer />
      <OrderSuccessTrackingModal />
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;
