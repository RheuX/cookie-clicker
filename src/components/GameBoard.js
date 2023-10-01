import React, { useState, useEffect } from "react";
import CookieButton from "./CookieButton";
import AutoFinger from "./FingerAutoClick";

const containerStyle = {
  display: "flex",
  justifyContent: "center", // Center the button horizontally
  alignItems: "center", // Center the button vertically
  minHeight: "60vh", // Ensure the container takes up the full viewport height
  maxHeight: "80vh",
  overflow: "hidden",
  "background-color": "grey",
  position: "relative",
};

const tempAddButton = {
  cursor: "pointer",
  position: "absolute",
  top: "90%",
  left: "90%",
};

function GameBoard(props) {
  const [cookieList, setCookieList] = useState([
    { id: 0, text: "Cookie 0" },
  ]);
  const [idCounter, setIdCounter] = useState(1);

  const addCookie = () => {
    const newCookie = {
      id: idCounter,
      text: `Cookie ${idCounter}`,
    };

    setIdCounter((idCounter) => idCounter + 1);

    // Use the spread operator to create a new array with the new item added
    setCookieList((cookieList) => [...cookieList, newCookie]);
  };

  useEffect(() => {
  const collisionInterval = setInterval(() => {
    if (props.isVisible) {
      const fingerElement = document.getElementById("AutoFinger");
      if (fingerElement) {
        const fingerRect = fingerElement.getBoundingClientRect();
        console.log(fingerRect);
        cookieList.forEach((cookie) => {
          const cookieRect = {
            left: cookie.left, // Replace with the actual property names from your cookie objects
            right: cookie.left + 100, // Adjust the width of your cookies
            top: cookie.top, // Replace with the actual property names from your cookie objects
            bottom: cookie.top + 100, // Adjust the height of your cookies
          };
          console.log(cookieRect);
          if (
            fingerRect.left < cookieRect.right &&
            fingerRect.right > cookieRect.left &&
            fingerRect.top < cookieRect.bottom &&
            fingerRect.bottom > cookieRect.top
          ) {
            // Collision detected, increment the score
            console.log("hit");
            //props.incrementScore();
            }
          });
        }
      }
    }, 1000); // Adjust the interval as needed
    return () => {
      clearInterval(collisionInterval); // Cleanup on component unmount
    };
  }, [props.isVisible, cookieList]);

  return (
    <div id="GameBoard" style={containerStyle}>
      <ul>
        {cookieList.map((cookie) => (
          <CookieButton
            key={cookie.id}
            className="CookieButton"
            text={cookie.text}
            incrementScore={props.incrementScore}
          />
        ))}
      </ul>
      {props.isVisible && <AutoFinger />}
      <button style={tempAddButton} onClick={addCookie}>
        Add Cookie
      </button>
    </div>
  );
}

export default GameBoard;
