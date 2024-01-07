import React, { useState, useEffect } from "react";
import getDecoyCookieType from "./DecoyTypes"

function DecoyManager({
  decoyType,
  defaultStyle,
  onCorrectClick,
  onDecoyClick,
}) {
  const [idCounter, setIdCounter] = useState(0);
  const [cookieList, setCookieList] = useState([]);
  const DecoyCookieType = getDecoyCookieType(decoyType);

  /****** add one cookie to the render list ******/
  const addCookie = (newDirAngle, newPos, is_real) => {
    // { id: 0, dir: [-1.0, -1.0], pos: ["10%", "15%"] },
    const newCookie = {
      id: idCounter,
      dir: [Math.cos(newDirAngle), Math.sin(newDirAngle)],
      pos: newPos,
      is_real: is_real,
    };

    setIdCounter((idCounter) => idCounter + 1);
    setCookieList((cookieList) => [...cookieList, newCookie]);
  };

  /****** remove the cookie with passed in ID ******/
  const removeCookie = (id) => {
    // Use filter to create a new array without the cookie with the given id
    setCookieList((cookieList) =>
      cookieList.filter((cookie) => cookie.id !== id)
    );
  };

  /****** re-create decoys ******/
  const createNewSetOfDecoy = () => {
    const randomAngle = Math.random() * 2 * Math.PI;
    var randomX = 0.15 + Math.random() * 0.6;
    var randomY = 0.1 + Math.random() * 0.8;
    const randomPosition = [randomX.toFixed(3), randomY.toFixed(3)];
    const decoy_amount = 5; //============================================ vary base on decoy type ========

    setCookieList([]); // remove all old cookies
    addCookie(randomAngle, randomPosition, true); // add only real cookie

    // add decoies
    const deltaAngle = (2 * Math.PI) / (1 + decoy_amount);
    // create decoy
    for (let i = 1; i <= decoy_amount; i++) {
      const decoyAngle = (randomAngle + i * deltaAngle) % (2 * Math.PI);

      addCookie(decoyAngle, randomPosition, false);
    }
  };

  const handleCorrectClick = () => {
    onCorrectClick(); // defined by parent component on score update
    createNewSetOfDecoy();
  };

  const handleDecoyClick = (id) => {
    onDecoyClick(); // defined by parent component on score update
    removeCookie(id); // remove clicked decoy
  };

  
  useEffect(() => {
    createNewSetOfDecoy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <ul>
      {cookieList.map((cookie) => (
        <DecoyCookieType
          key={cookie.id}
          is_real={cookie.is_real}
          direction={cookie.dir}
          position={cookie.pos}
          onCorrectClick={handleCorrectClick}
          onDecoyClick={() => handleDecoyClick(cookie.id)}
        />
      ))}
    </ul>
  );
}

export default DecoyManager;
