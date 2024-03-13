import Options from "./Options";

type QuestionProps = {
  question: {
    question: string;
    options: string[];
  };
};

export default function Question({ question }: QuestionProps) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
