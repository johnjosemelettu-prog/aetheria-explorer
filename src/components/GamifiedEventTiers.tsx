import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Star, Lock, Unlock, Sparkles, Award, 
  Plus, Users, ArrowUp, Zap, Flag, Gift, Crown 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface ExclusiveEventItem {
  id: string;
  title: string;
  influenceRequired: number;
  date: string;
  location: string;
  perkSummary: string;
}

interface RegionalStanding {
  rank: number;
  regionName: string;
  activityScore: number;
  isUserRegion: boolean;
  delta: string;
}

export default function GamifiedEventTiers() {
  const { t } = useTranslation();

  // User Influence "Clout" Meter state
  const [influenceScore, setInfluenceScore] = useState(950);
  const maxTierScore = 1500;

  // Exclusive Events State
  const exclusiveEvents: ExclusiveEventItem[] = [
    {
      id: 'ee-01',
      title: 'F1 Monaco Skybox Priority Convergence',
      influenceRequired: 600,
      date: 'May 28, 2026',
      location: 'Circuit de Monaco',
      perkSummary: 'Guaranteed paddock club sightlines. Flown-in private sommelier allocations pre-cleared.'
    },
    {
      id: 'ee-02',
      title: 'The Secret Island Retreat 2026',
      influenceRequired: 1200,
      date: 'August 14, 2026',
      location: 'Undisclosed Aegean Atoll',
      perkSummary: 'Complete geo-sealed private landing zones. Unlisted bio-regulated wellness nodes arrays.'
    },
    {
      id: 'ee-03',
      title: 'Sovereign Antarctic Solstice Buyout',
      influenceRequired: 2500,
      date: 'December 21, 2026',
      location: 'Union Glacier Camp',
      perkSummary: 'Private charter airlink directly from Punta Arenas. Hyper-exclusive multi-dome thermal pods.'
    }
  ];

  // Regional Dominance state
  const [regions, setRegions] = useState<RegionalStanding[]>([
    { rank: 1, regionName: 'Southern Europe', activityScore: 12450, isUserRegion: false, delta: '+420 pts/hr' },
    { rank: 2, regionName: 'Southeast Asia', activityScore: 11800, isUserRegion: true, delta: '+650 pts/hr (Surging)' },
    { rank: 3, regionName: 'East Asia Nodes', activityScore: 10200, isUserRegion: false, delta: '+210 pts/hr' },
    { rank: 4, regionName: 'North America (East)', activityScore: 9150, isUserRegion: false, delta: '+90 pts/hr' },
    { rank: 5, regionName: 'Nordic Transits', activityScore: 8400, isUserRegion: false, delta: '+12 pts/hr' }
  ]);

  const [simulatedActionMessage, setSimulatedActionMessage] = useState<string | null>(null);

  const currentRankLabel = 
    influenceScore >= 2500 ? 'Sovereign Emperor' :
    influenceScore >= 1200 ? 'Global Tastemaker' :
    influenceScore >= 600 ? 'Vibe Catalyst' : 'Novice Explorer';

  const injectInfluenceAction = (points: number, message: string) => {
    setInfluenceScore(prev => prev + points);
    setSimulatedActionMessage(`+${points} Clout Injection: ${message}`);
    
    // Also push user region score up slightly to demonstrate synchronization
    setRegions(prev => prev.map(r => r.isUserRegion ? { ...r, activityScore: r.activityScore + points * 2 } : r).sort((a, b) => b.activityScore - a.activityScore).map((r, idx) => ({ ...r, rank: idx + 1 })));

    setTimeout(() => setSimulatedActionMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Immersive ambient gradient auras */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-fuchsia-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Module Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-violet-400 text-xs font-semibold tracking-wide uppercase mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('auto.auto_gamified_event_tiers_237')}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-violet-100 to-fuchsia-300 bg-clip-text text-transparent">
            {t('auto.auto_gamified_event_tiers_236')}
                                </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            {t('auto.auto_measure_operational__235')}
                                </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: The "Clout" Meter */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass rounded-3xl border border-white/10 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider">
                    <Star className="w-4 h-4" />
                    <span>{t('auto.auto_personal_reputation__234')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{t('auto.auto_the__clout__meter_233')}</h3>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 font-bold">
                  {currentRankLabel}
                </span>
              </div>

              {/* Central Dynamic Meter Visualizer */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-950 via-black to-slate-900 border border-white/5 text-center mb-6 relative overflow-hidden">
                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-widest block mb-1">
                  {t('auto.auto_active_influence_uni_232')}
                                                  </span>
                <div className="text-5xl sm:text-6xl font-display font-bold bg-gradient-to-r from-violet-400 via-fuchsia-300 to-white bg-clip-text text-transparent tracking-tight my-2">
                  {influenceScore}
                </div>
                <span className="text-xs text-slate-400 font-mono block mb-4">
                  {t('auto.auto_next_threshold__231')} {influenceScore < 1200 ? '1,200 Clout' : influenceScore < 2500 ? '2,500 Clout' : 'Absolute Sovereign Limit'}
                </span>

                {/* Progress track */}
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 rounded-full"
                    animate={{ width: `${Math.min((influenceScore / 2500) * 100, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Action Injectors Simulation */}
              <div className="space-y-3 mb-6">
                <span className="text-[10px] font-mono text-slate-500 uppercase block font-semibold">
                  {t('auto.auto_inject_algorithmic_c_230')}
                                                  </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => injectInfluenceAction(250, 'Hosted Successful Pop-Up Event')}
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all text-left group"
                  >
                    <span className="text-xs font-bold text-white block group-hover:text-violet-300 transition-colors">{t('auto.auto_host_custom_pop_up_229')}</span>
                    <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">{t('auto.auto__250_clout_units_228')}</span>
                  </button>
                  <button
                    onClick={() => injectInfluenceAction(150, 'Gifted Guest Invitation Converted')}
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all text-left group"
                  >
                    <span className="text-xs font-bold text-white block group-hover:text-fuchsia-300 transition-colors">{t('auto.auto_guest_pass_converted_227')}</span>
                    <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">{t('auto.auto__150_clout_units_226')}</span>
                  </button>
                </div>

                <AnimatePresence>
                  {simulatedActionMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-center text-xs text-emerald-400 font-mono"
                    >
                      ✓ {simulatedActionMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dynamic Exclusive Events Gate list */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-semibold">
                  {t('auto.auto_early_bird_sovereign_225')}
                                                  </span>

                <div className="space-y-3">
                  {exclusiveEvents.map(evt => {
                    const isUnlocked = influenceScore >= evt.influenceRequired;
                    return (
                      <div 
                        key={evt.id}
                        className={cn(
                          "p-4 rounded-2xl transition-all border flex flex-col justify-between relative overflow-hidden",
                          isUnlocked 
                            ? "bg-white/[0.02] border-fuchsia-500/30 hover:border-fuchsia-500/50" 
                            : "bg-white/[0.01] border-white/5 opacity-60"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className="text-[9px] font-mono uppercase text-slate-500 block mb-0.5">
                              {evt.date} • {evt.location}
                            </span>
                            <h4 className={cn("text-sm font-bold tracking-tight", isUnlocked ? "text-white" : "text-slate-400")}>
                              {evt.title}
                            </h4>
                          </div>

                          <div className="shrink-0 text-right">
                            {isUnlocked ? (
                              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                                <Unlock className="w-2.5 h-2.5" /> {t('auto.auto_unlocked_224')}
                                                                          </span>
                            ) : (
                              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-500 border border-white/5 flex items-center gap-1">
                                <Lock className="w-2.5 h-2.5 text-slate-600" /> {evt.influenceRequired} {t('auto.auto_req_223')}
                                                                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                          {evt.perkSummary}
                        </p>

                        <div className="pt-2 border-t border-white/5 flex justify-end">
                          <button
                            disabled={!isUnlocked}
                            className={cn(
                              "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                              isUnlocked 
                                ? "bg-white text-black hover:bg-slate-200" 
                                : "bg-white/5 text-slate-600 cursor-not-allowed"
                            )}
                          >
                            {isUnlocked ? 'Redeem Secure Gate' : 'Influence Sub-Critical'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Regional Dominance Challenges */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass rounded-3xl border border-white/10 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                    <Trophy className="w-4 h-4" />
                    <span>{t('auto.auto_collective_consensus_222')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{t('auto.auto_regional_dominance_c_221')}</h3>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {t('auto.auto_quarterly_checkpoint_220')}
                                                  </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {t('auto.auto_aggregated_local_int_219')}
                                            </p>

              {/* Spectacular Grand Gala Prize Banner */}
              <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Crown className="w-24 h-24 text-amber-400" />
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider mb-1">
                  <Gift className="w-3.5 h-3.5" />
                  <span>{t('auto.auto_treasury_prize_vault_218')}</span>
                </div>
                
                <h4 className="text-base font-bold text-white mb-1">{t('auto.auto_app_funded_sovereign_217')}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t('auto.auto_the_winning_regional_216')}
                                                  </p>
              </div>

              {/* Dynamic Region Standing Leaderboard */}
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider px-2">
                  <span>{t('auto.auto_macro_node_standing_215')}</span>
                  <span>{t('auto.auto_active_points_index_214')}</span>
                </div>

                <div className="space-y-2">
                  {regions.map((region) => {
                    const isFirst = region.rank === 1;
                    const isUser = region.isUserRegion;
                    return (
                      <motion.div 
                        layout
                        key={region.regionName}
                        className={cn(
                          "p-3 rounded-xl border flex items-center justify-between gap-3 transition-all",
                          isFirst 
                            ? "bg-gradient-to-r from-amber-500/[0.08] to-transparent border-amber-500/30" 
                            : isUser 
                            ? "bg-white/[0.04] border-white/20" 
                            : "bg-white/[0.01] border-white/5"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0",
                            isFirst ? "bg-amber-500 text-black shadow-md shadow-amber-500/20" : "bg-white/5 text-slate-400"
                          )}>
                            {region.rank}
                          </span>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={cn("text-xs font-bold", isFirst ? "text-amber-300" : "text-white")}>
                                {region.regionName}
                              </span>
                              {isUser && (
                                <span className="text-[9px] font-mono bg-white/10 text-white px-1.5 py-0.5 rounded">
                                  {t('auto.auto_your_node_213')}
                                                                                </span>
                              )}
                            </div>
                            <span className="text-[9px] font-mono text-slate-500 block">
                              {t('auto.auto_velocity__212')} {region.delta}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={cn(
                            "text-xs font-mono font-bold block",
                            isFirst ? "text-amber-400" : "text-slate-300"
                          )}>
                            {region.activityScore.toLocaleString()} {t('auto.auto_pts_211')}
                                                              </span>
                          <span className="text-[8px] font-mono uppercase text-slate-500 block">
                            {isFirst ? '★ LEADING ARRAY' : 'CHASING'}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom dynamic interaction hint */}
              <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-slate-400">
                <span>{t('auto.auto_injecting_custom_pop_210')} <span className="text-white font-bold">{t('auto.auto_southeast_asia_209')}</span> {t('auto.auto_standing_index_upwar_208')}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
