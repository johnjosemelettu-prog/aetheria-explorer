      import { Badge } from "@/components/ui/badge";
      import { Scale, Copyright, AlertTriangle, Shield, FileText } from "lucide-react";
      
      export default function LegalPage() {
        return (
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <header className="text-center mb-16 space-y-4">
              <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest py-1 px-3 text-[10px]">Aetheria Legal Framework</Badge>
              <h1 className="font-headline text-4xl font-black tracking-tight md:text-6xl text-slate-900 leading-none">
                Legal Notices
              </h1>
              <p className="mt-4 text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                This document outlines the legal framework governing the use of the Aetheria Intelligence Ecosystem, including intellectual property and other key legal notices.
              </p>
            </header>
      
            <div className="space-y-12">
      
              <section id="intellectual-property">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <Copyright className="h-6 w-6 text-primary" /> 1. Intellectual Property Rights
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  The Aetheria name, logo, interface design, AI models, and all related software and code are the exclusive intellectual property of Aetheria AI. and its licensors, protected by copyright, trademark, and other laws. Unauthorized use, reproduction, or distribution of our intellectual property is strictly prohibited. The terms "Journey Synthesized," "Aura Itinerary," "Identity Node," and "Travel DNA" are trademarks of Aetheria AI.
                </p>
              </section>
      
              <section id="user-content">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <FileText className="h-6 w-6 text-primary" /> 2. User-Generated Content
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  You retain all ownership rights to the content you create and upload to the Aetheria grid, such as journal entries and Postcard Studio creations. By using our service, you grant Aetheria AI a limited, non-exclusive, royalty-free license to use, process, and display this content as necessary to provide and enhance the service. We will never claim ownership of your creative output.
                </p>
              </section>
      
              <section id="third-party-links">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <AlertTriangle className="h-6 w-6 text-primary" /> 3. Third-Party Services & Links
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Aetheria integrates with and links to third-party services (e.g., airlines, hotels, booking platforms) to provide a consolidated experience. We are not responsible for the content, privacy policies, or practices of these third parties. Your interactions with them are governed by their respective terms and policies. We provide these links for convenience and do not endorse these services.
                </p>
              </section>
      
              <section id="indemnification">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <Shield className="h-6 w-6 text-primary" /> 4. Indemnification
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  You agree to indemnify and hold harmless Aetheria AI, its affiliates, officers, and employees from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your breach of our Terms of Service, your improper use of the Aetheria grid, or your violation of any law or the rights of a third party.
                </p>
              </section>
      
              <section id="governing-law">
                <h2 className="flex items-center gap-3 font-headline text-3xl font-bold text-slate-800 mb-4">
                  <Scale className="h-6 w-6 text-primary" /> 5. Governing Law & Dispute Resolution
                </h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  These legal notices and any dispute arising from your use of the Aetheria ecosystem shall be governed by and construed in accordance with the laws of the jurisdiction in which Aetheria AI is headquartered, without regard to its conflict of law provisions. Any legal action or proceeding shall be brought exclusively in the courts located in that jurisdiction.
                </p>
              </section>
      
            </div>
          </div>
        );
      }
      