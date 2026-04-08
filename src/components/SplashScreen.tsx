import React from 'react';

const SplashScreen = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#000'
    }}>
      <img src="/logo.png" alt="Aetheria Logo" style={{ width: '200px', height: '200px' }} />
    </div>
  );
};

export default SplashScreen;
