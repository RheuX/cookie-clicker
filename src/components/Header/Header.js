import React from 'react';
import './Header.css';
import LeftScoreBoard from './ScoreBoard/LeftScoreBoard';
import RightScoreBoard from './ScoreBoard/RightScoreBoard';

function Header() {
  return (
    <header className='header'>
      <LeftScoreBoard />
      <div className='title-container'>
        <h1>Cookie Cliker Game</h1>
        <p>Click the cookie, that's it</p>
      </div>
      <RightScoreBoard />
    </header>
  );
}

export default Header;