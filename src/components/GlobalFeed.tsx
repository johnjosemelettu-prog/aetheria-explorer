import React from 'react';

const GlobalFeed = () => {
  return (
    <div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-4">Share Your Adventures</h2>
        <p className="text-gray-400 mb-6">Connect with a global community of travelers. Share your stories, photos, and tips. Your privacy and safety are our top priorities.</p>

        {/* TODO: Implement social feed with posts. User data will be handled according to our privacy policy. */}
        <div className="text-center py-12 px-4 border-2 border-dashed border-gray-600 rounded-lg">
          <p className="text-gray-500">The Global Feed is launching soon! Get ready to share and discover.</p>
          <p className="text-sm text-gray-600 mt-2">All shared content will be subject to community guidelines and moderation to ensure a safe environment.</p>
        </div>

        <div className="mt-8 p-4 bg-green-900/20 border border-green-500 rounded-lg">
          <h4 className="font-bold text-green-300">Your Feed, Your Rules: Data Security on the Global Feed</h4>
          <p className="text-green-400 text-sm mt-2">We are building the Global Feed with your privacy in mind. You will have granular control over who sees your posts and what information you share. Key security features will include:</p>
          <ul className="list-disc pl-5 text-green-400 text-sm mt-2 space-y-1">
            <li><strong>Post Visibility Settings:</strong> Choose to share your posts with the public, your guilds, or only specific connections.</li>
            <li><strong>EXIF Data Stripping:</strong> We will automatically remove sensitive location data from uploaded photos to protect your privacy.</li>
            <li><strong>Content Moderation:</strong> Our team and AI-powered tools will work to keep the feed free of harmful or inappropriate content.</li>
            <li><strong>Data Portability:</strong> You will have the right to download your data at any time.</li>
          </ul>
          <p className="text-sm text-green-500 mt-3">For more details, please review our <a href="/privacy-policy" className="underline">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
