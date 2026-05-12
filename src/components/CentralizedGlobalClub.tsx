import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shirt, Plane, ScanFace, EyeOff, ShieldAlert, Moon, 
  Sparkles, CheckCircle2, Lock, Zap, RefreshCw, Cpu, 
  ArrowRight, Shield, Bell, Network
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export default function CentralizedGlobalClub() {
  const { t } = useTranslation();
  
  const [activeTab, setActiveTab] = useState<'wardrobe' | 'nodeswap' | 'biometric' | 'silent' | 'crisis' | 'circadian'>('wardrobe');

  // Wardrobe Teleportation State
  const [wardrobeStatus, setWardrobeStatus] = useState<'idle' | 'deploying' | 'ready'>('idle');

  // Node Swapping State
  const [nodeFound, setNodeFound] = useState(false);
  const [intercepting, setIntercepting] = useState(false);

  useEffect(() => {
    if (activeTab === 'nodeswap') {
      const timer = setTimeout(() => setNodeFound(true), 2500);
      return () => clearTimeout(timer);
    } else {
      setNodeFound(false);
      setIntercepting(false);
    }
  }, [activeTab]);

  // Biometric State
  const [bioCleared, setBioCleared] = useState(true);

  // Silent Mode State
  const [silentMode, setSilentMode] = useState(false);

  // Crisis Matrix State
  const [crisisActive, setCrisisActive] = useState(false);
  const [crisisLog, setCrisisLog] = useState<string[]>([]);

  const deployCrisis = () => {
    setCrisisActive(true);
    setCrisisLog([]);
    const sequence = [
      t('auto.auto_new_initializing_soverei_5029'),
      t('auto.auto_new_geolocating_user_coo_5028'),
      t('auto.auto_new_dispatching_local_re_5027'),
      t('auto.auto_new_securing_emergency_c_5026'),
      t('auto.auto_new_extraction_teams_pla_5025')
    ];
    
    sequence.forEach((msg, idx) => {
      setTimeout(() => {
        setCrisisLog(prev => [...prev, msg]);
      }, (idx + 1) * 1200);
    });
  };

  const handleWardrobeDeploy = () => {
    setWardrobeStatus('deploying');
    setTimeout(() => setWardrobeStatus('ready'), 3000);
  };

  return (
    <div className={cn(
      "min-h-screen text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-1000",
      silentMode ? "bg-[#050505]" : "bg-[#0a0a0a]"
    )}>
      {/* Dynamic Ambient Backgrounds */}
      <div className={cn(
        "absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000",
        silentMode ? "bg-red-900/10" : "bg-indigo-600/10"
      )} />
      <div className={cn(
        "absolute bottom-1/3 left-10 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000",
        silentMode ? "bg-black" : "bg-cyan-600/10"
      )} />

      {silentMode && (
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Module Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border text-xs font-semibold tracking-wide uppercase mb-6 shadow-inner transition-colors",
            silentMode ? "border-red-500/20 text-red-500" : "border-white/10 text-indigo-400"
          )}>
            {silentMode ? <EyeOff className="w-3.5 h-3.5 animate-pulse" /> : <Sparkles className="w-3.5 h-3.5 animate-pulse" />}
            <span>{silentMode ? t('auto.auto_new_silent_mode_engaged_5024') : t('auto.auto_new_tier_1_elite__apex_s_5023')}</span>
          </div>
          <h1 className={cn(
            "text-4xl sm:text-6xl font-display font-bold tracking-tight mb-6 bg-gradient-to-r bg-clip-text text-transparent transition-colors",
            silentMode ? t('auto.auto_new_from_red_500_via_red_5022') : t('auto.auto_new_from_white_via_indig_5021')
          )}>
            {t('auto.auto_global_travelers_clu_149')}
                                </h1>
          <p className={cn("text-base sm:text-lg leading-relaxed", silentMode ? "text-red-200/50" : "text-slate-400")}>
            {t('auto.auto_surpassing_basic_lux_148')}
                                </p>
        </motion.div>

        {/* Dynamic Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {[
            { id: 'wardrobe', label: t('auto.auto_new_wardrobe_teleport_5020'), icon: Shirt, color: 'text-pink-400' },
            { id: 'nodeswap', label: t('auto.auto_new_aviation_node_swap_5019'), icon: Plane, color: 'text-cyan-400' },
            { id: 'biometric', label: t('auto.auto_new_biometric_tunnel_5018'), icon: ScanFace, color: 'text-emerald-400' },
            { id: 'silent', label: t('auto.auto_new_silent_mode_5017'), icon: EyeOff, color: 'text-slate-400' },
            { id: 'crisis', label: t('auto.auto_new_crisis_matrix_5016'), icon: ShieldAlert, color: 'text-red-400' },
            { id: 'circadian', label: t('auto.auto_new_circadian_sync_5015'), icon: Moon, color: 'text-indigo-400' },
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
                    ? silentMode && tab.id !== 'silent' 
                      ? "bg-red-900/20 border-red-500/30" 
                      : "bg-white/[0.05] border-white/20 shadow-lg" 
                    : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]"
                )}
              >
                {isActive && (
                  <motion.div layoutId="globalClubTab" className={cn("absolute top-0 inset-x-0 h-1", silentMode && tab.id !== 'silent' ? "bg-red-500" : "bg-white/40")} />
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
        <div className={cn(
          "rounded-3xl border p-6 sm:p-10 relative overflow-hidden min-h-[500px] transition-colors duration-500",
          silentMode ? "bg-[#0a0505] border-red-900/30" : t('auto.auto_new_glass_border_white_1_5014')
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >

              {/* 1. Global Wardrobe Teleportation */}
              {activeTab === 'wardrobe' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-pink-400 font-medium text-sm">
                      <Shirt className="w-4 h-4" />
                      <span>{t('auto.auto_predictive_logistics_147')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">{t('auto.auto_global_wardrobe_tele_146')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_eradicate_luggage__w_145')}
                                                              </p>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-500 block">{t('auto.auto_active_profile_144')}</span>
                        <span className="text-sm font-bold text-white">{t('auto.auto_alexander_s_digital__143')}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {t('auto.auto_measurements_synced_142')}
                                                                    </span>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="rounded-2xl border border-white/5 bg-black/40 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('auto.auto_destination__dubai___141')}</span>
                        <span className="text-[10px] font-mono text-slate-500">{t('auto.auto_climate__34_c_arid_140')}</span>
                      </div>
                      
                      <div className="space-y-3 mb-8">
                        {[t('auto.auto_new_brunello_cucinelli_l_5013'), t('auto.auto_new_loro_piana_summer_wa_5012'), t('auto.auto_new_tom_ford_evening_att_5011')].map((item, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <span className="text-xs text-white font-medium">{item}</span>
                            {wardrobeStatus === 'ready' ? (
                              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> {t('auto.auto_stocked_139')}</span>
                            ) : wardrobeStatus === 'deploying' ? (
                              <span className="text-[10px] font-mono text-pink-400 animate-pulse">{t('auto.auto_sourcing_locally____138')}</span>
                            ) : (
                              <span className="text-[10px] font-mono text-slate-500">{t('auto.auto_awaiting_deployment_137')}</span>
                            )}
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={handleWardrobeDeploy}
                        disabled={wardrobeStatus !== 'idle'}
                        className={cn("w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2", 
                          wardrobeStatus === 'ready' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : 
                          wardrobeStatus === 'deploying' ? "bg-pink-500/20 text-pink-400 border border-pink-500/30" : 
                          "bg-pink-500 text-black hover:bg-pink-400"
                        )}
                      >
                        {wardrobeStatus === 'ready' ? t('auto.auto_new_wardrobe_deployed____5010') : 
                         wardrobeStatus === 'deploying' ? <><RefreshCw className="w-4 h-4 animate-spin" /> {t('auto.auto_sourcing_from_dubai__136')}</> : 
                         t('auto.auto_new_deploy_local_wardrob_5009')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Private Aviation Node Swapping */}
              {activeTab === 'nodeswap' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-cyan-400 font-medium text-sm">
                      <Network className="w-4 h-4" />
                      <span>{t('auto.auto_commercial_hijacking_135')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">{t('auto.auto_private_aviation__no_134')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_if_the_ai_detects_mu_133')}
                                                              </p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent p-6 h-full flex flex-col justify-center relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        {!nodeFound ? (
                          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                            <div className="relative w-24 h-24 mx-auto mb-6">
                              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
                              <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" />
                              <Plane className="w-8 h-8 text-cyan-500/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            </div>
                            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase block animate-pulse">{t('auto.auto_scanning_global_comm_132')}</span>
                            <span className="text-[10px] text-slate-500 font-mono mt-2 block">{t('auto.auto_looking_for_overlapp_131')}</span>
                          </motion.div>
                        ) : intercepting ? (
                          <motion.div key="intercepting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">{t('auto.auto_bookings_intercepted_130')}</h3>
                            <p className="text-xs text-slate-300">{t('auto.auto_commercial_seats_can_129')}</p>
                          </motion.div>
                        ) : (
                          <motion.div key="found" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-500 text-black text-[9px] font-bold uppercase rounded-bl">{t('auto.auto_node_overlap_detecte_128')}</div>
                            <h3 className="text-lg font-bold text-white mb-4">{t('auto.auto_3_sovereign_peers_fo_127')}</h3>
                            
                            <div className="space-y-3 mb-6">
                              {[
                                { user: 'You', status: t('auto.auto_new_booked_ba_114__first_5008') },
                                { user: t('auto.auto_new_peer__491_5007'), status: t('auto.auto_new_booked_vs_4__upper__5006') },
                                { user: t('auto.auto_new_peer__882_5005'), status: t('auto.auto_new_booked_aa_100__flags_5004') },
                              ].map((p, i) => (
                                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                  <span className="text-xs font-bold text-white">{p.user}</span>
                                  <span className="text-[10px] font-mono text-slate-400">{p.status}</span>
                                </div>
                              ))}
                            </div>

                            <button 
                              onClick={() => setIntercepting(true)}
                              className="w-full py-3 rounded-xl bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20"
                            >
                              {t('auto.auto_intercept_commercial_126')}
                                                                                              </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Biometric Tunnel */}
              {activeTab === 'biometric' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-emerald-400 font-medium text-sm">
                      <ScanFace className="w-4 h-4" />
                      <span>{t('auto.auto_zero_stop_border_cle_125')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">{t('auto.auto_biometric_customs_tu_124')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_partnering_with_nati_123')}
                                                              </p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="rounded-2xl bg-black p-6 relative overflow-hidden h-[300px] flex items-center justify-center border border-emerald-500/30">
                      {/* Tunnel Simulation */}
                      <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            className="absolute w-64 h-64 border-2 border-emerald-500/20 rounded-3xl"
                            animate={{ translateZ: [0, 800], opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: "linear" }}
                          />
                        ))}
                      </div>

                      <div className="relative z-10 w-full max-w-sm bg-black/80 backdrop-blur border border-white/10 p-5 rounded-2xl text-center">
                        <ScanFace className={cn("w-12 h-12 mx-auto mb-3 transition-colors", bioCleared ? "text-emerald-400" : "text-slate-600")} />
                        <h4 className="text-sm font-bold text-white mb-1">{t('auto.auto_tunnel_active__dxb_a_122')}</h4>
                        <div className="text-[10px] font-mono text-emerald-400 mb-4 bg-emerald-500/10 border border-emerald-500/20 py-1 rounded inline-block px-3">
                          {t('auto.auto_facial_scan___therma_121')}
                                                                          </div>
                        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10">
                          <span>{t('auto.auto_identity__verified_120')}</span>
                          <span>{t('auto.auto_customs_status__clea_119')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Silent Mode */}
              {activeTab === 'silent' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-slate-400 font-medium text-sm">
                      <EyeOff className="w-4 h-4" />
                      <span>{t('auto.auto_absolute_digital_ano_118')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white">{t('auto.auto_the__silent_mode__pr_117')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_for_ultra_high_net_w_116')}
                                                              </p>
                  </div>
                  <div className="lg:col-span-7 flex items-center justify-center">
                    <div className={cn(
                      "p-8 rounded-3xl border transition-all duration-1000 w-full max-w-md text-center",
                      silentMode ? "bg-red-950/40 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]" : "bg-white/[0.02] border-white/10"
                    )}>
                      <Lock className={cn("w-16 h-16 mx-auto mb-6 transition-colors duration-1000", silentMode ? "text-red-500" : "text-slate-600")} />
                      
                      {silentMode ? (
                        <div className="space-y-4 animate-fade-in">
                          <h3 className="text-xl font-bold text-white">{t('auto.auto_protocol_active_115')}</h3>
                          <div className="p-3 rounded bg-black/50 border border-red-500/20 text-left space-y-2">
                            <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">{t('auto.auto_true_identity__114')}</span><span className="text-red-400">{t('auto.auto_obfuscated_113')}</span></div>
                            <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">{t('auto.auto_active_shell_alias__112')}</span><span className="text-white">{t('auto.auto_apex_ventures_llc_111')}</span></div>
                            <div className="flex justify-between text-xs font-mono"><span className="text-slate-500">{t('auto.auto_comms_proxy__110')}</span><span className="text-white">{t('auto.auto_encrypted_relay_109')}</span></div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{t('auto.auto_engage_cloaking_108')}</h3>
                          <p className="text-xs text-slate-400 mb-6">{t('auto.auto_wipe_physical_and_di_107')}</p>
                        </div>
                      )}

                      <button 
                        onClick={() => setSilentMode(!silentMode)}
                        className={cn(
                          "w-full py-4 rounded-xl font-bold text-sm transition-all shadow-xl mt-4",
                          silentMode ? "bg-white text-black hover:bg-slate-200" : "bg-red-600 text-white hover:bg-red-500"
                        )}
                      >
                        {silentMode ? t('auto.auto_new_disengage_silent_mod_5003') : t('auto.auto_new_activate_silent_mode_5002')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Crisis Matrix */}
              {activeTab === 'crisis' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-red-400 font-medium text-sm">
                      <ShieldAlert className="w-4 h-4" />
                      <span>{t('auto.auto_sovereign_diplomatic_106')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">{t('auto.auto_sovereign_crisis_mat_105')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_not_just_a_concierge_104')}
                                                              </p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="rounded-2xl border border-red-900/50 bg-black/60 p-6 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-red-900/30 pb-4 mb-4">
                        <span className="text-xs font-bold uppercase text-red-500 tracking-wider">{t('auto.auto_emergency_global_ove_103')}</span>
                        <span className="text-[10px] font-mono bg-red-900/30 text-red-400 px-2 py-1 rounded">{t('auto.auto_tier_1_insurance_bou_102')}</span>
                      </div>

                      <div className="flex-1 bg-black/50 rounded-xl border border-red-900/20 p-4 font-mono text-[10px] sm:text-xs text-red-400 space-y-2 overflow-y-auto mb-4">
                        {crisisLog.map((log, i) => (
                          <div key={i} className="animate-fade-in">{t('auto.auto__gt__101')} {log}</div>
                        ))}
                        {!crisisActive && <div className="text-slate-600">{t('auto.auto__gt__standing_by_for_100')}</div>}
                      </div>

                      <button 
                        onClick={deployCrisis}
                        disabled={crisisActive}
                        className={cn(
                          "w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                          crisisActive ? "bg-red-900/20 text-red-500 border border-red-900/50 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20 active:scale-95"
                        )}
                      >
                        <Zap className="w-4 h-4" />
                        {crisisActive ? t('auto.auto_new_crisis_protocol_depl_5001') : t('auto.auto_new_deploy_crisis_matrix_5000')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Circadian Sync */}
              {activeTab === 'circadian' && (
                <div className="grid lg:grid-cols-12 gap-8 h-full">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 text-indigo-400 font-medium text-sm">
                      <Moon className="w-4 h-4" />
                      <span>{t('auto.auto_physiological_integr_99')}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">{t('auto.auto_circadian_rhythm_syn_98')}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {t('auto.auto_a_biological_pacemak_97')}
                                                              </p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-900/10 to-transparent p-6">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <span className="text-xs font-bold text-white uppercase tracking-wider block">{t('auto.auto_nrt__tokyo____jfk__n_96')}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{t('auto.auto_14h_time_difference__95')}</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full">
                          {t('auto.auto_sync_active_94')}
                                                                          </span>
                      </div>

                      <div className="relative pt-6 pb-2">
                        {/* Timeline Track */}
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2" />
                        
                        <div className="flex justify-between relative z-10">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-indigo-400 ring-4 ring-black" />
                            <span className="text-[9px] font-mono text-slate-500 text-center w-20">{t('auto.auto_t_48h_93')}<br/>{t('auto.auto_home_lights_shift_92')}</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-400 ring-4 ring-black" />
                            <span className="text-[9px] font-mono text-slate-500 text-center w-20">{t('auto.auto_in_flight_91')}<br/>{t('auto.auto_blue_light_block_90')}</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-emerald-400 ring-4 ring-black" />
                            <span className="text-[9px] font-mono text-emerald-400 font-bold text-center w-20">{t('auto.auto_arrival_89')}<br/>{t('auto.auto_100__synced_88')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase text-slate-500 block font-semibold mb-0.5">{t('auto.auto_current_intervention_87')}</span>
                          <span className="text-sm font-bold text-white">{t('auto.auto_triggering_melatonin_86')}</span>
                        </div>
                        <Moon className="w-5 h-5 text-indigo-400" />
                      </div>
                    </div>
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
