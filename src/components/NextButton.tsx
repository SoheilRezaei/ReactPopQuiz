import { useQuiz } from "../context/QuizContext.tsx";

type NextButtonProps = {
  dispatch: React.Dispatch<{ type: "nextQuestion" | "finished" }>;
  answer: number | null;
  index: number;
  numberOfQuestions: number;
};
export default function NextButton() {

  const {dispatch, answer, index, numberOfQuestions} : NextButtonProps = useQuiz();

  if (answer === null) return null;

  if (index < numberOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numberOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}
