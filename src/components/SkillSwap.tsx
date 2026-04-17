import React from 'react';

const SkillSwap = () => {
  return (
    <div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-4">Learn & Teach</h2>
        <p className="text-gray-400 mb-6">Offer your skills or learn from others in the community. All interactions are protected by our data security and privacy principles.</p>

        {/* TODO: Implement skill matching and communication features. */}
        <div className="text-center py-12 px-4 border-2 border-dashed border-gray-600 rounded-lg">
          <p className="text-gray-500">The Skill Swap marketplace is currently under construction.</p>
          <p className="text-sm text-gray-600 mt-2">We are building a secure platform for peer-to-peer learning.</p>
        </div>

        <div className="mt-8 p-6 bg-purple-900/20 border border-purple-500 rounded-lg">
          <h4 className="font-bold text-purple-300 text-lg">Data Security & Your Rights in Skill Swap</h4>
          <p className="text-purple-400 text-sm mt-2">In line with our <a href="/privacy-policy" className="underline">Privacy Policy</a>, the Skill Swap feature is designed with your data security and legal rights as a priority. We are committed to the principles outlined in our policy, ensuring your data is handled with the utmost care.</p>
          <ul className="list-disc pl-5 text-purple-400 text-sm mt-3 space-y-2">
            <li><strong>Data Security (Section 4):</strong> We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. Access is strictly limited to those with a business need to know.</li>
            <li><strong>Purpose Limitation (Section 3):</strong> We will only use your personal data for the performance of the contract between us—that is, to operate the Skill Swap feature. Your data will not be used for other purposes without your consent.</li>
            <li><strong>Your Legal Rights (Section 5):</strong> We are building tools to help you exercise your rights over your data directly within the Skill Swap interface. This includes your right to:
              <ul className="list-circle pl-5 mt-2 space-y-1">
                <li>Request <strong>access</strong> to your personal data.</li>
                <li>Request <strong>correction</strong> of inaccurate data.</li>
                <li>Request <strong>erasure</strong> of your data.</li>
                <li><strong>Object to processing</strong> of your data.</li>
                <li>Request the <strong>transfer</strong> of your data.</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillSwap;
