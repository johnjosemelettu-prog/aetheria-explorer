      import { Badge } from "@/components/ui/badge";
      import { Fingerprint, Bot, Database, Shield, Globe, FileText } from "lucide-react";
      
      export default function PrivacyPage() {
        return (
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <header className="text-center mb-16 space-y-4">
              <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest py-1 px-3 text-[10px]">Aetheria Privacy Protocol</Badge>
              <h1 className="font-headline text-4xl font-black tracking-tight md:text-6xl text-slate-900 leading-none">
                Privacy Policy
              </h1>
              <p className="mt-4 text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                Your privacy is fundamental to the integrity of the Aetheria grid. This protocol outlines how we collect, synthesize, and protect your data.
              </p>
            </header>
      
            <div className="space-y-12">
      
              <section id="data-collection">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <Fingerprint className="h-6 w-6 text-primary" /> 1. Data We Collect & Synthesize
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium mb-4">
                  To create a hyper-personalized experience, Aetheria collects and synthesizes several types of data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 font-medium">
                  <li><strong>Identity Node Data:</strong> Name, contact information, gender identity, citizenship, and home base. This forms your core digital identity on the grid.</li>
                  <li><strong>Travel DNA:</strong> Your specified travel style preferences (e.g., Leisure, Kinetic) and interest matrix (e.g., History, Gastronomy).</li>
                  <li><strong>Odyssey Parameters:</strong> Destination, temporal range, budget, and vibe descriptions you provide to the AI Odyssey Planner.</li>
                  <li><strong>Usage Telemetry:</strong> Anonymized interaction data with our features, used to identify patterns and improve system performance.</li>
                  <li><strong>Location Data:</strong> GPS coordinates when you actively use location-based features like AR Wayfinding or Local Legends AI. This is never tracked in the background.</li>
                </ul>
              </section>
      
              <section id="ai-processing">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <Bot className="h-6 w-6 text-primary" /> 2. AI Synthesis & Your Data
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Our AI agents use your data as a blueprint to construct your experiences. For example, your <strong>Travel DNA</strong> and <strong>Odyssey Parameters</strong> are fed into our AI to generate a bespoke itinerary. When you use the Vision AI Hub, images you capture are processed to provide context, but are not stored long-term unless you save them to your Journal. We are committed to using powerful AI ethically, ensuring that data processing is directly in service of enhancing your journey.
                </p>
              </section>
      
              <section id="data-storage-security">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <Database className="h-6 w-6 text-primary" /> 3. Data Storage & Security
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  All personal data is encrypted both in transit and at rest using industry-standard cryptographic protocols. Your <strong>Identity Node</strong> is secured in our core database with advanced security measures. Financial information processed by the <strong>Smart Wallet</strong> is handled by our PCI-compliant payment partners and is never stored on Aetheria's servers.
                </p>
              </section>
      
              <section id="data-sharing">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <Shield className="h-6 w-6 text-primary" /> 4. Third-Party Data Sharing
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  We do not sell your personal data. We only share data with third parties under specific, necessary circumstances:
                </p>
                 <ul className="list-disc list-inside space-y-2 text-slate-600 font-medium mt-4">
                  <li><strong>Booking Providers:</strong> When you use the Consolidated Booking Hub, we transmit the necessary information to airlines, hotels, or other providers to secure your reservation.</li>
                  <li><strong>Payment Processors:</strong> To facilitate transactions through your Smart Wallet.</li>
                  <li><strong>Legal Compliance:</strong> If required by law or to protect the safety and integrity of the Aetheria grid.</li>
                </ul>
                <p className="text-slate-600 leading-relaxed font-medium mt-4">
                  Anonymized and aggregated data may be used for research and to improve our AI models, but it will never be personally identifiable.
                </p>
              </section>
      
              <section id="user-control">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <Globe className="h-6 w-6 text-primary" /> 5. Your Control & Data Rights
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  You have full control over your <strong>Identity Node</strong>. You can access, modify, or de-initialize your personal data at any time through your profile's Command Center. Upon de-initialization, your personal data will be permanently removed from our active grid within 30 days, subject to legal and regulatory retention requirements.
                </p>
              </section>
      
              <section id="policy-updates">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <FileText className="h-6 w-6 text-primary" /> 6. Policy Updates
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  As the Aetheria ecosystem evolves, this Privacy Protocol may be updated. We will notify you of any significant changes via your registered neural address or through an in-app notification. Continued use of the grid after such notification constitutes your acceptance of the updated protocol.
                </p>
              </section>
      
            </div>
          </div>
        );
      }
      