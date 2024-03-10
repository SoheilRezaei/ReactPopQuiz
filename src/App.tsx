// import DateCounter from "./DateCounter.tsx";
import { useEffect, useReducer } from "react";
import Header from "./Header.tsx";
import MainComponent from "./MainComponent.tsx";
import Loader from "./Loader.tsx";
import StartScreen from "./StartScreen.tsx";
import Error from "./Error.tsx";

interface State {
  questions: string[];
  status: string;
}
type Action = {
  type: string;
  payload?: string[];
};

const initialState = {
  questions: [],
  // 'loading' | 'ready' | 'error' | 'active' | 'finished'
  status: "loading",
};
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, question: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      return state;
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numberOfQuestions: number = questions.length;

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
          <StartScreen numberOfQuestions={numberOfQuestions} />
        )}
      </MainComponent>
    </div>
  );
}
