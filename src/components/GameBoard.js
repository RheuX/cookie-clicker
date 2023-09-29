import React from "react";
import CookieButton from "./CookieButton";

const containerStyle = {
  display: "flex",
  justifyContent: "center", // Center the button horizontally
  alignItems: "center", // Center the button vertically
  minHeight: "60vh", // Ensure the container takes up the full viewport height
  maxHeight: "100vh",
};

function GameBoard(props) {
  return (
    <div style={containerStyle}>
      <CookieButton
        className="CookieButton"
        incrementScore={props.incrementScore}
      />
    </div>
  );
}

export default GameBoard;
