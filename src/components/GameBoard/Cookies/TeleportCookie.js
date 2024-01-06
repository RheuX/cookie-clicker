import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from "../../../store/scoreSlice";
import defaultCookieStyle from "./defaultCookie";

const diameter = 130 * 0.8 + "px";
const defaultStyle = {
  ...defaultCookieStyle,
  width: diameter,
  height: diameter,
};

function TeleportCookie(props) {
  const upgradeAmount = useSelector((state) => state.upgrade.value);
  const gameIsPaused = useSelector((state) => state.gameState.isPaused);
  const timer = useSelector((state) => state.timer.timer);
  const dispatch = useDispatch();
  const [clickCount, setClickCount] = useState(0);
  const [lastTpTime, setLastTpTime] = useState(0);
  const tpInterval = props.tpInterval || 2000.0;
  const max_click = props.max_click || 3;
  const cookieStyle = props.cookieStyle || defaultStyle;
  const localRef = useRef(null);
  const forwardRef = props.forwardRef;
  // pass ref to parent is provided forwardRef
  const buttonRef = typeof forwardRef === "undefined" ? localRef:forwardRef;

  /****** check teleport  ******/
  useEffect(() => {
    if (timer - lastTpTime > tpInterval) {
      teleport();
    } else if (clickCount >= max_click) {
      teleport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickCount, lastTpTime, timer, tpInterval]);

  /****** teleport  ******/
  const teleport = () => {
    var randomX = 0.15 + Math.random() * 0.6;
    var randomY = 0.1 + Math.random() * 0.8;
    randomX = randomX.toFixed(3);
    randomY = randomY.toFixed(3);

    buttonRef.current.style.top = randomX * 100 + "%";
    buttonRef.current.style.left = randomY * 100 + "%";

    setLastTpTime(timer);
    setClickCount(0);
    if (typeof props.onTeleport === "function") {
      // remind parent if it passed an onTeleport() function
      props.onTeleport();
    }
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
      style={cookieStyle}
      ref={buttonRef}
      onClick={handleClick}
    ></button>
  );
}

export default TeleportCookie;
