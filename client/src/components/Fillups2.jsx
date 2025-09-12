import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Fillups.css";
import ReactPlayer from "react-player";

function Fillups2() {
    const navigate = useNavigate();

    const goToNext = () => {
        navigate("/mcq", { replace: true }); // 👈 navigates to Fillup1 page
    };

    return (
        <div className="fillups">
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <ReactPlayer
                    src="https://www.youtube.com/watch?v=FOkezv5RZtA"
                    loop={false}
                    width="650px"
                    height="400px"
                    controls={true}
                />
            </div>

            <div className="form-box">
                <h2>What is your name?</h2>
                <input type="text" placeholder="Type your answer here" />
                <button onClick={goToNext}>Next</button>
            </div>
        </div>
    );
}

export default Fillups2;
