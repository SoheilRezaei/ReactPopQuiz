import NextButton from "./NextButton.tsx";
import Timer from "./Timer.tsx";
import { Action } from "./App.tsx";

type FooterProps = {
  dispatch: React.Dispatch<Action>;
  answer: number | null;
  index: number;
  numberOfQuestions: number;
  secondsRemaining: number;
};

export default function Footer(){

  return (
    <footer>
      <Timer />
      <NextButton />
    </footer>
  );
}
