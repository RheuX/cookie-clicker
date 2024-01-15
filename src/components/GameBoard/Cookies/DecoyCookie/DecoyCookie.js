import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from "../../../../store/scoreSlice";
import DecoyManager from "./DecoyManager";
import { getRandomType } from "./DecoyTypes";

function DecoyCookie(props) {
  const upgradeAmount = useSelector((state) => state.upgrade.value);
  const gameIsPaused = useSelector((state) => state.gameState.isPaused);
  const dispatch = useDispatch();
  const [decoyType, setDecoyType] = useState("Rotate");

  const onCorrectClick = () => {
    if (gameIsPaused) {
      return;
    }

    dispatch(incrementScore(upgradeAmount));
    setDecoyType(getRandomType());
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
      reverseDecoy={false}
    />
  );
}

export default DecoyCookie;
