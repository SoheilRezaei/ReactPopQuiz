// import DateCounter from "./DateCounter.tsx";
import { useEffect, useReducer } from "react";
import Header from "./Header.tsx";
import MainComponent from "./MainComponent.tsx";
import Loader from "./Loader.tsx";
import StartScreen from "./StartScreen.tsx";
import ServerError from "./ServerError.tsx";
import Question from "./Question.tsx";
import NextButton from "./NextButton.tsx";
import Progress from "./Progress.tsx";
import FinishScreen from "./FinishScreen.tsx";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface State {
  questions: Question[] | undefined;
  status: "loading" | "ready" | "active" | "error" | "finished";
  index: number;
  answer: number | null;
  points: number;
  error: null | Error;
  highscore: number;
}

type dataReceived = { type: "dataReceived"; payload: Question[] };
type dataFailed = { type: "dataFailed"; payload: Error };
type newAnswer = { type: "newAnswer"; payload: number };
type start = { type: "start" };
type nextQuestion = { type: "nextQuestion" };
type finished = { type: "finished" };
type restart = { type: "restart" };

type Action =
  | dataReceived
  | dataFailed
  | start
  | newAnswer
  | nextQuestion
  | finished
  | restart;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  error: null,
  highscore: 0,
};
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error", error: action.payload };
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
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...state, points: 0, highscore: 0, index: 0, answer: null };
    default:
      throw new Error("Invalid action");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestions: number = questions?.length;
  const maxPoints: number = questions?.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

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
        {status === "error" && <ServerError />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              totalQuestions={numberOfQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions?.[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              totalQuestions={numberOfQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </MainComponent>
    </div>
  );
}
