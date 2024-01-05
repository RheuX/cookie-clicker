import React from "react";

function Timer(props) {
  const timer = useSelector((state) => state.timer.timer);
  const minute = ("0" + Math.floor((timer / 60000) % 60)).slice(-2);
  const second = ("0" + Math.floor((timer / 1000) % 60)).slice(-2);
  const centisecond = ("0" + ((timer / 10) % 100)).slice(-2);
  return (
    <p>
      Time:
      <span>{minute}:</span>
      <span>{second}.</span>
      <span>{centisecond}</span>
    </p>
  );
}

export default Timer;
