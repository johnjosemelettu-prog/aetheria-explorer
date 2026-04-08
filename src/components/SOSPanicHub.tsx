import React, { useState } from 'react';

const SOSPanicHub = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
    // Real implementation would have a long-press timer
    alert('SOS Panic Alert Triggered! (This is a placeholder). In a real implementation, this would trigger GPS logging, silent contact alerts, and an audible siren.');
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <div className="fixed bottom-36 right-4 z-50">
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // To handle case where user drags cursor away while pressing
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 ${isPressed ? 'bg-red-700' : 'bg-red-500'}`}
        aria-label="SOS Panic Button"
      >
        <span className="text-xl font-bold text-white">SOS</span>
      </button>
    </div>
  );
};

export default SOSPanicHub;
