import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from "../../../../store/scoreSlice";
import DecoyManager from "./DecoyManager";
// import defaultCookieStyle from "./../defaultCookie";

// const diameter = 130 * 0.7 + "px";
// const defaultStyle = {
//   ...defaultCookieStyle,
//   width: diameter,
//   height: diameter,
// };

function DecoyCookie(props) {
  const upgradeAmount = useSelector((state) => state.upgrade.value);
  const gameIsPaused = useSelector((state) => state.gameState.isPaused);
  const dispatch = useDispatch();
  const decoyType = "Basic";

  const onCorrectClick = () => {
    if (gameIsPaused) {
      return;
    }

    dispatch(incrementScore(upgradeAmount));
  }
  
  const onDecoyClick = () => {
    if (gameIsPaused) {
      return;
    }

    dispatch(incrementScore(-1 * upgradeAmount)); // maybe change it to accumulate fraction of decrease
                                                  // need new function in score slice to save fractionial punishment and clear fractional punishment
  };

  return (
    <DecoyManager
      decoyType={decoyType}
      onCorrectClick={onCorrectClick}
      onDecoyClick={onDecoyClick}
    />
  );
}

export default DecoyCookie;
