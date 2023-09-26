import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CookieButton from './components/CookieButton';
import CookieDisplay from './components/CookieDisplay';
import UpgradeButton from './components/Upgrade';

function App() {
  const [score, setScore] = useState(0);
  const [upgrade, setUpgrade] = useState(1);

  const incrementScore = () => {
    setScore(score + upgrade);
  }

  const handleUpgradeClick = (value) => {
    setUpgrade(upgrade + value);
  }

  return (
    <div className='main-container'>
      <Header className="Header" />
      <CookieButton className="CookieButton" onClick={incrementScore} />
      <div className="display-container">
        <div className="display-item">
          <CookieDisplay score={score} />
        </div>
        <div className="display-item">
          <UpgradeButton onUpgradeClick={handleUpgradeClick} />
        </div>
      </div>
    </div>
  );
}

export default App;