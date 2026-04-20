import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, Eye, Database, Globe, CheckCircle2, FileText, Fingerprint } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const sections = [
    {
      title: "Introduction",
      icon: <FileText className="w-5 h-5" />,
      content: "Welcome to Aetheria Explorer. We respect your privacy and are committed to protecting your personal data in the digital age. This policy outlines our cutting-edge security architecture and how we treat your data as your sovereign property."
    },
    {
      title: "Data Sovereignty",
      icon: <Fingerprint className="w-5 h-5" />,
      content: "We collect only what's necessary. Identity Data, Contact Data, and Usage Data are encrypted end-to-end. Your travel preferences and AI itinerary generation data belong solely to you. We strictly never sell your data to third-party data brokers."
    },
    {
      title: "Biometrics & AR",
      icon: <Eye className="w-5 h-5" />,
      content: "Our Augmented Reality and Biometric features (such as Face Scan for premium boarding) process everything locally on your device whenever possible. Ephemeral cloud processing is purged immediately after AI computation."
    },
    {
      title: "Blockchain Security",
      icon: <Database className="w-5 h-5" />,
      content: "Aetheria utilizes decentralized ledgers for digital passports and verifiable credentials. This guarantees tamper-proof records of your achievements without centralizing your PII (Personally Identifiable Information)."
    },
    {
      title: "Global Compliance",
      icon: <Globe className="w-5 h-5" />,
      content: "We guarantee compliance with GDPR, CCPA, and upcoming spatial computing privacy regulations. Your data localized processing respects your geographical jurisdiction."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/20 text-primary mb-6 border border-primary/30">
            <Lock className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black mb-6">Privacy Policy</h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Your data is your property. Discover our blueprint for maintaining your digital sovereignty while exploring the world.
          </p>
          <p className="text-sm font-mono text-primary mt-6">LAST PROTOCOL UPDATE: 2026.10.26</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-4">
            {sections.map((section, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left ${
                  activeTab === idx 
                    ? 'bg-primary/20 border border-primary/50 text-white shadow-[0_0_30px_rgba(var(--primary),0.2)]' 
                    : 'glass hover:bg-white/10 text-foreground/60 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${activeTab === idx ? 'bg-primary/30 text-primary' : 'bg-black/20 text-foreground/40'}`}>
                  {section.icon}
                </div>
                <span className="font-bold text-lg">{section.title}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="glass p-10 rounded-[40px] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                {sections[activeTab].icon}
              </div>
              <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
                {sections[activeTab].title}
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </h2>
              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p>{sections[activeTab].content}</p>
                <p>We implement automated data lifecycle management to ensure your digital footprint is minimized. Any telemetry data gathered for app optimizations is completely anonymized.</p>
                
                <div className="mt-8 p-6 bg-black/40 rounded-2xl border border-white/5">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-secondary" />
                    Your Rights
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Right to complete data erasure ("Right to be Forgotten")</li>
                    <li>Right to data portability (export in standardized JSON)</li>
                    <li>Right to algorithm transparency</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
