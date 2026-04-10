
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';

const UniversalTicketAggregator = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, you'd connect to the user's email via OAuth
      const userEmail = "explorer@aetheria.so";
      const results = await AI.importTicketsFromEmail(userEmail);
      setTickets(results);
    } catch (err) {
      setError("Failed to import tickets. Please check your connection.");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">Universal Ticket Aggregator</h1>
      <p className="text-center text-gray-400 mb-8">All your travel tickets, automatically organized.</p>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
            <Button onClick={fetchTickets} disabled={loading}>
                {loading ? 'Scanning Email...' : 'Refresh Tickets'}
            </Button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-6">
          {tickets.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((ticket, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-sm font-bold">{new Date(ticket.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-2xl font-bold">{new Date(ticket.date).getDate()}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{ticket.type}: {ticket.details.from} to {ticket.details.to}</h2>
                <p className="text-gray-400">{ticket.details.confirmation_number}</p>
                <p className="text-sm text-gray-500">Provider: {ticket.provider}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversalTicketAggregator;
