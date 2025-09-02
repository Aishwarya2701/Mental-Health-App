import React from 'react';
import { BarChart3, Globe, TrendingUp, Users } from 'lucide-react';
import { mentalHealthDataset } from '../data/mentalHealthData';

export function DatasetOverview() {
  const totalEntries = mentalHealthDataset.length;
  const englishEntries = mentalHealthDataset.filter(entry => entry.language === 'en').length;
  const hindiEntries = mentalHealthDataset.filter(entry => entry.language === 'hi').length;
  
  const categoryStats = mentalHealthDataset.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sentimentStats = mentalHealthDataset.reduce((acc, entry) => {
    acc[entry.sentiment] = (acc[entry.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averageSeverity = (
    mentalHealthDataset.reduce((sum, entry) => sum + entry.severity, 0) / totalEntries
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Mental Health Dataset Overview</h2>
        <p className="text-gray-600">Comprehensive analysis of our mental health text dataset</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Entries</p>
              <p className="text-2xl font-bold text-gray-900">{totalEntries}</p>
            </div>
            <Users className="w-8 h-8 text-teal-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Languages</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-xs text-gray-500">EN: {englishEntries} | HI: {hindiEntries}</p>
            </div>
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Severity</p>
              <p className="text-2xl font-bold text-gray-900">{averageSeverity}</p>
              <p className="text-xs text-gray-500">Scale: 1-5</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{Object.keys(categoryStats).length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Distribution</h3>
        <div className="space-y-3">
          {Object.entries(categoryStats).map(([category, count]) => {
            const percentage = ((count / totalEntries) * 100).toFixed(1);
            return (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="capitalize font-medium text-gray-700">{category}</span>
                  <span className="text-sm text-gray-500">({count} entries)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sentiment Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sentiment Distribution</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(sentimentStats).map(([sentiment, count]) => {
            const percentage = ((count / totalEntries) * 100).toFixed(1);
            const colors = {
              positive: 'bg-green-100 text-green-800 border-green-200',
              negative: 'bg-red-100 text-red-800 border-red-200',
              neutral: 'bg-gray-100 text-gray-800 border-gray-200'
            };
            
            return (
              <div key={sentiment} className={`p-4 rounded-lg border ${colors[sentiment as keyof typeof colors]}`}>
                <p className="text-sm font-medium capitalize">{sentiment}</p>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs opacity-75">{percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sample Entries */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sample Dataset Entries</h3>
        <div className="space-y-4">
          {mentalHealthDataset.slice(0, 3).map((entry) => (
            <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    entry.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                    entry.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {entry.sentiment}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {entry.category}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                    {entry.language.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                    Severity: {entry.severity}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{entry.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}