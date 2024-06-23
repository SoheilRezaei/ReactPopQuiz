import Options from "./Options";
import { useQuiz } from "../context/QuizContext.tsx";

type QuestionProps = {
  questions:  {
        question: string;
        options: string[];
        correctOption: number;
    };
  dispatch: React.Dispatch<{ type: string }>;
  answer: number | null;
};

export default function Question(){

  const {questions, index } : QuestionProps = useQuiz();
  const question = questions.at(index);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
