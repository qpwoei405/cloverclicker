import { useEffect, useRef, useState } from "react";
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

  const audioPoolRef = useRef({});
  const poolIndexRef = useRef({
    standard: 0,
    soft: 0,
    hard: 0,
  });

  useEffect(() => {
    Object.entries(soundFiles).forEach(([key, src]) => {
      audioPoolRef.current[key] = Array.from({ length: 10 }, () => {
        const audio = new Audio(src);
        audio.preload = "auto";
        audio.volume = 1;
        return audio;
      });
    });
  }, []);

  const playSound = () => {
    const pool = audioPoolRef.current[soundType];
    if (!pool || pool.length === 0) return;

    const index = poolIndexRef.current[soundType] % pool.length;
    const audio = pool[index];

    poolIndexRef.current[soundType] += 1;

    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const handlePress = (event) => {
    event.preventDefault();
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
            src={
              isPressed
                ? "/images/clover-pressed.png"
                : "/images/clover-default.png"
            }
            alt="clover clicker"
            className={`clover ${isPressed ? "pressed" : ""}`}
            onPointerDown={handlePress}
            onPointerUp={handleRelease}
            onPointerCancel={handleRelease}
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
                type="button"
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