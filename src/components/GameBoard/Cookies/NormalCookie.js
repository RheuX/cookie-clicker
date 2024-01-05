import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from "../../../store/scoreSlice";
import { toggleActive, togglePause } from "../../../store/gameStateSlice";
import defaultCookieStyle from "./defaultCookie"

function NomralCookie(props) {
  const upgradeAmount = useSelector((state) => state.upgrade.value);
  const gameIsActive = useSelector((state) => state.gameState.isActive);
  const gameIsPaused = useSelector((state) => state.gameState.isPaused);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(incrementScore(upgradeAmount));

    if (!gameIsActive) {
      dispatch(toggleActive(upgradeAmount));
    }

    if (gameIsPaused) {
      dispatch(togglePause(upgradeAmount));
    }
  }

  return <button style={defaultCookieStyle} onClick={handleClick}></button>;
}

export default NomralCookie;
