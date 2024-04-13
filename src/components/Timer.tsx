import { useEffect } from "react";
import { Action } from "./App.tsx";

type TimerProps = {
  dispatch: React.Dispatch<Action>;
  secondsRemaining: number;
};

export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const interval = setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(interval);
    },
    [dispatch]
  );
  return (
    <p className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </p>
  );
}
