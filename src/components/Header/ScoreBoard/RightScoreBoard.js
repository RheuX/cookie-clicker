import React from "react";
import Row from "./Row";
import Cell from "./Cell";
import Timer from "./Timer";
import "./ScoreBoard.css";

function RightScoreBoard() {
	return (
		<div className="display-cookie">
			<Row>
			<Cell>
				<Timer />
			</Cell>
			<Cell>
				<p>Best Time: 00:20.55</p>
			</Cell>
			</Row>
		</div>
	);
}

export default RightScoreBoard;