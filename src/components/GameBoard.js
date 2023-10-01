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
    { id: 0, dir: [-1.0, -1.0], pos: ["10%", "15%"] },
  ]);
  const [idCounter, setIdCounter] = useState(1);
  const decoy_amount = 5;

  const updateDir = (id, newDir) => {
    setCookieList((prevCookieList) => {
      // Create a new array by mapping over the previous 'cookieList'
      return prevCookieList.map((cookie) => {
        if (cookie.id === id) {
          // Update the 'dir' property for the specific item
          return { ...cookie, dir: newDir };
        }
        return cookie; // Return unchanged items
      });
    });
  };

  const addCookie = (id_offset, newDir, newPos) => {
    const newCookie = {
      id: idCounter + id_offset,
      dir: newDir,
      pos: newPos,
    };

    setIdCounter((idCounter) => idCounter + 1 + id_offset);

    // Use the spread operator to create a new array with the new item added
    setCookieList((cookieList) => [...cookieList, newCookie]);
  };

  const removeCookie = (id) => {
    // Use filter to create a new array without the cookie with the given id
    setCookieList((cookieList) =>
      cookieList.filter((cookie) => cookie.id !== id)
    );
  };

  const removeFake = (dirAngle, cookie_position) => {
    setCookieList((cookieList) => cookieList.slice(0, 1));

    console.log(
      "0: " + dirAngle
    );

    if (props.stage === 3) {
      const deltaAngle = (2 * Math.PI) / (1 + decoy_amount);
      // create decoy
      for (let i = 1; i <= decoy_amount; i++) {
        const decoyAngle = (dirAngle + i * deltaAngle) % (2 * Math.PI);
        
        addCookie(
          i,
          [Math.cos(decoyAngle), Math.sin(decoyAngle)],
          cookie_position
        );
      }
    }
  };

  return (
    <div id="GameBoard" style={containerStyle}>
      <ul>
        {cookieList.map((cookie) => (
          <CookieButton
            key={cookie.id}
            className="CookieButton"
            incrementScore={props.incrementScore}
            removeFake={removeFake}
            removeCookie={() => removeCookie(cookie.id)}
            is_docoy={cookie.id !== 0}
            time={props.time}
            stage={props.stage}
            direction={cookie.dir}
            position={cookie.pos}
          />
        ))}
      </ul>
      <button
        style={tempAddButton}
        onClick={() => addCookie(0, [1.0 - 1.0], ["10%", "20%"])}
      >
        Add Cookie
      </button>
    </div>
  );
}

export default GameBoard;
