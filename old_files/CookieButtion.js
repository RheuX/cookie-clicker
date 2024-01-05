import React, { useState, useRef, useEffect } from "react";
import brownCookie from "../assets/Cookie_R_01.png";
import fakeCookie_0 from "../assets/Cookie_F_00.png";
import fakeCookie_1 from "../assets/Cookie_F_02.png";
import fakeCookie_2 from "../assets/Cookie_F_04.png";
import fakeCookie_3 from "../assets/Cookie_F_06.png";
import fakeCookie_4 from "../assets/Cookie_F_08.png";
import fakeCookie_5 from "../assets/Cookie_F_10.png";
import fakeCookie_6 from "../assets/Cookie_F_11.png";
import fakeCookie_7 from "../assets/Cookie_F_12.png";
import fakeCookie_8 from "../assets/Cookie_F_13.png";
import deathCookie from "../assets/DeathCookie.png";

const cookieButtonStyle = {
  width: "100px",
  height: "100px",
  backgroundImage: `url(${brownCookie})`, // Use the imported cookieImage as the background
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "transparent",
  borderRadius: "25%",
  cursor: "pointer",
  border: "none", // Remove the button border if desired
  position: "absolute",
  top: "40%",
  left: "45%",
};

const fakeCookies = [
  fakeCookie_0,
  fakeCookie_1,
  fakeCookie_2,
  fakeCookie_3,
  fakeCookie_4,
  fakeCookie_5,
  fakeCookie_6,
  fakeCookie_7,
  fakeCookie_8,
];

/******* Constent base on stage *******/
const speed = [0.0, 0.0, 1.0, 0.6, 0.0, 0.0];
const tpInterval = [100000.0, 200.0, 100.0, 250, 0.0, 0.0];
const max_click = [10000, 3, 3, 1, 100, 1];
const deadCookieShowTime = 50;
/******* Constent base on stage *******/

function CookieButton(props) {
  const [clickCount, setClickCount] = useState(0);
  const [timeCount, setTimeCount] = useState(0);
  const [direction, setDirection] = useState([1.0, 1.0]);
  const [dirAngle, setDirAngle] = useState(0.0);
  const [moved, setMoved] = useState(false);
  const [deadCookie, setDeadCookie] = useState(-1);
  const [deadCookieTimer, setDeadCookieTimer] = useState(deadCookieShowTime);
  const [isAmongUs, setIsAmongUs] = useState(false);
  const buttonRef = useRef(null); // Create a ref to hold a reference to the button element

  /******* Update Event base on stage *******/
  useEffect(() => {
    // track time passed since teleport
    if (props.stage === 1 || props.stage === 2 || props.stage === 3)
      setTimeCount((timeCount) => timeCount + 1);

    check_teleport();

    if (props.stage === 4) {
      if (deadCookieTimer >= 0) {
        setDeadCookieTimer((deadCookieTimer) => {
          if (deadCookieTimer === -1) return -1;
          if (deadCookieTimer === 0) {
            buttonRef.current.style.backgroundImage = `url(${brownCookie})`;
            setDeadCookie(clickCount + Math.floor(Math.random() * 3) + 2);

            return -1;
          }

          return deadCookieTimer - 1;
        });
      }
    }

    if (props.is_docoy && props.stage !== 3) {
      props.removeCookie();
    }

    if (props.stage === 3 && !moved) {
      buttonRef.current.style.top = props.position[0];
      buttonRef.current.style.left = props.position[1];

      setDirection(props.direction);
      if (props.is_docoy) {
        let index = Math.floor(Math.random() * 7);
        buttonRef.current.style.backgroundImage = `url(${fakeCookies[index]})`;
      }
    }

    // moving
    if (props.stage === 2 || props.stage === 3) {
      const top_border = [5.0, 80.0];
      const left_border = [1.0, 92.0];

      let x = parseFloat(buttonRef.current.style.top.replace("%", ""));
      let y = parseFloat(buttonRef.current.style.left.replace("%", ""));
      const factor = 0.2;

      var gameBoard = document.getElementById("GameBoard");
      var width_highet_ratio = gameBoard.offsetHeight / gameBoard.offsetWidth;

      x += speed[props.stage] * direction[0] * factor;
      y += speed[props.stage] * direction[1] * factor * width_highet_ratio;

      x = x.toFixed(3);
      y = y.toFixed(3);

      if (x < top_border[0]) x = top_border[0];
      if (x > top_border[1]) x = top_border[1];
      if (y < left_border[0]) y = left_border[0];
      if (y > left_border[1]) y = left_border[1];

      buttonRef.current.style.top = x + "%";
      buttonRef.current.style.left = y + "%";
      setMoved(true);
    }
  }, [props.time]);

  /******* Resize the Button base on stage *******/
  useEffect(() => {
    const sizeFactors = [1.0, 0.8, 0.7, 0.6, 1.0, 2.0];

    buttonRef.current.style.width = 130.0 * sizeFactors[props.stage] + "px";
    buttonRef.current.style.height = 130.0 * sizeFactors[props.stage] + "px";

    if (props.stage === 4) {
      buttonRef.current.style.top = "40%";
      buttonRef.current.style.left = "45%";

      setDeadCookie(clickCount + Math.floor(Math.random() * 4) + 3);
    }

    if (props.stage === 5) {
      buttonRef.current.style.backgroundImage = `url(${brownCookie})`;
    }
  }, [props.stage]);

  /******* Check Teleportation on stage 2 *******/
  const check_teleport = () => {
    if (props.stage < 1 || props.stage > 3) {
      // no teleport on these stage
      return;
    }

    if (
      clickCount >= max_click[props.stage] ||
      timeCount >= tpInterval[props.stage]
    ) {
      teleport();
    }
  };

  const teleport = () => {
    var randomX = 0.15 + Math.random() * 0.6;
    var randomY = 0.1 + Math.random() * 0.8;
    randomX = randomX.toFixed(3);
    randomY = randomY.toFixed(3);

    buttonRef.current.style.top = randomX * 100 + "%";
    buttonRef.current.style.left = randomY * 100 + "%";

    const randomAngle = Math.random() * 2 * Math.PI;

    setDirAngle(() => {
      const passIn = randomAngle;

      if (!props.is_docoy && clickCount >= max_click[props.stage]) {
        props.removeFake(passIn, [
          buttonRef.current.style.top,
          buttonRef.current.style.left,
        ]);
      }

      setDirection([Math.cos(randomAngle), Math.sin(randomAngle)]);

      if (props.is_docoy && isAmongUs) {
        let index = 7;
        if (Math.sin(randomAngle) > 0) {
          index = 8;
        }
        buttonRef.current.style.backgroundImage = `url(${fakeCookies[index]})`;
      }

      if (props.is_docoy && Math.floor(Math.random() * 10 < 2)) {
        setIsAmongUs(true);
      }

      return randomAngle;
    });

    setClickCount(0);
    setTimeCount(0);
  };

  /******* Check Teleportation on stage 6 *******/
  const check_dead_cookie = () => {
    if (clickCount === deadCookie - 1) {
      buttonRef.current.style.backgroundImage = `url(${deathCookie})`;

      setDeadCookieTimer(deadCookieShowTime);
    }

    if (clickCount === deadCookie && deadCookieTimer > 0) {
      props.lostGame();
      buttonRef.current.style.backgroundImage = `url(${brownCookie})`;
    }
  };

  const handleClick = () => {
    if (props.is_docoy === true) {
      props.incrementScore(false);
      props.removeCookie();
    } else if (props.stage === 5) {
      // game finished
    } else {
      props.incrementScore();
      setClickCount((clickCount) => clickCount + 1);
      check_teleport();
      check_dead_cookie();
    }
  };

  /******* buttonRef needed for stages that controls cookie *******/
  return (
    <button
      ref={buttonRef}
      style={cookieButtonStyle}
      onClick={handleClick}
    ></button>
  );
}

export default CookieButton;
