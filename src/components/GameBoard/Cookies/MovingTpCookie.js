import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import defaultCookieStyle from "./defaultCookie";
import TeleportCookie from "./TeleportCookie";

const diameter = 130 * 0.7 + "px";
const defaultStyle = {
  ...defaultCookieStyle,
  width: diameter,
  height: diameter,
};

function MovingTpCookie(props) {
  const timer = useSelector((state) => state.timer.timer);
  const speed = props.speed || 1.0;
  const cookieStyle = props.cookieStyle || defaultStyle;
  const localRef = useRef(null);
  const forwardRef = props.forwardRef;
  // pass ref to parent is provided forwardRef
  const buttonRef = typeof forwardRef === "undefined" ? localRef : forwardRef;

  const getRandomDirection = () => {
    const randomAngle = Math.random() * 2 * Math.PI;
    return [Math.cos(randomAngle), Math.sin(randomAngle)];
  };

  const [direction, setDirection] = useState(
    props.direction || getRandomDirection()
  );

  /***** move cookie ******/
  const moveCookie = () => {
    const top_border = [5.0, 80.0];
    const left_border = [1.0, 92.0];

    let x = parseFloat(buttonRef.current.style.top.replace("%", ""));
    let y = parseFloat(buttonRef.current.style.left.replace("%", ""));
    const factor = 0.2;

    var gameBoard = document.getElementById("GameBoard");
    var width_highet_ratio = gameBoard.offsetHeight / gameBoard.offsetWidth;

    x += speed * direction[0] * factor;
    y += speed * direction[1] * factor * width_highet_ratio;

    x = x.toFixed(3);
    y = y.toFixed(3);

    if (x < top_border[0]) x = top_border[0];
    if (x > top_border[1]) x = top_border[1];
    if (y < left_border[0]) y = left_border[0];
    if (y > left_border[1]) y = left_border[1];

    buttonRef.current.style.top = x + "%";
    buttonRef.current.style.left = y + "%";
  };

  /***** monitor time and move cookie ******/
  useEffect(() => {
    moveCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  /****** change background render when direction changes ******/
  useEffect(() => {
    if (direction[1] <= 0 && props.background_left) {
      buttonRef.current.style.backgroundImage = props.background_left;
      console.log("left");
    } else if (direction[1] > 0 && props.background_right) {
      buttonRef.current.style.backgroundImage = props.background_right;
      console.log("right");
    }
  }, [direction]);

  /****** onChangeDirection ******/
  const onChangeDirection = () => {
    if (typeof props.onChangeDirection === "function") {
      // remind parent if it passed an onTeleport() function
      props.onChangeDirection(direction);
    }
  };

  /***** randomnize direction ******/
  const changeDirection = () => {
    setDirection(getRandomDirection());
    onChangeDirection();
  };

  /***** onTeleport ******/
  const onTeleport = () => {
    if (typeof props.onTeleport === "function") {
      // remind parent if it passed an onTeleport() function
      props.onTeleport();
    }

    changeDirection(); // change direction after teleport
  };

  // if props didn't pass an onClick it will be null
  const onClick = props.onClick;
  return (
    <TeleportCookie
      position={props.position}
      forwardRef={buttonRef}
      cookieStyle={cookieStyle}
      onTeleport={onTeleport}
      onClick={onClick}
    />
  );
}

export default MovingTpCookie;
