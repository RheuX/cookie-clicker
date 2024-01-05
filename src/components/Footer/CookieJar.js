import React from "react";
import Jar_0 from "../assets/Jar_0.png";
import Jar_1 from "../assets/Jar_1.png";
import Jar_2 from "../assets/Jar_2.png";
import Jar_3 from "../assets/Jar_3.png";
import Jar_4 from "../assets/Jar_4.png";
import Jar_5 from "../assets/Jar_5.png";
import Jar_6 from "../assets/Jar_6.png";
import Jar_7 from "../assets/Jar_7.png";

const cookieJarStyle = {
  width: "100px",
  height: "100px",
  position: "absolute",
  top: "25%",
  left: "22%",
};

function CookieJar(props) {
  const score = props.score;
  const goal = props.goal;
  const image_src = [Jar_0, Jar_1, Jar_2, Jar_3, Jar_4, Jar_5, Jar_6, Jar_7];

  let index = parseInt((8 * score) / goal);

  if (index < 0) index = 0;
  else if (index > 7) index = 7;

  return (
    <img src={image_src[index]} alt="Cookie Jar" style={cookieJarStyle}></img>
  );
}

export default CookieJar;
