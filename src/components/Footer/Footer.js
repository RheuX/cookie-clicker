import React from "react";
import ScoreBoard from "../Header/ScoreBoard/ScoreBoard";
import CookieJar from "./CookieJar";
import UpgradeBoard from "./UpgradeBoard/UpgradeBoard";
import CookieMonster from "./CookieMonster";

const footerStyle = {
  position: "relative",
  display: "grid",
  flex: 1,
  gridTemplateColumns: "3fr 2fr",
  border: "2px solid black",
  backgroundColor: "#b97a57",
  borderRadius: "15px",
  margin: "0 20px",
};

function Footer(props) {
  return (
    <div style={footerStyle}>
      <CookieMonster />
      <CookieJar />
      <UpgradeBoard />
      
    </div>
  );
}

export default Footer;
