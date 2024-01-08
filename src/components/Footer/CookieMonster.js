import React from "react";
import cookie_monster_580x230_0 from '../../assets/cookie-monster-58x23-0.png';
import cookie_monster_580x230_1 from '../../assets/cookie-monster-58x23-1.png';

const cookieMonsterContainer = {
    width: "100%", // Set width to 100% to take up available space
    height: "100%", // Set height to 100% to take up available space
    display: "flex",
    margin: "0 10px",
  };


function CookieMonster() {
    return (
        <div style={cookieMonsterContainer}>
            <img src={cookie_monster_580x230_0} alt="CookieMonster_closeMouth" />
        </div>
    );
}

export default CookieMonster;