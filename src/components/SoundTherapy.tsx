import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, RotateCcw, Waves } from 'lucide-react';

interface SoundTrack {
  id: string;
  name: string;
  description: string;
  category: 'nature' | 'ambient' | 'binaural' | 'meditation';
  duration: string;
  benefits: string[];
  frequency?: string;
}

export function SoundTherapy() {
  const [selectedTrack, setSelectedTrack] = useState<SoundTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const soundTracks: SoundTrack[] = [
    {
      id: 'rain',
      name: '🌧️ Gentle Rain',
      description: 'Soft rainfall sounds for deep relaxation',
      category: 'nature',
      duration: '30:00',
      benefits: ['Reduces anxiety', 'Improves focus', 'Promotes sleep']
    },
    {
      id: 'ocean',
      name: '🌊 Ocean Waves',
      description: 'Rhythmic ocean waves for stress relief',
      category: 'nature',
      duration: '45:00',
      benefits: ['Calms nervous system', 'Reduces stress', 'Enhances meditation']
    },
    {
      id: 'forest',
      name: '🌲 Forest Ambience',
      description: 'Birds chirping and leaves rustling',
      category: 'nature',
      duration: '60:00',
      benefits: ['Connects with nature', 'Reduces cortisol', 'Improves mood']
    },
    {
      id: 'binaural-alpha',
      name: '🧠 Alpha Waves (10Hz)',
      description: 'Binaural beats for relaxed awareness',
      category: 'binaural',
      duration: '20:00',
      frequency: '10Hz',
      benefits: ['Enhances creativity', 'Reduces anxiety', 'Improves focus']
    },
    {
      id: 'binaural-theta',
      name: '🌙 Theta Waves (6Hz)',
      description: 'Deep meditation and healing frequencies',
      category: 'binaural',
      duration: '25:00',
      frequency: '6Hz',
      benefits: ['Deep relaxation', 'Emotional healing', 'Enhanced intuition']
    },
    {
      id: 'singing-bowls',
      name: '🎵 Tibetan Singing Bowls',
      description: 'Healing vibrations for chakra alignment',
      category: 'meditation',
      duration: '35:00',
      benefits: ['Balances energy', 'Reduces stress', 'Promotes healing']
    },
    {
      id: 'white-noise',
      name: '⚪ White Noise',
      description: 'Consistent background noise for focus',
      category: 'ambient',
      duration: '∞',
      benefits: ['Masks distractions', 'Improves concentration', 'Aids sleep']
    },
    {
      id: 'pink-noise',
      name: '🌸 Pink Noise',
      description: 'Balanced frequency spectrum for relaxation',
      category: 'ambient',
      duration: '∞',
      benefits: ['Deeper sleep', 'Memory consolidation', 'Stress reduction']
    }
  ];

  const categoryColors = {
    nature: 'bg-green-100 text-green-800 border-green-200',
    ambient: 'bg-blue-100 text-blue-800 border-blue-200',
    binaural: 'bg-purple-100 text-purple-800 border-purple-200',
    meditation: 'bg-orange-100 text-orange-800 border-orange-200'
  };

  const categoryIcons = {
    nature: '🌿',
    ambient: '🎧',
    binaural: '🧠',
    meditation: '🧘'
  };

  // Simulate audio playback (in real app, would use actual audio files)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedTrack) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (selectedTrack.duration !== '∞') {
            const maxDuration = parseInt(selectedTrack.duration.split(':')[0]) * 60;
            if (newTime >= maxDuration) {
              setIsPlaying(false);
              return 0;
            }
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, selectedTrack]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    if (selectedTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackSelect = (track: SoundTrack) => {
    if (selectedTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedTrack(track);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Waves className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Sound Therapy & Healing</h2>
        </div>
        <p className="text-white/90">Immerse yourself in therapeutic soundscapes designed to reduce stress, enhance focus, and promote emotional healing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sound Library */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Therapeutic Sound Library</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {soundTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => handleTrackSelect(track)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedTrack?.id === track.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{track.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[track.category]}`}>
                    {categoryIcons[track.category]} {track.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{track.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⏱️ {track.duration}</span>
                  {track.frequency && <span>🎵 {track.frequency}</span>}
                </div>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1">
                    {track.benefits.slice(0, 2).map((benefit, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Player & Controls */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Now Playing</h3>
            
            {selectedTrack ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">{selectedTrack.name.split(' ')[0]}</div>
                  <h4 className="font-semibold text-gray-800">{selectedTrack.name.substring(2)}</h4>
                  <p className="text-sm text-gray-600">{selectedTrack.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{selectedTrack.duration}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: selectedTrack.duration !== '∞' 
                          ? `${(currentTime / (parseInt(selectedTrack.duration.split(':')[0]) * 60)) * 100}%`
                          : '50%'
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setCurrentTime(0)}
                    className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handlePlay}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  
                  <button
                    onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
                    className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {volume > 0 ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Volume</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select a track to begin your sound therapy session</p>
              </div>
            )}
          </div>

          {selectedTrack && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Benefits</h4>
              <ul className="space-y-2">
                {selectedTrack.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                    <span className="text-green-500">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}