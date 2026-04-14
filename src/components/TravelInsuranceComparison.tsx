import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Plane, Building, Activity, CheckCircle, CreditCard, ChevronRight, Lock, Umbrella, Map, ArrowLeft, Loader2, FileShield } from 'lucide-react';

const MOCK_BOOKINGS = [
  { id: 'b1', type: 'flight', title: 'Roundtrip Flight', destination: 'Tokyo, Japan', date: 'Oct 12 - Oct 20', cost: 1200, icon: Plane },
  { id: 'b2', type: 'hotel', title: 'Luxury Stay', destination: 'Kyoto Resort & Spa', date: 'Oct 15 - Oct 18', cost: 850, icon: Building },
  { id: 'b3', type: 'tour', title: 'Mt. Fuji Guided Hike', destination: 'Mt. Fuji', date: 'Oct 16', cost: 250, icon: Map }
];

const POLICIES = [
  { 
    id: 'basic', 
    name: 'Essential Care', 
    price: 45, 
    coverage: ['Medical up to $50k', 'Trip Cancellation ($1k)', 'Lost Baggage ($500)'], 
    icon: Umbrella, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200', activeBorder: 'ring-blue-500' 
  },
  { 
    id: 'premium', 
    name: 'Premium Shield', 
    price: 95, 
    coverage: ['Medical up to $250k', 'Full Trip Cancellation', 'Lost Baggage ($2k)', 'Flight Delay ($500)'], 
    icon: Shield, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-200', activeBorder: 'ring-indigo-600', popular: true 
  },
  { 
    id: 'adventure', 
    name: 'Extreme Adventure', 
    price: 150, 
    coverage: ['Medical up to $1M', 'Extreme Sports Coverage', 'Helicopter Evacuation', 'Gear Protection ($5k)'], 
    icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', activeBorder: 'ring-rose-500' 
  }
];

export default function TravelInsuranceComparison() {
  const [step, setStep] = useState<'selection' | 'checkout' | 'success'>('selection');
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>('premium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const totalTripCost = MOCK_BOOKINGS.reduce((sum, b) => sum + b.cost, 0);
  const selectedPolicy = POLICIES.find(p => p.id === selectedPolicyId)!;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Header */}
        <header className="mb-12">
          {step === 'checkout' && (
            <button onClick={() => setStep('selection')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Policies
            </button>
          )}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            {step === 'selection' && "Protect Your Journey"}
            {step === 'checkout' && "Secure Checkout"}
            {step === 'success' && "You're Fully Covered!"}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            {step === 'selection' && "We've analyzed your bookings and synthesized the best insurance policies to keep you safe."}
            {step === 'checkout' && "Complete your payment securely. Your policy is effective instantly."}
            {step === 'success' && "Your trip is now protected. A copy of your policy has been sent to your digital wallet."}
          </p>
        </header>

        <AnimatePresence mode="wait">
          {/* STEP 1: SELECTION */}
          {step === 'selection' && (
            <motion.div 
              key="selection" 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Left Col: Trip Details */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                     <FileShield className="text-indigo-500 w-5 h-5" /> Covered Itinerary
                  </h3>
                  <div className="space-y-4">
                    {MOCK_BOOKINGS.map(booking => (
                      <div key={booking.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                          <booking.icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-bold text-sm tracking-tight">{booking.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{booking.destination} · {booking.date}</p>
                          <p className="text-sm font-semibold text-indigo-600 mt-2">${booking.cost.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Total Trip Value</span>
                    <span className="text-2xl font-black">${totalTripCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Right Col: Policies */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {POLICIES.map((policy) => (
                    <div 
                      key={policy.id} 
                      onClick={() => setSelectedPolicyId(policy.id)}
                      className={`relative cursor-pointer rounded-3xl border-2 transition-all duration-300 p-6 flex flex-col ${selectedPolicyId === policy.id ? \`bg-white shadow-xl shadow-indigo-100/50 \${policy.activeBorder}\` : \`bg-white shadow-sm hover:shadow-md \${policy.border} border-slate-100\`}`}
                    >
                      {policy.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                          Recommended
                        </div>
                      )}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${policy.bg} ${policy.color}`}>
                        <policy.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold mb-1">{policy.name}</h3>
                      <p className="text-3xl font-black mb-6">${policy.price}<span className="text-sm text-slate-400 font-normal"> / trip</span></p>
                      
                      <ul className="space-y-3 mb-8 flex-1">
                        {policy.coverage.map((item, idx) => (
                          <li key={idx} className="flex gap-2 text-sm font-medium text-slate-600">
                            <CheckCircle className={`w-5 h-5 shrink-0 ${policy.color}`} /> {item}
                          </li>
                        ))}
                      </ul>

                      <div className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-colors ${selectedPolicyId === policy.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {selectedPolicyId === policy.id ? 'Selected' : 'Select Plan'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-end">
                  <button 
                    onClick={() => setStep('checkout')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
                  >
                    Proceed to Checkout <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CHECKOUT */}
          {step === 'checkout' && (
            <motion.div 
              key="checkout" 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {/* Order Summary */}
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-xl mb-6 flex items-center gap-2">Order Summary</h3>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="font-bold text-lg">{selectedPolicy.name}</p>
                      <p className="text-sm text-slate-500">Comprehensive Travel Coverage</p>
                    </div>
                    <p className="font-black text-xl">${selectedPolicy.price}</p>
                  </div>
                  <ul className="space-y-3 mb-8 border-t border-b border-slate-100 py-6">
                    {selectedPolicy.coverage.map((item, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-slate-600 items-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-medium text-slate-600">Total (USD)</span>
                    <span className="font-black text-2xl">${selectedPolicy.price}.00</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="order-1 md:order-2">
                <form onSubmit={handleCheckout} className="space-y-6">
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-xl mb-6 flex items-center justify-between">
                      Payment Details
                      <Lock className="w-4 h-4 text-emerald-500" />
                    </h3>
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Name on Card</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Jane Doe"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                          value={formData.cardName}
                          onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Card Number</label>
                        <div className="relative">
                          <input 
                            required
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                          />
                          <CreditCard className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Expiry Date</label>
                          <input 
                            required
                            type="text" 
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                            value={formData.expiry}
                            onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">CVV</label>
                          <input 
                            required
                            type="password" 
                            placeholder="123"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                            value={formData.cvv}
                            onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={isProcessing}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                  >
                    {isProcessing ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing Payment...</>
                    ) : (
                      <><Lock className="w-4 h-4" /> Pay ${selectedPolicy.price}.00</>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <motion.div 
              key="success" 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-12"
            >
              <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-100">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-black mb-4">Payment Successful!</h2>
              <p className="text-slate-500 text-lg mb-8">
                Your <span className="font-bold text-slate-800">{selectedPolicy.name}</span> policy is now active. 
                Your coverage number is <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 font-bold tracking-widest">AETH-{Math.floor(100000 + Math.random() * 900000)}</span>.
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 transition-all shadow-lg hover:scale-105"
              >
                Return to Explorer Hub
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}