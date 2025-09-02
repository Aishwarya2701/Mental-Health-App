import React from 'react';
import { useState } from 'react';
import { Brain, Calendar, Wind, Phone, Database, Bot, Eye, Trophy, Music, Gamepad2, TrendingUp } from 'lucide-react';
import { Header } from './components/Header';
import { MentalHealthAnalyzer } from './components/MentalHealthAnalyzer';
import { MoodTracker } from './components/MoodTracker';
import { BreathingExercise } from './components/BreathingExercise';
import { CrisisSupport } from './components/CrisisSupport';
import { DatasetOverview } from './components/DatasetOverview';
import { AITherapist } from './components/AITherapist';
import { WellnessJourney } from './components/WellnessJourney';
import { SoundTherapy } from './components/SoundTherapy';
import { MindfulnessGames } from './components/MindfulnessGames';
import { PersonalizedInsights } from './components/PersonalizedInsights';
import { getModelAccuracy } from './utils/mentalHealthAnalysis';

function App() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'mood' | 'breathing' | 'crisis' | 'dataset' | 'ai-therapist' | 'journey' | 'sound' | 'games' | 'insights'>('analyze');
  const modelAccuracy = getModelAccuracy();

  const tabs = [
    { id: 'analyze', label: '🧠 Text Analysis', icon: Brain },
    { id: 'ai-therapist', label: '🤖 AI Therapist', icon: Bot },
    { id: 'mood', label: '📊 Mood Tracker', icon: Calendar },
    { id: 'breathing', label: '🌬️ Breathing', icon: Wind },
    { id: 'sound', label: '🎵 Sound Therapy', icon: Music },
    { id: 'games', label: '🎮 Mindfulness Games', icon: Gamepad2 },
    { id: 'journey', label: '🏆 Wellness Journey', icon: Trophy },
    { id: 'insights', label: '📈 Personal Insights', icon: TrendingUp },
    { id: 'crisis', label: '🆘 Crisis Support', icon: Phone },
    { id: 'dataset', label: '📊 Dataset Overview', icon: Database },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header accuracy={modelAccuracy} />
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="border-b border-gray-200/50">
            <nav className="flex space-x-0 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-all duration-300 border-b-3 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg'
                        : 'border-transparent text-gray-500 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'analyze' && <MentalHealthAnalyzer />}
            {activeTab === 'ai-therapist' && <AITherapist />}
            {activeTab === 'mood' && <MoodTracker />}
            {activeTab === 'breathing' && <BreathingExercise />}
            {activeTab === 'sound' && <SoundTherapy />}
            {activeTab === 'games' && <MindfulnessGames />}
            {activeTab === 'journey' && <WellnessJourney />}
            {activeTab === 'insights' && <PersonalizedInsights />}
            {activeTab === 'crisis' && <CrisisSupport />}
            {activeTab === 'dataset' && <DatasetOverview />}
          </div>
        </div>
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <div className="bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 inline-block border border-white/30">
            <p className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
              🧠 AI-Powered Mental Wellness Platform • Multilingual Support • 24/7 Crisis Resources • Built with ❤️
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
