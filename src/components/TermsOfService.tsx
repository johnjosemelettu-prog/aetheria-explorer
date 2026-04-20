import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, BookOpen, AlertTriangle, Copyright, Users, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const sections = [
    {
      title: "Agreement to Terms",
      icon: <Scale className="w-5 h-5" />,
      content: "These Terms of Service constitute a legally binding agreement made between you and Aetheria Explorer concerning your access to and use of our ecosystem. By accessing Aetheria, you agree to be bound by these terms."
    },
    {
      title: "Digital Citizenship",
      icon: <Users className="w-5 h-5" />,
      content: "As an Aetherian, you are expected to maintain respect for local cultures, environments, and fellow travelers while utilizing our platform. Cyber-bullying, location-spoofing for malicious intent, or abuse of the AR space is strictly prohibited."
    },
    {
      title: "Intellectual Property",
      icon: <Copyright className="w-5 h-5" />,
      content: "Unless otherwise indicated, the platform is our proprietary property. All source code, databases, software, AR designs, audio, video, and graphics on the platform are owned or controlled by us, protected by copyright and trademark laws."
    },
    {
      title: "AI Ecosystem Rules",
      icon: <Terminal className="w-5 h-5" />,
      content: "Our AI systems (Ruth, Gen-Z agents, etc.) are tools for enhancement, not liability. Aetheria is not responsible for AI-generated hallucinations that lead to incorrect travel directions or subjective misinterpretations of cultural sites."
    },
    {
      title: "Risk Acknowledgment",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: "Travel inherently involves risk. While our Safety Swarm and AR navigation aim to protect you, Aetheria Explorer cannot guarantee your physical safety. You assume full responsibility for your actions based on our app's guidance."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-secondary/20 text-secondary mb-6 border border-secondary/30">
            <BookOpen className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black mb-6">Terms of Service</h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            The rules of engagement for the Aetheria Ecosystem. Read carefully before embarking on your augmented journey.
          </p>
          <p className="text-sm font-mono text-secondary mt-6">LAST PROTOCOL UPDATE: 2026.10.26</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Content Area */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="glass p-10 rounded-[40px] relative overflow-hidden group border-secondary/20"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 text-secondary">
                {sections[activeTab].icon}
              </div>
              <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
                {sections[activeTab].title}
              </h2>
              <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                <p>{sections[activeTab].content}</p>
                <div className="mt-8 p-6 bg-black/40 rounded-2xl border border-white/5 border-l-4 border-l-secondary">
                  <p className="text-sm italic">
                    "Failure to abide by these digital mandates may result in account suspension and revocation of all Aetheria+ privileges and verifiable credentials."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-4 order-1 lg:order-2">
            {sections.map((section, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left ${
                  activeTab === idx 
                    ? 'bg-secondary/20 border border-secondary/50 text-white shadow-[0_0_30px_rgba(var(--secondary),0.2)]' 
                    : 'glass hover:bg-white/10 text-foreground/60 hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-xl flex-shrink-0 ${activeTab === idx ? 'bg-secondary/30 text-secondary' : 'bg-black/20 text-foreground/40'}`}>
                  {section.icon}
                </div>
                <span className="font-bold text-lg">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
