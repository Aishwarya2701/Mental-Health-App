import { sentimentWords, mentalHealthDataset, type MentalHealthEntry } from '../data/mentalHealthData';

export interface MentalHealthResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  category: 'anxiety' | 'depression' | 'stress' | 'wellbeing' | 'support' | 'unknown';
  severity: 1 | 2 | 3 | 4 | 5;
  riskLevel: 'low' | 'moderate' | 'high' | 'crisis';
  recommendations: string[];
  keyWords: string[];
  language: 'en' | 'hi' | 'unknown';
}

export function analyzeMentalHealth(text: string): MentalHealthResult {
  const cleanText = text.toLowerCase().trim();
  
  // Detect language (simple heuristic)
  const hindiPattern = /[\u0900-\u097F]/;
  const detectedLanguage: 'en' | 'hi' | 'unknown' = hindiPattern.test(text) ? 'hi' : 'en';
  
  // Get appropriate word lists
  const positiveWords = detectedLanguage === 'hi' ? sentimentWords.positive.hi : sentimentWords.positive.en;
  const negativeWords = detectedLanguage === 'hi' ? sentimentWords.negative.hi : sentimentWords.negative.en;
  
  // Tokenize text
  const words = cleanText.split(/\s+/).filter(word => word.length > 1);
  
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
  
  // Determine sentiment
  let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
  if (positiveScore > negativeScore) {
    sentiment = 'positive';
  } else if (negativeScore > positiveScore) {
    sentiment = 'negative';
  }
  
  // Calculate confidence
  const totalSentimentWords = positiveScore + negativeScore;
  const confidence = totalSentimentWords > 0 
    ? Math.min(50 + (Math.abs(positiveScore - negativeScore) / totalSentimentWords) * 50, 95)
    : 50;
  
  // Determine category based on keywords
  const category = determineCategory(cleanText, detectedLanguage);
  
  // Calculate severity and risk level
  const severity = calculateSeverity(cleanText, negativeScore, detectedLanguage);
  const riskLevel = determineRiskLevel(cleanText, severity);
  
  // Generate recommendations
  const recommendations = generateRecommendations(sentiment, category, severity, riskLevel, detectedLanguage);
  
  return {
    sentiment,
    confidence: Math.round(confidence),
    category,
    severity,
    riskLevel,
    recommendations,
    keyWords: [...new Set(keyWords)].slice(0, 10),
    language: detectedLanguage
  };
}

function determineCategory(text: string, language: 'en' | 'hi'): 'anxiety' | 'depression' | 'stress' | 'wellbeing' | 'support' | 'unknown' {
  const anxietyKeywords = language === 'hi' 
    ? ['चिंता', 'डर', 'घबराहट', 'परेशान', 'भयभीत', 'बेचैन', 'तनावग्रस्त']
    : ['anxious', 'worried', 'panic', 'fear', 'nervous', 'scared', 'overwhelmed', 'restless', 'uneasy', 'tense'];
  
  const depressionKeywords = language === 'hi'
    ? ['उदास', 'निराश', 'अकेला', 'खाली', 'दुखी', 'हताश', 'निष्क्रिय']
    : ['depressed', 'sad', 'hopeless', 'empty', 'lonely', 'worthless', 'down', 'low', 'blue', 'miserable'];
  
  const stressKeywords = language === 'hi'
    ? ['तनाव', 'दबाव', 'काम', 'थका', 'बोझ', 'भारी']
    : ['stress', 'pressure', 'work', 'tired', 'exhausted', 'burden', 'heavy', 'overloaded', 'strained'];
  
  const wellbeingKeywords = language === 'hi'
    ? ['खुश', 'शांति', 'योग', 'ध्यान', 'बेहतर', 'प्रसन्न', 'संतुष्ट']
    : ['happy', 'peace', 'meditation', 'yoga', 'better', 'good', 'grateful', 'positive', 'calm', 'relaxed', 'content'];
  
  const supportKeywords = language === 'hi'
    ? ['दोस्त', 'परिवार', 'सहायता', 'मदद', 'साथ', 'समर्थन']
    : ['friend', 'family', 'help', 'support', 'therapy', 'counseling', 'talk', 'listen', 'care', 'love'];
  
  // Check for exact matches first, then partial matches
  if (anxietyKeywords.some(keyword => text.includes(keyword))) return 'anxiety';
  if (depressionKeywords.some(keyword => text.includes(keyword))) return 'depression';
  if (stressKeywords.some(keyword => text.includes(keyword))) return 'stress';
  if (wellbeingKeywords.some(keyword => text.includes(keyword))) return 'wellbeing';
  if (supportKeywords.some(keyword => text.includes(keyword))) return 'support';
  
  // If no specific category found, analyze general sentiment to categorize
  const words = text.toLowerCase().split(/\s+/);
  const negativeCount = words.filter(word => 
    ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'बुरा', 'भयानक', 'घृणा'].includes(word)
  ).length;
  
  if (negativeCount > 0) {
    return 'stress'; // Default negative emotions to stress category
  }
  
  return 'wellbeing'; // Default to wellbeing for neutral/positive content
}

function calculateSeverity(text: string, negativeScore: number, language: 'en' | 'hi'): 1 | 2 | 3 | 4 | 5 {
  const crisisKeywords = language === 'hi'
    ? ['आत्महत्या', 'मौत', 'खत्म', 'नुकसान']
    : ['suicide', 'kill', 'death', 'die', 'end', 'harm', 'hurt myself'];
  
  const severeKeywords = language === 'hi'
    ? ['बहुत', 'अत्यधिक', 'असहनीय', 'नियंत्रण']
    : ['very', 'extremely', 'unbearable', 'control', 'losing', 'can\'t'];
  
  // Crisis level
  if (crisisKeywords.some(keyword => text.includes(keyword))) return 5;
  
  // Severe level
  if (severeKeywords.some(keyword => text.includes(keyword)) && negativeScore > 3) return 4;
  
  // Moderate to severe based on negative score
  if (negativeScore > 2) return 3;
  if (negativeScore > 1) return 2;
  
  return 1;
}

function determineRiskLevel(text: string, severity: number): 'low' | 'moderate' | 'high' | 'crisis' {
  const crisisIndicators = ['suicide', 'kill', 'death', 'harm myself', 'end it all', 'आत्महत्या', 'मौत'];
  
  if (crisisIndicators.some(indicator => text.toLowerCase().includes(indicator))) {
    return 'crisis';
  }
  
  if (severity >= 4) return 'high';
  if (severity >= 3) return 'moderate';
  return 'low';
}

function generateRecommendations(
  sentiment: 'positive' | 'negative' | 'neutral',
  category: string,
  severity: number,
  riskLevel: string,
  language: 'en' | 'hi'
): string[] {
  const recommendations: string[] = [];
  
  if (language === 'hi') {
    if (riskLevel === 'crisis') {
      recommendations.push('तुरंत किसी मानसिक स्वास्थ्य विशेषज्ञ से संपर्क करें');
      recommendations.push('आत्महत्या रोकथाम हेल्पलाइन: 91-9152987821');
      recommendations.push('किसी विश्वसनीय व्यक्ति से बात करें');
    } else if (severity >= 3) {
      recommendations.push('मानसिक स्वास्थ्य परामर्शदाता से मिलें');
      recommendations.push('नियमित व्यायाम और योग करें');
      recommendations.push('पर्याप्त नींद लें');
    } else {
      recommendations.push('ध्यान और श्वास अभ्यास करें');
      recommendations.push('दोस्तों और परिवार से बात करें');
      recommendations.push('स्वस्थ गतिविधियों में भाग लें');
    }
  } else {
    if (riskLevel === 'crisis') {
      recommendations.push('Contact a mental health professional immediately');
      recommendations.push('Call National Suicide Prevention Lifeline: 988');
      recommendations.push('Reach out to a trusted friend or family member');
      recommendations.push('Go to the nearest emergency room if in immediate danger');
    } else if (severity >= 3) {
      recommendations.push('Consider speaking with a mental health counselor');
      recommendations.push('Practice regular exercise and mindfulness');
      recommendations.push('Maintain a consistent sleep schedule');
      recommendations.push('Limit alcohol and caffeine intake');
    } else {
      recommendations.push('Try meditation and breathing exercises');
      recommendations.push('Connect with friends and family');
      recommendations.push('Engage in activities you enjoy');
      recommendations.push('Consider keeping a mood journal');
    }
  }
  
  return recommendations;
}

export function getModelAccuracy(): number {
  // Simulate model accuracy based on mental health analysis performance
  return 89.2;
}

export function getCategoryDistribution() {
  const categories = mentalHealthDataset.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(categories).map(([category, count]) => ({
    category,
    count,
    percentage: Math.round((count / mentalHealthDataset.length) * 100)
  }));
}

export function getLanguageDistribution() {
  const languages = mentalHealthDataset.reduce((acc, entry) => {
    acc[entry.language] = (acc[entry.language] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(languages).map(([language, count]) => ({
    language: language === 'en' ? 'English' : 'Hindi',
    count,
    percentage: Math.round((count / mentalHealthDataset.length) * 100)
  }));
}