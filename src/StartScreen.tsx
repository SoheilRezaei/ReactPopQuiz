type StartScreenProps = {
  numberOfQuestions: number;
};

export default function StartScreen({ numberOfQuestions }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to the React PopQuiz!</h2>
      <h3>
        {numberOfQuestions} questions to test your react + typescript mastery
      </h3>
      <button className="btn btn-ui">Start Quiz</button>
    </div>
  );
}
