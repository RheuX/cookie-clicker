import React from 'react';
import './CookieDisplay.css';

function CookieDisplay(props) {
  return (
    <>
    <div className='display-cookie'>
      <p>Your Cookies: {props.score}</p>
      <p>Time:</p>
    </div>
    </>
  );
}

export default CookieDisplay