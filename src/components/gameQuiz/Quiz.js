import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import "./style.css";
import { questions } from "./questions";


function Quiz() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    return (
        <>
            {showScore ? (
                <div className="app">
                    <section className="question-section">
                        <h1>Chúc mừng bạn đã trả lời đúng {score} câu trong {questions.length} câu</h1>
                    </section>
                    <section className="answer-section">
                    <div>
                        <button onClick={()=>{window.location.reload()}} className="button">Chơi lại</button>
                    </div>
                    <button onClick={()=>{navigate("/dashboard")}} className="button">Thoát</button>
                    </section>
                </div>
            ) : (

               <>
                    <div className="app-score">
                        <selection className="showScore">Your score: {score}</selection>
                    </div>
                <div className="app">
                    <section className="question-section">
                        <h1>
                            Question {currentQuestion + 1}/{questions.length}
                        </h1>
                        <p>{questions[currentQuestion].questionText}</p>
                    </section>

                    <section className="answer-section">
                        {questions[currentQuestion].answerOptions.map((item) => (
                            <button className="button" onClick={() => handleClick(item.isCorrect)}>
                                {item.answerText}
                            </button>
                        ))}
                    </section>
                </div>
               </>
            )
            }

        </>
    );
}

export default Quiz;