import React, { useState, useEffect } from "react";
import img1 from "../assests/time.jpg";
import img2 from "../assests/bgquiz.jpg";
import img3 from "../assests/about.jpg";
import img4 from "../assests/bg.jpg";
import '../styles/Mcq.css';
const Mcq = () => {
  const questions = [
    {
      text: "What is shown in the images?",
      images: [img1, img2, img3, img4],
      correctAnswer: "clock",
    },
    {
      text: "Guess the theme from these images?",
      images: [img2, img1, img4, img3],
      correctAnswer: "quiz",
    },
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [remainingTime, setRemainingTime] = useState(20);
 const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    setShowInput(false);
    setImageIndex(0);
    setRemainingTime(20);

    // First: cycle through images
    const imageInterval = setInterval(() => {
      setImageIndex((prev) => {
        if (prev + 1 < questions[questionIndex].images.length) {
          return prev + 1;
        } else {
          clearInterval(imageInterval);
          setShowInput(true);

          // Start countdown only after all images are shown
          const countdown = setInterval(() => {
            setRemainingTime((prevTime) => {
              if (prevTime <= 1) {
                clearInterval(countdown);
                handleNext();
                return 0;
              }
              return prevTime - 1;
            });
          }, 1000);
           setCountdown(countdown);

          return prev;
        }
      });
    }, 3000); // show next image every 3 sec

    return () => {
      clearInterval(imageInterval);
    };
  }, [questionIndex]);
    const handleNext = async () => {
    // clear countdown if still running
    const currentQuestion = questions[questionIndex];
    if (countdown) {
      clearInterval(countdown);
      setCountdown(null);
    }
    try {
      await fetch("http://localhost:5000/api/mcq-answers", {  // change URL to your backend API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion.text,
          userAnswer: answer,
          correctAnswer: currentQuestion.correctAnswer,
        }),
      });
    } catch (error) {
      console.error("Failed to save answer:", error);
      alert("eror to fetch");
    }

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
      setAnswer("");  // reset answer input for next question
    } else {
      alert("Quiz Finished 🎉");
    }
  };

  // const handleNext = () => {
  //   if (questionIndex + 1 < questions.length) {
  //     setQuestionIndex(questionIndex + 1);
  //     setAnswer("");
  //   } else {
  //     alert("Quiz Finished 🎉");
  //   }
  // };

  return (
    <div style={{ textAlign: "center" }}>
        
      <h2>Question {questionIndex + 1}</h2>
      <p>{questions[questionIndex].text}</p>

      <img
        src={questions[questionIndex].images[imageIndex]}
        alt="question"
        style={{ width: "400px", height: "300px", marginBottom: "20px" }}
      />

      {showInput && (
        <>
          {/* Timer only shows after images */}
          <div style={{ marginBottom: "20px", fontSize: "18px" }}>
            <strong>Time Remaining: {remainingTime} seconds</strong>
          </div>

          <input
            type="text"
            placeholder="Your Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
          />
          <br />
          <button onClick={handleNext} style={{ padding: "8px 16px" }}>
            Next Question
          </button>
        </>
      )}
    </div>
  );
};

export default Mcq;
