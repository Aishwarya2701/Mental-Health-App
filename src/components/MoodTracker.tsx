import React, { useState } from 'react';
import { Calendar, TrendingUp, Plus, Smile } from 'lucide-react';
import { moodHistory, type MoodEntry } from '../data/mentalHealthData';

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState<string[]>([]);

  const moodEmojis = {
    1: '😢',
    2: '😔',
    3: '😐',
    4: '😊',
    5: '😄'
  };

  const moodLabels = {
    1: 'Very Bad',
    2: 'Bad',
    3: 'Okay',
    4: 'Good',
    5: 'Excellent'
  };

  const activityOptions = [
    'exercise', 'meditation', 'work', 'socializing', 'reading', 'music',
    'cooking', 'walking', 'therapy', 'journaling', 'rest', 'family time'
  ];

  const handleActivityToggle = (activity: string) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const averageMood = moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Smile className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-800">Daily Mood Tracker</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-4">How are you feeling today?</h3>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood as 1 | 2 | 3 | 4 | 5)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedMood === mood
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-3xl mb-1">{moodEmojis[mood as keyof typeof moodEmojis]}</div>
                  <div className="text-xs font-medium text-gray-600">
                    {moodLabels[mood as keyof typeof moodLabels]}
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What influenced your mood today?"
                className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                maxLength={200}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activities
              </label>
              <div className="flex flex-wrap gap-2">
                {activityOptions.map((activity) => (
                  <button
                    key={activity}
                    onClick={() => handleActivityToggle(activity)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                      activities.includes(activity)
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Save Mood Entry</span>
            </button>
          </div>

          <div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h3 className="font-medium text-gray-800">Mood Insights</h3>
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {averageMood.toFixed(1)}/5.0
              </div>
              <div className="text-sm text-gray-600">Average mood this week</div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Recent Entries</h3>
              {moodHistory.slice(0, 5).map((entry) => (
                <div key={entry.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{moodEmojis[entry.mood]}</span>
                      <span className="font-medium text-gray-800">
                        {moodLabels[entry.mood]}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                  {entry.notes && (
                    <p className="text-sm text-gray-600 mb-2">{entry.notes}</p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {entry.activities.map((activity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}