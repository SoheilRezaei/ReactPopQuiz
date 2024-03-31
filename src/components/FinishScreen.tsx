type FinishScreenProps = {
  points: number;
  maxPoints: number;
};

export default function FinishScreen({ points, maxPoints }: FinishScreenProps) {
  const precentage = (points / maxPoints) * 100;
  return (
    <p className="result">
      You Scored <strong>{points}</strong> out of {maxPoints} (
      {Math.ceil(precentage)}%)
    </p>
  );
}
