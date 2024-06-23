import { useQuiz } from "../context/QuizContext.tsx";

type StartScreenProps = {
  numberOfQuestions: number | undefined;
  dispatch: React.Dispatch<{ type: "start" }>;
};

export default function StartScreen() {

  const { numberOfQuestions, dispatch } : StartScreenProps = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to the React PopQuiz!</h2>
      <h3>
        {numberOfQuestions} questions to test your react + typescript mastery
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start Quiz
      </button>
    </div>
  );
}
