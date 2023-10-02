import React from 'react';
import './CookieDisplay.css';

function CookieDisplay(props) {
  return (
    <div className='display-cookie'>
      <div className='row'>
        <div className='cell'>
          <p>Your Cookies: {props.score} </p>
        </div>
        <div className='cell'>
          <p>Goal: {props.goal}</p>
        </div>
      </div>
      <div className='row'>
        <div className='cell'>
          <p>Time:
            <span>
                {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
            </span>
            <span>
                {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
            </span>
            <span>
                {("0" + ((props.time / 10) % 100)).slice(-2)}
            </span>
          </p>
        </div>
        <div className='cell'>
          <p>Best Time: 00:20.55</p>
        </div>
      </div>
    </div>
  );
}

export default CookieDisplay