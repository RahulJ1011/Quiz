import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Fillups.css";
import ReactPlayer from "react-player";

function Fillups1() {
  const navigate = useNavigate();
  const [name, setName] = useState(() => {
    return localStorage.getItem("name") || ""; // 👈 restore name from storage
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    return parseInt(localStorage.getItem("timeLeft")) || 180; // 👈 restore timer
  });

  const viediosrc = "/viedos/Question_no_1.mp4";

  // 🕒 Store changes in localStorage
  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    if (timeLeft <= 0) {
      goToNext();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const updated = prev - 1;
        localStorage.setItem("timeLeft", updated); // 👈 save timer each tick
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
        body: JSON.stringify({ name }), // 👈 sending input to backend
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit answer");
    } finally {
      // Clear storage after finishing first question
      localStorage.removeItem("timeLeft");
      localStorage.removeItem("name");
      navigate("/fillup2", { replace: true });
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
          <h2>What is your name?</h2>
          <input
            className="in"
            type="text"
            placeholder="Type your answer here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={goToNext}>Next</button>
        </div>
      </div>
    </>
  );
}

export default Fillups1;
