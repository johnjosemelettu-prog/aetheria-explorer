import React from 'react';
import { Lightbulb, TrendingUp, User, MapPin } from 'lucide-react';
import { useRead } from '../hooks/useRead';

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
  const { data, loading } = useRead('synthesis');
  const intel = data as SynthesisIntelData | null;

  if (loading) {
    return (
        <section className="glass p-8 rounded-3xl col-span-1">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold">Synthesis Intel</h2>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                    <Lightbulb className="w-3 h-3" /> AI Generated
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
    return <p>No synthesis intel available.</p>;
  }

  return (
    <section className="glass p-8 rounded-3xl col-span-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold">Synthesis Intel</h2>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
          <Lightbulb className="w-3 h-3" /> AI Generated
        </div>
      </div>

      <div className="space-y-6">
        {intel.personaSnapshot && (
            <div>
              <h3 className="font-bold text-sm text-blue-300 mb-3 flex items-center gap-2">
                <User className="w-4 h-4" /> Target Persona
              </h3>
              <p className="text-lg font-semibold mb-1">{intel.personaSnapshot.name}</p>
              <p className="text-xs text-foreground/60 leading-relaxed">{intel.personaSnapshot.motivations}</p>
            </div>
        )}

        {intel.marketInsights && (
            <div>
              <h3 className="font-bold text-sm text-blue-300 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Market Insight
              </h3>
              <p className="text-sm text-foreground/80 mb-2">
                The <span className="font-bold text-primary">'{intel.marketInsights.emergingVibe}'</span> vibe is gaining traction, especially in <span className="font-bold"><MapPin className="inline w-3 h-3 -mt-1"/> {intel.marketInsights.hotspot}</span>.
              </p>
              <p className="text-xs text-foreground/60 bg-white/5 p-2 rounded-lg">{intel.marketInsights.recommendation}</p>
            </div>
        )}

        {intel.performanceTip && (
            <div>
              <h3 className="font-bold text-sm text-blue-300 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> Performance Tip
              </h3>
              <p className="text-sm text-foreground/80 mb-2">{intel.performanceTip.suggestion}</p>
              <p className="text-xs text-foreground/60 bg-white/5 p-2 rounded-lg">{intel.performanceTip.actionableInsight}</p>
            </div>
        )}
      </div>
    </section>
  );
}
