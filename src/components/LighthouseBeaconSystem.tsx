import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RadioTower, Rss, Zap, MapPin, Sparkles, Flame, 
  Clock, Compass, BellRing, Share2, Plus, Users 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface ActiveBeacon {
  id: string;
  userName: string;
  userAvatar: string;
  userTier: string;
  venueName: string;
  message: string;
  discountOffer: string;
  expiresInMins: number;
  joinedCount: number;
  userHasJoined: boolean;
}

export default function LighthouseBeaconSystem() {
  const { t } = useTranslation();

  // Active Beacons state
  const [beacons, setBeacons] = useState<ActiveBeacon[]>([
    {
      id: 'b-01',
      userName: 'Chloe Vance',
      userAvatar: 'CV',
      userTier: 'Ambassador',
      venueName: 'The Hoxton Underground Outpost',
      message: 'The uncompressed ambient audio levels are stellar tonight. Zero wait lines at the hidden rear mixology deck. Direct supply unsealed!',
      discountOffer: '20% Off Next Hour Consumption Arrays',
      expiresInMins: 42,
      joinedCount: 5,
      userHasJoined: false
    },
    {
      id: 'b-02',
      userName: 'Benjamin Sterling',
      userAvatar: 'BS',
      userTier: 'Diamond',
      venueName: 'Dishoom Permissive Reserve',
      message: 'Secured primary central tables during standard peak congestion periods. Injecting direct companion slots for nearby verified operators.',
      discountOffer: 'Complimentary Local Chai & Small Plates',
      expiresInMins: 18,
      joinedCount: 11,
      userHasJoined: true
    }
  ]);

  // Drop a beacon custom state
  const [showBeaconForm, setShowBeaconForm] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('Nebula Skyline Lounge');
  const [customMsg, setCustomMsg] = useState('');
  const [customDiscount, setCustomDiscount] = useState('15% Instant Tab Relief');

  // Heatmap simulation state
  const [clusterDensity, setClusterDensity] = useState(78); // percentage
  const [impulseTriggered, setImpulseTriggered] = useState(true);

  // Auto decrement timer simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setBeacons(prev => prev.map(b => ({
        ...b,
        expiresInMins: Math.max(0, b.expiresInMins - 1)
      })));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleJoinBeacon = (id: string) => {
    setBeacons(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          userHasJoined: true,
          joinedCount: b.userHasJoined ? b.joinedCount : b.joinedCount + 1
        };
      }
      return b;
    }));
  };

  const handleEmitBeacon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg) return;

    const newBeacon: ActiveBeacon = {
      id: `b-${Date.now()}`,
      userName: 'You (Sovereign Elite)',
      userAvatar: 'U',
      userTier: 'Diamond',
      venueName: selectedVenue,
      message: customMsg,
      discountOffer: customDiscount,
      expiresInMins: 60, // 1 hour full duration
      joinedCount: 1,
      userHasJoined: true
    };

    setBeacons(prev => [newBeacon, ...prev]);
    setCustomMsg('');
    setShowBeaconForm(false);
    // Spike cluster density momentarily
    setClusterDensity(94);
    setImpulseTriggered(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Immersive deep space radial pulse backgrounds */}
      <div className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/10 via-cyan-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

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
            <span>{t('auto.auto_real_time_spatial_ev_323')}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-transparent">
            {t('auto.auto_the__lighthouse__bea_322')}
                                </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            {t('auto.auto_transform_mobile_har_321')}
                                </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Event Heatmaps & Impulse Overrides */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass rounded-3xl border border-white/10 p-6 sm:p-8 relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    <RadioTower className="w-4 h-4" />
                    <span>{t('auto.auto_algorithmic_cluster__320')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{t('auto.auto_spatial_density_heat_319')}</h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                  {t('auto.auto_london_node_active_318')}
                                                  </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {t('auto.auto_continuous_backgroun_317')}
                                            </p>

              {/* Dynamic Heatmap Simulation Interface */}
              <div className="relative h-72 rounded-2xl bg-gradient-to-b from-slate-950 via-[#0c1017] to-black border border-white/5 overflow-hidden flex items-center justify-center mb-6 shadow-inner">
                
                {/* Simulated Radar Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px]" />
                
                {/* Central animated scanning radar ray */}
                <div className="absolute w-full h-full rounded-full border border-cyan-500/10 animate-[spin_12s_linear_infinite] pointer-events-none flex items-center justify-center">
                  <div className="w-1/2 h-1 bg-gradient-to-r from-transparent to-cyan-500/40 origin-left" />
                </div>

                {/* Simulated static grid background points */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-blue-500/20 animate-pulse" />
                <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-cyan-500/30 animate-pulse" />
                <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-indigo-500/20 animate-pulse" />

                {/* The Primary Dense Cluster Hotspot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                  {/* Outer pulsating aura rings */}
                  <div className="absolute w-48 h-48 rounded-full bg-cyan-500/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <div className="absolute w-32 h-32 rounded-full bg-blue-500/20 animate-pulse" />
                  <div className="absolute w-16 h-16 rounded-full bg-cyan-400/30 backdrop-blur-sm" />
                  
                  {/* Core cluster badge */}
                  <div className="px-3 py-1.5 rounded-full bg-cyan-500 text-black font-mono font-bold text-[10px] tracking-wider relative z-20 shadow-lg flex items-center gap-1">
                    <Users className="w-3 h-3 text-black" />
                    <span>{t('auto.auto_shoreditch_saturatio_316')}</span>
                  </div>
                </div>

                {/* Overlay Density Meter Bar */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between gap-4 z-20">
                  <div className="flex-1">
                    <div className="flex justify-between text-[9px] font-mono uppercase text-slate-400 mb-1">
                      <span>{t('auto.auto_spatial_density_mass_315')}</span>
                      <span className="text-cyan-400 font-bold">{clusterDensity}{t('auto.auto___threshold_314')}</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
                        animate={{ width: `${clusterDensity}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest shrink-0 font-bold">
                    {clusterDensity > 75 ? 'CRITICAL VIBE' : 'NOMINAL'}
                  </span>
                </div>

              </div>

              {/* Automated Impulse Event Popup Card Triggered by Heatmap Density */}
              <AnimatePresence>
                {impulseTriggered && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-transparent border border-cyan-500/30 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <Zap className="w-20 h-20 text-cyan-400" />
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider mb-1">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{t('auto.auto_impulse_event_automa_313')}</span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">{t('auto.auto_shoreditch_cluster_s_312')}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {t('auto.auto_high_spatial_peer_sa_311')}
                                                              </p>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-slate-500 block">{t('auto.auto_unlocked_reward_targ_310')}</span>
                        <span className="text-xs font-bold text-cyan-300">{t('auto.auto_callooh_callay_under_309')}</span>
                      </div>
                      <span className="text-xs font-mono font-bold bg-cyan-400 text-black px-2.5 py-1 rounded">
                        {t('auto.auto_20__off_vibe_code_308')}
                                                                    </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Right Column: Beacon Drop Controls & Live Feed */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* The Drop A Beacon Deck */}
            <div className="glass rounded-3xl border border-white/10 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    <Rss className="w-4 h-4" />
                    <span>{t('auto.auto_self_sovereign_sonar_307')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{t('auto.auto_the_beacon_mode_deck_306')}</h3>
                </div>

                <button
                  onClick={() => setShowBeaconForm(!showBeaconForm)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showBeaconForm ? 'Conceal Form' : 'Drop A Beacon'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {t('auto.auto_at_an_unlisted_spati_305')}
                                            </p>

              {/* Inline Emit Beacon Form */}
              <AnimatePresence>
                {showBeaconForm && (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleEmitBeacon}
                    className="space-y-4 pt-4 border-t border-white/5 overflow-hidden"
                  >
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">{t('auto.auto_target_checkpoint_ve_304')}</label>
                      <select 
                        value={selectedVenue}
                        onChange={e => setSelectedVenue(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Nebula Skyline Lounge" className="bg-black text-white">{t('auto.auto_nebula_skyline_loung_303')}</option>
                        <option value="Subterranean Cava Vaults" className="bg-black text-white">{t('auto.auto_subterranean_cava_va_302')}</option>
                        <option value="Unlisted Rooftop Access Array" className="bg-black text-white">{t('auto.auto_unlisted_rooftop_acc_301')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">{t('auto.auto_ephemeral_direct_sta_300')}</label>
                      <input 
                        type="text"
                        required
                        value={customMsg}
                        onChange={e => setCustomMsg(e.target.value)}
                        placeholder={t('auto.auto_e_g__the_live_mixolo_299')}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                      </input>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">{t('auto.auto_injected_companion_v_298')}</label>
                      <input 
                        type="text"
                        value={customDiscount}
                        onChange={e => setCustomDiscount(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                      >
                      </input>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button type="submit" className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-colors">
                        {t('auto.auto_emit_localized_wave__297')}
                                                                    </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>

            {/* Active Beacons Live Feed Stream */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block font-semibold">
                {t('auto.auto_active_peer_sonar_si_296')}
                                            </span>

              <div className="space-y-4">
                {beacons.map(b => {
                  const isJoined = b.userHasJoined;
                  const isExpired = b.expiresInMins === 0;
                  return (
                    <motion.div 
                      layout
                      key={b.id}
                      className={cn(
                        "glass rounded-2xl border p-5 relative overflow-hidden transition-all duration-300",
                        isExpired 
                          ? "bg-white/[0.01] border-white/5 opacity-50" 
                          : isJoined 
                          ? "border-cyan-500/40 bg-gradient-to-r from-cyan-500/[0.03] to-transparent" 
                          : "border-white/10 hover:border-white/20"
                      )}
                    >
                      {/* Left vertical status strip */}
                      <div className={cn(
                        "absolute top-0 bottom-0 left-0 w-1",
                        isExpired ? "bg-slate-700" : isJoined ? "bg-cyan-400" : "bg-blue-500"
                      )} />

                      <div className="flex items-start justify-between gap-3 mb-3 pl-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-mono font-bold text-xs text-black shrink-0">
                            {b.userAvatar}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">{b.userName}</span>
                            <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
                              <span>{t('auto.auto_tier__295')} {b.userTier}</span>
                              <span>•</span>
                              <span className="text-cyan-400">{b.joinedCount} {t('auto.auto_joined_294')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Expiration badge */}
                        <div className="text-right shrink-0">
                          <span className={cn(
                            "text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 border",
                            isExpired 
                              ? "bg-white/5 text-slate-500 border-white/5" 
                              : "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
                          )}>
                            <Clock className="w-3 h-3 shrink-0" />
                            <span>{isExpired ? 'Scrubbed' : `${b.expiresInMins}m Left`}</span>
                          </span>
                        </div>
                      </div>

                      <div className="pl-2">
                        <div className="flex items-center gap-1 text-xs text-cyan-300 font-mono mb-2">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{b.venueName}</span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                          "{b.message}"
                        </p>

                        <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                            <Zap className="w-3.5 h-3.5 shrink-0" />
                            <span>{t('auto.auto_voucher_override__293')} {b.discountOffer}</span>
                          </div>

                          <button
                            disabled={isJoined || isExpired}
                            onClick={() => handleJoinBeacon(b.id)}
                            className={cn(
                              "px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 text-center",
                              isExpired 
                                ? "bg-white/5 text-slate-600 cursor-not-allowed" 
                                : isJoined 
                                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 cursor-default" 
                                : "bg-white text-black hover:bg-slate-200 active:scale-95"
                            )}
                          >
                            {isExpired ? 'Signal Decayed' : isJoined ? '✓ Joined Pulse' : 'Sync Device & Claim'}
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
