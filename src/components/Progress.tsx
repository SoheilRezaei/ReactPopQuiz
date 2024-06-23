import { useQuiz } from "../context/QuizContext.tsx";

type ProgressProps = {
  index: number;
  numberOfQuestions: number;
  points: number;
  maxPoints: number;
  answer: number | undefined;
};

export default function Progress() {

  const {index, numberOfQuestions, points, maxPoints, answer} : ProgressProps = useQuiz();

  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
