import React, { useState, useEffect } from 'react';
import { Cloud, TrendingUp, TrendingDown, BarChart } from 'lucide-react';
import { getWordFrequency } from '../utils/sentimentAnalysis';
import { imdbReviews } from '../data/imdbData';

export function WordCloudVisualization() {
  const [selectedSentiment, setSelectedSentiment] = useState<'positive' | 'negative'>('positive');
  const [wordData, setWordData] = useState<Array<{word: string, count: number}>>([]);

  useEffect(() => {
    const reviews = imdbReviews
      .filter(review => review.sentiment === selectedSentiment)
      .map(review => review.review);
    
    const frequency = getWordFrequency(reviews, selectedSentiment);
    setWordData(frequency);
  }, [selectedSentiment]);

  const getWordSize = (count: number, maxCount: number) => {
    const minSize = 14;
    const maxSize = 48;
    const ratio = count / maxCount;
    return minSize + (maxSize - minSize) * ratio;
  };

  const getWordOpacity = (count: number, maxCount: number) => {
    const minOpacity = 0.6;
    const maxOpacity = 1;
    const ratio = count / maxCount;
    return minOpacity + (maxOpacity - minOpacity) * ratio;
  };

  const maxCount = Math.max(...wordData.map(item => item.count), 1);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Sentiment Word Analysis</h2>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedSentiment('positive')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedSentiment === 'positive'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>😊 Positive</span>
            </button>
            <button
              onClick={() => setSelectedSentiment('negative')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedSentiment === 'negative'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              <span>☹️ Negative</span>
            </button>
          </div>
        </div>

        <div className={`rounded-lg p-8 min-h-96 ${
          selectedSentiment === 'positive' ? 'bg-green-50' : 'bg-red-50'
        } transition-all duration-300`}>
          <div className="flex flex-wrap justify-center items-center gap-4 leading-relaxed">
            {wordData.slice(0, 30).map((item, index) => (
              <span
                key={index}
                className={`font-bold cursor-pointer hover:scale-110 transition-transform duration-200 ${
                  selectedSentiment === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
                style={{
                  fontSize: `${getWordSize(item.count, maxCount)}px`,
                  opacity: getWordOpacity(item.count, maxCount),
                }}
                title={`"${item.word}" appears ${item.count} times`}
              >
                {item.word}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Top {selectedSentiment} Words Frequency
          </h3>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {wordData.slice(0, 15).map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div className="flex items-center space-x-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  selectedSentiment === 'positive' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {index + 1}
                </span>
                <span className="font-medium text-gray-800">{item.word}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`h-2 rounded-full ${
                  selectedSentiment === 'positive' ? 'bg-green-200' : 'bg-red-200'
                }`} style={{ width: '100px' }}>
                  <div
                    className={`h-full rounded-full ${
                      selectedSentiment === 'positive' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-600 w-8 text-right">
                  {item.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}