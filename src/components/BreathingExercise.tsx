import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [technique, setTechnique] = useState<'4-7-8' | '4-4-4' | 'box'>('4-7-8');

  const techniques = {
    '4-7-8': { inhale: 4, hold: 7, exhale: 8, name: '4-7-8 Relaxing Breath' },
    '4-4-4': { inhale: 4, hold: 4, exhale: 4, name: 'Equal Breathing' },
    'box': { inhale: 4, hold: 4, exhale: 4, name: 'Box Breathing' }
  };

  const currentTechnique = techniques[technique];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      if (phase === 'inhale') {
        setPhase('hold');
        setTimeLeft(currentTechnique.hold);
      } else if (phase === 'hold') {
        setPhase('exhale');
        setTimeLeft(currentTechnique.exhale);
      } else {
        setPhase('inhale');
        setTimeLeft(currentTechnique.inhale);
        setCycle(cycle + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, currentTechnique, cycle]);

  const handleStart = () => {
    setIsActive(true);
    if (timeLeft === 0) {
      setTimeLeft(currentTechnique.inhale);
      setPhase('inhale');
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(currentTechnique.inhale);
    setCycle(0);
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'from-blue-400 to-blue-600';
      case 'hold': return 'from-yellow-400 to-yellow-600';
      case 'exhale': return 'from-green-400 to-green-600';
    }
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  const circleScale = phase === 'inhale' ? 'scale-150' : phase === 'hold' ? 'scale-125' : 'scale-100';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Wind className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Breathing Exercises</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <select
                value={technique}
                onChange={(e) => {
                  setTechnique(e.target.value as '4-7-8' | '4-4-4' | 'box');
                  handleReset();
                }}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="4-7-8">4-7-8 Relaxing Breath</option>
                <option value="4-4-4">Equal Breathing</option>
                <option value="box">Box Breathing</option>
              </select>
            </div>

            <div className="relative mb-8">
              <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${getPhaseColor()} flex items-center justify-center transition-all duration-1000 ${circleScale} ${isActive ? 'animate-pulse' : ''}`}>
                <div className="text-center text-white">
                  <div className="text-2xl font-bold mb-2">{timeLeft}</div>
                  <div className="text-lg">{getPhaseInstruction()}</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mb-4">
              {!isActive ? (
                <button
                  onClick={handleStart}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center space-x-2"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </button>
              )}
              
              <button
                onClick={handleReset}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800">Cycles Completed</div>
              <div className="text-3xl font-bold text-blue-600">{cycle}</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">{currentTechnique.name}</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <div>• Inhale: {currentTechnique.inhale} seconds</div>
                <div>• Hold: {currentTechnique.hold} seconds</div>
                <div>• Exhale: {currentTechnique.exhale} seconds</div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Benefits</h3>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• Reduces anxiety and stress</li>
                <li>• Improves focus and concentration</li>
                <li>• Lowers heart rate and blood pressure</li>
                <li>• Promotes better sleep</li>
                <li>• Activates the parasympathetic nervous system</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Tips for Practice</h3>
              <ul className="space-y-1 text-sm text-purple-700">
                <li>• Find a quiet, comfortable space</li>
                <li>• Sit or lie down with your back straight</li>
                <li>• Close your eyes or soften your gaze</li>
                <li>• Focus on the rhythm of your breath</li>
                <li>• Practice regularly for best results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}