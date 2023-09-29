import React, { useState } from "react";
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
      var button = document.getElementById("cookie");
      var randomX = 0.15 + Math.random() * 0.6;
      var randomY = 0.1 + Math.random() * 0.8;
      randomX = randomX.toFixed(2);
      randomY = randomY.toFixed(2);

      console.log(randomX);
      button.style.top = randomX * 100 + "%";
      button.style.left = randomY * 100 + "%";

      console.log(button.style.top);
      setClickCount(0);
    }
    //====================================================

    props.incrementScore();
  };

  return (
    <button
      id="cookie"
      style={cookieButtonStyle}
      onClick={handleClick}
    ></button>
  );
}

export default CookieButton