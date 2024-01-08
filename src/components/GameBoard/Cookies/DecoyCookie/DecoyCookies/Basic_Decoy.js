import React from "react";
import MovingTpCookie from "../../MovingTpCookie";
import defaultCookieStyle from "../../defaultCookie";
import Cookie_AmoungUS_left from "../../../../../assets/Cookie_AmoungUS_brown_left.png";
import Cookie_AmoungUS_right from "../../../../../assets/Cookie_AmoungUS_brown_right.png";

const diameter = 130 * 0.5 + "px";
let defaultStyle = {
  ...defaultCookieStyle,
  width: diameter,
  height: diameter,
  backgroundImage: `url(${Cookie_AmoungUS_left})`,
};

function Basic_Decoy({ direction, position, onClick }) {
  if (direction[1] > 0) {
    defaultStyle = {
      ...defaultStyle,
      backgroundImage: `url(${Cookie_AmoungUS_right})`,
    };
  }

  return (
    <MovingTpCookie
      speed={0.6}
      cookieStyle={defaultStyle}
      direction={direction}
      position={position}
      onClick={onClick}
    />
  );
}

export default Basic_Decoy;
