import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from "../../../store/scoreSlice";
import defaultCookieStyle from "./defaultCookie";
import { COUNTING_INTERVAL } from "../../CookieClicker";

function TeleportCookie(props) {
  const upgradeAmount = useSelector((state) => state.upgrade.value);
  const gameIsPaused = useSelector((state) => state.gameState.isPaused);
  const timer = useSelector((state) => state.timer.timer);
  const dispatch = useDispatch();
  const [clickCount, setClickCount] = useState(0);
  const [lastTpTime, setLastTpTime] = useState(0);
  const tpInterval = 200.0 * COUNTING_INTERVAL; // 2000 mili-s
  const max_click = 3;
  const buttonRef = useRef(null);

  useEffect(() => {
    if (timer - lastTpTime > tpInterval) {
      teleport();
    } else if (clickCount >= max_click) {
      teleport();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickCount, lastTpTime, timer, tpInterval]);

  const teleport = () => {
    var randomX = 0.15 + Math.random() * 0.6;
    var randomY = 0.1 + Math.random() * 0.8;
    randomX = randomX.toFixed(3);
    randomY = randomY.toFixed(3);

    buttonRef.current.style.top = randomX * 100 + "%";
    buttonRef.current.style.left = randomY * 100 + "%";

    setLastTpTime(timer);
    setClickCount(0);
  };

  const handleClick = () => {
    if (gameIsPaused) {
      return;
    }
    setClickCount((clickCount) => clickCount + 1);
    dispatch(incrementScore(upgradeAmount));
  };

  return (
    <button
      style={defaultCookieStyle}
      ref={buttonRef}
      onClick={handleClick}
    ></button>
  );
}

export default TeleportCookie;
