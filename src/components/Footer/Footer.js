import React from "react";
import Row from "./Row";
import Cell from "./cell";
import Timer from "./Timer";
// import "./Footer.css";

function Footer(props) {
  const score = useSelector((state) => state.score.value);
  const goal = useSelector((state) => state.gameState.goal);
  
  return (
    <div className="display-cookie">
      <Row>
        <Cell><p>Your Cookies: {score}</p></Cell>
        <Cell><p>Goal: {goal}</p></Cell>
      </Row>

      <Row>
        <Cell><Timer/></Cell>
        <Cell><p>Best Time: 00:20.55</p></Cell>
      </Row>
    </div>
  );
}

export default Footer;
