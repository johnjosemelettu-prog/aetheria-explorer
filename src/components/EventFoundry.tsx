import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Users, Calendar, MapPin, Award, CheckCircle2, 
  PlusCircle, ArrowRight, Eye, GlassWater, Music, Zap, 
  Compass, Radio, Flame, Check, HelpCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface PopUpEvent {
  id: string;
  proposer: {
    name: string;
    avatar: string;
    tier: 'Diamond' | 'Ambassador';
  };
  title: string;
  location: string;
  description: string;
  rsvps: number;
  goal: number;
  timeLeft: string;
  status: 'Proposed' | 'Green-lit';
  category: string;
}

interface HostedEvent {
  id: string;
  type: 'Masterclass' | 'Takeover';
  title: string;
  location: string;
  description: string;
  host: string;
  hostTitle: string;
  perks: string[];
  slotsLeft: number;
}

export default function EventFoundry() {
  const { t } = useTranslation();
  
  // Custom Pop-Up Events State
  const [popUps, setPopUps] = useState<PopUpEvent[]>([
    {
      id: 'pu-01',
      proposer: { name: 'Elena Rostova', avatar: 'ER', tier: 'Ambassador' },
      title: "Photographers' Morning at the Taj Mahal",
      location: 'Agra, India',
      description: 'An early morning, crowd-free spatial photoshoot session at the main compound exclusively for verified club lensmen. Golden hour access arrays pre-negotiated.',
      rsvps: 9,
      goal: 10,
      timeLeft: '14 hours left',
      status: 'Proposed',
      category: 'Visual Arts'
    },
    {
      id: 'pu-02',
      proposer: { name: 'Kenji Takahashi', avatar: 'KT', tier: 'Diamond' },
      title: 'Hanoi Legacy Cafe Deconstruction',
      location: 'Hanoi, Vietnam',
      description: 'Isolating and scoring unlisted slow-drip egg coffee outposts across the ancient grid. Includes direct dialogue sequences with 3rd-generation roasting masters.',
      rsvps: 15,
      goal: 12,
      timeLeft: 'Green-lit Active',
      status: 'Green-lit',
      category: 'Gastronomy'
    }
  ]);

  const [userRsvpd, setUserRsvpd] = useState<string[]>(['pu-02']);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLoc, setNewLoc] = useState('');

  // Masterclass & Takeover state
  const [hostedEvents, setHostedEvents] = useState<HostedEvent[]>([
    {
      id: 'he-01',
      type: 'Masterclass',
      title: 'Japanese Whisky Cask Deconstruction',
      location: 'Tokyo Sky Lounge, Japan',
      description: 'Exclusive multi-vintage tasting arrays isolating pre-release Yamazaki casks. Flown-in private instruction bridging molecular distillation properties.',
      host: 'Suntory Master Distiller',
      hostTitle: 'Flown-in Region Expert',
      perks: ['Pre-release tasting flight', 'Custom engraved crystal ware', 'Direct supply access'],
      slotsLeft: 4
    },
    {
      id: 'he-02',
      type: 'Takeover',
      title: 'Montreux Jazz Convergence Buyout',
      location: 'Montreux Waterfront, Switzerland',
      description: 'Complete strategic buyout of the soundstage perimeter. Enjoy elevated sightlines, dedicated private mixologists, and sealed spatial networking decks.',
      host: 'Aetheria Sound Lab',
      hostTitle: 'Co-Branded Takeover Partner',
      perks: ['Unrestricted backstage vectors', 'Premium uncompressed acoustics', 'Private bar arrays'],
      slotsLeft: 12
    }
  ]);

  const [reservedHosted, setReservedHosted] = useState<string[]>([]);

  const handleRsvp = (id: string) => {
    if (userRsvpd.includes(id)) return;
    setUserRsvpd(prev => [...prev, id]);
    setPopUps(prev => prev.map(p => {
      if (p.id === id) {
        const nextRsvps = p.rsvps + 1;
        return {
          ...p,
          rsvps: nextRsvps,
          status: nextRsvps >= p.goal ? 'Green-lit' : p.status,
          timeLeft: nextRsvps >= p.goal ? 'Green-lit Active' : p.timeLeft
        };
      }
      return p;
    }));
  };

  const handleCreatePopUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newLoc) return;
    const newEvent: PopUpEvent = {
      id: `pu-${Date.now()}`,
      proposer: { name: 'You (Sovereign Elite)', avatar: 'U', tier: 'Diamond' },
      title: newTitle,
      location: newLoc,
      description: newDesc,
      rsvps: 1,
      goal: 8,
      timeLeft: '47 hours left',
      status: 'Proposed',
      category: 'Member Custom'
    };
    setPopUps(prev => [newEvent, ...prev]);
    setUserRsvpd(prev => [...prev, newEvent.id]);
    setNewTitle('');
    setNewDesc('');
    setNewLoc('');
    setShowProposalForm(false);
  };

  const handleReserveHosted = (id: string) => {
    if (reservedHosted.includes(id)) return;
    setReservedHosted(prev => [...prev, id]);
    setHostedEvents(prev => prev.map(h => h.id === id ? { ...h, slotsLeft: h.slotsLeft - 1 } : h));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Immersive background aura effects */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Module Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-fuchsia-400 text-xs font-semibold tracking-wide uppercase mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('auto.auto_bridging_corporate___203')}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-fuchsia-100 to-violet-300 bg-clip-text text-transparent">
            {t('auto.auto_the_event_foundry_202')}
                                </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            {t('auto.auto_harness_member_clout_201')}
                                </p>
        </motion.div>

        {/* Section 1: Member Pop-Up Creator */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-fuchsia-400 uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>{t('auto.auto_consensus_driven_mic_200')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">{t('auto.auto_the__pop_up__creator_199')}</h2>
            </div>

            <button
              onClick={() => setShowProposalForm(!showProposalForm)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-bold text-xs hover:opacity-90 transition-all shadow-lg shadow-fuchsia-500/20 active:scale-95 self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{showProposalForm ? 'Close Creator Deck' : 'Propose Custom Pop-Up'}</span>
            </button>
          </div>

          {/* Inline Proposal Deck */}
          <AnimatePresence>
            {showProposalForm && (
              <motion.form 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreatePopUp}
                className="glass rounded-2xl border border-fuchsia-500/30 p-6 mb-8 overflow-hidden space-y-4"
              >
                <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-wide block">
                  {t('auto.auto_diamond___ambassador_198')}
                                                  </span>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">{t('auto.auto_pop_up_concept_title_197')}</label>
                    <input 
                      type="text" 
                      required
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      placeholder={t('auto.auto_e_g__photographers___196')}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">{t('auto.auto_target_location_node_195')}</label>
                    <input 
                      type="text" 
                      required
                      value={newLoc}
                      onChange={e => setNewLoc(e.target.value)}
                      placeholder={t('auto.auto_e_g__agra__india_194')}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-fuchsia-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-mono text-slate-400 mb-1">{t('auto.auto_spatial_directive____193')}</label>
                  <textarea 
                    required
                    rows={3}
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    placeholder={t('auto.auto_detail_access_permis_192')}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-fuchsia-400 resize-none custom-scrollbar"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button type="submit" className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-slate-200 transition-colors">
                    {t('auto.auto_broadcast_proposal___191')}
                                                        </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Pop-Up Events Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {popUps.map(p => {
              const isGreenlit = p.status === 'Green-lit';
              const hasRsvpd = userRsvpd.includes(p.id);
              return (
                <motion.div 
                  layout
                  key={p.id}
                  className={cn(
                    "rounded-2xl border p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group",
                    isGreenlit 
                      ? "bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-emerald-500/40 shadow-xl shadow-emerald-500/5" 
                      : "bg-white/[0.02] border-white/5 hover:border-white/10"
                  )}
                >
                  {/* Status overlay bar */}
                  <div className={cn(
                    "absolute top-0 inset-x-0 h-1",
                    isGreenlit ? "bg-gradient-to-r from-emerald-400 to-teal-500" : "bg-white/10"
                  )} />

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                          {p.category} • {p.timeLeft}
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-fuchsia-300 transition-colors">{p.title}</h3>
                      </div>
                      <span className={cn(
                        "text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 border",
                        isGreenlit ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      )}>
                        {isGreenlit ? '✓ Green-lit' : 'Consensus Queue'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                      <span>{p.location}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-6">{p.description}</p>
                  </div>

                  <div>
                    {/* Proposer Info */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-4 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500 flex items-center justify-center font-bold text-[10px] text-white">
                          {p.proposer.avatar}
                        </div>
                        <div>
                          <span className="text-white font-medium block text-xs">{p.proposer.name}</span>
                          <span className="text-[9px] text-slate-500 block">{t('auto.auto_proposer_tier_190')}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                        {p.proposer.tier}
                      </span>
                    </div>

                    {/* Progress Bar & Actions */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-[10px] font-mono mb-1">
                          <span className="text-slate-400">{p.rsvps} {t('auto.auto_verified_rsvps_189')}</span>
                          <span className={cn(isGreenlit ? "text-emerald-400" : "text-slate-500")}>
                            {isGreenlit ? 'Threshold Cleared' : `${p.goal} Min Target`}
                          </span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            className={cn("h-full rounded-full", isGreenlit ? "bg-emerald-400" : "bg-fuchsia-500")}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((p.rsvps / p.goal) * 100, 100)}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleRsvp(p.id)}
                        disabled={hasRsvpd}
                        className={cn(
                          "w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm",
                          hasRsvpd 
                            ? "bg-white/5 text-slate-400 border border-white/5 cursor-default" 
                            : "bg-white/10 hover:bg-white/20 text-white hover:text-fuchsia-300"
                        )}
                      >
                        <CheckCircle2 className={cn("w-4 h-4", hasRsvpd ? "text-emerald-400" : "")} />
                        <span>{hasRsvpd ? 'RSVP Active • Ticketing Automated' : 'Inject RSVP to Green-Light'}</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Club-Sanctioned Masterclasses & Takeovers */}
        <div className="mb-16">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>{t('auto.auto_official_sanctioned__188')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">{t('auto.auto_masterclasses___co_b_187')}</h2>
            <p className="text-xs text-slate-400 mt-1">
              {t('auto.auto_high_intensity_corpo_186')}
                                      </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {hostedEvents.map(h => {
              const isReserved = reservedHosted.includes(h.id);
              const isMasterclass = h.type === 'Masterclass';
              return (
                <div 
                  key={h.id}
                  className="glass rounded-2xl border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group hover:border-violet-500/40 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                    {isMasterclass ? <GlassWater className="w-48 h-48" /> : <Music className="w-48 h-48" />}
                  </div>

                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className={cn(
                        "text-[9px] font-mono uppercase px-2 py-0.5 rounded tracking-widest font-bold border",
                        isMasterclass ? "bg-violet-500/10 text-violet-400 border-violet-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      )}>
                        {t('auto.auto_club_185')} {h.type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {h.slotsLeft} {t('auto.auto_sovereign_seats_left_184')}
                                                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{h.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mb-4">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{h.location}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-6">{h.description}</p>

                    <div className="mb-6 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">{t('auto.auto_sovereign_asset_allo_183')}</span>
                      <div className="space-y-1.5">
                        {h.perks.map((perk, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-1 h-1 rounded-full bg-violet-400" />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-white block">{h.host}</span>
                        <span className="text-[9px] text-slate-500 block">{h.hostTitle}</span>
                      </div>
                      
                      <button
                        onClick={() => handleReserveHosted(h.id)}
                        disabled={isReserved || h.slotsLeft === 0}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0",
                          isReserved 
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default" 
                            : h.slotsLeft === 0 
                            ? "bg-white/5 text-slate-600 cursor-not-allowed" 
                            : "bg-white text-black hover:bg-slate-200"
                        )}
                      >
                        {isReserved ? '✓ Access Vector Registered' : h.slotsLeft === 0 ? 'Capacity Reached' : 'Secure Sovereign Link'}
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: The Event Lifecycle Table */}
        <div className="p-8 rounded-3xl glass border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest block mb-2">{t('auto.auto_integrated_spatial_f_182')}</span>
            <h3 className="text-2xl font-display font-bold text-white mb-2">{t('auto.auto_the_event_lifecycle__181')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('auto.auto_tracking_core_infras_180')}
                                      </p>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-white/10 text-slate-500 text-[10px] uppercase font-mono tracking-wider">
                  <th className="pb-4 font-semibold w-1/5">{t('auto.auto_lifecycle_stage_179')}</th>
                  <th className="pb-4 font-semibold w-1/4">{t('auto.auto_core_mechanism_178')}</th>
                  <th className="pb-4 font-bold text-fuchsia-400 w-11/20">{t('auto.auto_innovative_sovereign_177')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                {[
                  { stage: 'Discovery', mech: 'AI-Matchmaking Arrays', twist: 'Suggests event paths based directly on verified peer participation matrices, elevating cohort convergence over mere activity matching.' },
                  { stage: 'Booking Execution', mech: 'Dynamic Group Pricing Engine', twist: 'Ticketing tiers scale downwards automatically utilizing fluid group-buying logic as sovereign participation densities appreciate.' },
                  { stage: 'Spatial Entry', mech: 'Biometric / NFC Protocols', twist: 'Enables absolute "Invisible Check-in" execution facilitated seamlessly via continuous background localized Bluetooth handshake states.' },
                  { stage: 'Post-Convergence', mech: 'Autonomous After-Movie Assembler', twist: 'Aggregates spatial raw video blocks across peer hardware to render authenticated shared "Memory Reels" securely.' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 font-bold text-white flex items-center gap-2">
                      <span className="text-[10px] w-4 h-4 rounded-full bg-white/5 flex items-center justify-center font-mono text-slate-400 shrink-0">
                        {idx + 1}
                      </span>
                      <span>{row.stage}</span>
                    </td>
                    <td className="py-4 text-slate-400 pr-4 font-mono text-[11px]">{row.mech}</td>
                    <td className="py-4 text-fuchsia-300 bg-fuchsia-500/[0.01] pl-3 rounded-r-lg leading-relaxed font-medium">
                      {row.twist}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
