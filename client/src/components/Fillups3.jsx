import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Fillups.css";
import ReactPlayer from "react-player";

function Fillups3() {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState(() => {
    return localStorage.getItem("answer3") || ""; // 👈 unique key for Q3
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    return parseInt(localStorage.getItem("timeLeft3")) || 240; // 👈 unique key for Q3 timer
  });

  const viediosrc = "/viedos/Question 3.mp4"; // 👈 Change to your Q3 video file

  // 🕒 Save answer in storage
  useEffect(() => {
    localStorage.setItem("answer3", answer);
  }, [answer]);

  // ⏲️ Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      goToNext(); // ⏩ Auto-redirect when timer ends
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const updated = prev - 1;
        localStorage.setItem("timeLeft3", updated); // 👈 save Q3 timer
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
        body: JSON.stringify({ answer }), // 👈 send Q3 answer
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit answer");
    } finally {
      // Clear only Fillup3 keys
      localStorage.removeItem("timeLeft3");
      localStorage.removeItem("answer3");
      navigate("/mcq", { replace: true }); // 👈 Next is MCQ
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
          <h2>Question 3: Your answer?</h2>
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

export default Fillups3;
