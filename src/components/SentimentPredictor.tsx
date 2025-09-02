import React, { useState } from 'react';
import { MessageSquare, Sparkles, BarChart3, Clock, Hash } from 'lucide-react';
import { analyzeSentiment, type SentimentResult } from '../utils/sentimentAnalysis';

export function SentimentPredictor() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const analysis = analyzeSentiment(inputText);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  const getSentimentEmoji = (sentiment: 'positive' | 'negative') => {
    return sentiment === 'positive' ? '😊' : '☹️';
  };

  const getSentimentColor = (sentiment: 'positive' | 'negative') => {
    return sentiment === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  const getSentimentBg = (sentiment: 'positive' | 'negative') => {
    return sentiment === 'positive' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Enter Your Movie Review</h2>
        </div>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your movie review here... For example: 'This movie was absolutely fantastic! The acting was superb and the plot kept me engaged throughout.'"
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          maxLength={1000}
        />
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">
            {inputText.length}/1000 characters
          </span>
          
          <button
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Sentiment</span>
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className={`rounded-lg shadow-lg p-6 border-2 ${getSentimentBg(result.sentiment)} transition-all duration-500 animate-fade-in`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{getSentimentEmoji(result.sentiment)}</span>
              <div>
                <h3 className={`text-2xl font-bold ${getSentimentColor(result.sentiment)} capitalize`}>
                  {result.sentiment} Sentiment
                </h3>
                <p className="text-gray-600">
                  Confidence: <span className="font-semibold">{result.confidence}%</span>
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-3xl font-bold ${getSentimentColor(result.sentiment)}`}>
                {result.confidence}%
              </div>
              <div className="text-sm text-gray-500">Confidence</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-4 h-4 text-green-600" />
                <span className="font-medium text-gray-700">Positive Score</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{result.positiveScore}</div>
            </div>
            
            <div className="bg-white/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-4 h-4 text-red-600" />
                <span className="font-medium text-gray-700">Negative Score</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{result.negativeScore}</div>
            </div>
            
            <div className="bg-white/50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Hash className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-gray-700">Word Count</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{result.wordCount}</div>
            </div>
          </div>

          {result.keyWords.length > 0 && (
            <div className="bg-white/50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Key Sentiment Words</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.keyWords.map((word, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.sentiment === 'positive'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}