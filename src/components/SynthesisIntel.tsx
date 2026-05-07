import React from 'react';
import { Lightbulb, TrendingUp, User, MapPin } from 'lucide-react';
import { useRead } from '../hooks/useRead';
import { useTranslation } from "react-i18next";

// Define the interface for the Synthesis Intel data
interface SynthesisIntelData {
  personaSnapshot: {
    name: string;
    coreTraits: string[];
    motivations: string;
  };
  marketInsights: {
    emergingVibe: string;
    vibeMomentum: string;
    hotspot: string;
    recommendation: string;
  };
  performanceTip: {
    suggestion: string;
    actionableInsight: string;
  };
}

export default function SynthesisIntel() {
    const { t } = useTranslation();
  const { data, loading } = useRead('synthesis');
  const intel = data as SynthesisIntelData | null;

  if (loading) {
    return (
        <section className="glass p-8 rounded-3xl col-span-1">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">{t('auto.auto_synthesis_intel_2535')}</h2>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                    <Lightbulb className="w-3 h-3" /> {t('auto.auto_ai_generated_2534')}
                                    </div>
            </div>
            <div className="space-y-6 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                <div className="h-8 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
            </div>
        </section>
    );
  }

  if (!intel) {
    return <p>{t('auto.auto_no_synthesis_intel_a_2533')}</p>;
  }

  return (
    <section className="glass p-8 rounded-3xl col-span-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold">{t('auto.auto_synthesis_intel_2532')}</h2>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
          <Lightbulb className="w-3 h-3" /> {t('auto.auto_ai_generated_2531')}
                          </div>
      </div>

      <div className="space-y-6">
        {intel.personaSnapshot && (
            <div>
              <h3 className="font-bold text-sm text-blue-300 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" /> {t('auto.auto_target_persona_2530')}
                                        </h3>
              <p className="text-lg font-semibold mb-1">{intel.personaSnapshot.name}</p>
              <p className="text-xs text-foreground/60 leading-relaxed">{intel.personaSnapshot.motivations}</p>
            </div>
        )}

        {intel.marketInsights && (
            <div>
              <h3 className="font-bold text-sm text-blue-300 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> {t('auto.auto_market_insight_2529')}
                                        </h3>
              <p className="text-sm text-foreground/80 mb-2">
                {t('auto.auto_the_2528')} <span className="font-bold text-primary">'{intel.marketInsights.emergingVibe}'</span> {t('auto.auto_vibe_is_gaining_trac_2527')} <span className="font-bold"><MapPin className="inline w-3 h-3 -mt-1"/> {intel.marketInsights.hotspot}</span>.
              </p>
              <p className="text-xs text-foreground/60 bg-white/5 p-2 rounded-lg">{intel.marketInsights.recommendation}</p>
            </div>
        )}

        {intel.performanceTip && (
            <div>
              <h3 className="font-bold text-sm text-blue-300 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> {t('auto.auto_performance_tip_2526')}
                                        </h3>
              <p className="text-sm text-foreground/80 mb-2">{intel.performanceTip.suggestion}</p>
              <p className="text-xs text-foreground/60 bg-white/5 p-2 rounded-lg">{intel.performanceTip.actionableInsight}</p>
            </div>
        )}
      </div>
    </section>
  );
}
