type OptionsProps = {
  question: {
    question: string;
    options: string[];
  };
};
export default function Options({ question }: OptionsProps) {
  return (
    <div className="options">
      {question.options.map((option) => (
        <button className="btn btn-option" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}
