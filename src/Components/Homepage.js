import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate

const Homepage = () => {
  const navigate = useNavigate(); // Setup navigate

  const handleExploreClick = () => {
    navigate("/Products"); // Navigate to Products page
  };

  return (
    <div style={{ display: 'flex', padding: '40px', flexWrap: 'wrap', fontFamily: 'Arial' }}>
      
      {/* Left side */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          Crafting Precision,<br />Defining Style
        </h1>
        
        <h2 style={{ color: '#fdd835', fontSize: '2rem' }}>50+</h2>
        <p style={{ marginTop: '-10px', marginBottom: '20px' }}>Watch Mod Experts</p>

        <button
          onClick={handleExploreClick} // Attach handler
          style={{
            backgroundColor: '#fdd835',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Explore Our Collection →
        </button>

        <p style={{ marginTop: '20px', color: '#444' }}>
          Explore our custom Seiko mods, where precision meets elegance.
        </p>
      </div>

      {/* Right side */}
      <div style={{ flex: 1, minWidth: '300px', marginTop: '40px' }}>
        <div style={{
          backgroundColor: '#111',
          color: '#fff',
          padding: '30px',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <img src="OrbisLogo.png" alt="OrbisMods" width="500" style={{ marginBottom: '100px' }} />
          <h2>Our Watch Mod Team</h2>
          <p style={{ color: '#bbb' }}>
            Skilled artisans and enthusiasts creating custom Seiko mods with style and precision.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Homepage;
