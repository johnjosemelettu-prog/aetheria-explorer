
import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { PremiumGate } from './PremiumGate';

// Placeholder for a bounty
interface Bounty {
  id: string;
  title: string;
  description: string;
  reward: string;
}

// Updated ChatMessage interface
interface ChatMessage {
  id:string;
  sender: 'user' | 'concierge' | 'system';
  text: string;
  timestamp: string;
  bounty?: Bounty;
  bountyAccepted?: boolean;
}

// In a real app, this would be a real hook checking the user's subscription status.
const usePremiumStatus = () => ({ isPremium: true, isLoading: false });

const LiveConcierge: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const { isPremium, isLoading } = usePremiumStatus();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Mock concierge response
    setTimeout(() => {
      const isPlanB = input.toLowerCase().includes("plan b");
      let conciergeText = "Hello! How can I help you today?";
      let bounty: Bounty | undefined = undefined;

      if (isPlanB) {
        conciergeText = "It looks like you need a 'Plan B'. I've found a potential solution. It's a bit of a challenge, but I can create a bounty for it. Would you like to accept?";
        bounty = {
          id: 'bounty-1',
          title: 'Navigate Regional Disruption',
          description: 'Your ferry has been cancelled due to a local holiday. Re-book on a regional bus line and document the journey for other travelers.',
          reward: '500 Aetheria Points & a "Local Legend" badge',
        };
      }

      const conciergeMessage: ChatMessage = {
        id: `concierge-${Date.now()}`,
        sender: 'concierge',
        text: conciergeText,
        timestamp: new Date().toLocaleTimeString(),
        bounty: bounty,
      };
      setMessages(prev => [...prev, conciergeMessage]);
    }, 1000);
  };

  const handleAcceptBounty = (bountyId: string) => {
    setMessages(prev => prev.map(msg =>
      msg.bounty?.id === bountyId ? { ...msg, bountyAccepted: true } : msg
    ));
    const systemMessage: ChatMessage = {
      id: `system-${Date.now()}`,
      sender: 'system',
      text: 'Bounty accepted! Your Aetheria wallet will be credited upon completion. The concierge will now provide detailed instructions.',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PremiumGate isPremium={isPremium} featureName="Live Concierge">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Live Concierge</CardTitle>
        </CardHeader>
        <CardContent style={{ height: '400px', overflowY: 'auto' }}>
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  <p className="text-sm">{msg.text}</p>
                  {msg.bounty && (
                    <div className="mt-2 p-2 bg-gray-100 rounded">
                      <h4 className="font-bold">{msg.bounty.title}</h4>
                      <p>{msg.bounty.description}</p>
                      <p className="italic">Reward: {msg.bounty.reward}</p>
                      {!msg.bountyAccepted && (
                        <Button className="mt-2" onClick={() => handleAcceptBounty(msg.bounty!.id)}>Accept Bounty</Button>
                      )}
                    </div>
                  )}
                  {msg.bountyAccepted && <p className="text-xs text-green-500 mt-1">Bounty Accepted!</p>}
                  <p className="text-xs text-right mt-1 opacity-50">{msg.timestamp}</p>
                </div>
              </div>
            ))}
             <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSendMessage} className="flex w-full">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Chat with your concierge..."
              className="flex-grow"
            />
            <Button type="submit" className="ml-2">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </PremiumGate>
  );
};

export default LiveConcierge;
