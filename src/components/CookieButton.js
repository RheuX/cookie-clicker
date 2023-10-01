import React, { useState, useRef, useEffect } from "react";
import brownCookie from '../assets/Brown Cookie.png';
import redCookie from '../assets/Red Cookie.png';

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
  const [direction, setDirection] = useState([1.0, 1.0]);
  const [dirAngle, setDirAngle] = useState(0.0);
  const [moved, setMoved] = useState(false);
  const buttonRef = useRef(null); // Create a ref to hold a reference to the button element

  useEffect(() => {

    // track time passed since teleport
    if (props.stage === 1 || props.stage === 2 || props.stage === 3)
      setTimeCount((timeCount) => timeCount + 1);

    
    check_teleport();

    if (!moved && props.stage === 3) {
      buttonRef.current.style.top = props.position[0];
      buttonRef.current.style.left = props.position[1];

      setDirection(props.direction);
      if (props.is_docoy) {
        buttonRef.current.style.backgroundImage = `url(${redCookie})`;
      }
    }

    // moving
    if (props.stage === 2 || props.stage === 3)
    {
      const top_border = [5.0, 80.0];
      const left_border = [1.0, 92.0];

      let x = parseFloat(buttonRef.current.style.top.replace("%", ""));
      let y = parseFloat(buttonRef.current.style.left.replace("%", ""));
      const factor = 0.2;

      x += props.speed * direction[0] * factor;
      y += props.speed * direction[1] * factor;

      
      x = x.toFixed(3);
      y = y.toFixed(3);

      if (x < top_border[0]) x = top_border[0];
      if (x > top_border[1]) x = top_border[1];
      if (y < left_border[0]) y = left_border[0];
      if (y > left_border[1]) y = left_border[1];

      
      buttonRef.current.style.top = x + "%";
      buttonRef.current.style.left = y + "%";
      setMoved(true);
    }
    
  }, [props.time]); // end of time update event =============================

  useEffect(() => {
    const sizeFactors = [1.0, 0.8, 0.7, 0.6, 0.5, 0.4];

    buttonRef.current.style.width = 100.0 * sizeFactors[props.stage] + "px";
    buttonRef.current.style.height = 100.0 * sizeFactors[props.stage] + "px";
  }, [props.stage])

  // check for if cookie should teleport 
  const check_teleport = () => {
    if (props.stage < 1 || props.stage > 3) {
      // no teleport on these stage
      return;
    }

    if (clickCount >= props.max_click || timeCount >= props.teleportInterval) {
      teleport();
    }
  }

  const teleport = () => {
    var randomX = 0.15 + Math.random() * 0.6;
    var randomY = 0.1 + Math.random() * 0.8;
    randomX = randomX.toFixed(3);
    randomY = randomY.toFixed(3);

    //buttonRef.current.style.top = randomX * 100 + "%";
    //buttonRef.current.style.left = randomY * 100 + "%";
    buttonRef.current.style.top = "30%";
    buttonRef.current.style.left = "30%";

    const randomAngle = Math.random() * 2 * Math.PI;

    setDirAngle(randomAngle);
    setDirection([Math.cos(randomAngle), Math.sin(randomAngle)]);

    setClickCount(0);
    setTimeCount(0);
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

      props.removeFake(dirAngle, [
        buttonRef.current.style.top,
        buttonRef.current.style.left,
      ]);
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