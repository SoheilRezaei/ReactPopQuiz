type NextButtonProps = {
  dispatch: React.Dispatch<{ type: "nextQuestion" }>;
  answer: number | null;
};
export default function NextButton({ dispatch, answer }: NextButtonProps) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}
