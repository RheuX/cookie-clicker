import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from "../../../store/scoreSlice";
import defaultCookieStyle from "./defaultCookie";
import MovingTpCookie from "./MovingTpCookie";

const diameter = 130 * 0.7 + "px";
const defaultStyle = {
  ...defaultCookieStyle,
  width: diameter,
  height: diameter,
};

function Decoy_Basic({ id, is_docoy, removeCookie }) {
  const upgradeAmount = useSelector((state) => state.upgrade.value);
  const gameIsPaused = useSelector((state) => state.gameState.isPaused);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (gameIsPaused) {
      return;
    }

    if (is_docoy === true) {
      dispatch(incrementScore(-1 * upgradeAmount));
      removeCookie(id);
    } else {
      dispatch(incrementScore(upgradeAmount));
    }
  };

  return <div />;
}

export default Decoy_Basic;
