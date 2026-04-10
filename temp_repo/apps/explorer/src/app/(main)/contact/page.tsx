      "use client";
      
      import { useState } from 'react';
      import { Badge } from "@/components/ui/badge";
      import { Button } from "@/components/ui/button";
      import { Input } from "@/components/ui/input";
      import { Textarea } from "@/components/ui/textarea";
      import { useToast } from "@/components/ui/use-toast";
      import { Bot, HelpCircle, Shield, Bug, Wand2 } from "lucide-react";
      
      const contactReasons = [
        { id: 'support', label: 'Support Inquiry', icon: HelpCircle },
        { id: 'security', label: 'Security Node', icon: Shield },
        { id: 'bug', label: 'Bug Report', icon: Bug },
        { id: 'feature', label: 'Feature Synthesis', icon: Wand2 },
      ];
      
      export default function ContactPage() {
        const [selectedReason, setSelectedReason] = useState('support');
        const [message, setMessage] = useState('');
        const [email, setEmail] = useState('');
        const [isSubmitting, setIsSubmitting] = useState(false);
        const { toast } = useToast();
      
        const handleSubmit = (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          console.log({ email, reason: selectedReason, message });
      
          // Simulate API call
          setTimeout(() => {
            setIsSubmitting(false);
            toast({
              title: "Transmission Received",
              description: "Your message has been securely dispatched to the Aetheria command hub.",
            });
            setMessage('');
            setEmail('');
          }, 1500);
        };
      
        return (
          <div className="container mx-auto max-w-4xl px-4 py-12">
            <header className="text-center mb-16 space-y-4">
              <Badge className="bg-primary/10 text-primary border-none font-bold uppercase tracking-widest py-1 px-3 text-[10px]">Aetheria Connection Node</Badge>
              <h1 className="font-headline text-4xl font-black tracking-tight md:text-6xl text-slate-900 leading-none">
                Contact the Hub
              </h1>
              <p className="mt-4 text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                Establish a direct link to the Aetheria command center. Our support agents are on standby to assist with your inquiries.
              </p>
            </header>
      
            <div className="bg-white shadow-lg rounded-xl p-8 border border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="font-bold text-slate-700 text-sm mb-2 block">Reason for Contact</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {contactReasons.map((reason) => {
                      const Icon = reason.icon;
                      return (
                        <Button
                          key={reason.id}
                          type="button"
                          variant={selectedReason === reason.id ? "default" : "outline"}
                          className={`w-full h-20 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${selectedReason === reason.id ? 'shadow-lg scale-105' : 'hover:bg-slate-50'}`}
                          onClick={() => setSelectedReason(reason.id)}
                        >
                          <Icon className={`h-6 w-6 ${selectedReason === reason.id ? '' : 'text-primary'}`} />
                          <span className="text-xs font-semibold">{reason.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
      
                <div>
                  <label htmlFor="email" className="font-bold text-slate-700 text-sm mb-2 block">Your Neural Identity (Email)</label>
                  <Input 
                    type="email" 
                    id="email" 
                    placeholder="explorer@aetheria.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="h-12 text-base"
                  />
                </div>
      
                <div>
                  <label htmlFor="message" className="font-bold text-slate-700 text-sm mb-2 block">Message Details</label>
                  <Textarea 
                    id="message" 
                    placeholder="Describe your inquiry in detail..."
                    rows={8}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="text-base"
                  />
                </div>
      
                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto font-bold text-base h-12 gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Bot className="h-5 w-5 animate-spin" /> Transmitting...
                      </>
                    ) : (
                      'Dispatch Message to Hub'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        );
      }
      