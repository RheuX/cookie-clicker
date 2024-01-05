import React, { useState } from "react";
import CookieButton from "./CookieButton";

function Cookies(props) {
  return (
    <ul>
      {cookieList.map((cookie) => (
        <CookieButton
          key={cookie.id}
          className="CookieButton"
          removeFake={removeFake}
          removeCookie={() => removeCookie(cookie.id)}
          is_docoy={cookie.id !== 0}
          direction={cookie.dir}
          position={cookie.pos}

          stage={props.stage}
          lostGame={props.lostGame}
        />
      ))}
    </ul>
  );
}

export default Cookies;
