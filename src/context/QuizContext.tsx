// creating context to refactor the code

import React, { createContext, useEffect, useReducer, useContext } from "react";

const QuizContext = createContext();

////////////////////////////////////////////////////////////////

interface Question {
    question: string;
    options: string[];
    correctOption: number;
    points: number;
}

interface QuizContext {
    questions: Question[] | undefined;
    status: "loading" | "ready" | "active" | "error" | "finished";
    index: number;
    answer: number | null;
    points: number;
    error: null | Error;
    highscore: number;
    secondsRemaining: number;
}

type dataReceived = { type: "dataReceived"; payload: Question[] };
type dataFailed = { type: "dataFailed"; payload: Error };
type newAnswer = { type: "newAnswer"; payload: number };
type start = { type: "start" };
type nextQuestion = { type: "nextQuestion" };
type finished = { type: "finished" };
type restart = { type: "restart" };
type tick = { type: "tick" };

export type Action =
    | dataReceived
    | dataFailed
    | start
    | newAnswer
    | nextQuestion
    | finished
    | restart
    | tick;

////////////////////////////////////////////////////////////////

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    error: null,
    highscore: 0,
    secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state: QuizContext, action: Action): QuizContext {
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error", error: action.payload };
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions
                    ? state.questions.length * SECS_PER_QUESTION
                    : 0,
            };
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
            return { ...initialState, questions: state.questions, status: "ready" };
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status,
            };
        default:
            throw new Error("Invalid action");
    }
}

function QuizProvider({children} : {children: React.ReactNode}) {
    const [
        {
            questions,
            status,
            index,
            answer,
            points,
            highscore,
            error,
            secondsRemaining,
        },
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
        <QuizContext.Provider value={{questions, status, index, answer, points, highscore, error, secondsRemaining, numberOfQuestions, maxPoints, dispatch}}>
            {children}
        </QuizContext.Provider>
    )
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
}

export { QuizProvider, useQuiz };