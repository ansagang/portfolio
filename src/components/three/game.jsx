"use client"

import { useState, useEffect } from "react";

const Game = () => {
    const [position, setPosition] = useState({ x: 50, y: 50 });
  
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'w':
          setPosition((prev) => ({ ...prev, y: prev.y - 10 }));
          break;
        case 'a':
          setPosition((prev) => ({ ...prev, x: prev.x - 10 }));
          break;
        case 's':
          setPosition((prev) => ({ ...prev, y: prev.y + 10 }));
          break;
        case 'd':
          setPosition((prev) => ({ ...prev, x: prev.x + 10 }));
          break;
        default:
          break;
      }
    };
  
    useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);
  
    return (
      <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#f0f0f0' }}>
        <div
          style={{
            position: 'absolute',
            top: `${position.y}%`,
            left: `${position.x}%`,
            width: '50px',
            height: '50px',
            backgroundColor: 'royalblue',
            borderRadius: '50%',
          }}
        >
          {/* Character */}
        </div>
        {/* Add life milestones as obstacles or backgrounds */}
      </div>
    );
  };
  
  export default Game;