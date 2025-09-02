import React, { useState, useEffect } from 'react';
import { Trophy, Target, Calendar, TrendingUp, Star, Gift, Zap } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: string;
  completed: boolean;
}

export function WellnessJourney() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalPoints, setTotalPoints] = useState(1250);
  const [level, setLevel] = useState(3);
  const [selectedTab, setSelectedTab] = useState<'achievements' | 'challenges' | 'progress'>('achievements');

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first mood check-in",
      icon: "🎯",
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: 2,
      title: "Breathing Master",
      description: "Complete 10 breathing exercises",
      icon: "🌬️",
      unlocked: true,
      progress: 10,
      maxProgress: 10
    },
    {
      id: 3,
      title: "Week Warrior",
      description: "Maintain a 7-day mood tracking streak",
      icon: "🔥",
      unlocked: true,
      progress: 7,
      maxProgress: 7
    },
    {
      id: 4,
      title: "Mindful Month",
      description: "Track mood for 30 consecutive days",
      icon: "🏆",
      unlocked: false,
      progress: 7,
      maxProgress: 30
    },
    {
      id: 5,
      title: "Zen Master",
      description: "Complete 50 meditation sessions",
      icon: "🧘",
      unlocked: false,
      progress: 12,
      maxProgress: 50
    },
    {
      id: 6,
      title: "Support Network",
      description: "Use crisis support resources 3 times",
      icon: "🤝",
      unlocked: false,
      progress: 1,
      maxProgress: 3
    }
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Morning Gratitude",
      description: "Write down 3 things you're grateful for each morning",
      duration: "7 days",
      difficulty: 'easy',
      reward: "100 wellness points",
      completed: false
    },
    {
      id: 2,
      title: "Digital Detox Hour",
      description: "Spend 1 hour daily without screens",
      duration: "5 days",
      difficulty: 'medium',
      reward: "200 wellness points + Mindful Badge",
      completed: true
    },
    {
      id: 3,
      title: "Kindness Streak",
      description: "Perform one act of kindness daily",
      duration: "14 days",
      difficulty: 'medium',
      reward: "300 wellness points + Compassion Badge",
      completed: false
    },
    {
      id: 4,
      title: "Meditation Marathon",
      description: "Meditate for 20 minutes daily",
      duration: "21 days",
      difficulty: 'hard',
      reward: "500 wellness points + Zen Master Badge",
      completed: false
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (progress: number, max: number) => {
    return Math.min((progress / max) * 100, 100);
  };

  const nextLevelPoints = (level + 1) * 500;
  const currentLevelProgress = totalPoints % 500;
  const levelProgress = (currentLevelProgress / 500) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Trophy className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Wellness Journey</h2>
        </div>
        <p className="text-white/90">Gamify your mental health journey with achievements, challenges, and progress tracking!</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-orange-600">{currentStreak} days</p>
            </div>
            <div className="text-2xl">🔥</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wellness Points</p>
              <p className="text-2xl font-bold text-purple-600">{totalPoints.toLocaleString()}</p>
            </div>
            <div className="text-2xl">⭐</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Level</p>
              <p className="text-2xl font-bold text-blue-600">{level}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="text-2xl">🎖️</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-green-600">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </p>
            </div>
            <div className="text-2xl">🏆</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-0">
            {[
              { id: 'achievements', label: '🏆 Achievements', icon: Trophy },
              { id: 'challenges', label: '🎯 Challenges', icon: Target },
              { id: 'progress', label: '📈 Progress', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm transition-all duration-200 border-b-2 ${
                    selectedTab === tab.id
                      ? 'border-purple-500 text-purple-600 bg-purple-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'achievements' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {achievement.progress}/{achievement.maxProgress}
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                achievement.unlocked ? 'bg-yellow-500' : 'bg-gray-400'
                              }`}
                              style={{ width: `${getProgressPercentage(achievement.progress, achievement.maxProgress)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'challenges' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Challenges</h3>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      challenge.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                            {challenge.difficulty}
                          </span>
                          {challenge.completed && <span className="text-green-600">✅</span>}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>📅 {challenge.duration}</span>
                          <span>🎁 {challenge.reward}</span>
                        </div>
                      </div>
                      
                      {!challenge.completed && (
                        <button
                          onClick={() => {
                            setChallenges(prev => prev.map(c => 
                              c.id === challenge.id ? { ...c, completed: true } : c
                            ));
                            setTotalPoints(prev => prev + 100);
                          }}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                        >
                          Start Challenge
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'progress' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Wellness Progress</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-4">Weekly Activity</h4>
                  <div className="space-y-3">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={day} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-700">{day}</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((activity) => (
                            <div
                              key={activity}
                              className={`w-3 h-3 rounded-full ${
                                index < 5 && activity <= (index + 2)
                                  ? 'bg-blue-500'
                                  : 'bg-blue-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-4">Mood Trends</h4>
                  <div className="space-y-3">
                    {[
                      { label: 'This Week', value: 4.2, change: '+0.3' },
                      { label: 'Last Week', value: 3.9, change: '+0.1' },
                      { label: 'This Month', value: 3.8, change: '+0.5' },
                      { label: 'Overall', value: 3.6, change: '+0.8' }
                    ].map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-700">{stat.label}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-green-800">{stat.value}</span>
                          <span className="text-xs text-green-600 bg-green-200 px-2 py-1 rounded-full">
                            {stat.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4">Wellness Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-lg font-bold text-purple-600">85%</div>
                    <div className="text-sm text-purple-700">Goal Completion</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">📈</div>
                    <div className="text-lg font-bold text-blue-600">+12%</div>
                    <div className="text-sm text-blue-700">Mood Improvement</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-lg font-bold text-green-600">42</div>
                    <div className="text-sm text-green-700">Activities Completed</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Level Up Notification */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6" />
            <div>
              <h3 className="font-bold">Level {level} Wellness Warrior</h3>
              <p className="text-sm text-white/90">
                {500 - currentLevelProgress} points to Level {level + 1}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{totalPoints.toLocaleString()}</div>
            <div className="text-sm text-white/75">Total Points</div>
          </div>
        </div>
        <div className="mt-3 w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}