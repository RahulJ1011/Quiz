
import { useNavigate } from "react-router-dom";
import  { useState } from "react";
import "../styles/Fillups.css";
import ReactPlayer from "react-player";

function Fillups2() {
    const navigate = useNavigate();
    const[name,setName]=useState();
      const goToNext = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/answers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }), // Send to backend
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            navigate("/mcq", { replace: true });
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to submit answer");
        }
    };

    // const goToNext = () => {
    //     navigate("/mcq", { replace: true }); // 👈 navigates to Fillup1 page
    // };

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
                <input type="text" placeholder="Type your answer here"  value={name}
                    onChange={(e) => setName(e.target.value)} />
                <button onClick={goToNext}>Next</button>
            </div>
        </div>
    );
}

export default Fillups2;
