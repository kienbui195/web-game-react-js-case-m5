/* eslint-disable react/jsx-key */
/* eslint-disable react/button-has-type */
import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./style.css";
import { questions } from "./questions";




function Quiz() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [mess, setMess] = useState('');

    const handleClick = (isCorrect) => {
        if (isCorrect) {
            setMess('Bạn đã trả lời đúng!')
            setScore(score + 10);
        }else {
            setMess('Bạn đã trả lời sai!')
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const userInfo = JSON.parse(localStorage.getItem('user'))
    console.log(userInfo, score);

    const updatePoint = async () => {
        const result = await axios.request({
            url: 'https://webgame395group.herokuapp.com/api/setpoint',
            method: 'POST',
            headers: {  "Content-Type": "application/json"  },
            data: JSON.stringify({
                email: `${userInfo.email}`,
                code: `${userInfo.code}`,
                point: `${score}`
            }),
        });

        return result;
    };

    const handleExit = () => {
        navigate("/dashboard")
        updatePoint()
            .then((res) => {
                if (res.data.type === 'success') {
                    navigate('/dashboard');
                } else {
                    setMess('Bạn cần phải login để lưu được điểm số!');
                    setTimeout(() => navigate('/login'), 2000);
                }
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <>
            {showScore ? (
                <div className="app">
                    <section className="question-section">
                        <h1>Chúc mừng bạn đã trả lời đúng {score/10} câu trong {questions.length} câu</h1>
                    </section>
                    <section className="choose-section">
                    <div>
                        <button onClick={()=>{window.location.reload()}} className="button">Chơi Lại</button>
                    </div>
                        <div>
                    <button onClick={handleExit} className="button">Thoát</button>
                        </div>
                    </section>
                </div>
            ) : (

               <>
                    <div className="app-score">
                        <selection className="showScore">Your score: {score}</selection>
                    </div>
                <div className="app">
                    <p style={{color:"white"}}>{mess}</p>
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