import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore } from "../../../store/scoreSlice";

function DecoyManager({
  decoyType,
  defaultStyle,
  onCorrectClick,
  onDecoyClick,
}) {
  const [idCounter, setIdCounter] = useState(0);
  const [cookieList, setCookieList] = useState([]);
  const decoy_amount = 5; // vary base on decot type -----------

  const addCookie = (newDir, newPos, is_real) => {
    // { id: 0, dir: [-1.0, -1.0], pos: ["10%", "15%"] },
    const newCookie = {
      id: idCounter,
      dir: newDir,
      pos: newPos,
      is_real: is_real,
    };

    setIdCounter((idCounter) => idCounter + 1);
    setCookieList((cookieList) => [...cookieList, newCookie]);
  };

  const removeCookie = (id) => {
    // Use filter to create a new array without the cookie with the given id
    setCookieList((cookieList) =>
      cookieList.filter((cookie) => cookie.id !== id)
    );
  };

  return <div />;
}

export default DecoyManager;
