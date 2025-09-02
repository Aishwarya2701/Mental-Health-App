import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Brain, Heart, Target, Award } from 'lucide-react';

interface InsightData {
  moodTrend: number[];
  topTriggers: string[];
  copingStrategies: Array<{strategy: string, effectiveness: number}>;
  weeklyProgress: Array<{day: string, activities: number, mood: number}>;
  personalizedTips: string[];
}

export function PersonalizedInsights() {
  const [insights, setInsights] = useState<InsightData>({
    moodTrend: [3.2, 3.8, 4.1, 3.9, 4.3, 4.0, 4.2],
    topTriggers: ['Work stress', 'Sleep deprivation', 'Social anxiety', 'Financial worries'],
    copingStrategies: [
      { strategy: 'Deep breathing', effectiveness: 85 },
      { strategy: 'Exercise', effectiveness: 78 },
      { strategy: 'Meditation', effectiveness: 82 },
      { strategy: 'Talking to friends', effectiveness: 90 },
      { strategy: 'Journaling', effectiveness: 75 }
    ],
    weeklyProgress: [
      { day: 'Mon', activities: 3, mood: 4.2 },
      { day: 'Tue', activities: 5, mood: 4.0 },
      { day: 'Wed', activities: 2, mood: 3.8 },
      { day: 'Thu', activities: 4, mood: 4.1 },
      { day: 'Fri', activities: 6, mood: 4.3 },
      { day: 'Sat', activities: 4, mood: 4.0 },
      { day: 'Sun', activities: 3, mood: 3.9 }
    ],
    personalizedTips: [
      "Your mood improves significantly when you exercise - try to maintain your workout routine",
      "You tend to feel better on days with more social interaction",
      "Your stress levels are highest on Wednesdays - consider scheduling lighter workloads",
      "Meditation sessions longer than 10 minutes show better results for you"
    ]
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('week');

  const averageMood = insights.moodTrend.reduce((sum, mood) => sum + mood, 0) / insights.moodTrend.length;
  const moodImprovement = ((insights.moodTrend[insights.moodTrend.length - 1] - insights.moodTrend[0]) / insights.moodTrend[0] * 100);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Brain className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Personalized Insights</h2>
        </div>
        <p className="text-white/90">AI-powered analysis of your mental health patterns, triggers, and personalized recommendations for optimal wellbeing.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Mood</p>
              <p className="text-2xl font-bold text-blue-600">{averageMood.toFixed(1)}</p>
              <p className="text-xs text-gray-500">This week</p>
            </div>
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mood Trend</p>
              <p className={`text-2xl font-bold ${moodImprovement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {moodImprovement >= 0 ? '+' : ''}{moodImprovement.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500">vs last week</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Best Strategy</p>
              <p className="text-2xl font-bold text-purple-600">
                {insights.copingStrategies.reduce((best, current) => 
                  current.effectiveness > best.effectiveness ? current : best
                ).effectiveness}%
              </p>
              <p className="text-xs text-gray-500">Effectiveness</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Activities</p>
              <p className="text-2xl font-bold text-orange-600">
                {insights.weeklyProgress.reduce((sum, day) => sum + day.activities, 0)}
              </p>
              <p className="text-xs text-gray-500">Total completed</p>
            </div>
            <Award className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Mood Trend Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Mood Trend Analysis</h3>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as 'week' | 'month' | 'quarter')}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
        
        <div className="h-48 flex items-end justify-between space-x-2">
          {insights.moodTrend.map((mood, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-cyan-500"
                style={{ height: `${(mood / 5) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-600 mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </div>
              <div className="text-xs font-semibold text-gray-800">{mood}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Triggers */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Identified Triggers</h3>
          <div className="space-y-3">
            {insights.topTriggers.map((trigger, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <span className="font-medium text-red-800">{trigger}</span>
                <span className="text-sm text-red-600">High Impact</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coping Strategies Effectiveness */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Coping Strategy Effectiveness</h3>
          <div className="space-y-3">
            {insights.copingStrategies.map((strategy, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{strategy.strategy}</span>
                  <span className="text-sm font-semibold text-green-600">{strategy.effectiveness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${strategy.effectiveness}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Tips */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">AI-Generated Personal Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.personalizedTips.map((tip, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">💡</div>
                <p className="text-sm text-purple-800 leading-relaxed">{tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}