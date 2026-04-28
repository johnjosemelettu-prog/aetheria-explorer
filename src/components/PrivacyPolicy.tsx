import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Database, Server, Lock, Globe, Fingerprint,
  Mail, Eye, RefreshCw, ChevronRight, FileText
} from 'lucide-react';

const sections = [
  { id: 'collection', icon: Database, title: '1. Information We Collect' },
  { id: 'use', icon: Server, title: '2. How We Use Your Information' },
  { id: 'sharing', icon: Globe, title: '3. Data Sharing & Disclosure' },
  { id: 'transfers', icon: RefreshCw, title: '4. International Data Transfers' },
  { id: 'rights', icon: Fingerprint, title: '5. Your Rights & Choices' },
  { id: 'security', icon: Lock, title: '6. Data Security' },
  { id: 'cookies', icon: Eye, title: '7. Cookies & Tracking' },
  { id: 'children', icon: Shield, title: '8. Children\'s Privacy' },
  { id: 'changes', icon: FileText, title: '9. Changes to This Policy' },
  { id: 'contact', icon: Mail, title: '10. Contact Us' },
];

const content: Record<string, React.ReactNode> = {
  collection: (
    <div className="space-y-4">
      <p>To provide and improve Aetheria Explorer, we collect information you provide directly, information from your use of our services, and information from third-party sources.</p>
      <ul className="space-y-2 pl-4 border-l-2 border-primary/30">
        <li><strong className="text-white">Account Information:</strong> Name, email address, password, and optional profile details when you create an account.</li>
        <li><strong className="text-white">Travel Plans & Itineraries:</strong> Destinations, preferences, bookings, and activities you plan or complete within the app.</li>
        <li><strong className="text-white">User-Generated Content:</strong> Reviews, photos, journal entries, and community posts you create.</li>
        <li><strong className="text-white">Location Data:</strong> With your explicit consent, real-time and historical location data to power AR Wayfinding, local recommendations, and safety features.</li>
        <li><strong className="text-white">Usage Information:</strong> App interactions, features used, session duration, crash reports, and device identifiers.</li>
        <li><strong className="text-white">Payment Information:</strong> Processed securely via our payment providers; we do not store full card numbers.</li>
        <li><strong className="text-white">AI Interaction Data:</strong> Prompts, preferences, and feedback used to improve AI-generated itineraries and recommendations.</li>
      </ul>
    </div>
  ),
  use: (
    <div className="space-y-4">
      <p>We use your information for the following purposes:</p>
      <ul className="space-y-2 pl-4 border-l-2 border-primary/30">
        <li>To provide, maintain, and improve our platform and AI services.</li>
        <li>To personalise your travel experience with tailored recommendations and itineraries.</li>
        <li>To process transactions and send confirmations, invoices, and receipts.</li>
        <li>To communicate updates, promotions, safety alerts, and product news.</li>
        <li>To power safety and emergency features including the Safety Radar and Emergency Contact Access.</li>
        <li>To detect, prevent, and investigate fraud, abuse, and security incidents.</li>
        <li>To train and improve our AI models (always with appropriate anonymisation).</li>
        <li>To comply with applicable legal obligations.</li>
      </ul>
    </div>
  ),
  sharing: (
    <div className="space-y-4">
      <p>We <strong className="text-white">do not sell your personal data</strong>. We may share your information in the following limited circumstances:</p>
      <ul className="space-y-2 pl-4 border-l-2 border-primary/30">
        <li><strong className="text-white">Service Providers:</strong> Trusted vendors that process data on our behalf (payment processors, cloud infrastructure, analytics, email delivery).</li>
        <li><strong className="text-white">Partners:</strong> When you book a service through a verified Aetheria partner, necessary booking details are shared with that partner to fulfil your reservation.</li>
        <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
        <li><strong className="text-white">Safety:</strong> To protect the rights, property, or safety of Aetheria, our users, or the public.</li>
        <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (you will be notified in advance).</li>
      </ul>
    </div>
  ),
  transfers: (
    <p>Aetheria Explorer operates globally. Your information may be stored and processed in countries outside your own, including Australia, the United States, Japan, and the European Union. We implement appropriate safeguards — including Standard Contractual Clauses and data processing agreements — to ensure your data is protected regardless of where it is processed, in accordance with applicable data protection laws including the GDPR and Australian Privacy Act.</p>
  ),
  rights: (
    <div className="space-y-4">
      <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
      <ul className="space-y-2 pl-4 border-l-2 border-primary/30">
        <li><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you.</li>
        <li><strong className="text-white">Correction:</strong> Request that inaccurate or incomplete data be corrected.</li>
        <li><strong className="text-white">Deletion:</strong> Request erasure of your data ("right to be forgotten"), subject to legal retention obligations.</li>
        <li><strong className="text-white">Portability:</strong> Receive your data in a structured, machine-readable format.</li>
        <li><strong className="text-white">Objection / Restriction:</strong> Object to or restrict certain processing activities.</li>
        <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
      </ul>
      <p>To exercise any of these rights, contact us at <a href="mailto:privacy@aetheria-explorer.com" className="text-primary hover:underline">privacy@aetheria-explorer.com</a>. We will respond within 30 days.</p>
    </div>
  ),
  security: (
    <p>We implement industry-standard security measures including AES-256 encryption at rest, TLS 1.3 in transit, multi-factor authentication, regular penetration testing, and access controls. Firebase Authentication and Firestore Security Rules enforce least-privilege access. However, no system is completely secure, and we encourage you to use a strong, unique password and enable two-factor authentication on your account.</p>
  ),
  cookies: (
    <div className="space-y-4">
      <p>We use cookies and similar tracking technologies to operate our services, remember your preferences, and understand usage patterns. You may control cookie preferences through your browser settings. Disabling certain cookies may affect functionality.</p>
      <ul className="space-y-2 pl-4 border-l-2 border-primary/30">
        <li><strong className="text-white">Essential Cookies:</strong> Required for core functionality (authentication, security).</li>
        <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how users interact with the app (Google Analytics / Firebase Analytics).</li>
        <li><strong className="text-white">Preference Cookies:</strong> Remember your language, theme, and other settings.</li>
      </ul>
    </div>
  ),
  children: (
    <p>Aetheria Explorer is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately at <a href="mailto:privacy@aetheria-explorer.com" className="text-primary hover:underline">privacy@aetheria-explorer.com</a> and we will delete such information promptly.</p>
  ),
  changes: (
    <p>We may update this Privacy Policy from time to time. When we make material changes, we will notify you through the app and/or by email at least 14 days before the changes take effect. Continued use of the service after the effective date constitutes acceptance of the revised policy. We encourage you to review this page periodically.</p>
  ),
  contact: (
    <div className="space-y-3">
      <p>If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Privacy Team:</p>
      <div className="glass rounded-xl p-4 space-y-2 border border-white/10">
        <p><strong className="text-white">Email:</strong> <a href="mailto:privacy@aetheria-explorer.com" className="text-primary hover:underline">privacy@aetheria-explorer.com</a></p>
        <p><strong className="text-white">Data Controller:</strong> Aetheria Explorer Pty Ltd</p>
        <p><strong className="text-white">Address:</strong> 100 Synthesis Way, Neo-Tokyo, Japan 150-0001</p>
        <p><strong className="text-white">Response Time:</strong> Within 30 days</p>
      </div>
    </div>
  ),
};

export default function PrivacyPolicy() {
  const [active, setActive] = useState('collection');

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
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-foreground/50 text-sm">Last Updated: April 28, 2026 &nbsp;·&nbsp; Effective: May 12, 2026</p>
          <p className="text-foreground/60 mt-4 max-w-2xl mx-auto">
            Your privacy is fundamental to Aetheria Explorer. This policy explains what data we collect, how we use it, and how we protect it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-4 border border-white/10 sticky top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-3 px-2">Contents</p>
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
