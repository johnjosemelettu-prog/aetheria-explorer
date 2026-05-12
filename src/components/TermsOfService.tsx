import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Scale, FileText, User, XCircle, Shield, Zap,
  CreditCard, Globe, AlertTriangle, BookOpen, Gavel
} from 'lucide-react';
import { useTranslation } from "react-i18next";

const TermsOfService: React.FC = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState('acceptance');

const sections = [
  { id: 'acceptance', icon: FileText, title: t('auto.auto_acceptance_of_ter_2595') },
  { id: 'accounts', icon: User, title: t('auto.auto_user_accounts_2594') },
  { id: 'content', icon: BookOpen, title: t('auto.auto_content___conduct_2593') },
  { id: 'ip', icon: Shield, title: t('auto.auto_intellectual_proper_2592') },
  { id: 'payments', icon: CreditCard, title: t('auto.auto_payments___subscrip_2591') },
  { id: 'aifeatures', icon: Zap, title: t('auto.auto_ai_features___discla_2590') },
  { id: 'liability', icon: XCircle, title: t('auto.auto_limitation_of_liabi_2589') },
  { id: 'termination', icon: AlertTriangle, title: t('auto.auto_termination_2588') },
  { id: 'disputes', icon: Gavel, title: t('auto.auto_dispute_resolution_2587') },
  { id: 'governing', icon: Globe, title: t('auto.auto_governing_law_2586') },
  { id: 'changes', icon: Scale, title: t('auto.auto_changes_to_terms_2585') },
];

const content: Record<string, React.ReactNode> = {
  acceptance: (
    <p>{t('auto.auto___by_accessing_or_us_532')}</p>
  ),
  accounts: (
    <div className="space-y-3">
      <p>{t('auto.auto___when_you_create_an_531')}</p>
      <ul className="space-y-2 pl-4 border-l-2 border-secondary/30">
        <li>{t('auto.auto___provide_accurate___530')}</li>
        <li>{t('auto.auto___maintain_the_secur_529')}</li>
        <li>{t('auto.auto___notify_us_immediat_528')} <a href="mailto:security@aetheria-explorer.com" className="text-primary hover:underline">{t('auto.auto___security_aetheria__527')}</a> {t('auto.auto___of_any_suspected_u_526')}</li>
        <li>{t('auto.auto___accept_responsibil_525')}</li>
      </ul>
      <p>{t('auto.auto___we_reserve_the_rig_524')}</p>
    </div>
  ),
  content: (
    <div className="space-y-3">
      <p>{t('auto.auto___you_may_create_and_523')}</p>
      <p>{t('auto.auto___you_agree___522')} <strong className="text-white">{t('auto.auto___not___521')}</strong> {t('auto.auto___to_post_or_transmi_520')}</p>
      <ul className="space-y-2 pl-4 border-l-2 border-red-500/30">
        <li>{t('auto.auto___is_unlawful__defam_519')}</li>
        <li>{t('auto.auto___infringes_any_thir_518')}</li>
        <li>{t('auto.auto___contains_malware___517')}</li>
        <li>{t('auto.auto___impersonates_any_p_516')}</li>
        <li>{t('auto.auto___violates_the_priva_515')}</li>
        <li>{t('auto.auto___constitutes_unsoli_514')}</li>
      </ul>
    </div>
  ),
  ip: (
    <p>{t('auto.auto___the_service__inclu_513')}</p>
  ),
  payments: (
    <div className="space-y-3">
      <p>{t('auto.auto___certain_travel_ser_512')}</p>
      <ul className="space-y-2 pl-4 border-l-2 border-secondary/30">
        <li><strong className="text-white">{t('auto.auto___aetheria__travel_s_511')}</strong> {t('auto.auto___provide_access_to__510')}</li>
        <li><strong className="text-white">{t('auto.auto___third_party_bookin_509')}</strong> {t('auto.auto___payments_for_fligh_508')}</li>
        <li><strong className="text-white">{t('auto.auto___dynamic_pricing____507')}</strong> {t('auto.auto___travel_pricing_flu_506')}</li>
        <li><strong className="text-white">{t('auto.auto___esims___insurance__505')}</strong> {t('auto.auto___digital_products_l_504')}</li>
        <li>{t('auto.auto___we_reserve_the_rig_503')}</li>
      </ul>
    </div>
  ),
  aifeatures: (
    <div className="space-y-3">
      <p>{t('auto.auto___aetheria_explorer__502')} <strong className="text-white">{t('auto.auto___for_informational__501')}</strong>.</p>
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <p className="text-yellow-300 text-sm font-semibold">{t('auto.auto______important_discl_500')}</p>
        <p className="text-yellow-200/70 text-sm mt-1">{t('auto.auto___ai_generated_conte_499')}</p>
      </div>
      <p>{t('auto.auto___ar_navigation_feat_498')}</p>
    </div>
  ),
  liability: (
    <div className="space-y-3">
      <p>{t('auto.auto___to_the_fullest_ext_497')}</p>
      <ul className="space-y-2 pl-4 border-l-2 border-red-500/30">
        <li>{t('auto.auto___indirect__incident_496')}</li>
        <li>{t('auto.auto___loss_of_profits__d_495')}</li>
        <li>{t('auto.auto___harm_arising_from__494')}</li>
        <li>{t('auto.auto___service_interrupti_493')}</li>
        <li>{t('auto.auto___actions_or_omissio_492')}</li>
      </ul>
      <p>{t('auto.auto___where_liability_ca_491')}</p>
    </div>
  ),
  termination: (
    <p>{t('auto.auto___we_may_suspend_or__490')}</p>
  ),
  disputes: (
    <div className="space-y-3">
      <p>{t('auto.auto___we_encourage_you_t_489')} <a href="mailto:legal@aetheria-explorer.com" className="text-primary hover:underline">{t('auto.auto___legal_aetheria_exp_488')}</a> {t('auto.auto___to_resolve_any_dis_487')}</p>
      <p>{t('auto.auto___if_a_dispute_canno_486')}</p>
    </div>
  ),
  governing: (
    <p>{t('auto.auto___these_terms_are_go_485')}</p>
  ),
  changes: (
    <p>{t('auto.auto___we_reserve_the_rig_484')}</p>
  ),
};
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/20 border border-secondary/30 mb-6">
            <Scale className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">{t('auto.auto_terms_of_service_2556')}</h1>
          <p className="text-foreground/50 text-sm">{t('auto.auto_last_updated__april__2555')}</p>
          <p className="text-foreground/60 mt-4 max-w-2xl mx-auto">
            {t('auto.auto_please_read_these_te_2554')}
                                </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-4 border border-white/10 sticky top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-3 px-2">{t('auto.auto_contents_2553')}</p>
              <nav className="space-y-1">
                {sections.map(s => (
                  <button key={s.id} onClick={() => {
                    setActive(s.id);
                    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-sm transition-all ${active === s.id ? 'bg-secondary/20 text-secondary' : 'text-foreground/50 hover:text-white hover:bg-white/5'}`}>
                    <s.icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{s.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {sections.map(s => (
              <div key={s.id} id={s.id} className="glass rounded-2xl p-6 border border-white/10 scroll-mt-28">
                <h2 className="text-lg font-bold flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                    <s.icon className="w-4 h-4 text-secondary" />
                  </div>
                  {s.title}
                </h2>
                <div className="text-sm text-foreground/60 leading-relaxed">
                  {content[s.id]}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export default TermsOfService;
