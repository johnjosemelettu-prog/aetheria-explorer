import React from 'react';

const BountyBoard = () => {
  return (
    <div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-4">Local Challenges & Scavenger Hunts</h2>
        <p className="text-gray-400 mb-6">Complete tasks, share your discoveries, and earn rewards. Your privacy is paramount. Location data is anonymized, and personal information is never shared without your explicit consent.</p>
        
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-xl font-semibold text-white mb-4">Active Bounties</h3>
          {/* TODO: Implement bounty list. All user-generated content will be moderated and checked for privacy compliance. */}
          <div className="text-center py-8 px-4 border-2 border-dashed border-gray-600 rounded-lg">
            <p className="text-gray-500">No bounties available right now. Check back soon!</p>
            <p className="text-sm text-gray-600 mt-2">All submissions are processed securely.</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
          <h4 className="font-bold text-blue-300">Data Security Commitment</h4>
          <p className="text-blue-400 text-sm mt-1">We are committed to protecting your data. All challenge submissions are stored securely, and we employ end-to-end encryption for data transfer. For more details, please see our <a href="/privacy-policy" className="underline">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default BountyBoard;
