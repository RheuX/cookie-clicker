import React, { useState } from "react";
import CookieButton from "./CookieButton";

const containerStyle = {
  display: "flex",
  justifyContent: "center", // Center the button horizontally
  alignItems: "center", // Center the button vertically
  minHeight: "60vh", // Ensure the container takes up the full viewport height
  maxHeight: "80vh",
  overflow: "hidden",
  "background-color": "gray",
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
      <button style={tempAddButton} onClick={addCookie}>
        Add Cookie
      </button>
    </div>
  );
}

export default GameBoard;
