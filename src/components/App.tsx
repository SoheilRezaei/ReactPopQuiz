// import DateCounter from "./DateCounter.tsx";
import Header from "./Header.tsx";
import MainComponent from "./MainComponent.tsx";
import Loader from "./Loader.tsx";
import StartScreen from "./StartScreen.tsx";
import ServerError from "./ServerError.tsx";
import Question from "./Question.tsx";
import Footer from "./Footer.tsx";
import Progress from "./Progress.tsx";
import FinishScreen from "./FinishScreen.tsx";
import { useQuiz } from "../context/QuizContext.tsx";


export default function App() {

  const {status} = useQuiz();



  return (
    <div className="app">
      <Header />

      <MainComponent>
        {status === "loading" && <Loader />}
        {status === "error" && <ServerError />}
        {status === "ready" && (
          <StartScreen />
        )}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer />
          </>
        )}
        {status === "finished" && (
          <FinishScreen />
        )}
      </MainComponent>
    </div>
  );
}
