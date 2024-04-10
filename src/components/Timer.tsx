import { useEffect } from "react";
import { Action } from "./App.tsx";

type TimerProps = {
  dispatch: React.Dispatch<Action>;
  secondsRemaining: number;
};

export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
  useEffect(
    function () {
      setInterval(() => {
        dispatch({ type: "tick" });
      }, 1000);
    },
    [dispatch]
  );
  return <p className="timer">{secondsRemaining}</p>;
}
