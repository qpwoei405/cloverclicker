// src/App.jsx
import { useRef, useState, useEffect } from "react";
import "./App.css";

const soundFiles = {
  standard: "/sounds/standard.wav",
  soft: "/sounds/soft.wav",
  hard: "/sounds/hard.wav",
};

function App() {
  const [soundType, setSoundType] = useState("standard");
  const [isPressed, setIsPressed] = useState(false);
  const [count, setCount] = useState(0);
  const audioRefs = useRef({});

  useEffect(() => {
    Object.entries(soundFiles).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audioRefs.current[key] = audio;
    });
  }, []);

  const playSound = () => {
    const audio = audioRefs.current[soundType];
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const handlePress = () => {
    setIsPressed(true);
    setCount((prev) => prev + 1);
    playSound();
  };

  const handleRelease = () => {
    setIsPressed(false);
  };

  return (
    <main className="page">
      <div className="clicker-card">
        <div className="title-box">click me!</div>

        <div className="click-area">
          <img
            src={isPressed ? "/images/clover-pressed.png" : "/images/clover-default.png"}
            alt="clover clicker"
            className={`clover ${isPressed ? "pressed" : ""}`}
            onPointerDown={handlePress}
            onPointerUp={handleRelease}
            onPointerLeave={handleRelease}
            draggable="false"
          />
        </div>

        <div className="control-panel">
          <p className="label">sound</p>

          <div className="sound-buttons">
            {["standard", "soft", "hard"].map((type) => (
              <button
                key={type}
                className={soundType === type ? "active" : ""}
                onClick={() => setSoundType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <p className="count">clicks: {count}</p>
        </div>
      </div>
    </main>
  );
}

export default App;