// import DateCounter from "./DateCounter.tsx";
import { useEffect, useReducer } from "react";
import Header from "./Header.tsx";
import MainComponent from "./MainComponent.tsx";
import Loader from "./Loader.tsx";
import StartScreen from "./StartScreen.tsx";
import Error from "./Error.tsx";
import Question from "./Question.tsx";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface State {
  questions: Question[] | undefined;
  status: "loading" | "ready" | "active" | "error";
  index: number;
  answer: number | undefined;
  points: number;
}

type dataReceived = { type: "dataReceived"; payload: Question[] };
type dataFailed = { type: "dataFailed"; payload: Error };
type newAnswer = { type: "newAnswer"; payload: number };
type start = { type: "start" };

type Action = dataReceived | dataFailed | start | newAnswer;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: undefined,
  points: 0,
};
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer": {
      const question = state.questions?.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + (question?.points ?? 0)
            : state.points,
      };
    }
    default:
      return state;
  }
}

export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numberOfQuestions: number | undefined = questions?.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed", payload: err }));
  }, []);

  return (
    <div className="app">
      <Header />

      <MainComponent>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <Question
            question={questions?.[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </MainComponent>
    </div>
  );
}
