import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from "../../../store/scoreSlice";
import defaultCookieStyle from "./defaultCookie";
import brownCookie from "../../../assets/Cookie_R_01.png";
import deathCookie from "../../../assets/DeathCookie.png";

const diameter = 130 * 1.0 + "px";
const cookieStyle = {
  ...defaultCookieStyle,
  width: diameter,
  height: diameter,
};

function DeadCookie(props) {
  const timer = useSelector((state) => state.timer.timer);
  const upgradeAmount = useSelector((state) => state.upgrade.value);
  const gameIsPaused = useSelector((state) => state.gameState.isPaused);
  const deadCookieShowTime = 50;
  const [clickCount, setClickCount] = useState(0);
  const [deadCookie, setDeadCookie] = useState(-1);
  const [deadCookieTimer, setDeadCookieTimer] = useState(deadCookieShowTime);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

  const deadCookiePenalty = () => {
    // reset back to start score this satge
    // each reset make a crake on cookie jar
    // after 3 reset the jar break and lost game
    
    dispatch(incrementScore(- 2 * upgradeAmount));
  };

  /***** set first dead cookie ******/
  useEffect(() => {
    setDeadCookie(clickCount + Math.floor(Math.random() * 4) + 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /***** monitor time ******/
  useEffect(() => {
    if (deadCookieTimer >= 0) {
      setDeadCookieTimer((deadCookieTimer) => {
        if (deadCookieTimer === -1) return -1;
        if (deadCookieTimer === 0) {
          // current dead cookie expired, set next one
          buttonRef.current.style.backgroundImage = `url(${brownCookie})`;
          setDeadCookie(clickCount + Math.floor(Math.random() * 3) + 2);

          return -1;
        }

        return deadCookieTimer - 1;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  /******* Check Dead Cookie *******/
  const check_dead_cookie = () => {
    if (clickCount === deadCookie - 1) {
      // next cookie (right after current click) is the dead cookie
      buttonRef.current.style.backgroundImage = `url(${deathCookie})`;
      setDeadCookieTimer(deadCookieShowTime);
    }

    if (clickCount === deadCookie && deadCookieTimer > 0) {
      // current dead cookie trigerd, set next one
      deadCookiePenalty();
      // change assert back
      buttonRef.current.style.backgroundImage = `url(${brownCookie})`;
    }
  };

  const handleClick = () => {
    if (gameIsPaused) {
      return;
    }

    dispatch(incrementScore(upgradeAmount));
    setClickCount((clickCount) => clickCount + 1);
    check_dead_cookie();
  };

  return (
    <button style={cookieStyle} ref={buttonRef} onClick={handleClick}></button>
  );
}

export default DeadCookie;
