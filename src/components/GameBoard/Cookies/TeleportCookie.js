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
  const [lastTpTime, setLastTpTime] = useState(timer);
  const tpInterval = props.tpInterval || 2000.0;
  const max_click = props.max_click || 3;
  const cookieStyle = props.cookieStyle || defaultStyle;
  const localRef = useRef(null);
  const forwardRef = props.forwardRef;
  // pass ref to parent is provided forwardRef
  const buttonRef = typeof forwardRef === "undefined" ? localRef : forwardRef;

  /****** random teleport position ******/
  const getRandomPosition = () => {
    var randomX = 0.15 + Math.random() * 0.6;
    var randomY = 0.1 + Math.random() * 0.8;
    randomX = randomX.toFixed(3);
    randomY = randomY.toFixed(3);

    return [randomX, randomY];
  };

  /****** set initial position  ******/
  useEffect(() => {
    if (props.position) {
      // if given an initial position in props, use it as first position
      buttonRef.current.style.top = props.position[0] * 100 + "%";
      buttonRef.current.style.left = props.position[1] * 100 + "%";

      setLastTpTime(timer);
      setClickCount(0);
      console.log("cookie: ", props.position);
    } else {
      teleport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /****** check teleport  ******/
  useEffect(() => {
    if (timer - lastTpTime > tpInterval) {
      teleport();
    } else if (clickCount >= max_click) {
      teleport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickCount, timer]);

  /****** teleport  ******/
  const teleport = () => {
    console.log("timer : ", timer);
    console.log("cookie t- : ", buttonRef.current.style.top);
    console.log("cookie l-- : ", buttonRef.current.style.left);

    const randomPosition = getRandomPosition();
    buttonRef.current.style.top = randomPosition[0] * 100 + "%";
    buttonRef.current.style.left = randomPosition[1] * 100 + "%";

    setLastTpTime(timer);
    setClickCount(0);
    if (typeof props.onTeleport === "function") {
      // remind parent if it passed an onTeleport() function
      props.onTeleport();
    }
  };

  /****** onCLick handdler  ******/
  const handleClick = () => {
    if (gameIsPaused) {
      return;
    }

    if (typeof props.onClick === "function") {
      // remind parent if it passed an onClick() function
      props.onClick();
    } else {
      // onClick is null
      setClickCount((clickCount) => clickCount + 1);
      dispatch(incrementScore(upgradeAmount));
    }
  };

  return (
    <button style={cookieStyle} ref={buttonRef} onClick={handleClick}></button>
  );
}

export default TeleportCookie;
