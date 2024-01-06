import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGoal, toggleActive, togglePause } from "../store/gameStateSlice";
import { setScore } from "../store/scoreSlice";
import { incrementTimer, resetTimer } from "../store/timerSlice";
import Header from "./Header/Header";
import GameBoard from "./GameBoard/GameBoard";
import Footer from "./Footer/Footer";
import "./CookieClicker.css";

const INITIAL_GOAL = 30;
const COUNTING_INTERVAL = 10; // miliseconds

function CookieClicker() {
  //The goal for the game
  const goal = useSelector((state) => state.gameState.goal);
  const gameIsActive = useSelector((state) => state.gameState.isActive);
  const gameIsPaused = useSelector((state) => state.gameState.isPaused);
  const score = useSelector((state) => state.score.value);
  const dispatch = useDispatch();

  /***** active the game when page load ******/
  React.useEffect(() => {
    dispatch(setGoal(INITIAL_GOAL));
    dispatch(resetTimer());
    dispatch(setScore(0));

    if (!gameIsActive) {
      dispatch(toggleActive());
    }

    if (gameIsPaused) {
      dispatch(togglePause());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /***** check on gameover when score updated ******/
  React.useEffect(() => {
    if (!gameIsActive || gameIsPaused) {
      // game not-active or paused, don't check
      return;
    }

    // game is active and not-paused
    if (score >= goal) {
      dispatch(toggleActive());
      dispatch(togglePause());
    }
  }, [score, goal, gameIsActive, gameIsPaused, dispatch]);

  /***** Auto Update every 10 miliseconds on timer ******/
  React.useEffect(() => {
    let interval = null;

    if (gameIsActive && !gameIsPaused) {
      interval = setInterval(() => {
        dispatch(incrementTimer(COUNTING_INTERVAL));
      }, COUNTING_INTERVAL);
    } else {
      clearInterval(interval); // stop timer
    }

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, gameIsActive, gameIsPaused]);

  return (
    <div className="main-container">
      <Header />
      <GameBoard />
      <Footer />
    </div>
  );
}

export { COUNTING_INTERVAL };
export default CookieClicker;
