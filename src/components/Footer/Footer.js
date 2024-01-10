import React from "react";
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

// Wrap CookieMonster and CookieJar on something called CookieMonJar so that 
// - i can make that 100% based on the screen, and cookie monster can just follow that
// - now i have the size of the cookieMonster since the wrap is the cookieMonster, and now can change size based on the current wrap
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
