import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setScore } from "../../store/scoreSlice";
import Cookies from "./Cookies/Cookies";

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
  const [stage, setStage] = useState(0);

  // update game stage on score change
  React.useEffect(() => {
    var newStage = Math.floor((score * 6) / goal);
    if (newStage > 4 && score < goal) {
      newStage = 4;
    }

    if (newStage > 5) {
      newStage = 5;
    }

    if (stage != newStage) {
      setStage(newStage);
    }
  }, [score]);

  // reset score
  const lostGame = () => {
    useDispatch(setScore(0));
  };

  return (
    <div id="GameBoard" style={containerStyle}>
      <Cookies
        lostGame={lostGame}
        stage={stage}
      />
    </div>
  );
}

export default GameBoard;
