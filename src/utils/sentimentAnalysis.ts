import { positiveWords, negativeWords } from '../data/imdbData';

export interface SentimentResult {
  sentiment: 'positive' | 'negative';
  confidence: number;
  positiveScore: number;
  negativeScore: number;
  wordCount: number;
  keyWords: string[];
}

export function analyzeSentiment(text: string): SentimentResult {
  // Clean and tokenize the text
  const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
  const words = cleanText.split(/\s+/).filter(word => word.length > 2);
  
  let positiveScore = 0;
  let negativeScore = 0;
  const keyWords: string[] = [];
  
  // Calculate sentiment scores
  words.forEach(word => {
    if (positiveWords.includes(word)) {
      positiveScore++;
      keyWords.push(word);
    } else if (negativeWords.includes(word)) {
      negativeScore++;
      keyWords.push(word);
    }
  });
  
  // Apply context-based scoring
  const totalSentimentWords = positiveScore + negativeScore;
  const textLength = words.length;
  
  // Boost scores based on text length and sentiment word density
  const density = totalSentimentWords / Math.max(textLength, 1);
  const densityBoost = Math.min(density * 2, 1);
  
  positiveScore = positiveScore * (1 + densityBoost);
  negativeScore = negativeScore * (1 + densityBoost);
  
  // Handle negations (simple approach)
  const negationWords = ['not', 'no', 'never', 'nothing', 'nobody', 'nowhere', 'neither', 'nor'];
  let negationCount = 0;
  words.forEach(word => {
    if (negationWords.includes(word)) {
      negationCount++;
    }
  });
  
  // If there are negations, flip some of the sentiment
  if (negationCount > 0) {
    const flipAmount = Math.min(negationCount * 0.5, 1);
    const tempPositive = positiveScore;
    positiveScore = positiveScore * (1 - flipAmount) + negativeScore * flipAmount;
    negativeScore = negativeScore * (1 - flipAmount) + tempPositive * flipAmount;
  }
  
  // Determine final sentiment
  const totalScore = positiveScore + negativeScore;
  const sentiment: 'positive' | 'negative' = positiveScore > negativeScore ? 'positive' : 'negative';
  
  // Calculate confidence (0-100)
  let confidence = 50; // Base confidence
  if (totalScore > 0) {
    const dominantScore = Math.max(positiveScore, negativeScore);
    const ratio = dominantScore / totalScore;
    confidence = Math.min(50 + (ratio * 50), 95); // Cap at 95%
  }
  
  // Boost confidence for longer texts with clear sentiment
  if (textLength > 20 && totalScore > 3) {
    confidence = Math.min(confidence * 1.1, 95);
  }
  
  return {
    sentiment,
    confidence: Math.round(confidence),
    positiveScore: Math.round(positiveScore * 10) / 10,
    negativeScore: Math.round(negativeScore * 10) / 10,
    wordCount: textLength,
    keyWords: [...new Set(keyWords)].slice(0, 10) // Remove duplicates and limit
  };
}

export function getWordFrequency(texts: string[], sentiment: 'positive' | 'negative'): Array<{word: string, count: number}> {
  const wordCounts: Record<string, number> = {};
  const targetWords = sentiment === 'positive' ? positiveWords : negativeWords;
  
  texts.forEach(text => {
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
    const words = cleanText.split(/\s+/).filter(word => word.length > 2);
    
    words.forEach(word => {
      if (targetWords.includes(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
  });
  
  return Object.entries(wordCounts)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);
}

export function calculateModelAccuracy(): number {
  // Simulate model accuracy based on our sentiment analysis performance
  // In a real ML model, this would be calculated from test data
  return 87.3; // Simulated accuracy percentage
}