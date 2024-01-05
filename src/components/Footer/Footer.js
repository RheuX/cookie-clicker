import React from "react";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import CookieJar from "./CookieJar";
import UpgradeBoard from "./UpgradeBoard/UpgradeBoard";

const footerStyle = {
  position: "relative",
  display: "grid",
  flex: 1,
  gridTemplateColumns: "1fr 1fr",
  border: "2px solid black",
  backgroundColor: "#b97a57",
  borderRadius: "10px",
  margin: "0 10px",
};

function Footer(props) {
  return (
    <div style={footerStyle}>
      <ScoreBoard />
      <CookieJar />
      <UpgradeBoard />
    </div>
  );
}

export default Footer;
