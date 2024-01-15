import React from "react";
import MovingTpCookie from "../../MovingTpCookie";
import Cookie_AmongUS_left from "../../../../../assets/Cookie_AmoungUS_brown_left.png";
import Cookie_AmongUS_right from "../../../../../assets/Cookie_AmoungUS_brown_right.png";
import defaultCookieStyle from "../../defaultCookie";

const background_left = `url(${Cookie_AmongUS_left})`;
const background_right = `url(${Cookie_AmongUS_right})`;

const diameter = 130 * 0.5 + "px";
const realStyle = {
  ...defaultCookieStyle,
  width: diameter,
  height: diameter,
};

const decoyStyle = {
  ...realStyle,
  backgroundImage: background_left,
};

function AmongUs_Real({ direction, position, onClick }) {
  return (
    <MovingTpCookie
      speed={0.6}
      cookieStyle={realStyle}
      direction={direction}
      position={position}
      onClick={onClick}
    />
  );
}

function AmongUs_Decoy({ direction, position, onClick }) {
  let cookieStyle = decoyStyle;
  if (direction[1] > 0) {
    cookieStyle = {
      ...decoyStyle,
      backgroundImage: background_right,
    };
  }

  return (
    <MovingTpCookie
      speed={0.6}
      cookieStyle={cookieStyle}
      direction={direction}
      position={position}
      onClick={onClick}
      background_left={background_left}
      background_right={background_right}
    />
  );
}

export { AmongUs_Real, AmongUs_Decoy };
