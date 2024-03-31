type ProgressProps = {
  index: number;
  totalQuestions: number | undefined;
  points: number;
  maxPoints: number;
  answer: number | undefined;
};

export default function Progress({
  index,
  totalQuestions,
  points,
  maxPoints,
  answer,
}: ProgressProps) {
  return (
    <header className="progress">
      <progress
        max={totalQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {totalQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}
