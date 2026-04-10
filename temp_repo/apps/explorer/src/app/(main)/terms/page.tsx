      import { Badge } from "@/components/ui/badge";
      import { ShieldCheck, Bot, CreditCard, BrainCircuit, Trophy, LifeBuoy, AlertTriangle, FileText, Landmark, Scale, Mail } from "lucide-react";
      
      export default function TermsPage() {
        return (
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <header className="text-center mb-16 space-y-4">
              <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest py-1 px-3 text-[10px]">Aetheria Operational Protocol</Badge>
              <h1 className="font-headline text-4xl font-black tracking-tight md:text-6xl text-slate-900 leading-none">
                Terms of Service
              </h1>
              <p className="mt-4 text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                By accessing the Aetheria Intelligence Ecosystem, you agree to the following protocols that govern your rights and responsibilities as an explorer on our grid.
              </p>
            </header>
      
            <div className="space-y-12">
      
              <section id="account-integrity">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" /> 1. Identity Node & Security
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  You are responsible for maintaining the security of your <strong>Identity Node</strong> and its associated <strong>Security Key</strong>. All activity, communication, and transactions originating from your node are considered your own. Aetheria is not liable for unauthorized access or grid-based actions resulting from a compromised or lost Security Key. Report any suspected breach to the Aetheria Security Node immediately.
                </p>
              </section>
      
              <section id="responsible-use">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <Bot className="h-6 w-6 text-primary" /> 2. AI Agent & System Interaction
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  You agree not to use the Aetheria grid or its AI agents for any illegal, unauthorized, or malicious purpose. This includes, but is not limited to, attempting to jailbreak, reverse-engineer, or exploit the AI for unintended purposes. The AI agents are designed for travel synthesis and assistance; any manipulation or misuse that violates local or international laws is strictly prohibited and will result in immediate node termination.
                </p>
              </section>
      
              <section id="data-synthesis">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <BrainCircuit className="h-6 w-6 text-primary" /> 3. Data, Content & AI Synthesis
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  To power your journey, Aetheria synthesizes data you provide, such as your <strong>Travel DNA</strong> and <strong>Odyssey Parameters</strong>. While our AI strives for hyper-accurate and relevant output, all recommendations, translations, and synthesized information are provided without warranty. You grant Aetheria a non-exclusive, worldwide, royalty-free license to use, process, and display your user-generated content (e.g., Journal entries, Postcard Studio creations) solely for the purpose of operating and improving the service. You retain full ownership of your content.
                </p>
              </section>
      
              <section id="bookings-financials">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <CreditCard className="h-6 w-6 text-primary" /> 4. Bookings & Financial Protocols
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Aetheria acts as an intelligent facilitator for third-party services like flights, hotels, and rentals. While we synthesize the booking process, the ultimate contract and responsibility lie with you and the third-party provider. All transactions processed through the <strong>Smart Wallet</strong> are subject to the terms of our payment processing partners. You are responsible for ensuring sufficient funds and for any liabilities incurred.
                </p>
              </section>
      
              <section id="gamification-rewards">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <Trophy className="h-6 w-6 text-primary" /> 5. Explorer XP & Gamification
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  The <strong>Explorer XP</strong>, Season Pass levels, medals, and other gamified elements are digital rewards that recognize your engagement on the grid. These elements have no real-world cash value and cannot be traded or redeemed outside of the Aetheria ecosystem. Aetheria reserves the right to modify, rebalance, or reset gamification mechanics at any time.
                </p>
              </section>
      
              <section id="safety-features">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <LifeBuoy className="h-6 w-6 text-primary" /> 6. SOS Panic Hub & Safety Utilities
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Features like the <strong>SOS Panic Hub</strong>, <strong>Safety Swarm</strong>, and <strong>Automated Check-ins</strong> are designed as powerful aids, not infallible guarantees of safety. Their effectiveness can be limited by factors such as network connectivity, local infrastructure, and user error. You are ultimately responsible for your own personal safety, and you agree to use these features responsibly.
                </p>
              </section>
      
              <section id="termination">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <AlertTriangle className="h-6 w-6 text-primary" /> 7. Termination of Service
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Aetheria reserves the right to suspend or de-initialize your Identity Node and terminate your access to the grid at any time, without notice, for any conduct that violates these Terms of Service or any applicable laws. Upon termination, your right to use the service will immediately cease, though you may request an export of your personal data in accordance with our Privacy Protocol.
                </p>
              </section>
      
              <section id="disclaimers">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <FileText className="h-6 w-6 text-primary" /> 8. Disclaimers & Limitation of Liability
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  The Aetheria Intelligence Ecosystem is provided on an "as is" and "as available" basis. We disclaim all warranties of any kind, whether express or implied. In no event shall Aetheria be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.
                </p>
              </section>
      
            </div>
          </div>
        );
      }
      