import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";

import "./CookieClicker.css";

function CookieClicker() {
  //The goal for the game
  const goal = 100000;
  const gameIsActive = useSelector((state) => state.gameState.value);
  const score = useSelector((state) => state.score.value);
  const dispatch = useDispatch();


  //Auto Update every 10 miliseconds on timer
  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
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

  const startAndPause = () => {
    if (time === 0) {
      handleStart();
    }
    if (score + upgrade >= goal) {
      handlePauseResume();
    }
  };

  const incrementScore = () => {
    //everytime you click, you get cookie
    startAndPause();
    setScore(score + upgrade);
  };

  const handleUpgradeClick = (value, id) => {
    let cost = upgradeCosts[id];
    if (score >= cost) {
      //if you have enough cookie, upgrade
      setUpgrade(upgrade + value);
      setScore(score - cost);
      updateUpgrade(id);
    }
  };

  const updateUpgrade = (id) => {
    upgradeCosts[id] = Math.ceil(upgradeCosts[id] * 1.8);
    console.log(id, upgradeCosts[id]);
  };

  return (
    <div className="main-container">
      <Header className="Header" />
      <GameBoard incrementScore={incrementScore} />
      <div className="display-container">
        <div className="display-item">
          <CookieDisplay score={score} time={time} goal={goal} />
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
