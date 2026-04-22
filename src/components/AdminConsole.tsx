import React, { useState } from 'react';
import UserManagement from './UserManagement';
import { Shield, Trophy, Users, ShieldAlert, PieChart, Sparkles, AlertTriangle, Palette, Briefcase, DollarSign, Flag, Settings, Megaphone } from 'lucide-react';

const AdminConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'bounty', name: 'Bounty Board', icon: Trophy },
    { id: 'heroes', name: 'Local Heroes', icon: Shield },
    { id: 'guilds', name: "Traveler's Guilds", icon: Users },
    { id: 'scams', name: 'Scam Alerts', icon: ShieldAlert },
    { id: 'analytics', name: 'Analytics', icon: PieChart },
    { id: 'ai-review', name: 'AI Performance', icon: Sparkles },
    { id: 'logs', name: 'System Logs', icon: AlertTriangle },
    { id: 'vibe-market', name: 'Vibe Market', icon: Palette },
    { id: 'partners', name: 'Partner Management', icon: Briefcase },
    { id: 'transactions', name: 'Transactions', icon: DollarSign },
    { id: 'feature-flags', name: 'Feature Flags', icon: Flag },
    { id: 'ai-config', name: 'AI Configuration', icon: Settings },
    { id: 'announcements', name: 'Announcements', icon: Megaphone },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      default:
        return (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-primary">Coming Soon</h2>
            <p className="text-gray-400">This feature is under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Admin Console</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-gray-800 rounded-lg p-4 sticky top-24">
              <h2 className="text-lg font-bold mb-4 text-white">Navigation</h2>
              <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                {tabs.map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0 lg:flex-shrink-1 ${
                      activeTab === tab.id 
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}>
                    <tab.icon className="w-5 h-5 shrink-0" />
                    <span className='truncate'>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="lg:w-3/4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminConsole;
