import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Globe, Fingerprint, Server, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-100 text-blue-600 mb-6 border border-blue-200">
            <Shield className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-500 font-mono text-sm max-w-xl mx-auto">
            Last Updated: April 20, 2026<br/>
            Your digital, physical, and biometric data is secured with zero-knowledge cryptography.
          </p>
        </motion.div>

        <div className="space-y-12 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100">
          
          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4"><Database className="w-6 h-6 text-blue-600" /> 1. Information We Collect</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>When you utilize Aetheria Explorer, particularly our AI, AR, and biometric rendering features, we collect several categories of information to facilitate these high-end travel experiences:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Context:</strong> Basic profile information including name, email, payment methods, and Aetheria+ subscription statuses.</li>
                <li><strong>Geospatial & Semantic Data:</strong> Real-time location parameters necessary for AR wayfinding, Landmark Lenses, and local scam-radar routing.</li>
                <li><strong>Biometric Data (Ancestry Trail):</strong> For the Ancestry Trail module, we process cryptographic hashes of your submitted DNA markers. <em>Note: Biological data is never stored on our servers; it is processed entirely on-device to generate the historical mapping, then immediately excised.</em></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4"><Server className="w-6 h-6 text-blue-600" /> 2. Use of Vision AI & Telemetry</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Aetheria explicitly uses live camera feeds for "Vision Hub" operations (e.g. Menu Explorer, Street Art Decoder, and Quantum Souvenirs).</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Camera feeds are processed locally on the Edge runtime whenever possible.</li>
                <li>If a cloud pipeline is required to resolve a neural synthesis, visual frames are stripped of personal identifiers, encrypted, and discarded within 600 milliseconds.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4"><Lock className="w-6 h-6 text-blue-600" /> 3. Data Protection & Zero-Knowledge Architecture</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>We believe travel should be private. We employ Zero-Knowledge (ZK) Proofs for sharing safety coordinates with Trusted Route Corridors and DAO verification matrices.</p>
              <p>Your travel DNA, journal inputs, and dietary specifics are isolated from ad networks. Information shared with local heroes or "Side-Quest" merchants is fully anonymized until explicitly authorized by your cryptographic signature.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4"><Globe className="w-6 h-6 text-blue-600" /> 4. International Data Transfers</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>As a global tool, Aetheria Explorer transmits minimal configuration packets to planetary nodes to ensure seamless e-SIM handoffs and localized translation services. All nodes comply strictly with GDPR, CCPA, and the 2025 Global Digital Nomad Privacy Accord.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-4"><Fingerprint className="w-6 h-6 text-blue-600" /> 5. Your Rights and Controls</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>You may, at any time, execute a "Digital Ghost" command within your Aetheria Dashboard. Activating this will dynamically purge your location history, clear your biometric hashes, and revoke third-party merchant telemetry access instantly.</p>
              <p>If you have questions concerning privacy operations, contact the Aetheria Ethics Board at <a href="mailto:privacy@aetheria-explorer.com" className="text-blue-600 font-bold hover:underline">privacy@aetheria-explorer.com</a>.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
