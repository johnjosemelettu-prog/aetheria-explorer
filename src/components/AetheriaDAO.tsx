
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { GitCommit, Users, Landmark, TrendingUp, CheckCircle, XCircle, MinusCircle, Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Progress } from './ui/progress';

const AetheriaDAO = () => {
  const { t } = useTranslation();
  const [dao, setDao] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDAO = async () => {
      try {
        const data = await AI.getDAOStatus();
        setDao(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchDAO();
  }, []);

  const getStatusIcon = (status: string) => {
      switch(status){
          case "Voting Active": return <TrendingUp className="text-yellow-400"/>;
          case "Passed": return <CheckCircle className="text-green-400"/>;
          case "Failed": return <XCircle className="text-red-400"/>;
          default: return <MinusCircle className="text-gray-400"/>;
      }
  }

  if (loading || !dao) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"><Scale className="animate-pulse mb-4" size={48}/>{t('aetheriaDAO.loading')}</div>;
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-900 text-white min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
            <Scale className="mx-auto text-purple-400 mb-4" size={48}/>
            <h1 className="text-5xl font-bold mb-4">{t('aetheriaDAO.title')}</h1>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">{t('aetheriaDAO.description')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-500/50 flex flex-col items-center justify-center">
                <Landmark size={32} className="mb-3 text-purple-300"/>
                <h2 className="text-4xl font-bold">{dao.treasury.balance.toLocaleString()} ETH</h2>
                <p className="text-purple-300 flex items-center gap-1"><TrendingUp size={16}/> {dao.treasury.growth}% {t('aetheriaDAO.growth')}</p>
            </div>
             <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-500/50 flex flex-col items-center justify-center">
                <Users size={32} className="mb-3 text-purple-300"/>
                <h2 className="text-4xl font-bold">{dao.members.toLocaleString()}</h2>
                <p className="text-purple-300">{t('aetheriaDAO.members')}</p>
            </div>
             <div className="bg-purple-900/30 p-6 rounded-xl border border-purple-500/50 flex flex-col items-center justify-center">
                <GitCommit size={32} className="mb-3 text-purple-300"/>
                <h2 className="text-4xl font-bold">{dao.activeProposals}</h2>
                <p className="text-purple-300">{t('aetheriaDAO.activeProposals')}</p>
            </div>
        </div>

        <div>
            <h2 className="text-3xl font-bold mb-6">{t('aetheriaDAO.recentProposals')}</h2>
            <div className="space-y-4">
                {dao.recentProposals.map((proposal: any) => (
                    <motion.div key={proposal.id} layout className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs text-purple-400 font-mono">{proposal.id}</p>
                                <h3 className="font-bold text-lg">{proposal.title}</h3>
                                <p className="text-xs text-slate-400">{t('aetheriaDAO.proposer')}: <span className="font-mono">{proposal.proposer}</span></p>
                            </div>
                           <div className="flex items-center gap-2 text-sm font-semibold">
                                {getStatusIcon(proposal.status)}
                                <span>{proposal.status}</span>
                           </div>
                        </div>
                        {proposal.status === 'Voting Active' && (
                            <div className="mt-4">
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-green-400">{t('aetheriaDAO.for')}: {proposal.votes.for}</span>
                                    <span className="text-red-400">{t('aetheriaDAO.against')}: {proposal.votes.against}</span>
                                </div>
                                <Progress value={(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-red-500" />
                                <p className="text-right text-xs mt-1 text-slate-400">{t('aetheriaDAO.ends')} {proposal.ends}</p>
                            </div>
                        )}
                         <div className="mt-4 flex justify-end">
                            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300">
                                {proposal.status === 'Voting Active' ? t('aetheriaDAO.voteNow') : t('aetheriaDAO.viewDetails')}
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

      </motion.div>
    </div>
  );
};

export default AetheriaDAO;
