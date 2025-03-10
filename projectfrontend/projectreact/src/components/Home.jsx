import React from 'react';

function Home() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#f4f4f4',
      height: '100vh'
    }}>
      <h1 style={{ color: '#333', fontSize: '36px' }}>Welcome to Project Pulse</h1>
      <p style={{ color: '#555', fontSize: '18px', marginBottom: '10px' }}>
        Manage Your Projects & Tasks Efficiently!
      </p>
      <img 
        src={`${process.env.PUBLIC_URL}/images/banner.png.webp`} 
        alt="Project Management Banner" 
        style={{
          width: '100%',
          maxWidth: '1000px',
          borderRadius: '20px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
        }} 
      />
    </div>
  );
}

export default Home;
