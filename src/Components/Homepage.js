// Import React and React Router navigation hook
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Enables navigation between routes

const Homepage = () => {
  const navigate = useNavigate(); // Initialize navigation function

  // Navigate to the Products page when button is clicked
  const handleExploreClick = () => {
    navigate("/Products");
  };

  return (
    <div style={{ display: 'flex', padding: '40px', flexWrap: 'wrap', fontFamily: 'Arial' }}>
      
      {/* Left section of the homepage */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          Crafting Precision,<br />Defining Style
        </h1>
        
        {/* Highlight expert team count */}
        <h2 style={{ color: '#fdd835', fontSize: '2rem' }}>50+</h2>
        <p style={{ marginTop: '-10px', marginBottom: '20px' }}>Watch Mod Experts</p>

        {/* Call-to-action button to view products */}
        <button
          onClick={handleExploreClick}
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

        {/* Promotional text */}
        <p style={{ marginTop: '20px', color: '#444' }}>
          Explore our custom Seiko mods, where precision meets elegance.
        </p>
      </div>

      {/* Right section with branding and team description */}
      <div style={{ flex: 1, minWidth: '300px', marginTop: '40px' }}>
        <div style={{
          backgroundColor: '#111',
          color: '#fff',
          padding: '30px',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          {/* Company logo */}
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
