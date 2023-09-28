import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import CookieButton from './components/CookieButton';
import CookieDisplay from './components/CookieDisplay';
import UpgradeButton from './components/Upgrade';

function App() {
  //State for a managing the score
  const [score, setScore] = useState(0);

  //State for managing the upgrade increment
  const [upgrade, setUpgrade] = useState(1);

  //State to keep track of the cookie button's position
  const [cookiePosition, setCookiePosition] = useState({x: 0, y: 0});

  //Create a ref to the cookie button to acces it s DOM element
  const cookieButtonRef = useRef(null);

  //Constant for cookie button width and height
  let COOKIE_HEIGHT = 100, COOKIE_WIDTH = 100;

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

  const myDiv = document.getElementById('myDiv');
  const divWidth = myDiv.offsetWidth; // Width of the element
  const divHeight = myDiv.offsetHeight; // Height of the element

  //one time effect
  /*
  useEffect(() => {
    //Constant for cookie button width and height
    const COOKIE_HEIGHT = 100, COOKIE_WIDTH = 100;
    
    const initialX = (divWidth - COOKIE_WIDTH) / 2;
    const initialY = (divHeight - COOKIE_HEIGHT) / 2;

    console.log("Div Dimension: ", divWidth, divHeight);
    console.log("Initial Dimension: ", initialX, initialY);

    setCookiePosition({ x: initialX, y: initialY });
  }, [myDiv]);

  //Update periodically everytime 5 seconds(?)
  useEffect(() => { 
    // Function to check if a collision occurs
    const checkCollision = (x, y) => {
      // Iterate through your array of cookie positions and check for collisions
      // You may need to adjust the collision logic based on the size of your cookies
      if (x < cookiePosition.x + COOKIE_WIDTH &&
          x + COOKIE_WIDTH > cookiePosition.x &&
          y < cookiePosition.y + COOKIE_HEIGHT &&
          y + COOKIE_HEIGHT > cookiePosition.y) {
        return true; // Collision detected
      }
      return false; // No collision
    }

    const intervalID = setInterval(() => {
      const maxX = window.innerWidth - COOKIE_WIDTH;
      const maxY = window.innerHeight - COOKIE_HEIGHT;

      console.log("Here are the dimension of the div cookie: ",maxX, maxY);

      let newX, newY;
      do {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
      } while (checkCollision(newX, newY))

      setCookiePosition({ x: newX, y:newY}); 
    }, 5000); // Change position every 5 seconds (adjust as needed)

    return () => clearInterval(intervalID); // Cleanup the interval on unmount
  }, [cookiePosition, COOKIE_HEIGHT, COOKIE_WIDTH]);
  */

  return (
    <div className='main-container'>
      <Header className="Header" />
      <CookieButton className="CookieButton" onClick={incrementScore} cookiePosition={cookiePosition} cookieButtonRef = {cookieButtonRef} />
      <div className="display-container">
        <div className="display-item">
          <CookieDisplay score={score} />
        </div>
        <div className="display-item">
          <UpgradeButton upgradesList={upgradesList} onUpgradeClick={handleUpgradeClick} />
        </div>
      </div>
    </div>
  );
}

export default App;