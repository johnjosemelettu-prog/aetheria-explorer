
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, User, XCircle, Shield, Zap } from 'lucide-react';

export default function TermsOfService() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-24 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gray-800 text-white mb-6 shadow-lg">
            <Scale className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-gray-500 text-sm">
            Last Updated: October 29, 2023
          </p>
        </motion.div>

        <div className="space-y-12 bg-white p-8 md:p-12 rounded-lg shadow-md border border-gray-200">
          
          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4"><FileText className="w-6 h-6 text-gray-700" /> 1. Acceptance of Terms</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>By accessing or using the Aetheria Explorer application (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you do not have permission to access the Service.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4"><User className="w-6 h-6 text-gray-700" /> 2. User Accounts</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4"><Zap className="w-6 h-6 text-gray-700" /> 3. Content and Conduct</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
              <p>You agree not to use the Service to post content or engage in conduct that is illegal, defamatory, obscene, or otherwise objectionable.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4"><Shield className="w-6 h-6 text-gray-700" /> 4. Intellectual Property</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Aetheria LLC and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4"><XCircle className="w-6 h-6 text-red-600" /> 5. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>In no event shall Aetheria LLC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                <p>Features providing real-world guidance, including but not limited to AR Wayfinding and AI-powered recommendations, are for informational purposes only. You are solely responsible for your safety and decisions while traveling. Aetheria LLC is not liable for any harm or damages related to your use of these features.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4">6. Termination</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
            </div>
          </section>

           <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4">7. Governing Law</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
