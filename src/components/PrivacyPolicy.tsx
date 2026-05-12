import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Database, Server, Lock, Globe, Fingerprint,
  Mail, Eye, RefreshCw, ChevronRight, FileText
} from 'lucide-react';
import { useTranslation } from "react-i18next";

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState('collection');

const sections = [
  { id: 'collection', icon: Database, title: t('auto.auto_information_we_col_2137') },
  { id: 'use', icon: Server, title: t('auto.auto_how_we_use_your_in_2136') },
  { id: 'sharing', icon: Globe, title: t('auto.auto_data_sharing___disc_2135') },
  { id: 'transfers', icon: RefreshCw, title: t('auto.auto_international_data_2134') },
  { id: 'rights', icon: Fingerprint, title: t('auto.auto_your_rights___choic_2133') },
  { id: 'security', icon: Lock, title: t('auto.auto_data_security_2132') },
  { id: 'cookies', icon: Eye, title: t('auto.auto_cookies___tracking_2131') },
  { id: 'children', icon: Shield, title: t('auto.auto_children_s_privacy_2130') },
  { id: 'changes', icon: FileText, title: t('auto.auto_changes_to_this_pol_2129') },
  { id: 'contact', icon: Mail, title: t('auto.auto_contact_us_2128') },
];

const content: Record<string, React.ReactNode> = {
  collection: (
    <div className="space-y-4">
      <p>{t('auto.auto___to_provide_and_imp_409')}</p>
      <ul className="space-y-2 pl-4 border-l-2 border-primary/30">
        <li><strong className="text-white">{t('auto.auto___account_informatio_408')}</strong> {t('auto.auto___name__email_addres_407')}</li>
        <li><strong className="text-white">{t('auto.auto___travel_plans___iti_406')}</strong> {t('auto.auto___destinations__pref_405')}</li>
        <li><strong className="text-white">{t('auto.auto___user_generated_con_404')}</strong> {t('auto.auto___reviews__photos__j_403')}</li>
        <li><strong className="text-white">{t('auto.auto___location_data____402')}</strong> {t('auto.auto___with_your_explicit_401')}</li>
        <li><strong className="text-white">{t('auto.auto___usage_information__400')}</strong> {t('auto.auto___app_interactions___399')}</li>
        <li><strong className="text-white">{t('auto.auto___payment_informatio_398')}</strong> {t('auto.auto___processed_securely_397')}</li>
        <li><strong className="text-white">{t('auto.auto___ai_interaction_dat_396')}</strong> {t('auto.auto___prompts__preferenc_395')}</li>
      </ul>
    </div>
  ),
  use: (
    <div className="space-y-4">
      <p>{t('auto.auto___we_use_your_inform_394')}</p>
      <ul className="space-y-2 pl-4 border-l-2 border-primary/30">
        <li>{t('auto.auto___to_provide__mainta_393')}</li>
        <li>{t('auto.auto___to_personalise_you_392')}</li>
        <li>{t('auto.auto___to_process_transac_391')}</li>
        <li>{t('auto.auto___to_communicate_upd_390')}</li>
        <li>{t('auto.auto___to_power_safety_an_389')}</li>
        <li>{t('auto.auto___to_detect__prevent_388')}</li>
        <li>{t('auto.auto___to_train_and_impro_387')}</li>
        <li>{t('auto.auto___to_comply_with_app_386')}</li>
      </ul>
    </div>
  ),
  sharing: (
    <div className="space-y-4">
      <p>{t('auto.auto___we___385')} <strong className="text-white">{t('auto.auto___do_not_sell_your_p_384')}</strong>{t('auto.auto_____we_may_share_you_383')}</p>
      <ul className="space-y-2 pl-4 border-l-2 border-primary/30">
        <li><strong className="text-white">{t('auto.auto___service_providers__382')}</strong> {t('auto.auto___trusted_vendors_th_381')}</li>
        <li><strong className="text-white">{t('auto.auto___partners____380')}</strong> {t('auto.auto___when_you_book_a_se_379')}</li>
        <li><strong className="text-white">{t('auto.auto___legal_requirements_378')}</strong> {t('auto.auto___when_required_by_l_377')}</li>
        <li><strong className="text-white">{t('auto.auto___safety____376')}</strong> {t('auto.auto___to_protect_the_rig_375')}</li>
        <li><strong className="text-white">{t('auto.auto___business_transfers_374')}</strong> {t('auto.auto___in_connection_with_373')}</li>
      </ul>
    </div>
  ),
  transfers: (
    <p>{t('auto.auto___aetheria_explorer__372')}</p>
  ),
  rights: (
    <div className="space-y-4">
      <p>{t('auto.auto___depending_on_your__371')}</p>
      <ul className="space-y-2 pl-4 border-l-2 border-primary/30">
        <li><strong className="text-white">{t('auto.auto___access____370')}</strong> {t('auto.auto___request_a_copy_of__369')}</li>
        <li><strong className="text-white">{t('auto.auto___correction____368')}</strong> {t('auto.auto___request_that_inacc_367')}</li>
        <li><strong className="text-white">{t('auto.auto___deletion____366')}</strong> {t('auto.auto___request_erasure_of_365')}</li>
        <li><strong className="text-white">{t('auto.auto___portability____364')}</strong> {t('auto.auto___receive_your_data__363')}</li>
        <li><strong className="text-white">{t('auto.auto___objection___restri_362')}</strong> {t('auto.auto___object_to_or_restr_361')}</li>
        <li><strong className="text-white">{t('auto.auto___withdraw_consent___360')}</strong> {t('auto.auto___withdraw_consent_a_359')}</li>
      </ul>
      <p>{t('auto.auto___to_exercise_any_of_358')} <a href="mailto:privacy@aetheria-explorer.com" className="text-primary hover:underline">{t('auto.auto___privacy_aetheria_e_357')}</a>{t('auto.auto_____we_will_respond__356')}</p>
    </div>
  ),
  security: (
    <p>{t('auto.auto___we_implement_indus_355')}</p>
  ),
  cookies: (
    <div className="space-y-4">
      <p>{t('auto.auto___we_use_cookies_and_354')}</p>
      <ul className="space-y-2 pl-4 border-l-2 border-primary/30">
        <li><strong className="text-white">{t('auto.auto___essential_cookies__353')}</strong> {t('auto.auto___required_for_core__352')}</li>
        <li><strong className="text-white">{t('auto.auto___analytics_cookies__351')}</strong> {t('auto.auto___help_us_understand_350')}</li>
        <li><strong className="text-white">{t('auto.auto___preference_cookies_349')}</strong> {t('auto.auto___remember_your_lang_348')}</li>
      </ul>
    </div>
  ),
  children: (
    <p>{t('auto.auto___aetheria_explorer__347')} <a href="mailto:privacy@aetheria-explorer.com" className="text-primary hover:underline">{t('auto.auto___privacy_aetheria_e_346')}</a> {t('auto.auto___and_we_will_delete_345')}</p>
  ),
  changes: (
    <p>{t('auto.auto___we_may_update_this_344')}</p>
  ),
  contact: (
    <div className="space-y-3">
      <p>{t('auto.auto___if_you_have_questi_343')}</p>
      <div className="glass rounded-xl p-4 space-y-2 border border-white/10">
        <p><strong className="text-white">{t('auto.auto___email____342')}</strong> <a href="mailto:privacy@aetheria-explorer.com" className="text-primary hover:underline">{t('auto.auto___privacy_aetheria_e_341')}</a></p>
        <p><strong className="text-white">{t('auto.auto___data_controller____340')}</strong> {t('auto.auto___aetheria_explorer__339')}</p>
        <p><strong className="text-white">{t('auto.auto___address____338')}</strong> {t('auto.auto___100_synthesis_way__337')}</p>
        <p><strong className="text-white">{t('auto.auto___response_time____336')}</strong> {t('auto.auto___within_30_days___335')}</p>
      </div>
    </div>
  ),
};
  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">{t('auto.auto_privacy_policy_2092')}</h1>
          <p className="text-foreground/50 text-sm">{t('auto.auto_last_updated__april__2091')}</p>
          <p className="text-foreground/60 mt-4 max-w-2xl mx-auto">
            {t('auto.auto_your_privacy_is_fund_2090')}
                                </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-4 border border-white/10 sticky top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-3 px-2">{t('auto.auto_contents_2089')}</p>
              <nav className="space-y-1">
                {sections.map(s => (
                  <button key={s.id} onClick={() => {
                    setActive(s.id);
                    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-sm transition-all ${active === s.id ? 'bg-primary/20 text-primary' : 'text-foreground/50 hover:text-white hover:bg-white/5'}`}>
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
            {sections.map((s, i) => (
              <div key={s.id} id={s.id} className="glass rounded-2xl p-6 border border-white/10 scroll-mt-28">
                <h2 className="text-lg font-bold flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <s.icon className="w-4 h-4 text-primary" />
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
export default PrivacyPolicy;
