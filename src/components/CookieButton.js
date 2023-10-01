import React, { useState, useRef, useEffect } from "react";
import brownCookie from '../assets/Brown Cookie.png';

const cookieButtonStyle = {
  width: "100px",
  height: "100px",
  backgroundImage: `url(${brownCookie})`, // Use the imported cookieImage as the background
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "transparent",
  borderRadius: "25%",
  cursor: "pointer",
  border: "none", // Remove the button border if desired
  position: "absolute",
  top: "40%",
  left: "45%",
};

function CookieButton(props) {
  const [clickCount, setClickCount] = useState(0);
  const [timeCount, setTimeCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);
  const buttonRef = useRef(null); // Create a ref to hold a reference to the button element

  useEffect(() => {

    // track time passed since teleport
    if (props.stage === 1 || props.stage === 2 || props.stage === 3)
      setTimeCount((timeCount) => timeCount + 1);

    
    check_teleport();

    // moving
    if (props.stage === 2 || props.stage === 3)
    {
      let x = parseFloat(buttonRef.current.style.top.replace("%", ""));
      let y = parseFloat(buttonRef.current.style.left.replace("%", ""));
      const factor = 0.2;

      x += props.speed * props.dir[0] * factor;
      y += props.speed * props.dir[1] * factor;

      
      x = x.toFixed(3);
      y = y.toFixed(3);

      if (x < 15.0) x = 15.0;
      if (x > 75.0) x = 75.0;
      if (y < 10.0) y = 10.0;
      if (y > 90.0) y = 90.0;

      
      buttonRef.current.style.top = x + "%";
      buttonRef.current.style.left = y + "%";
    }
    
    console.log(
      timeCount + "stage: " + props.stage
    );
  }, [props.time]); // end of time update event =============================

  // check for if cookie should teleport 
  const check_teleport = () => {
    if (props.stage < 1 || props.stage > 3) {
      // no teleport on these stage
      return;
    }

    if (clickCount >= props.max_click || timeCount >= props.teleportInterval) {
      var randomX = 0.15 + Math.random() * 0.6;
      var randomY = 0.1 + Math.random() * 0.8;
      randomX = randomX.toFixed(3);
      randomY = randomY.toFixed(3);

      console.log(randomX);
      buttonRef.current.style.top = randomX * 100 + "%";
      buttonRef.current.style.left = randomY * 100 + "%";

      setClickCount(0);
      setTimeCount(0);
    }
  }

  const handleClick = () => {
    setClickCount((clickCount) => clickCount + 1);

    // Get a reference to the .flex-container element
    var gameBoard = document.getElementById("GameBoard");

    // Get the width and height of the .flex-container
    var containerWidth = gameBoard.offsetWidth;
    var containerHeight = gameBoard.offsetHeight;

    if (props.is_docoy === true) {
      props.incrementScore(false);
      props.removeCookie();
    } else {
      props.incrementScore();
      setClickCount((clickCount) => clickCount + 1);
      check_teleport();
    }
  };

  return (
    <button
      ref={buttonRef}
      style={cookieButtonStyle}
      onClick={handleClick}
    ></button>
  );
}

export default CookieButton