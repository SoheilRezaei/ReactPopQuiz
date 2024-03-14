import Options from "./Options";

type QuestionProps = {
  question: {
    question: string;
    options: string[];
    correctOption: number;
  };
  dispatch: React.Dispatch<{ type: string }>;
  answer: number | null;
};

export default function Question({
  question,
  dispatch,
  answer,
}: QuestionProps) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
