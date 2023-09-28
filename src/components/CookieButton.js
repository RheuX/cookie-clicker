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
  position: 'absolute', // Ensure proper z-index behavior
  zIndex: 1, // Adjust as needed to ensure it's above other elements
};

const containerStyle = {
  display: 'flex',
  minHeight: '60vh', // Ensure the container takes up the full viewport height
  maxHeight: '100vh',
  overflow: 'visible',
  position: 'relative'
};

function CookieButton(props) {
  const handleClick = () => {
    // Call the parent's onClick function to update the score
    props.onClick();
    console.log("Hi: ", cookiePosition);
  };

  const { cookiePosition } = props;
  const { cookieButtonRef } = props;

  return (
    <div id="myDiv" style={{ ...containerStyle }}>
      <button style={{...cookieButtonStyle, left: `${cookiePosition.x}px`, top: `${cookiePosition.y}px`}} onClick={handleClick} ref={cookieButtonRef}></button>
    </div>
  );
}

export default CookieButton