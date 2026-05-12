
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface Proposal {
  id: string;
  title: string;
  status: 'Active' | 'Passed' | 'Failed';
  votesFor: number;
  votesAgainst: number;
}

const mockDaoStatus = {
  treasury: 1234567,
  members: 15432,
  activeProposalsCount: 2,
};

const mockProposals: Proposal[] = [
  {
    id: 'p-01',
    title: 'Fund a "Clean the Beach" initiative in Bali',
    status: 'Active',
    votesFor: 1200,
    votesAgainst: 150,
  },
  {
    id: 'p-02',
    title: 'Increase rewards for the "Local Hero" program',
    status: 'Active',
    votesFor: 800,
    votesAgainst: 450,
  },
  {
    id: 'p-03',
    title: 'Partner with a sustainable travel gear company',
    status: 'Passed',
    votesFor: 2500,
    votesAgainst: 200,
  },
];

const AetheriaDAO: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
       <h1 className="text-3xl font-bold mb-2 text-center">Aetheria DAO</h1>
       <p className="text-center text-gray-500 mb-6">Governing the future of travel, together.</p>
      <Card className="mb-6">
        <CardHeader>
            <CardTitle>DAO Treasury & Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Treasury Value</h3>
                <p className="text-2xl font-bold">${mockDaoStatus.treasury.toLocaleString()}</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Members</h3>
                <p className="text-2xl font-bold">{mockDaoStatus.members.toLocaleString()}</p>
            </div>
             <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Active Proposals</h3>
                <p className="text-2xl font-bold">{mockDaoStatus.activeProposalsCount}</p>
            </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4 text-center">Community Proposals</h2>
      <div className="grid gap-6">
        {mockProposals.map((proposal) => {
          const totalVotes = proposal.votesFor + proposal.votesAgainst;
          const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;

          return (
            <Card key={proposal.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>{proposal.title}</CardTitle>
                    <Badge variant={proposal.status === 'Active' ? 'default' : proposal.status === 'Passed' ? 'secondary' : 'destructive'}>{proposal.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {proposal.status === 'Active' && (
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>For: {proposal.votesFor.toLocaleString()}</span>
                            <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
                        </div>
                        <Progress value={forPercentage} />
                    </div>
                )}
                {proposal.status !== 'Active' && (
                    <p className="text-sm text-gray-500">Voting has ended. Final tally: {proposal.votesFor.toLocaleString()} For, {proposal.votesAgainst.toLocaleString()} Against.</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Read Discussion</Button>
                {proposal.status === 'Active' && <Button>Cast Vote</Button>}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AetheriaDAO;
