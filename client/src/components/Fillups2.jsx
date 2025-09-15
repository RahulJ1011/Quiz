import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Fillups.css";
import ReactPlayer from "react-player";

function Fillups2() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState(() => {
    return localStorage.getItem("answer2") || ""; // 👈 different key for Q2
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    return parseInt(localStorage.getItem("timeLeft2")) || 180; // 👈 different key for Q2 timer
  });

  const viediosrc = "/viedos/Question 2.mp4"; // 👈 Change video for Q2

  // 🕒 Save answer in storage
  useEffect(() => {
    localStorage.setItem("answer2", answer);
  }, [answer]);

  // ⏲️ Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      goToNext();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const updated = prev - 1;
        localStorage.setItem("timeLeft2", updated); // 👈 save Q2 timer
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const goToNext = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }), // 👈 send Q2 answer
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit answer");
    } finally {
      // Clear only Fillup2 keys
      localStorage.removeItem("timeLeft2");
      localStorage.removeItem("answer2");
      navigate("/fillup3", { replace: true }); // 👈 next page
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <>
      <div className="timer-box">{formatTime(timeLeft)}</div>
      <div className="fillups">
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <ReactPlayer
            src={viediosrc}
            loop={false}
            width="650px"
            height="400px"
            controls={true}
          />
        </div>

        <div className="form-box">
          <h2>Question 2: Your answer?</h2>
          <input
            className="in"
            type="text"
            placeholder="Type your answer here"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={goToNext}>Next</button>
        </div>
      </div>
    </>
  );
}

export default Fillups2;
