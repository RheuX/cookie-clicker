import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import GameBoard from "./components/GameBoard";
import CookieDisplay from './components/CookieDisplay';
import UpgradeButton from './components/Upgrade';

function App() {
  //State for a managing the score
  const [score, setScore] = useState(0);

  //State for managing the upgrade increment
  const [upgrade, setUpgrade] = useState(1);

  //State for the upgrade list for each button
  // Below is just to ignore the warning that `setUpgradeCost` is not being used
  // eslint-disable-next-line
  const [upgradeCosts, setUpgradeCosts] = useState([10, 250, 1000, /* Add more cost values as needed */]);

  // Create the upgradesList using the hardcoded costs
  const upgradesList = [
    { id: 1, label: 'Click 1x', cost: `Cost: ${upgradeCosts[0]}`, upgrade: 1 },
    { id: 2, label: 'Click 10x', cost: `Cost: ${upgradeCosts[1]}`, upgrade: 10 },
    { id: 3, label: 'Click 100x', cost: `Cost: ${upgradeCosts[2]}`, upgrade: 100 },
    // Add more upgrade objects using upgradeCosts
    { id: 4, label: 'Auto 1x', upgrade: 20 },
    { id: 5, label: 'Auto 10x', upgrade: 100 },
    { id: 6, label: 'Auto 100x', upgrade: 500 },
  ];


  const incrementScore = () => { //everytime you click, you get cookie
    setScore(score + upgrade);
  }

  const handleUpgradeClick = (value, id) => {
    let cost = upgradeCosts[id];
    if(score >= cost) { //if you have enough cookie, upgrade
      setUpgrade(upgrade + value);
      setScore(score - cost);
      updateUpgrade(id);
    }
  }

  const updateUpgrade = (id) => {
    upgradeCosts[id] = Math.ceil(upgradeCosts[id] * 1.8);
    console.log(id ,upgradeCosts[id]);
  }

  return (
    <div className="main-container">
      <Header className="Header" />
      <GameBoard incrementScore={incrementScore} />
      <div className="display-container">
        <div className="display-item">
          <CookieDisplay score={score} />
        </div>
        <div className="display-item">
          <UpgradeButton
            upgradesList={upgradesList}
            onUpgradeClick={handleUpgradeClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;