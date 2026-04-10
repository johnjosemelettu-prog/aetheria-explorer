import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
            <FileText className="text-primary w-6 h-6" />
          </div>
          <h1 className="text-4xl font-display font-bold">Terms of Service</h1>
        </div>

        <div className="glass p-8 rounded-[32px] space-y-6 text-foreground/80 leading-relaxed">
          <p><strong>Last Updated: October 26, 2026</strong></p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">1. Agreement to Terms</h2>
          <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Aetheria Explorer ("we," "us" or "our"), concerning your access to and use of the Aetheria application.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">2. User Accounts</h2>
          <p>If you create an account on our application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it.</p>
          <p>We may, but have no obligation to, monitor and review new accounts before you may sign in and use our Services.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">3. Acceptable Use</h2>
          <p>You agree not to use the application to collect, upload, transmit, display, or distribute any User Content (i) that violates any third-party right, including any copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right; (ii) that is unlawful, harassing, abusive, tortious, threatening, harmful, invasive of another's privacy, vulgar, defamatory, false, intentionally misleading, trade libelous, pornographic, obscene, patently offensive, promotes racism, bigotry, hatred, or physical harm of any kind against any group or individual or is otherwise objectionable; (iii) that is harmful to minors in any way.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">4. Modifications to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We do so by posting and drawing attention to the updated terms on the Site. Your decision to continue to visit and make use of the Site after such changes have been made constitutes your formal acceptance of the new Terms of Service.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-white">5. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where Aetheria Explorer operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
        </div>
      </motion.div>
    </div>
  );
}
