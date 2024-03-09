// import DateCounter from "./DateCounter.tsx";
import { useEffect, useReducer } from "react";
import Header from "./Header.tsx";
import MainComponent from "./MainComponent.tsx";

const initialState = {
  questions: [],
  // 'loading' | 'ready' | 'error' | 'active' | 'finished'
  status: "loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, question: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="app">
      <Header />

      <MainComponent>
        <p>1/15</p>
        <p>Question?</p>
      </MainComponent>
    </div>
  );
}
