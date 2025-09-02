import React, { useState, useEffect } from 'react';
import { Gamepad2, Target, Timer, Star, Zap, RefreshCw } from 'lucide-react';

interface GameScore {
  game: string;
  score: number;
  timestamp: Date;
}

export function MindfulnessGames() {
  const [activeGame, setActiveGame] = useState<'memory' | 'breathing' | 'focus' | null>(null);
  const [gameState, setGameState] = useState<any>({});
  const [scores, setScores] = useState<GameScore[]>([]);

  // Memory Game State
  const [memoryCards, setMemoryCards] = useState<Array<{id: number, emoji: string, flipped: boolean, matched: boolean}>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryScore, setMemoryScore] = useState(0);

  // Focus Game State
  const [focusTarget, setFocusTarget] = useState({ x: 50, y: 50 });
  const [focusClicks, setFocusClicks] = useState(0);
  const [focusTimer, setFocusTimer] = useState(30);
  const [focusActive, setFocusActive] = useState(false);

  // Breathing Game State
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [breathingScore, setBreathingScore] = useState(0);
  const [breathingTimer, setBreathingTimer] = useState(4);

  const initMemoryGame = () => {
    const emojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🍀'];
    const cards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false
      }));
    
    setMemoryCards(cards);
    setFlippedCards([]);
    setMemoryScore(0);
    setActiveGame('memory');
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (memoryCards[cardId].flipped || memoryCards[cardId].matched) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);
    
    setMemoryCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, flipped: true } : card
    ));

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first].emoji === memoryCards[second].emoji) {
        // Match found
        setTimeout(() => {
          setMemoryCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, matched: true }
              : card
          ));
          setFlippedCards([]);
          setMemoryScore(prev => prev + 10);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setMemoryCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, flipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const initFocusGame = () => {
    setActiveGame('focus');
    setFocusClicks(0);
    setFocusTimer(30);
    setFocusActive(true);
    
    const interval = setInterval(() => {
      setFocusTimer(prev => {
        if (prev <= 1) {
          setFocusActive(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Move target every 2 seconds
    const targetInterval = setInterval(() => {
      if (focusActive) {
        setFocusTarget({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10
        });
      } else {
        clearInterval(targetInterval);
      }
    }, 2000);
  };

  const handleTargetClick = () => {
    if (focusActive) {
      setFocusClicks(prev => prev + 1);
      setFocusTarget({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      });
    }
  };

  const initBreathingGame = () => {
    setActiveGame('breathing');
    setBreathingScore(0);
    setBreathingPhase('inhale');
    setBreathingTimer(4);
    
    const interval = setInterval(() => {
      setBreathingTimer(prev => {
        if (prev <= 1) {
          setBreathingPhase(current => current === 'inhale' ? 'exhale' : 'inhale');
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setBreathingScore(100);
    }, 60000); // 1 minute game
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Gamepad2 className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Mindfulness Games</h2>
        </div>
        <p className="text-white/90">Interactive games designed to improve focus, memory, and mindfulness while having fun!</p>
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={initMemoryGame}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-pink-300"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Memory Garden</h3>
              <p className="text-sm text-gray-600 mb-4">Match flower pairs to improve memory and concentration</p>
              <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-medium">
                Memory & Focus
              </div>
            </div>
          </div>

          <div 
            onClick={initFocusGame}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-blue-300"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Focus Flow</h3>
              <p className="text-sm text-gray-600 mb-4">Click moving targets to enhance attention and mindfulness</p>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                Attention & Awareness
              </div>
            </div>
          </div>

          <div 
            onClick={initBreathingGame}
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-green-300"
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🌬️</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Breath Sync</h3>
              <p className="text-sm text-gray-600 mb-4">Synchronize your breathing with visual cues</p>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Breathing & Calm
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {activeGame === 'memory' && '🧠 Memory Garden'}
              {activeGame === 'focus' && '🎯 Focus Flow'}
              {activeGame === 'breathing' && '🌬️ Breath Sync'}
            </h3>
            <button
              onClick={() => setActiveGame(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Games
            </button>
          </div>

          {activeGame === 'memory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold">Score: {memoryScore}</span>
                  <span className="text-sm text-gray-600">
                    Matches: {memoryCards.filter(card => card.matched).length / 2}/8
                  </span>
                </div>
                <button
                  onClick={initMemoryGame}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>New Game</span>
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {memoryCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square rounded-lg border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-2xl ${
                      card.flipped || card.matched
                        ? 'bg-pink-100 border-pink-300'
                        : 'bg-gray-100 border-gray-300 hover:border-pink-300'
                    }`}
                  >
                    {card.flipped || card.matched ? card.emoji : '?'}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeGame === 'focus' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold">Hits: {focusClicks}</span>
                  <span className="text-sm text-gray-600">Time: {focusTimer}s</span>
                </div>
                {!focusActive && focusTimer === 0 && (
                  <button
                    onClick={initFocusGame}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Play Again
                  </button>
                )}
              </div>
              
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg h-64 overflow-hidden">
                {focusActive && (
                  <div
                    onClick={handleTargetClick}
                    className="absolute w-8 h-8 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition-all duration-200 flex items-center justify-center text-white font-bold shadow-lg animate-pulse"
                    style={{
                      left: `${focusTarget.x}%`,
                      top: `${focusTarget.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    🎯
                  </div>
                )}
                
                {!focusActive && focusTimer === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎉</div>
                      <div className="text-xl font-bold text-blue-600">Game Complete!</div>
                      <div className="text-lg text-gray-700">Final Score: {focusClicks} hits</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeGame === 'breathing' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">Score: {breathingScore}</div>
                <div className="text-sm text-gray-600">Follow the breathing rhythm</div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className={`w-32 h-32 rounded-full border-4 transition-all duration-1000 flex items-center justify-center ${
                  breathingPhase === 'inhale' 
                    ? 'border-blue-500 bg-blue-100 scale-125' 
                    : 'border-green-500 bg-green-100 scale-75'
                }`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{breathingTimer}</div>
                    <div className="text-sm capitalize">{breathingPhase}</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={initBreathingGame}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Start New Session
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {scores.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Scores</h3>
          <div className="space-y-2">
            {scores.slice(-5).map((score, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{score.game}</span>
                <span className="text-lg font-bold text-purple-600">{score.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}