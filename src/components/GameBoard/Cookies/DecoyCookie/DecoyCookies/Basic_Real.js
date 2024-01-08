import React from "react";
import MovingTpCookie from "../../MovingTpCookie";
import defaultCookieStyle from "../../defaultCookie";

const diameter = 130 * 0.5 + "px";
const defaultStyle = {
  ...defaultCookieStyle,
  width: diameter,
  height: diameter,
};

function Basic_Real({ direction, position, onClick }) {
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

export default Basic_Real;