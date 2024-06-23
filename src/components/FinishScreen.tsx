import { useQuiz } from "../context/QuizContext.tsx";

type FinishScreenProps = {
  points: number;
  maxPoints: number;
  highscore: number;
  dispatch: React.Dispatch<{ type: "restart" }>;
};

export default function FinishScreen() {

  const { points, maxPoints, highscore, dispatch } : FinishScreenProps = useQuiz();

  const precentage = (points / maxPoints) * 100;
  let emoji: string;
  if (precentage === 100) emoji = "🥇";
  if (precentage >= 80) emoji = "🥈";
  if (precentage >= 60) emoji = "🥉";
  if (precentage < 40) emoji = "💩";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You Scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(precentage)}%)
      </p>
      <p className="highscore">(highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
