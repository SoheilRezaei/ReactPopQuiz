// import DateCounter from "./DateCounter.tsx";
import { useEffect, useReducer } from "react";
import Header from "./Header.tsx";
import MainComponent from "./MainComponent.tsx";
import Loader from "./Loader.tsx";
import StartScreen from "./StartScreen.tsx";
import Error from "./Error.tsx";
import Question from "./Question.tsx";

interface State {
  questions: object[] | undefined;
  status: string;
  index: number;
}
type Action = {
  type: string;
  payload?: object[];
};

const initialState = {
  questions: [],
  // 'loading' | 'ready' | 'error' | 'active' | 'finished'
  status: "loading",
  // index of the current question
  index: 0,
};
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      return state;
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numberOfQuestions: number | undefined = questions?.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <MainComponent>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && <Question question={questions?.[index]} />}
      </MainComponent>
    </div>
  );
}
