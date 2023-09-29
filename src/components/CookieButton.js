import React, { useState, useRef, useEffect } from "react";
import cookieImage from '../assets/CookiePic.png';

const cookieButtonStyle = {
  width: "100px",
  height: "100px",
  backgroundImage: `url(${cookieImage})`, // Use the imported cookieImage as the background
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  borderRadius: "50%",
  cursor: "pointer",
  border: "none", // Remove the button border if desired
  position: "absolute",
  top: "40%",
  left: "50%",
};

function CookieButton(props) {
  const [clickCount, setClickCount] = useState(0);
  const max_click = 1;
  const buttonRef = useRef(null); // Create a ref to hold a reference to the button element

  useEffect(() => {
    var randomX = 0.15 + Math.random() * 0.6;
    var randomY = 0.1 + Math.random() * 0.8;
    randomX = randomX.toFixed(2);
    randomY = randomY.toFixed(2);

    console.log(randomX);
    buttonRef.current.style.top = randomX * 100 + "%";
    buttonRef.current.style.left = randomY * 100 + "%";

    console.log(buttonRef.current.style.top);
    setClickCount(0);

    return () => {
    };
  }, []);

  // 
  const handleClick = () => {
    setClickCount((clickCount) => clickCount + 1);

    // Call the parent's onClick function to update the score

    // Get a reference to the .flex-container element
    var gameBoard = document.getElementById("GameBoard");

    // Get the width and height of the .flex-container
    var containerWidth = gameBoard.offsetWidth;
    var containerHeight = gameBoard.offsetHeight;

    // Log the dimensions (for example)
    console.log(
      "Container Width:",
      containerWidth,
      "Container Height:",
      containerHeight
    );

    //====================================================
    if (clickCount >= max_click) {
      var randomX = 0.15 + Math.random() * 0.6;
      var randomY = 0.1 + Math.random() * 0.8;
      randomX = randomX.toFixed(2);
      randomY = randomY.toFixed(2);

      console.log(randomX);
      buttonRef.current.style.top = randomX * 100 + "%";
      buttonRef.current.style.left = randomY * 100 + "%";

      console.log(buttonRef.current.style.top);
      setClickCount(0);
    }
    //====================================================

    props.incrementScore();
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