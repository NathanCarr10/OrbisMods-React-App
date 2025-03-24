import React from 'react';

const Homepage = () => {
  return (
    <div style={{ display: 'flex', padding: '40px', flexWrap: 'wrap', fontFamily: 'Arial' }}>
      
      {/* Left side */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          Crafting Precision,<br />Defining Style
        </h1>
        
        <h2 style={{ color: '#fdd835', fontSize: '2rem' }}>50+</h2>
        <p style={{ marginTop: '-10px', marginBottom: '20px' }}>Watch Mod Experts</p>

        {/* Avatar section – add images later*/}
        {/* <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          { <img src="C:\Users\joelj\OneDrive - Atlantic TU\YR3\Semester 2\Professional Practices IT\OrbisMods-React-App\public\OrbisLogo.JPG" alt="modder" width="50" style={{ borderRadius: '50%' }} /> }
        </div>*/}

        <button style={{
          backgroundColor: '#fdd835',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
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
