import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Scale, FileText, User, XCircle, Shield, Zap,
  CreditCard, Globe, AlertTriangle, BookOpen, Gavel
} from 'lucide-react';

const sections = [
  { id: 'acceptance', icon: FileText, title: '1. Acceptance of Terms' },
  { id: 'accounts', icon: User, title: '2. User Accounts' },
  { id: 'content', icon: BookOpen, title: '3. Content & Conduct' },
  { id: 'ip', icon: Shield, title: '4. Intellectual Property' },
  { id: 'payments', icon: CreditCard, title: '5. Payments & Subscriptions' },
  { id: 'aifeatures', icon: Zap, title: '6. AI Features & Disclaimer' },
  { id: 'liability', icon: XCircle, title: '7. Limitation of Liability' },
  { id: 'termination', icon: AlertTriangle, title: '8. Termination' },
  { id: 'disputes', icon: Gavel, title: '9. Dispute Resolution' },
  { id: 'governing', icon: Globe, title: '10. Governing Law' },
  { id: 'changes', icon: Scale, title: '11. Changes to Terms' },
];

const content: Record<string, React.ReactNode> = {
  acceptance: (
    <p>By accessing or using the Aetheria Explorer application and its related services (collectively, the "Service"), you confirm that you are at least 18 years of age, have read and understood these Terms of Service ("Terms"), and agree to be legally bound by them. If you do not agree, you must immediately cease using the Service. These Terms constitute a binding legal agreement between you and Aetheria Explorer Pty Ltd ("Aetheria", "we", "us", "our").</p>
  ),
  accounts: (
    <div className="space-y-3">
      <p>When you create an account, you agree to:</p>
      <ul className="space-y-2 pl-4 border-l-2 border-secondary/30">
        <li>Provide accurate, complete, and current registration information.</li>
        <li>Maintain the security of your credentials and not share your password with any third party.</li>
        <li>Notify us immediately at <a href="mailto:security@aetheria-explorer.com" className="text-primary hover:underline">security@aetheria-explorer.com</a> of any suspected unauthorised access.</li>
        <li>Accept responsibility for all activities conducted under your account.</li>
      </ul>
      <p>We reserve the right to suspend or terminate accounts that violate these Terms, contain false information, or that have been inactive for more than 24 months.</p>
    </div>
  ),
  content: (
    <div className="space-y-3">
      <p>You may create and share content through the Service ("User Content"). You retain ownership of your User Content but grant Aetheria a worldwide, non-exclusive, royalty-free licence to use, reproduce, modify, and display it solely for the purposes of operating and improving the Service.</p>
      <p>You agree <strong className="text-white">not</strong> to post or transmit content that:</p>
      <ul className="space-y-2 pl-4 border-l-2 border-red-500/30">
        <li>Is unlawful, defamatory, harassing, threatening, obscene, or fraudulent.</li>
        <li>Infringes any third-party intellectual property, privacy, or publicity rights.</li>
        <li>Contains malware, viruses, or other harmful code.</li>
        <li>Impersonates any person or entity.</li>
        <li>Violates the privacy or safety of other travellers.</li>
        <li>Constitutes unsolicited advertising or spam.</li>
      </ul>
    </div>
  ),
  ip: (
    <p>The Service, including all software, algorithms, AI models, designs, brand elements, and original content (excluding User Content), is and will remain the exclusive property of Aetheria Explorer Pty Ltd and its licensors. These materials are protected by Australian and international copyright, trademark, patent, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written consent.</p>
  ),
  payments: (
    <div className="space-y-3">
      <p>Certain features of the Service require payment ("Premium Features"). By subscribing or making a purchase, you agree to the following:</p>
      <ul className="space-y-2 pl-4 border-l-2 border-secondary/30">
        <li><strong className="text-white">Aetheria+ Subscriptions</strong> are billed monthly or annually in advance and automatically renew unless cancelled at least 24 hours before the renewal date.</li>
        <li>All payments are processed through our secure payment partners. Aetheria does not store full card details.</li>
        <li>Prices are displayed in your local currency where possible and are inclusive of applicable taxes.</li>
        <li>Refunds are available within 14 days of initial purchase if the feature has not been substantially used, in accordance with applicable consumer protection laws.</li>
        <li>We reserve the right to change pricing with 30 days' notice to existing subscribers.</li>
      </ul>
    </div>
  ),
  aifeatures: (
    <div className="space-y-3">
      <p>Aetheria Explorer incorporates AI-powered features including AI Itinerary Generation, AR Wayfinding, Scam Alert Detection, and Safety Radar. These features are provided <strong className="text-white">for informational and assistive purposes only</strong>.</p>
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <p className="text-yellow-300 text-sm font-semibold">⚠️ Important Disclaimer</p>
        <p className="text-yellow-200/70 text-sm mt-1">AI-generated content may contain errors, inaccuracies, or outdated information. You are solely responsible for verifying information and for your own safety and decisions while travelling. Aetheria is not liable for any harm, financial loss, or injury resulting from reliance on AI-generated recommendations.</p>
      </div>
      <p>AR navigation features supplement — they do not replace — conventional navigation tools. Always exercise caution and situational awareness in unfamiliar environments.</p>
    </div>
  ),
  liability: (
    <div className="space-y-3">
      <p>To the fullest extent permitted by applicable law, Aetheria Explorer Pty Ltd and its directors, employees, partners, and affiliates shall not be liable for any:</p>
      <ul className="space-y-2 pl-4 border-l-2 border-red-500/30">
        <li>Indirect, incidental, special, consequential, or punitive damages.</li>
        <li>Loss of profits, data, goodwill, or business opportunities.</li>
        <li>Harm arising from reliance on AI-generated content, AR features, or third-party information.</li>
        <li>Service interruptions, data breaches (except where caused by our gross negligence), or unauthorised access.</li>
        <li>Actions or omissions of travel partners, local guides, or other third parties.</li>
      </ul>
      <p>Where liability cannot be excluded by law (e.g., Australian Consumer Law guarantees), our total cumulative liability shall not exceed the amount paid by you to Aetheria in the 12 months preceding the claim.</p>
    </div>
  ),
  termination: (
    <p>We may suspend or permanently terminate your access to the Service at any time, with or without notice, if you breach these Terms, engage in fraudulent or abusive behaviour, or if we discontinue the Service. Upon termination, your right to use the Service ceases immediately. Provisions of these Terms that by their nature should survive termination (including intellectual property, disclaimers, and liability limitations) shall survive.</p>
  ),
  disputes: (
    <div className="space-y-3">
      <p>We encourage you to contact us first at <a href="mailto:legal@aetheria-explorer.com" className="text-primary hover:underline">legal@aetheria-explorer.com</a> to resolve any disputes informally.</p>
      <p>If a dispute cannot be resolved informally within 30 days, it shall be submitted to binding arbitration administered by the Australian Centre for International Commercial Arbitration (ACICA) in Sydney, Australia, in accordance with its arbitration rules. The language of arbitration shall be English. This clause does not prevent either party from seeking urgent injunctive relief from a court of competent jurisdiction.</p>
    </div>
  ),
  governing: (
    <p>These Terms are governed by and construed in accordance with the laws of New South Wales, Australia, without regard to its conflict of law principles. You consent to the exclusive jurisdiction of the courts of New South Wales for any matters not subject to arbitration. If you access the Service from outside Australia, you are responsible for compliance with local laws to the extent they apply.</p>
  ),
  changes: (
    <p>We reserve the right to modify these Terms at any time. For material changes, we will provide at least 14 days' notice via in-app notification and/or email before the new terms take effect. Your continued use of the Service after the effective date constitutes acceptance of the revised Terms. If you do not agree to the revised Terms, you must stop using the Service before the effective date.</p>
  ),
};

export default function TermsOfService() {
  const [active, setActive] = useState('acceptance');

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
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">Terms of Service</h1>
          <p className="text-foreground/50 text-sm">Last Updated: April 28, 2026 &nbsp;·&nbsp; Effective: May 12, 2026</p>
          <p className="text-foreground/60 mt-4 max-w-2xl mx-auto">
            Please read these Terms carefully before using Aetheria Explorer. By using our Service, you agree to these Terms.
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
