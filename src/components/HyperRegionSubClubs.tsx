import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Utensils, MapPin, Sparkles, Laptop, Moon, 
  Sun, Compass, Navigation, ArrowRight, Check, CheckCircle2,
  Lock, Unlock, Flame
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface NomadNodeData {
  id: string;
  city: string;
  country: string;
  membersCount: number;
  activeVibe: string;
  dayEvent: string;
  nightEvent: string;
  isJoined: boolean;
}

interface FoodTrailStop {
  stopNum: number;
  timeSlot: string;
  secretName: string;
  unlocked: boolean;
  cuisineHint: string;
}

export default function HyperRegionSubClubs() {
  const { t } = useTranslation();

  // Nomad Nodes State
  const [nodes, setNodes] = useState<NomadNodeData[]>([
    {
      id: 'nn-lisbon',
      city: 'Lisbon',
      country: 'Portugal',
      membersCount: 142,
      activeVibe: 'Deep Focused • Chiado Grid',
      dayEvent: 'Silent Coworking @ Nebula Outpost',
      nightEvent: 'Rooftop Seed Pitch & Angel Mixer',
      isJoined: true
    },
    {
      id: 'nn-chiangmai',
      city: 'Chiang Mai',
      country: 'Thailand',
      membersCount: 89,
      activeVibe: 'Nimman Digital Corridor',
      dayEvent: 'Lanna Coffee Micro-Roaster Synch',
      nightEvent: 'SaaS Deconstruction Night Market',
      isJoined: false
    },
    {
      id: 'nn-medellin',
      city: 'Medellin',
      country: 'Colombia',
      membersCount: 114,
      activeVibe: 'Poblado Sky Arrays',
      dayEvent: 'Altitude Deep Work Compound',
      nightEvent: 'Web3 & Cerveza Convergence',
      isJoined: false
    }
  ]);

  const [activeNodeId, setActiveNodeId] = useState('nn-lisbon');

  // Culinary Caravans State
  const [trailTicketPurchased, setTrailTicketPurchased] = useState(false);
  const [stops, setStops] = useState<FoodTrailStop[]>([
    { stopNum: 1, timeSlot: 'Fri 19:00', secretName: 'Subterranean Cava Cellar', unlocked: true, cuisineHint: 'Aged Iberian Cured Pairings' },
    { stopNum: 2, timeSlot: 'Sat 12:30', secretName: 'Unlisted Alley Hearth', unlocked: true, cuisineHint: 'Smoked Coastal Cephalopods' },
    { stopNum: 3, timeSlot: 'Sat 18:00', secretName: 'Cryptic Monastic Kitchen', unlocked: false, cuisineHint: 'Forgotten Citrus Infusions' },
    { stopNum: 4, timeSlot: 'Sun 13:00', secretName: 'High-Altitude Pasture Hearth', unlocked: false, cuisineHint: 'Wild Foraged Fungi Emulsions' },
    { stopNum: 5, timeSlot: 'Sun 20:30', secretName: 'The Final Confection Vault', unlocked: false, cuisineHint: 'Secret Liquors & Cocoa Nibs' }
  ]);

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  const toggleJoinNode = (id: string) => {
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        return { ...n, isJoined: !n.isJoined, membersCount: n.isJoined ? n.membersCount - 1 : n.membersCount + 1 };
      }
      return n;
    }));
  };

  const handleBuyFoodTrail = () => {
    setTrailTicketPurchased(true);
    // Auto unlock the next immediate unrevealed stop for the demo
    setStops(prev => prev.map((s, idx) => idx === 2 ? { ...s, unlocked: true } : s));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic ambient backgrounds */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Module Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-amber-400 text-xs font-semibold tracking-wide uppercase mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('auto.auto_granular_interest_ba_280')}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-amber-100 to-orange-300 bg-clip-text text-transparent">
            {t('auto.auto__hyper_region__speci_279')}
                                </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            {t('auto.auto_transcend_generic_bo_278')}
                                </p>
        </motion.div>

        {/* Section 1: The Nomad Node */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                <Laptop className="w-4 h-4" />
                <span>{t('auto.auto_remote_operator_spat_277')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">{t('auto.auto_the_nomad_node_archi_276')}</h2>
            </div>

            {/* Node selection strip */}
            <div className="flex flex-wrap gap-2 bg-white/[0.02] p-1.5 rounded-2xl border border-white/5">
              {nodes.map(n => (
                <button
                  key={n.id}
                  onClick={() => setActiveNodeId(n.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                    activeNodeId === n.id 
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{n.city}</span>
                  {n.isJoined && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Active Node Dashboard View */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl border border-white/10 p-6 sm:p-10 relative overflow-hidden grid lg:grid-cols-12 gap-8 items-center"
            >
              {/* Vibe line background */}
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />

              {/* Node Summary Left */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-white/5 text-amber-400 border border-white/5 uppercase tracking-wider">
                      {t('auto.auto_active_sub_club_275')}
                                                              </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {activeNode.country}
                    </span>
                  </div>

                  <h3 className="text-4xl font-display font-bold text-white tracking-tight">{activeNode.city} {t('auto.auto_node_274')}</h3>
                  <span className="text-xs font-mono text-amber-300 block mt-1">{activeNode.activeVibe}</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">{t('auto.auto_verified_local_cohor_273')}</span>
                    <span className="text-2xl font-mono font-bold text-white">{activeNode.membersCount}</span>
                  </div>

                  <button
                    onClick={() => toggleJoinNode(activeNode.id)}
                    className={cn(
                      "px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                      activeNode.isJoined 
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                        : "bg-white text-black hover:bg-slate-200"
                    )}
                  >
                    {activeNode.isJoined ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : null}
                    <span>{activeNode.isJoined ? 'Node Synchronized' : 'Inject Node Access'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {t('auto.auto_bonding_into_this_lo_272')}
                                                  </p>
              </div>

              {/* Day / Night Event Toggle Previews Right */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block">
                  {t('auto.auto_continuous_spatial_r_271')}
                                                  </span>

                <div className="grid sm:grid-cols-2 gap-4">
                  
                  {/* Day Cycle view */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 space-y-4 relative overflow-hidden group hover:border-amber-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <Sun className="w-24 h-24" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                        <Sun className="w-4 h-4" />
                        <span>{t('auto.auto_day_continuum_270')}</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">10:00 - 17:00</span>
                    </div>

                    <div>
                      <span className="text-sm font-bold text-white block mb-1">{activeNode.dayEvent}</span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {t('auto.auto_strict_silent_focus__269')}
                                                                    </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{t('auto.auto_atmosphere__focus_268')}</span>
                      <span className="text-amber-400 font-bold">{t('auto.auto___daily_sync_267')}</span>
                    </div>
                  </div>

                  {/* Night Cycle view */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 space-y-4 relative overflow-hidden group hover:border-orange-500/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <Moon className="w-24 h-24" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-orange-400 text-xs font-bold uppercase tracking-wider">
                        <Moon className="w-4 h-4" />
                        <span>{t('auto.auto_night_continuum_266')}</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">{t('auto.auto_19_30___late_265')}</span>
                    </div>

                    <div>
                      <span className="text-sm font-bold text-white block mb-1">{activeNode.nightEvent}</span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {t('auto.auto_unrestricted_peer_cr_264')}
                                                                    </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{t('auto.auto_atmosphere__dynamic_263')}</span>
                      <span className="text-orange-400 font-bold">{t('auto.auto___pitch_mixer_262')}</span>
                    </div>
                  </div>

                </div>

                {activeNode.isJoined && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center text-xs text-amber-300 font-mono animate-fade-in">
                    {t('auto.auto___handshake_active___261')} {activeNode.city} {t('auto.auto_vibe_radar_automatic_260')}
                                                        </div>
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section 2: Culinary Caravans - Food Trails */}
        <div>
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-wider">
              <Utensils className="w-4 h-4" />
              <span>{t('auto.auto_multi_stop_regional__259')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">{t('auto.auto_culinary_caravans__s_258')}</h2>
            <p className="text-xs text-slate-400 mt-1">
              {t('auto.auto_a_single_unified_tic_257')}
                                      </p>
          </div>

          <div className="glass rounded-3xl border border-white/10 p-6 sm:p-10 relative overflow-hidden">
            
            {/* Top metrics summary bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/5">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">{t('auto.auto_active_trail_routing_256')}</span>
                <h3 className="text-xl font-bold text-white">{t('auto.auto_tuscan_subterranean__255')}</h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">{t('auto.auto_universal_access_pas_254')}</span>
                  <span className="text-base font-mono font-bold text-orange-400">€180 <span className="text-xs text-slate-400 font-normal">{t('auto.auto___weekend_crawl_253')}</span></span>
                </div>

                <button
                  onClick={handleBuyFoodTrail}
                  disabled={trailTicketPurchased}
                  className={cn(
                    "px-6 py-3 rounded-xl font-bold text-xs transition-all shrink-0",
                    trailTicketPurchased 
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default" 
                      : "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90 shadow-lg shadow-orange-500/20 active:scale-95"
                  )}
                >
                  {trailTicketPurchased ? '✓ Unified Access Code Activated' : 'Purchase Unified Food Trail Ticket'}
                </button>
              </div>
            </div>

            {/* Visual crawl pipeline sequence */}
            <div className="relative">
              {/* Connecting path pipeline bar */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2 hidden lg:block" />

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
                {stops.map((stop) => {
                  return (
                    <div 
                      key={stop.stopNum}
                      className={cn(
                        "rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between relative border",
                        stop.unlocked 
                          ? "bg-white/[0.03] border-orange-500/30 shadow-md" 
                          : "bg-white/[0.01] border-white/5 opacity-60"
                      )}
                    >
                      {/* Top slot header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-slate-400 font-bold shrink-0">
                          {stop.stopNum}
                        </span>
                        <span className="text-[10px] font-mono text-orange-300 font-semibold">
                          {stop.timeSlot}
                        </span>
                      </div>

                      {/* Content block */}
                      <div className="mb-4">
                        <div className="flex items-center gap-1.5 mb-1">
                          {stop.unlocked ? <Unlock className="w-3 h-3 text-emerald-400 shrink-0" /> : <Lock className="w-3 h-3 text-slate-600 shrink-0" />}
                          <span className="text-xs font-mono uppercase text-slate-500 block tracking-wider">
                            {stop.unlocked ? 'Revealed Node' : 'Encrypted Stop'}
                          </span>
                        </div>

                        <h4 className={cn("text-sm font-bold tracking-tight mb-2", stop.unlocked ? "text-white" : "text-slate-500 select-none")}>
                          {stop.unlocked ? stop.secretName : '••••••••••••••••'}
                        </h4>

                        <p className="text-[11px] text-slate-400 leading-relaxed italic">
                          "{stop.cuisineHint}"
                        </p>
                      </div>

                      {/* Status sub banner */}
                      <div className="pt-2 border-t border-white/5 text-[9px] font-mono text-center">
                        {stop.unlocked ? (
                          <span className="text-emerald-400 font-bold">{t('auto.auto_coordinates_synced_252')}</span>
                        ) : (
                          <span className="text-slate-600">{t('auto.auto_unlocks_2h_prior_251')}</span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom summary block */}
            <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span>{t('auto.auto_ticket_integration_a_250')}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest shrink-0">
                {t('auto.auto_5_secret_arrays___1__249')}
                                            </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
