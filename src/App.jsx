// src/App.jsx
import { useRef, useState } from "react";
import "./App.css";

const sounds = {
  standard: "/sounds/standard.wav",
  soft: "/sounds/soft.wav",
  hard: "/sounds/hard.wav",
};

function App() {
  const [soundType, setSoundType] = useState("standard");
  const [isPressed, setIsPressed] = useState(false);
  const [count, setCount] = useState(0);
  const audioRef = useRef(null);

  const playSound = () => {
    const audio = new Audio(sounds[soundType]);
    audio.currentTime = 0;
    audio.play();
    audioRef.current = audio;
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

        <div className="click-area">
          <img
            src={isPressed ? "/images/clover-pressed.png" : "/images/clover-default.png"}
            alt="clover clicker"
            className={`clover ${isPressed ? "pressed" : ""}`}
            onMouseDown={handlePress}
            onMouseUp={handleRelease}
            onMouseLeave={handleRelease}
            onTouchStart={handlePress}
            onTouchEnd={handleRelease}
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