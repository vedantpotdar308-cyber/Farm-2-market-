import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Building, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  ArrowRight,
  Truck,
  Check
} from 'lucide-react';
import { Order } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { 
    activeBuyer, 
    cart, 
    cartSubtotal, 
    cartSavings, 
    buyerType, 
    placeOrder,
    farmer 
  } = useApp();

  const [deliveryAddress, setDeliveryAddress] = useState(
    `${activeBuyer.deliveryAddress}, ${activeBuyer.city}, ${activeBuyer.state} - ${activeBuyer.pincode}`
  );
  const [deliveryNote, setDeliveryNote] = useState('Deliver directly to kitchen / gate.');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync address if active buyer changes
  React.useEffect(() => {
    setDeliveryAddress(`${activeBuyer.deliveryAddress}, ${activeBuyer.city}, ${activeBuyer.state} - ${activeBuyer.pincode}`);
  }, [activeBuyer]);

  if (!isOpen || cart.length === 0) return null;

  const deliveryFee = buyerType === 'bulk' ? 120 : 40;
  const grandTotal = cartSubtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder(paymentMethod, deliveryAddress);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-800 to-blue-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
              <CreditCard className="w-6 h-6 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200">
                  Steps 3 & 4 of Buyer Track
                </span>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.2 rounded-full border border-emerald-400/30">
                  Zero Middleman Direct Checkout
                </span>
              </div>
              <h3 className="text-xl font-extrabold mt-0.5">Address, Payment & Order Confirmation</h3>
            </div>
          </div>
          <p className="text-xs text-sky-100 mt-1">
            Review delivery destination and choose your preferred payment option to complete your purchase.
          </p>
        </div>

        {/* Content Body */}
        <form onSubmit={handlePlaceOrder} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          
          {/* Step 3: Choose Delivery Address */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-600" />
                Step 3A: Delivery Address Destination
              </h4>
              <span className="text-[11px] text-slate-400">
                Receiver: <strong className="text-slate-700">{activeBuyer.name}</strong> ({activeBuyer.phone})
              </span>
            </div>

            <textarea
              value={deliveryAddress}
              onChange={e => setDeliveryAddress(e.target.value)}
              rows={2}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
              required
            />

            <div className="mt-2">
              <label className="block text-[11px] text-slate-500 mb-1">
                Delivery Instructions (Optional):
              </label>
              <input
                type="text"
                value={deliveryNote}
                onChange={e => setDeliveryNote(e.target.value)}
                placeholder="e.g. Leave with security, call upon arrival"
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Step 3: Set Payment Method */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-sky-600" />
              Step 3B: Set Payment Method
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: UPI */}
              <div
                onClick={() => setPaymentMethod('UPI')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                  paymentMethod === 'UPI'
                    ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${paymentMethod === 'UPI' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Instant UPI & QR</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1 rounded font-bold">Fastest</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Google Pay, PhonePe, Paytm, BHIM</p>
                </div>
              </div>

              {/* Option 2: Cards */}
              <div
                onClick={() => setPaymentMethod('Credit/Debit Card')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                  paymentMethod === 'Credit/Debit Card'
                    ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${paymentMethod === 'Credit/Debit Card' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Credit / Debit Card</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Visa, Mastercard, RuPay, Corporate Cards</p>
                </div>
              </div>

              {/* Option 3: Net Banking */}
              <div
                onClick={() => setPaymentMethod('Net Banking')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                  paymentMethod === 'Net Banking'
                    ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${paymentMethod === 'Net Banking' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Net Banking / Corporate Mandate</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">SBI, HDFC, ICICI, Axis, Bank of Maharashtra</p>
                </div>
              </div>

              {/* Option 4: Escrow / Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('Cash on Delivery / Escrow')}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                  paymentMethod === 'Cash on Delivery / Escrow'
                    ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${paymentMethod === 'Cash on Delivery / Escrow' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>Cash on Delivery / Escrow</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Pay after inspecting produce freshness</p>
                </div>
              </div>
            </div>

            {/* Interactive UPI QR preview if UPI selected */}
            {paymentMethod === 'UPI' && (
              <div className="mt-3 p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in">
                {/* QR box simulation */}
                <div className="w-24 h-24 bg-white p-2 rounded-xl border border-sky-200 shadow-xs flex flex-col items-center justify-center flex-shrink-0">
                  <div className="grid grid-cols-4 gap-1 w-full h-full p-1 bg-slate-900 rounded">
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-slate-900"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-slate-900"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-slate-900"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-slate-900"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-slate-900"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1 text-center sm:text-left">
                  <div className="font-bold text-slate-900">
                    Direct Farmer Payout Mandate: <span className="font-mono text-emerald-700">{farmer.bankAccountOrUpi}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Payment is held safely in escrow and automatically credited to farmer {farmer.name} once delivery is confirmed.
                  </p>
                  <div className="flex items-center gap-2 justify-center sm:justify-start pt-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border text-slate-700">GPay</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border text-slate-700">PhonePe</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border text-slate-700">Paytm</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border text-slate-700">BHIM</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Order Summary & Review */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Step 4: Invoice Breakdown</span>
              <span className="text-[10px] text-slate-400 font-normal">{cart.length} item kinds</span>
            </h4>

            <div className="divide-y divide-slate-200/70 text-xs">
              {cart.map((item, idx) => {
                const unitPrice = item.isBulk ? item.product.bulkPricePerUnit : item.product.pricePerUnit;
                return (
                  <div key={idx} className="py-1.5 flex items-center justify-between">
                    <span className="text-slate-700">
                      {item.quantity} {item.product.unit} × {item.product.name}
                    </span>
                    <span className="font-bold text-slate-900">
                      ₹{(unitPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}

              <div className="pt-2 flex justify-between text-slate-600">
                <span>Produce Total:</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {cartSavings > 0 && (
                <div className="py-1 flex justify-between text-emerald-700 font-bold">
                  <span>Wholesale Slab Discount:</span>
                  <span>- ₹{cartSavings.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="py-1 flex justify-between text-slate-600">
                <span>Direct Freight & Delivery:</span>
                <span>₹{deliveryFee}</span>
              </div>

              <div className="py-1 flex justify-between text-emerald-700 font-semibold">
                <span>Middleman Intermediary Fee:</span>
                <span className="text-emerald-700 font-bold">₹0 (Zero Middleman Platform)</span>
              </div>

              <div className="pt-2 flex justify-between text-base font-extrabold text-slate-900">
                <span>Total Amount Payable:</span>
                <span className="text-sky-700">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Step 4: Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t">
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-bit Encrypted Direct Farm Escrow</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 transition"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Step 4: Place Order (Confirm & Submit)</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
