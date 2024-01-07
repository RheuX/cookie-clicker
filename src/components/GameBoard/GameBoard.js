import React, { useState } from "react";
import { useSelector } from "react-redux";
import NomralCookie from "./Cookies/NormalCookie";
import TeleportCookie from "./Cookies/TeleportCookie";
import MovingTpCookie from "./Cookies/MovingTpCookie";
import DecoyCookie from "./Cookies/DecoyCookie/DecoyCookie";
import DeadCookie from "./Cookies/DeadCookie";
import CelebrateCookie from "./Cookies/DeadCookie";

const gameboardStyle = {
  display: "flex",
  justifyContent: "center", // Center the button horizontally
  alignItems: "center", // Center the button vertically
  minHeight: "60vh", // Ensure the container takes up the full viewport height
  maxHeight: "80vh",
  overflow: "hidden",
  backgroundColor: "grey",
  position: "relative",
};

function GameBoard(props) {
  const [stage, setStage] = useState(0);
  const score = useSelector((state) => state.score.value);
  const goal = useSelector((state) => state.gameState.goal);

  /***** update game stage on score change ******/
  React.useEffect(() => {
    var newStage = Math.floor((score * 6) / goal);
    if (newStage > 4 && score < goal) {
      newStage = 4;
    }

    if (newStage > 5) {
      newStage = 5;
    }

    if (stage !== newStage) {
      setStage(newStage);
    }
  }, [goal, score, stage]);

  // return (
  //   <div id="GameBoard" style={gameboardStyle}>
  //     {stage === 0 && <NomralCookie />}
  //     {stage === 1 && <TeleportCookie />}
  //     {stage === 2 && <MovingTpCookie />}
  //     {stage === 3 && <MirageCookies />}
  //     {stage === 4 && <DeadCookie />}
  //     {stage === 5 && <CelebrateCookie />}
  //   </div>
  // );

  return (
    <div id="GameBoard" style={gameboardStyle}>
      {stage === 0 && <NomralCookie />}
      {stage === 1 && <TeleportCookie />}
      {stage > 1 && <MovingTpCookie />}
    </div>
  );
}

export default GameBoard;
