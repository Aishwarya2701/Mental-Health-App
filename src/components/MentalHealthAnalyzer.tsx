import React, { useState } from 'react';
import { Brain, AlertTriangle, Heart, MessageSquare, Sparkles, Globe, Phone } from 'lucide-react';
import { analyzeMentalHealth, type MentalHealthResult } from '../utils/mentalHealthAnalysis';
import { crisisResources } from '../data/mentalHealthData';

export function MentalHealthAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<MentalHealthResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const analysis = analyzeMentalHealth(inputText);
    setResult(analysis);
    setIsAnalyzing(false);
  };

  const getSentimentEmoji = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😔';
      case 'neutral': return '😐';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'crisis': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'anxiety': return '😰';
      case 'depression': return '😢';
      case 'stress': return '😤';
      case 'wellbeing': return '🌟';
      case 'support': return '🤝';
      default: return '🧠';
    }
  };

  const placeholderText = selectedLanguage === 'hi' 
    ? 'यहाँ अपने विचार या भावनाएं लिखें... उदाहरण: "मैं बहुत परेशान हूं और समझ नहीं आ रहा कि क्या करूं।"'
    : 'Share your thoughts or feelings here... For example: "I feel overwhelmed with work and can\'t seem to catch a break."';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-semibold text-gray-800">Mental Health Text Analysis</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'hi')}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={placeholderText}
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          maxLength={1000}
        />
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">
            {inputText.length}/1000 characters
          </span>
          
          <button
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isAnalyzing}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Mental Health</span>
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className={`rounded-2xl shadow-2xl p-6 border-2 transition-all duration-500 animate-fade-in backdrop-blur-sm ${getRiskColor(result.riskLevel)}`}>
          {result.riskLevel === 'crisis' && (
            <div className="bg-gradient-to-r from-red-100 to-pink-100 border border-red-300 rounded-xl p-6 mb-6 shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-6 h-6 text-red-600 animate-pulse" />
                <h3 className="font-bold text-red-800 text-lg">🚨 Crisis Alert - Immediate Support Needed</h3>
              </div>
              <div className="space-y-2">
                {crisisResources[result.language === 'hi' ? 'hi' : 'en'].map((resource, index) => (
                  <div key={index} className="flex items-center space-x-2 text-red-700 bg-white/50 rounded-lg p-3">
                    <Phone className="w-4 h-4" />
                    <span className="font-semibold">{resource.name}:</span>
                    <span className="font-mono text-lg font-bold">{resource.phone}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{getSentimentEmoji(result.sentiment)}</span>
                <span className="font-medium text-gray-700">Sentiment</span>
              </div>
              <div className="text-xl font-bold capitalize bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{result.sentiment}</div>
              <div className="text-sm text-gray-600">{result.confidence}% confidence</div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{getCategoryEmoji(result.category)}</span>
                <span className="font-medium text-gray-700">Category</span>
              </div>
              <div className="text-xl font-bold capitalize bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{result.category}</div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Risk Level</span>
              </div>
              <div className="text-xl font-bold capitalize bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{result.riskLevel}</div>
              <div className="text-sm text-gray-600">Severity: {result.severity}/5</div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">Language</span>
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                {result.language === 'hi' ? 'हिंदी' : 'English'}
              </div>
            </div>
          </div>

          {result.keyWords.length > 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/50 shadow-lg">
              <h4 className="font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Key Emotional Indicators</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.keyWords.map((word, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Personalized Recommendations</span>
            </h4>
            <ul className="space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-purple-500 mt-1 font-bold">✨</span>
                  <span className="text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}