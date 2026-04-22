
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Globe, Fingerprint, Server, Activity, User, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-24 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-100 text-blue-600 mb-6 border border-blue-200">
            <Shield className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">
            Last Updated: October 29, 2023
          </p>
        </motion.div>

        <div className="space-y-12 bg-white p-8 md:p-12 rounded-lg shadow-md border border-gray-200">
          
          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4"><Database className="w-6 h-6 text-blue-600" /> 1. Information We Collect</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>To provide and improve Aetheria Explorer, we collect information you provide directly to us, information from your use of our services, and information from third-party sources.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> When you create an account, we collect information like your name, email address, password, and payment information.</li>
                <li><strong>Travel Plans and Itineraries:</strong> We collect information related to your travel plans, including but not limited to flights, hotels, activities, and preferences.</li>
                <li><strong>User-Generated Content:</strong> We collect content you create, such as reviews, photos, and journal entries.</li>
                <li><strong>Location Data:</strong> With your consent, we collect location data to provide location-based services like mapping and local recommendations.</li>
                <li><strong>Usage Information:</strong> We collect information about how you use our app, such as the features you use, the time you spend, and your interactions.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4"><Server className="w-6 h-6 text-blue-600" /> 2. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>We use your information for various purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide, maintain, and improve our services.</li>
                <li>To personalize your experience and provide tailored recommendations.</li>
                <li>To process transactions and send you related information, including confirmations and invoices.</li>
                <li>To communicate with you about products, services, offers, and events.</li>
                <li>To monitor and analyze trends, usage, and activities in connection with our services.</li>
                <li>To detect and prevent fraudulent activities.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4"><Lock className="w-6 h-6 text-blue-600" /> 3. Data Sharing and Disclosure</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>We do not sell your personal data. We may share your information with third-party vendors and service providers that perform services on our behalf, such as payment processing, data analysis, and marketing. We may also share information in response to a legal request, to protect our rights, or to prevent illegal activities.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4"><Globe className="w-6 h-6 text-blue-600" /> 4. International Data Transfers</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Your information may be transferred to, and maintained on, computers located outside of your state, province, or country where the data protection laws may differ from those from your jurisdiction. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4"><Fingerprint className="w-6 h-6 text-blue-600" /> 5. Your Rights and Choices</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>You have the right to access, update, or delete your personal information. You can manage your account settings and communication preferences within the app. You may also have other rights under local law, such as the right to object to or restrict processing of your personal data.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4"><Mail className="w-6 h-6 text-blue-600" /> 6. Contact Us</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="font-semibold">privacy@aetheria-explorer.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
