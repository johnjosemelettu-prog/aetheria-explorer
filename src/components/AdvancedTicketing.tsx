import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ticket, Gift, Share2, Shield, Sparkles, Check, 
  Send, Users, Anchor, Lock, Unlock, Award, Layers 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface GuestInvitation {
  id: string;
  code: string;
  status: 'Available' | 'Gifted';
  recipient?: string;
  dateGifted?: string;
}

export default function AdvancedTicketing() {
  const { t } = useTranslation();

  // Guest Pass Allotments State
  const [invitations, setInvitations] = useState<GuestInvitation[]>([
    { id: 'inv-1', code: 'AE-GUEST-9921A', status: 'Available' },
    { id: 'inv-2', code: 'AE-GUEST-4418B', status: 'Available' },
    { id: 'inv-3', code: 'AE-GUEST-0012C', status: 'Gifted', recipient: 'alex@ventures.io', dateGifted: 'May 10, 2026' }
  ]);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [selectedInvId, setSelectedInvId] = useState<string | null>('inv-1');
  const [giftSuccess, setGiftSuccess] = useState(false);

  // Fractional Booking State
  const [totalSlots, setTotalSlots] = useState(10);
  const [filledSlots, setFilledSlots] = useState(6);
  const [userJoinedFractional, setUserJoinedFractional] = useState(false);
  const totalCostEUR = 12000; // Total private charter cost

  // Commemorative NFT stub state
  const [vaultUnlocked, setVaultUnlocked] = useState(true);

  const handleGiftPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !selectedInvId) return;
    
    setInvitations(prev => prev.map(inv => {
      if (inv.id === selectedInvId) {
        return {
          ...inv,
          status: 'Gifted',
          recipient: recipientEmail,
          dateGifted: 'Just now'
        };
      }
      return inv;
    }));
    
    setGiftSuccess(true);
    setTimeout(() => {
      setGiftSuccess(false);
      setRecipientEmail('');
      // Select next available
      const nextAvail = invitations.find(i => i.id !== selectedInvId && i.status === 'Available');
      setSelectedInvId(nextAvail ? nextAvail.id : null);
    }, 2000);
  };

  const handleSplitToOpen = () => {
    if (userJoinedFractional || filledSlots >= totalSlots) return;
    setFilledSlots(prev => prev + 1);
    setUserJoinedFractional(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('auto.auto_social_currency_infr_40')}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-cyan-100 to-emerald-300 bg-clip-text text-transparent">
            {t('auto.auto_advanced_ticketing___39')}
                                </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            {t('auto.auto_elevate_access_beyon_38')}
                                </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Column 1: Guest Pass Allotments */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass rounded-3xl border border-white/10 p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    <Gift className="w-4 h-4" />
                    <span>{t('auto.auto_viral_proliferation__37')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{t('auto.auto_guest_pass_allotment_36')}</h3>
                </div>
                <span className="text-xs font-mono bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">
                  {invitations.filter(i => i.status === 'Available').length} {t('auto.auto_quota_remaining_35')}
                                                  </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {t('auto.auto_gift_sovereign_singl_34')}
                                            </p>

              {/* Gift pass action deck */}
              <form onSubmit={handleGiftPass} className="space-y-4 mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1.5">{t('auto.auto_select_sovereign_pas_33')}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {invitations.map(inv => {
                      const isAvail = inv.status === 'Available';
                      const isSelected = selectedInvId === inv.id;
                      return (
                        <button
                          key={inv.id}
                          type="button"
                          disabled={!isAvail}
                          onClick={() => setSelectedInvId(inv.id)}
                          className={cn(
                            "p-2 rounded-xl text-center text-xs font-mono transition-all border",
                            isSelected 
                              ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" 
                              : isAvail 
                              ? "bg-white/[0.02] border-white/10 text-white hover:bg-white/[0.05]" 
                              : "bg-white/[0.01] border-white/5 text-slate-600 cursor-not-allowed line-through"
                          )}
                        >
                          <span className="block truncate text-[10px] font-bold">{inv.code.split('-')[2]}</span>
                          <span className="text-[8px] text-slate-500 block uppercase">{inv.status}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1.5">{t('auto.auto_recipient_direct_vec_32')}</label>
                  <div className="flex gap-2">
                    <input 
                      type="email"
                      required
                      value={recipientEmail}
                      onChange={e => setRecipientEmail(e.target.value)}
                      placeholder={t('auto.auto_target_peer_domain_c_31')}
                      className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      disabled={!selectedInvId || giftSuccess}
                      className="px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-colors shrink-0 flex items-center gap-1 disabled:opacity-50"
                    >
                      {giftSuccess ? <Check className="w-4 h-4 text-black" /> : <Send className="w-3.5 h-3.5" />}
                      <span>{giftSuccess ? 'Dispatched' : 'Gift Link'}</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* History register */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">
                  {t('auto.auto_lineage_register_30')}
                                                  </span>
                <div className="space-y-1.5 max-h-[110px] overflow-y-auto custom-scrollbar pr-1">
                  {invitations.map(inv => (
                    <div key={inv.id} className="text-xs font-mono p-2 rounded bg-white/[0.01] border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          inv.status === 'Available' ? "bg-emerald-400" : "bg-cyan-400"
                        )} />
                        <span className="text-slate-400">{inv.code}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                        {inv.status === 'Gifted' ? `→ ${inv.recipient}` : 'Unclaimed state'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Column 2: Split-to-Open Fractional Bookings */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass rounded-3xl border border-white/10 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                <Anchor className="w-32 h-32" />
              </div>

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    <Share2 className="w-4 h-4" />
                    <span>{t('auto.auto_fractional_cost_shar_29')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{t('auto.auto_split_to_open_charte_28')}</h3>
                </div>
                <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                  {filledSlots >= totalSlots ? 'Confirmed Array' : 'Splitting Active'}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-0.5">{t('auto.auto_asset_identification_27')}</span>
                <h4 className="text-lg font-bold text-white">{t('auto.auto_private_multi_deck_y_26')}</h4>
                <span className="text-xs text-slate-400 block mt-0.5">{t('auto.auto_full_day_unlisted_sp_25')}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {t('auto.auto_high_capital_soverei_24')}
                                            </p>

              {/* Dynamic cost calculations */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold mb-1">{t('auto.auto_total_asset_outlay_23')}</span>
                  <span className="text-base font-mono font-bold text-slate-300">€{totalCostEUR.toLocaleString()} {t('auto.auto_eur_22')}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold mb-1">{t('auto.auto_current_split_per_co_21')}</span>
                  <span className="text-base font-mono font-bold text-emerald-400">
                    €{(totalCostEUR / totalSlots).toLocaleString()} <span className="text-xs text-slate-500 font-normal">{t('auto.auto___peer_20')}</span>
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white">{filledSlots} {t('auto.auto_consensus_cohorts_19')}</span>
                  <span className="text-slate-500">{totalSlots} {t('auto.auto_total_execution_slot_18')}</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                    animate={{ width: `${(filledSlots / totalSlots) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Action Trigger */}
              <button
                onClick={handleSplitToOpen}
                disabled={userJoinedFractional || filledSlots >= totalSlots}
                className={cn(
                  "w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md",
                  userJoinedFractional 
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default" 
                    : filledSlots >= totalSlots
                    ? "bg-white/5 text-slate-600 cursor-not-allowed"
                    : "bg-white text-black hover:bg-slate-200 active:scale-95"
                )}
              >
                <Users className="w-4 h-4" />
                <span>
                  {userJoinedFractional 
                    ? '✓ Sovereign Seat Bonded' 
                    : filledSlots >= totalSlots 
                    ? 'Charter Filled Fully' 
                    : `Bond 1 Slot • Reserve at €${(totalCostEUR / totalSlots).toLocaleString()}`}
                </span>
              </button>

            </div>
          </div>

        </div>

        {/* Section 3: NFT Commemorative Digital Vault Stubs */}
        <div className="glass rounded-3xl border border-white/10 p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-400 to-cyan-500" />

          <div className="max-w-3xl mb-10">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-2">{t('auto.auto_immutable_provenance_17')}</span>
            <h3 className="text-2xl font-display font-bold text-white mb-2">{t('auto.auto_nft_commemorative_ti_16')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('auto.auto_once_scanned_at_phys_15')}
                                      </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* The Smart Asset Token View */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-xs rounded-2xl bg-gradient-to-b from-slate-900 via-black to-slate-950 border border-cyan-500/30 p-6 relative shadow-2xl overflow-hidden group">
                {/* Shiny diagonal reflections */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000 pointer-events-none" />
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {t('auto.auto_smart_stub_14')}
                                                        </span>
                  <div className="flex items-center gap-1 font-mono text-[9px] text-slate-500">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span>{t('auto.auto_secured_13')}</span>
                  </div>
                </div>

                <div className="text-center pb-6 border-b border-white/10 space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">{t('auto.auto_attendance_lineage_12')}</span>
                  <h4 className="text-xl font-display font-bold text-white tracking-tight">{t('auto.auto_tokyo_convergence_20_11')}</h4>
                  <span className="text-xs text-cyan-300 font-mono block">{t('auto.auto_roppongi_hills_compo_10')}</span>
                </div>

                <div className="py-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>{t('auto.auto_cryptographic_id__9')}</span>
                    <span className="text-white truncate max-w-[120px]">{t('auto.auto_0x77fa___b9e2_8')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{t('auto.auto_block_height__7')}</span>
                    <span className="text-emerald-400">#19820412</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{t('auto.auto_legacy_tier__6')}</span>
                    <span className="text-cyan-300 font-bold">{t('auto.auto_class_i_elite_5')}</span>
                  </div>
                </div>

                {/* Animated micro visualizer */}
                <div className="mt-2 p-2 bg-white/[0.02] rounded-lg border border-white/5 text-center">
                  <span className="text-[9px] text-slate-500 uppercase block mb-1">{t('auto.auto_perpetual_unlock_arr_4')}</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Award className="w-3 h-3" /> {t('auto.auto_lifetime__5__credit__3')}
                                                        </span>
                </div>
              </div>
            </div>

            {/* Downstream Perks Matrix Info */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                {t('auto.auto_compounded_smart_ass_2')}
                                            </span>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Lineage Staking Weight', desc: 'Holders of older stubs receive multiplied voting injection parameters across subsequent Regional Governance budgets.', level: 'Active' },
                  { title: 'Airspace Access Overrides', desc: 'Holding 3+ annual summit smart assets auto-approves complimentary international companion seating redemptions.', level: 'Compounded' },
                  { title: 'Off-Menu Secret Drops', desc: 'Direct push synchronization bypasses ordinary global queues to push immediate empty-leg unlisted inventory.', level: 'Class I' },
                  { title: 'Legacy Token Issuance', desc: 'Stubs grant continuous compounding interest denominated inside base Aetheria Travel Credit liquid values.', level: 'Yielding' },
                ].map((perk, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{perk.title}</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-cyan-400 border border-white/5">
                        {perk.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{perk.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 text-xs text-slate-300 flex items-center gap-3">
                <Ticket className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  {t('auto.auto_every_future_event_a_1')}
                                                  </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
