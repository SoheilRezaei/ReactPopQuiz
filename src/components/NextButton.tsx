type NextButtonProps = {
  dispatch: React.Dispatch<{ type: "nextQuestion" | "finished" }>;
  answer: number | null;
  index: number;
  totalQuestions: number;
};
export default function NextButton({
  dispatch,
  answer,
  index,
  totalQuestions,
}: NextButtonProps) {
  if (answer === null) return null;

  if (index < totalQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === totalQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}
