import React from 'react';
import { Heart, Shield, TrendingUp, Globe } from 'lucide-react';

interface HeaderProps {
  accuracy: number;
}

export function Header({ accuracy }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white py-8 px-6 rounded-2xl shadow-2xl mb-8 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-2xl border border-white/30 shadow-lg">
              <Heart className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                AI Mental Wellness Platform
              </h1>
              <p className="text-white/90 text-lg font-medium">
                🧠 Revolutionary AI-powered mental health ecosystem with multilingual support
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center space-x-2 border border-white/30">
              <TrendingUp className="w-5 h-5" />
              <span className="font-bold">AI Accuracy</span>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg border border-white/30">
              <Shield className="w-4 h-4" />
              <span>{accuracy}%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold border border-white/30">
            🤖 Advanced NLP Engine
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold border border-white/30">
            🌍 Multilingual (EN/HI)
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold border border-white/30">
            🚨 AI Crisis Detection
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold border border-white/30">
            💚 Holistic Wellness
          </span>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold border border-white/30">
            🎮 Gamified Healing
          </span>
        </div>
      </div>
    </div>
  );
}