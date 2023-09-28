import React from 'react';
import cookieImage from '../assets/CookiePic.png';

const cookieButtonStyle = {
  width: '100px',
  height: '100px',
  backgroundImage: `url(${cookieImage})`, // Use the imported cookieImage as the background
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
  border: 'none', // Remove the button border if desired
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center', // Center the button horizontally
  alignItems: 'center', // Center the button vertically
  height: '100%'
};

function CookieButton(props) {
  const handleClick = () => {
    // Call the parent's onClick function to update the score
    props.onClick();
  };

  return (
    <div style={containerStyle}>
      <button style={cookieButtonStyle} onClick={handleClick}></button>
    </div>
  );
}

export default CookieButton