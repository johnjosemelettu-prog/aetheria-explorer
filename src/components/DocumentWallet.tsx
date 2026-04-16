import React from 'react';

const DocumentWallet = () => {
  // Mock data for documents
  const documents = [
    { id: 1, type: 'Passport', name: 'John Doe', expiry: '2030-01-01', status: 'Valid' },
    { id: 2, type: 'Visa', name: 'Schengen Area', expiry: '2025-06-15', status: 'Valid' },
    { id: 3, type: 'Ticket', name: 'Flight to Paris (CDG)', details: 'UA-123, Seat 24A', status: 'Active' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Document Wallet</h1>
      <p className="mb-4 text-gray-600">A secure digital vault for your passports, visas, and tickets.</p>
      <div className="space-y-4">
        {documents.map(doc => (
          <div key={doc.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{doc.type}</h2>
                <p className="text-gray-500">{doc.name}</p>
                {doc.details && <p className="text-gray-500 text-sm">{doc.details}</p>}
              </div>
              <div>
                <span 
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${ 
                    doc.status === 'Valid' || doc.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' 
                  }`}>
                  {doc.status}
                </span>
              </div>
            </div>
            {doc.expiry && <p className="mt-2 text-sm text-gray-600">Expires: {doc.expiry}</p>}
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
          + Add Document
        </button>
      </div>
    </div>
  );
};

export default DocumentWallet;
