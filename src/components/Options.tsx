import { useQuiz } from "../context/QuizContext.tsx";

type OptionsProps = {
  question: {
    question: string;
    options: string[];
    correctOption: number;
  };
  dispatch: React.Dispatch<{ type: string; payload: number }>;
  answer: number | null;
};
export default function Options({ question }) {
  const { dispatch, answer} : OptionsProps = useQuiz();
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
