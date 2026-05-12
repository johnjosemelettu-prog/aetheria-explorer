import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MapPin, Target, Shield, Zap, Sparkles, Navigation, 
  Leaf, Users, Vote, Plane, Navigation2, Camera, Car, Heart, 
  Award, Lock, Unlock, Play, Volume2, ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface EchoNode {
  id: string;
  creator: string;
  location: string;
  duration: string;
  listens: number;
  unlocked: boolean;
}

interface ActionWeekend {
  id: string;
  title: string;
  partner: string;
  spotsLeft: number;
  cloutReward: number;
  joined: boolean;
}

interface GearItem {
  id: string;
  name: string;
  hub: string;
  cloutCost: number;
  available: boolean;
}

interface CaravanRide {
  id: string;
  driver: string;
  route: string;
  seats: number;
  departure: string;
  claimed: boolean;
}

export default function RegionalHubs() {
  const { t } = useTranslation();
  
  const [activeTab, setActiveTab] = useState<'echoes' | 'sweat_equity' | 'logistics' | 'dao_treasury' | 'residencies' | 'sweeper'>('echoes');

  // Echoes State
  const [echoes, setEchoes] = useState<EchoNode[]>([
    { id: 'e1', creator: t('auto.auto_new_elena_r__5059'), location: t('auto.auto_new_secret_amalfi_cove_5058'), duration: '0:42', listens: 14, unlocked: true },
    { id: 'e2', creator: t('auto.auto_new_marcus_t__5057'), location: t('auto.auto_new_kyoto_hidden_matcha__5056'), duration: '1:15', listens: 89, unlocked: false },
  ]);
  const [playingEcho, setPlayingEcho] = useState<string | null>(null);

  // Philanthropy State
  const [weekends, setWeekends] = useState<ActionWeekend[]>([
    { id: 'w1', title: t('auto.auto_new_coral_reef_restorati_5055'), partner: t('auto.auto_new_oceanic_trust_se_asi_5054'), spotsLeft: 4, cloutReward: 2500, joined: false },
    { id: 'w2', title: t('auto.auto_new_alpine_trail_clearin_5053'), partner: t('auto.auto_new_mont_blanc_heritage_5052'), spotsLeft: 12, cloutReward: 1800, joined: true },
  ]);

  // Logistics State
  const [gearVault, setGearVault] = useState<GearItem[]>([
    { id: 'g1', name: t('auto.auto_new_dji_mavic_3_cine_pro_5051'), hub: t('auto.auto_new_pacific_nw_5050'), cloutCost: 400, available: true },
    { id: 'g2', name: t('auto.auto_new_mammut_avalanche_bea_5049'), hub: t('auto.auto_new_alpine_node_5048'), cloutCost: 150, available: false },
  ]);
  const [rides, setRides] = useState<CaravanRide[]>([
    { id: 'r1', driver: t('auto.auto_new_sophia_l__5047'), route: t('auto.auto_new_florence___siena_5046'), seats: 2, departure: t('auto.auto_new_tomorrow__10_00_am_5045'), claimed: false },
  ]);

  // DAO State
  const [treasuryFunds, setTreasuryFunds] = useState(145000); // EUR
  const [userClout, setUserClout] = useState(2400);
  const [votedProposal, setVotedProposal] = useState<string | null>(null);

  // Sweeper State
  const [sweeping, setSweeping] = useState(true);
  
  useEffect(() => {
    if (activeTab === 'sweeper') {
      const timer = setTimeout(() => setSweeping(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setSweeping(true);
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Module Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-rose-400 text-xs font-semibold tracking-wide uppercase mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('auto.auto_hyper_local_sovereig_473')}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-rose-100 to-amber-200 bg-clip-text text-transparent">
            {t('auto.auto_regional_travelers_c_472')}
                                </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            {t('auto.auto_transcending_traditi_471')}
                                </p>
        </motion.div>

        {/* Dynamic Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {[
            { id: 'echoes', label: 'Echoes', icon: Volume2, color: 'text-blue-400' },
            { id: 'sweat_equity', label: 'Philanthropy', icon: Leaf, color: 'text-emerald-400' },
            { id: 'logistics', label: t('auto.auto_new_caravan___vault_5044'), icon: Car, color: 'text-amber-400' },
            { id: 'dao_treasury', label: t('auto.auto_new_dao_treasury_5043'), icon: Vote, color: 'text-purple-400' },
            { id: 'residencies', label: 'Residencies', icon: Camera, color: 'text-rose-400' },
            { id: 'sweeper', label: t('auto.auto_new_empty_legs_5042'), icon: Plane, color: 'text-cyan-400' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "p-4 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group flex flex-col items-center justify-center text-center",
                  isActive 
                    ? "bg-white/[0.05] border-white/20 shadow-lg" 
                    : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]"
                )}
              >
                {isActive && (
                  <motion.div layoutId="regionalTabIndicator" className="absolute top-0 inset-x-0 h-1 bg-white/40" />
                )}
                <Icon className={cn("w-6 h-6 mb-2 transition-colors", isActive ? tab.color : "text-slate-500 group-hover:text-slate-300")} />
                <span className={cn("text-[10px] font-bold uppercase tracking-wider", isActive ? "text-white" : "text-slate-400")}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Container */}
        <div className="glass rounded-3xl border border-white/10 p-6 sm:p-10 relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >

              {/* 1. Echoes */}
              {activeTab === 'echoes' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-blue-400 font-medium text-sm">
                      <Mic className="w-4 h-4" />
                      <span>{t('auto.auto_geofenced_audio_chro_470')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">{t('auto.auto_the__echoes__network_469')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_leave_highly_localiz_468')}
                                                              </p>
                    <button className="w-full py-3 rounded-xl bg-blue-500/20 text-blue-300 font-bold text-xs border border-blue-500/30 hover:bg-blue-500/30 transition-all flex items-center justify-center gap-2">
                      <Mic className="w-4 h-4" /> {t('auto.auto_record_spatial_echo__467')}
                                                              </button>
                  </div>
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block">{t('auto.auto_nearby_encrypted_ech_466')}</span>
                    <div className="space-y-3">
                      {echoes.map(e => (
                        <div key={e.id} className={cn("p-4 rounded-2xl border transition-all", e.unlocked ? "bg-white/[0.03] border-blue-500/30" : "bg-white/[0.01] border-white/5")}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {e.unlocked ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-slate-600" />}
                              <span className="text-xs font-bold text-white">{e.location}</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">{e.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">{t('auto.auto_archived_by__465')} {e.creator} • {e.listens} {t('auto.auto_listens_464')}</span>
                            <button 
                              onClick={() => setPlayingEcho(playingEcho === e.id ? null : e.id)}
                              disabled={!e.unlocked}
                              className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all", !e.unlocked ? "bg-white/5 text-slate-600" : playingEcho === e.id ? "bg-blue-500 text-white animate-pulse" : "bg-white/10 hover:bg-white/20 text-white")}
                            >
                              <Play className="w-3.5 h-3.5 ml-0.5" />
                            </button>
                          </div>
                          {!e.unlocked && (
                            <div className="mt-3 pt-2 border-t border-white/5 text-[9px] font-mono text-slate-500">
                              {t('auto.auto_requires_physical_tr_463')}
                                                                  </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Sweat Equity */}
              {activeTab === 'sweat_equity' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-emerald-400 font-medium text-sm">
                      <Leaf className="w-4 h-4" />
                      <span>{t('auto.auto_hyper_local_philanth_462')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">{t('auto.auto__sweat_equity__actio_461')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_transform_consumptio_460')}
                                                              </p>
                  </div>
                  <div className="lg:col-span-7 space-y-4">
                    {weekends.map(w => (
                      <div key={w.id} className="p-5 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">{t('auto.auto_partner__459')} {w.partner}</span>
                          <h4 className="text-base font-bold text-white mb-2">{w.title}</h4>
                          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                            <Award className="w-3.5 h-3.5 text-amber-400" />
                            +{w.cloutReward.toLocaleString()} {t('auto.auto_clout_reward_458')}
                                                              </span>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded mb-3">
                            {w.spotsLeft} {t('auto.auto_sovereign_slots_left_457')}
                                                              </span>
                          <button 
                            onClick={() => setWeekends(prev => prev.map(x => x.id === w.id ? {...x, joined: !x.joined, spotsLeft: x.joined ? x.spotsLeft + 1 : x.spotsLeft - 1} : x))}
                            className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all w-full sm:w-auto", w.joined ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white text-black hover:bg-slate-200")}
                          >
                            {w.joined ? t('auto.auto_new___roster_confirmed_5041') : t('auto.auto_new_pledge_sweat_equity_5040')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Logistics & Vault */}
              {activeTab === 'logistics' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-amber-400 font-medium text-sm">
                      <Car className="w-4 h-4" />
                      <span>{t('auto.auto_peer_to_peer_transit_456')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">{t('auto.auto_micro_logistics___th_455')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_eliminate_last_mile__454')}
                                                              </p>
                  </div>
                  <div className="lg:col-span-7 space-y-6">
                    {/* Caravan Board */}
                    <div className="p-5 rounded-2xl border border-white/5 bg-black/20">
                      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{t('auto.auto_the_caravan_board_453')}</span>
                        <button className="text-[10px] bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded transition-colors">{t('auto.auto___offer_empty_seat_452')}</button>
                      </div>
                      {rides.map(r => (
                        <div key={r.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                          <div>
                            <div className="text-sm font-bold text-white mb-0.5">{r.route}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{t('auto.auto_driver__451')} {r.driver} • {r.departure}</div>
                          </div>
                          <button 
                            onClick={() => setRides(prev => prev.map(x => x.id === r.id ? {...x, claimed: true} : x))}
                            disabled={r.claimed}
                            className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all", r.claimed ? "bg-amber-500/20 text-amber-500/50 cursor-not-allowed" : "bg-amber-500 text-black hover:bg-amber-400")}
                          >
                            {r.claimed ? t('auto.auto_new_seats_filled_5039') : `Claim (1/${r.seats})`}
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Gear Vault */}
                    <div className="p-5 rounded-2xl border border-white/5 bg-black/20">
                      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{t('auto.auto_smart_locker_gear_va_450')}</span>
                        <span className="text-[10px] font-mono text-amber-400">{t('auto.auto_your_clout__2_400_449')}</span>
                      </div>
                      <div className="space-y-2">
                        {gearVault.map(g => (
                          <div key={g.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                            <div>
                              <div className="text-xs font-bold text-white mb-0.5">{g.name}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{t('auto.auto_locker_hub__448')} {g.hub}</div>
                            </div>
                            <button 
                              disabled={!g.available}
                              className={cn("text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all", !g.available ? "bg-white/5 text-slate-600" : "bg-white/10 hover:bg-white/20 text-white")}
                            >
                              {g.available ? `Checkout (-${g.cloutCost} Clout)` : t('auto.auto_new_checked_out_5038')}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. DAO Treasury */}
              {activeTab === 'dao_treasury' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-purple-400 font-medium text-sm">
                      <Vote className="w-4 h-4" />
                      <span>{t('auto.auto_decentralized_autono_447')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">{t('auto.auto_regional_dao_treasur_446')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_a_percentage_of_regi_445')}
                                                              </p>
                    
                    <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                      <span className="text-[10px] font-mono uppercase text-purple-300 tracking-widest block mb-1">{t('auto.auto_current_liquid_treas_444')}</span>
                      <span className="text-4xl font-mono font-bold text-white">€{treasuryFunds.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-2">{t('auto.auto_active_deployment_pr_443')}</span>
                    
                    {[
                      { id: 'p1', title: t('auto.auto_new_buyout__the_alchemis_5037'), desc: t('auto.auto_new_secure_full_private__5036'), cost: 45000, votes: 12400 },
                      { id: 'p2', title: t('auto.auto_new_fund_local_artisan_c_5035'), desc: t('auto.auto_new_sponsor_3_local_cera_5034'), cost: 15000, votes: 3100 }
                    ].map(p => {
                      const isVoted = votedProposal === p.id;
                      return (
                        <div key={p.id} className={cn("p-5 rounded-2xl border transition-all", isVoted ? "bg-purple-500/10 border-purple-500/40" : "bg-white/[0.02] border-white/5")}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-bold text-white">{p.title}</h4>
                            <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                              €{p.cost.toLocaleString()} {t('auto.auto_required_442')}
                                                                  </span>
                          </div>
                          <p className="text-xs text-slate-400 mb-4">{p.desc}</p>
                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <span className="text-[10px] font-mono text-slate-500">{p.votes.toLocaleString()} {t('auto.auto_clout_delegated_441')}</span>
                            <button 
                              onClick={() => { setVotedProposal(p.id); setUserClout(userClout - 500); }}
                              disabled={isVoted || userClout < 500}
                              className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all", isVoted ? "bg-purple-500/30 text-purple-200 cursor-default" : "bg-white text-black hover:bg-slate-200")}
                            >
                              {isVoted ? t('auto.auto_new___500_clout_delegate_5033') : t('auto.auto_new_delegate_500_clout_5032')}
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 5. Residencies */}
              {activeTab === 'residencies' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-rose-400 font-medium text-sm">
                      <Camera className="w-4 h-4" />
                      <span>{t('auto.auto_exclusive_cultural_i_440')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">{t('auto.auto_local_artisan_reside_439')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_move_beyond_standard_438')}
                                                              </p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="group relative rounded-3xl overflow-hidden border border-white/10 aspect-video">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                      <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1000&auto=format&fit=crop" alt={t('auto.auto_ceramics_437')} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      
                      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white px-3 py-1 rounded-full">{t('auto.auto_current_resident_436')}</span>
                          <span className="text-[10px] font-mono bg-black/50 backdrop-blur px-2 py-1 rounded text-slate-300">{t('auto.auto_kyoto_node_435')}</span>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{t('auto.auto_master_tanaka_s_kiln_434')}</h3>
                          <p className="text-xs text-slate-300 mb-4 max-w-sm">{t('auto.auto_private_midnight_fir_433')}</p>
                          <button className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-slate-200 transition-colors shadow-xl">
                            {t('auto.auto_request_private_stud_432')}
                                                                                </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Sweeper */}
              {activeTab === 'sweeper' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-cyan-400 font-medium text-sm">
                      <Plane className="w-4 h-4" />
                      <span>{t('auto.auto_algorithmic_asset_re_431')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">{t('auto.auto_the__empty_leg__swee_430')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_our_backend_constant_429')}
                                                              </p>
                    
                    <button onClick={() => setSweeping(true)} className="w-full py-3 rounded-xl border border-cyan-500/50 text-cyan-400 font-bold text-xs hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2">
                      <Zap className={cn("w-4 h-4", sweeping ? "animate-pulse" : "")} /> 
                      {sweeping ? t('auto.auto_new_scanning_operator_ap_5031') : t('auto.auto_new_force_manual_sweep_5030')}
                    </button>
                  </div>
                  
                  <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                      {sweeping ? (
                        <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-black/40 min-h-[300px]">
                          <div className="w-16 h-16 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4" />
                          <span className="text-xs font-mono text-cyan-400 animate-pulse tracking-widest">{t('auto.auto_interrogating_region_428')}</span>
                        </motion.div>
                      ) : (
                        <motion.div key="results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                          <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/30 relative overflow-hidden">
                            <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-400 text-black text-[9px] font-bold rounded-bl uppercase">
                              {t('auto.auto_flash_asset_detected_427')}
                                                                                          </div>
                            <h3 className="text-lg font-bold text-white mb-1 mt-2">{t('auto.auto_gulfstream_g650_empt_426')}</h3>
                            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-3">
                              <span>{t('auto.auto_teterboro__teb__425')}</span> <ArrowRight className="w-3 h-3" /> <span>{t('auto.auto_miami__opf__424')}</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-4">{t('auto.auto_operator_requires_im_423')}</p>
                            
                            <div className="flex items-center justify-between pt-3 border-t border-white/10">
                              <div>
                                <span className="text-[10px] text-slate-500 line-through block">{t('auto.auto_standard___22_000_422')}</span>
                                <span className="text-lg font-mono font-bold text-white">$4,500 <span className="text-[10px] text-cyan-400 font-normal">{t('auto.auto_whole_aircraft_421')}</span></span>
                              </div>
                              <button className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20">
                                {t('auto.auto_claim_fractional_spl_420')}
                                                                                                </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
