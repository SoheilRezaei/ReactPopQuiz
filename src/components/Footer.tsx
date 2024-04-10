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

export default function Footer({
  dispatch,
  answer,
  index,
  numberOfQuestions,
  secondsRemaining,
}: FooterProps) {
  return (
    <footer>
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        totalQuestions={numberOfQuestions}
      />
    </footer>
  );
}
