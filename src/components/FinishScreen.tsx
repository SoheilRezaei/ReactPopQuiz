type FinishScreenProps = {
  points: number;
  maxPoints: number;
};

export default function FinishScreen({ points, maxPoints }: FinishScreenProps) {
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
      <p className="highscore">(highscore: X points)</p>
    </>
  );
}
