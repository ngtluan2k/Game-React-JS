import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import './App.css';

const App = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [title, setTitle] = useState("LET'S PLAY");
  const [points, setPoints] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    let interval = null;
    if (started) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    } else if (!started && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [started, time]);

  const handleStartOrRestart = () => {
    setStarted(true);
    setTime(0);
    setTitle("LET'S PLAY");
    setScore(0);
    setGameKey((prevKey) => prevKey + 1);
  };

  const handleScoreChange = (newScore) => {
    setScore(newScore);
    if (newScore >= points) {
      setTitle("ALL CLEARED");
    }
  };

  const handleGameOver = () => {
    setTitle("GAME OVER");
    setStarted(false);
  };

  const handlePointsChange = (e) => {
    setPoints(parseInt(e.target.value) || 0);
    setScore(0);
    setTime(0);
    setTitle("LET'S PLAY");
    setStarted(false);
  };

  return (
    <div className="app">
      <div className="game-info">
        <h1 className={title === "GAME OVER" ? "red" : title === "ALL CLEARED" ? "green" : ""}>{title}</h1>
        <div className="info">
          <div>
            <label>Points:</label>
            <input 
              type="number" 
              value={points} 
              onChange={handlePointsChange} 
              disabled={started}
            />
          </div>
          <div>
            <label>Time:</label>
            <input type="text" value={`${time.toFixed(1)}s`} readOnly />
          </div>
          <div>
            <label>Current Score:</label>
            <input type="text" value={score} readOnly />
          </div>
        </div>
        <button onClick={handleStartOrRestart}>{started ? "Restart" : "Play"}</button>
      </div>
      <div className="game-board-container">
        <GameBoard 
          key={gameKey}
          points={points} 
          onScoreChange={handleScoreChange} 
          onGameOver={handleGameOver} 
          started={started} 
        />
      </div>
    </div>
  );
  
};

export default App;
