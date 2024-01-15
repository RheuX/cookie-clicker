import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MovingTpCookie from "../../MovingTpCookie";
import defaultCookieStyle from "../../defaultCookie";

const diameter = 130 * 0.5 + "px";
const realStyle = {
  ...defaultCookieStyle,
  width: diameter,
  height: diameter,
};

const decoyStyle = {
  ...realStyle,
};

function Rotate_Real({ direction, position, onClick }) {
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

function Rotate_Decoy({ direction, position, onClick }) {
  const timer = useSelector((state) => state.timer.timer);
  const [lastRotateTime, setLastRotateTime] = useState(timer);
  const [rotateFactor, setRotateFactor] = useState(1); // control rotate direction
  const buttonRef = useRef(null);
  const rotateSpeed = 60; // degree per second
  const rotateAngle = 6; // degree per rotate
  const timerUnit = 10; // mill-second

  // initial rotate direction
  useEffect(() => {
    if (direction[1] <= 0) {
      setRotateFactor(-1);
    }
  }, [direction]);

  /****** rotate cookie ******/
  const rotateCookie = () => {
    const currentTransform = buttonRef.current.style.transform;
    const currentRotation =
      currentTransform && currentTransform.includes("rotate")
        ? parseInt(currentTransform.match(/rotate\(([^)]+)\)/)[1], 10)
        : 0; // extract current transform

    const newRotation = (currentRotation + rotateAngle * rotateFactor) % 360;

    buttonRef.current.style.transform = `rotate(${newRotation}deg)`;
    setLastRotateTime(timer);
  };

  /***** monitor time and rotate the cookie ******/
  useEffect(() => {
    let rotateInterval = 1000 / timerUnit;
    rotateInterval = rotateInterval / (rotateSpeed / rotateAngle);

    if (timer - lastRotateTime > rotateInterval) {
      rotateCookie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const onChangeDirection = (newDirection) => {
    if (newDirection[1] <= 0) {
      setRotateFactor(-1);
    } else {
      setRotateFactor(1);
    }
  };

  return (
    <MovingTpCookie
      forwardRef={buttonRef}
      speed={0.6}
      cookieStyle={decoyStyle}
      direction={direction}
      position={position}
      onClick={onClick}
      onChangeDirection={onChangeDirection}
    />
  );
}

export { Rotate_Real, Rotate_Decoy };
