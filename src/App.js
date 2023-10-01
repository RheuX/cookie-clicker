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

  //Stopwatch for the game
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  //State for auto clicker
  const [autoClickerVisible, setAutoClickerVisible] = useState(false);

  //The goal for the game
  const goal = 100000;

  //State for the upgrade list for each button
  // Below is just to ignore the warning that `setUpgradeCost` is not being used
  // eslint-disable-next-line
  const [upgradeCosts, setUpgradeCosts] = useState([10, 250, 1000, 0, 250, 2000]);

  // Create the upgradesList using the hardcoded costs
  const upgradesList = [
    { id: 1, label: 'Click 1x', cost: `Cost: ${upgradeCosts[0]}`, upgrade: 1 },
    { id: 2, label: 'Click 10x', cost: `Cost: ${upgradeCosts[1]}`, upgrade: 10 },
    { id: 3, label: 'Click 100x', cost: `Cost: ${upgradeCosts[2]}`, upgrade: 100 },
    // Add more upgrade objects using upgradeCosts
    { id: 4, label: 'Auto 1x', cost: `Cost: ${upgradeCosts[3]}`, upgrade: 1},
    { id: 5, label: 'Auto 10x', cost: `Cost: ${upgradeCosts[4]}` },
    { id: 6, label: 'Auto 100x', cost: `Cost: ${upgradeCosts[5]}`},
  ];

  //Auto Update every 10 miliseconds on timer
  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } 
    else {
        clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  //Handle function to start
  const handleStart = () => {
      setIsActive(true);
      setIsPaused(false);
  };

  //Handle function to stop
  const handlePauseResume = () => {
      setIsPaused(!isPaused);
  };

  //function to control start and pause
  const startAndPause = () => {
    if(time === 0) {
      handleStart();
    }
    if(score + upgrade >= goal) {
      handlePauseResume();
    }
  }

  //Function to increment the score
  const incrementScore = () => { //everytime you click, you get cookie
    startAndPause();
    setScore(score + upgrade);
  }

  //function to update the manual upgrade features
  const manualUpgradeClick = (value, cost, id) => {
    setUpgrade(upgrade + value); //if id element is between 0-2
    setScore(score - cost);
    updateUpgrade(id);
  }

  //function to set autoclicker
  function enableAutoClicker() {
    setAutoClickerVisible(true); // Hide the auto-clicker finger
  }

  //function to spawn an auto finger features
  const autoUpgradeClick = (value, cost, id) => {
    enableAutoClicker();
    //setUpgrade(upgrade + value);
    setScore(score - cost);
    updateUpgrade(id);
  }

  //Function to handle the upgrade
  const handleUpgradeClick = (value, id) => {
    let cost = upgradeCosts[id];
    console.log('the button id: ', id)
    if(score < cost) { //if you dont have enough cookies, dont upgrade
      return;
    }
    //if you have enough cookie, upgrade
    if(id >= 0 && id <= 2) {
      manualUpgradeClick(value, cost, id);
    }
    else if(id >= 3 && id <= 5) {
      autoUpgradeClick(value, cost, id);
    }
  }

  const updateUpgrade = (id) => {
    upgradeCosts[id] = Math.ceil(upgradeCosts[id] * 1.8);
    console.log(id ,upgradeCosts[id]);
  }

  return (
    <div className="main-container">
      <Header className="Header" />
      <GameBoard incrementScore={incrementScore} isVisible={autoClickerVisible} />
      <div className="display-container">
        <div className="display-item">
          <CookieDisplay score={score} time={time} goal={goal}/>
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