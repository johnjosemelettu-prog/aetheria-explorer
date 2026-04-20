import React from 'react';
import { motion } from 'framer-motion';
import { Scale, AlertTriangle, FileText, UseCase, Briefcase, Zap, GlobeLock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-800 text-white mb-6 shadow-xl">
            <Scale className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-4">Terms of Service</h1>
          <p className="text-slate-500 font-mono text-sm max-w-xl mx-auto">
            Last Updated: April 20, 2026<br/>
            Please review the governing rules before utilizing Aetheria environmental routing or AI models.
          </p>
        </motion.div>

        <div className="space-y-12 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100">
          
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4"><FileText className="w-6 h-6 text-slate-700" /> 1. Acceptance of Terms</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>By accessing Aetheria Explorer, deploying a UAV drone rental, activating an e-SIM, or utilizing our AR/VR and AI itinerary modules, you agree to these terms. If you do not agree with any structural limitation of liability outlined herein, you must immediately uninstall the application.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4"><AlertTriangle className="w-6 h-6 text-amber-500" /> 2. AR / Routing Liability Waiver</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Features such as <strong>Trusted Route Corridors</strong>, <strong>Get Me Home Emergency Extraction</strong>, and general <strong>AR Wayfinding</strong> rely strictly on third-party satellite topography and aggregated safety data from decentralized nodes. Aetheria LLC provides these paths "AS-IS".</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You maintain primary responsibility for your situational awareness. Do not strictly rely on visual AR cues if a physical hazard presents itself.</li>
                <li>Aetheria is not liable for structural changes, unexpected physical blockades, or geopolitical instability in routes advised by our neural engines.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4"><Zap className="w-6 h-6 text-slate-700" /> 3. Generative AI Synthesis Limitations</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Modules including the <em>AI Travel Mentor</em>, <em>Vision Hub Text-to-Image</em>, and the <em>Haiku / Comic Generators</em> utilize advanced Large Language and Vision Models.</p>
              <p>Artifacts retrieved from Vision Decoding (e.g., Souvenir origin verification or Street Art metadata) are statistically approximated. Aetheria does not claim absolute historical or authentication infallibility unless specifically backed by a provided cryptographic blockchain hash.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4"><Briefcase className="w-6 h-6 text-slate-700" /> 4. Payments, Aetheria+, and Travel Insurance</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>All subscription payments for <strong>Aetheria+</strong> are final upon processing. Aetheria provides "Booking-wise Subscriptions" (Guest Passes) structured for individual trips.</p>
              <p>Any Travel Insurance policies purchased through the <em>Integrated Assurance Engine</em> are legally bound by the underwriter (e.g., Premium Shield, Nomad Basic), not Aetheria LLC directly. Any claims processing will be directed explicitly to the respective third-party adjustor.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4"><GlobeLock className="w-6 h-6 text-slate-700" /> 5. Termination of Service</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>We reserve the right to suspend or terminate accounts contributing to localized spam (such as false flags in Scam Alert Radar), failing to respect local etiquette, or violating localized drone operational laws during active rentals.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
