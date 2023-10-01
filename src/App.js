import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import CookieDisplay from "./components/CookieDisplay";
import CookieJar from "./components/CookieJar";
import UpgradeButton from "./components/Upgrade";

function App() {
  //State for a managing the score
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState(0);

  //State for managing the upgrade increment
  const [upgrade, setUpgrade] = useState(1);

  //Stopwatch for the game
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [time_100ms, setTime_100ms] = useState(0);

  //The goal for the game
  const goal = 20;

  //State for the upgrade list for each button
  // Below is just to ignore the warning that `setUpgradeCost` is not being used
  // eslint-disable-next-line
  const [upgradeCosts, setUpgradeCosts] = useState([
    10, 250, 1000 /* Add more cost values as needed */,
  ]);

  // Create the upgradesList using the hardcoded costs
  const upgradesList = [
    { id: 1, label: "Click 1x", cost: `Cost: ${upgradeCosts[0]}`, upgrade: 1 },
    {
      id: 2,
      label: "Click 10x",
      cost: `Cost: ${upgradeCosts[1]}`,
      upgrade: 10,
    },
    {
      id: 3,
      label: "Click 100x",
      cost: `Cost: ${upgradeCosts[2]}`,
      upgrade: 100,
    },
    // Add more upgrade objects using upgradeCosts
    { id: 4, label: "Auto 1x", upgrade: 20 },
    { id: 5, label: "Auto 10x", upgrade: 100 },
    { id: 6, label: "Auto 100x", upgrade: 500 },
  ];

  //Auto Update every 10 miliseconds on timer
  React.useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
        if (time % 100 === 0) {
          setTime_100ms((time_100ms) => time_100ms + 1);
        }
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  React.useEffect(() => {
    var newStage = Math.floor((score * 6) / goal);
    if (newStage > 4 && score < goal) {
      newStage = 4;
    }

    if (newStage > 5) {
      newStage = 5;
    }

    if (stage != newStage) {
      setStage(newStage);
    }
  }, [score]);

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

  const incrementScore = (increment = true) => {
    //everytime you click, you get cookie
    startAndPause();
    if (increment) setScore(score + upgrade);
    else setScore(score - 1);
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

  const lostGame = () => {
    setScore(0);
  };

  return (
    <div className="main-container">
      <Header className="Header" />
      <GameBoard
        incrementScore={incrementScore}
        lostGame={lostGame}
        time={time_100ms}
        stage={stage}
      />
      <div className="display-container">
        <CookieJar score={score} goal={goal}></CookieJar>
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
