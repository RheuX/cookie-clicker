import React, { useState } from "react";
import CookieButton from "./CookieButton";

const containerStyle = {
  display: "flex",
  justifyContent: "center", // Center the button horizontally
  alignItems: "center", // Center the button vertically
  minHeight: "60vh", // Ensure the container takes up the full viewport height
  maxHeight: "80vh",
  overflow: "hidden",
  backgroundColor: "grey",
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

  const removeCookie = (id) => {
    // Use filter to create a new array without the cookie with the given id
    setCookieList((cookieList) =>
      cookieList.filter((cookie) => cookie.id !== id)
    );
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
            removeCookie={() => removeCookie(cookie.id)}
            stage={2}
            time={props.time}
            teleportInterval={100.0}
            speed={1.0}
            dir={[1.0, 1.0]}
            max_click={3}
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
