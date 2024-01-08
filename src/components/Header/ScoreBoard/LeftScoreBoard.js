import React from "react";
import Row from "./Row";
import Cell from "./Cell";
import { useSelector } from "react-redux";
import "./ScoreBoard.css";


function LeftScoreBoard() {
	const score = useSelector((state) => state.score.value);
	const goal = useSelector((state) => state.gameState.goal);
    
	return (
		<div className="display-cookie">
			<Row>
			<Cell>
				<p>Your Cookies: {score}</p>
			</Cell>
			<Cell>
				<p>Goal: {goal}</p>
			</Cell>
			</Row>
		</div>
	);
}

export default LeftScoreBoard;