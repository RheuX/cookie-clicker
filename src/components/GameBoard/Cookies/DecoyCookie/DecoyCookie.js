import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from "../../../store/scoreSlice";
import DecoyManager from "./DecoyCookies/DecoyManager";

const diameter = 130 * 0.7 + "px";
const defaultStyle = {
  ...defaultCookieStyle,
  width: diameter,
  height: diameter,
};

function DecoyCookie(props) {
  const upgradeAmount = useSelector((state) => state.upgrade.value);
  const gameIsPaused = useSelector((state) => state.gameState.isPaused);
  const [cookieList, setCookieList] = useState([
    { id: 0, dir: [-1.0, -1.0], pos: ["10%", "15%"] },
  ]);
  const [idCounter, setIdCounter] = useState(1);
  const decoy_amount = 5; // vary base on decot type
  const dispatch = useDispatch();

  const decoyCookiePenalty = () => {
    dispatch(incrementScore(-2 * upgradeAmount));
  };

  const addCookie = (id_offset, newDir, newPos) => {
    const newCookie = {
      id: idCounter + id_offset,
      dir: newDir,
      pos: newPos,
    };

    setIdCounter((idCounter) => idCounter + 1 + id_offset);

    // Use the spread operator to create a new array with the new item added
    setCookieList((cookieList) => [...cookieList, newCookie]);
  };

  const removeCookie = (id) => {
    // Use filter to create a new array without the cookie with the given id
    setCookieList((cookieList) =>
      cookieList.filter((cookie) => cookie.id !== id)
    );
  };

  /*** change logoic to triger -remove all- then create new set of cookies */
  // const removeFake = (dirAngle, cookie_position) => {
  //   // remove all fake
  //   setCookieList((cookieList) => cookieList.slice(0, 1));

  //   const deltaAngle = (2 * Math.PI) / (1 + decoy_amount);
  //   // create new decoys
  //   for (let i = 1; i <= decoy_amount; i++) {
  //     const decoyAngle = (dirAngle + i * deltaAngle) % (2 * Math.PI);

  //     addCookie(
  //       i,
  //       [Math.cos(decoyAngle), Math.sin(decoyAngle)],
  //       cookie_position
  //     );
  //   }
  // };

  return <DecoyManager cookieList={cookieList} decoyType={decoyType} />;
}

export default DecoyCookie;
