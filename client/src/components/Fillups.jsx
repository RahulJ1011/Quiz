import React, { useState } from "react";
import '../styles/Fillups.css';
import ReactPlayer from "react-player";
import viedio from '../assests/what.mp4';
const questions = [
    "What is your name?",
    "What is your email?",
    "What is your favorite color?",
    "What is your hobby?",
    "Where are you from?"
];

function Fillups() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(""));
    const handleChange = (e) => {
        const newAnswers = [...answers];
        newAnswers[step] = e.target.value;
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            alert("Form submitted!\n" + JSON.stringify(answers, null, 2));
        }
    };

    return (
        <div className="fillups">
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                {/* <ReactPlayer
                    url={viedio}
                    controls={true}
                    playing={false}
                    loop={false}
                    width="700px"
                    height="450px"
                /> */}
                <ReactPlayer
                    // src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                    src="https://www.youtube.com/watch?v=FOkezv5RZtA"
                    // style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                    loop={false}
                    width="650px"
                    height="400px"
                    // controls={true}
                />
            </div>
            <div className="form-box">
                <h2>{questions[step]}</h2>
                <input
                    type="text"
                    value={answers[step]}
                    onChange={handleChange}
                    placeholder="Type your answer here"
                />
                <button onClick={nextQuestion}>
                    {step === questions.length - 1 ? "Submit" : "Next"}
                </button>
            </div>
        </div>
    );
}

export default Fillups;
