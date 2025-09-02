// Mental health dataset with real examples
export interface MentalHealthEntry {
  id: number;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: 'anxiety' | 'depression' | 'stress' | 'wellbeing' | 'support';
  severity: 1 | 2 | 3 | 4 | 5; // 1 = mild, 5 = severe
  language: 'en' | 'hi';
}

export const mentalHealthDataset: MentalHealthEntry[] = [
  {
    id: 1,
    text: "I feel overwhelmed with work and can't seem to catch a break. Everything feels too much right now.",
    sentiment: 'negative',
    category: 'stress',
    severity: 4,
    language: 'en'
  },
  {
    id: 2,
    text: "Today was a good day. I managed to complete my tasks and even had time for a walk in the park.",
    sentiment: 'positive',
    category: 'wellbeing',
    severity: 1,
    language: 'en'
  },
  {
    id: 3,
    text: "मैं बहुत परेशान हूं और समझ नहीं आ रहा कि क्या करूं। लगता है जैसे कोई रास्ता नहीं है।",
    sentiment: 'negative',
    category: 'anxiety',
    severity: 5,
    language: 'hi'
  },
  {
    id: 4,
    text: "I've been feeling really anxious about the future. My heart races whenever I think about tomorrow.",
    sentiment: 'negative',
    category: 'anxiety',
    severity: 4,
    language: 'en'
  },
  {
    id: 5,
    text: "Meditation helped me feel centered today. I'm grateful for small moments of peace.",
    sentiment: 'positive',
    category: 'wellbeing',
    severity: 1,
    language: 'en'
  },
  {
    id: 6,
    text: "आज मैंने योग किया और बहुत अच्छा लगा। मन शांत हो गया।",
    sentiment: 'positive',
    category: 'wellbeing',
    severity: 1,
    language: 'hi'
  },
  {
    id: 7,
    text: "I can't get out of bed. Everything feels pointless and I have no energy for anything.",
    sentiment: 'negative',
    category: 'depression',
    severity: 5,
    language: 'en'
  },
  {
    id: 8,
    text: "Talking to my friend really helped. Sometimes we just need someone to listen.",
    sentiment: 'positive',
    category: 'support',
    severity: 1,
    language: 'en'
  },
  {
    id: 9,
    text: "मुझे लगता है कि मैं अकेला हूं और कोई मुझे समझता नहीं है।",
    sentiment: 'negative',
    category: 'depression',
    severity: 4,
    language: 'hi'
  },
  {
    id: 10,
    text: "I'm learning to be kinder to myself. Progress isn't always linear, and that's okay.",
    sentiment: 'positive',
    category: 'wellbeing',
    severity: 2,
    language: 'en'
  },
  {
    id: 11,
    text: "The panic attacks are getting worse. I feel like I'm losing control of my life.",
    sentiment: 'negative',
    category: 'anxiety',
    severity: 5,
    language: 'en'
  },
  {
    id: 12,
    text: "आज परिवार के साथ समय बिताया। खुशी मिली और मन हल्का हो गया।",
    sentiment: 'positive',
    category: 'support',
    severity: 1,
    language: 'hi'
  },
  {
    id: 13,
    text: "Work stress is affecting my sleep. I lie awake worrying about deadlines and meetings.",
    sentiment: 'negative',
    category: 'stress',
    severity: 3,
    language: 'en'
  },
  {
    id: 14,
    text: "I started journaling and it's helping me process my emotions better.",
    sentiment: 'positive',
    category: 'wellbeing',
    severity: 2,
    language: 'en'
  },
  {
    id: 15,
    text: "मैं बहुत डरा हुआ हूं। हर छोटी बात में घबराहट होती है।",
    sentiment: 'negative',
    category: 'anxiety',
    severity: 4,
    language: 'hi'
  },
  {
    id: 16,
    text: "Therapy sessions are helping me understand my patterns and triggers better.",
    sentiment: 'positive',
    category: 'support',
    severity: 2,
    language: 'en'
  },
  {
    id: 17,
    text: "I feel empty inside, like nothing matters anymore. The sadness is overwhelming.",
    sentiment: 'negative',
    category: 'depression',
    severity: 5,
    language: 'en'
  },
  {
    id: 18,
    text: "आज मैंने अपने दोस्त से बात की। उसकी सलाह से मन को शांति मिली।",
    sentiment: 'positive',
    category: 'support',
    severity: 1,
    language: 'hi'
  },
  {
    id: 19,
    text: "The breathing exercises are actually working. I feel more in control during stressful moments.",
    sentiment: 'positive',
    category: 'wellbeing',
    severity: 2,
    language: 'en'
  },
  {
    id: 20,
    text: "मुझे नींद नहीं आती। रात भर चिंता में जागता रहता हूं।",
    sentiment: 'negative',
    category: 'stress',
    severity: 4,
    language: 'hi'
  }
];

// Crisis support resources
export const crisisResources = {
  en: [
    {
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 crisis support and suicide prevention"
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "24/7 text-based crisis support"
    },
    {
      name: "SAMHSA National Helpline",
      phone: "1-800-662-4357",
      description: "Mental health and substance abuse support"
    }
  ],
  hi: [
    {
      name: "आत्महत्या रोकथाम हेल्पलाइन",
      phone: "91-9152987821",
      description: "24/7 संकट सहायता और आत्महत्या रोकथाम"
    },
    {
      name: "मानसिक स्वास्थ्य हेल्पलाइन",
      phone: "1800-599-0019",
      description: "मानसिक स्वास्थ्य सहायता और परामर्श"
    },
    {
      name: "वंदना फाउंडेशन",
      phone: "9999666555",
      description: "मानसिक स्वास्थ्य सहायता सेवा"
    }
  ]
};

// Positive and negative words for sentiment analysis (multilingual)
export const sentimentWords = {
  positive: {
    en: [
      'happy', 'joy', 'love', 'peace', 'calm', 'grateful', 'blessed', 'hopeful', 'confident', 'strong',
      'better', 'good', 'great', 'amazing', 'wonderful', 'beautiful', 'positive', 'optimistic',
      'healing', 'recovery', 'progress', 'growth', 'support', 'help', 'care', 'comfort', 'relief',
      'meditation', 'therapy', 'exercise', 'yoga', 'mindfulness', 'breathing', 'relaxation'
    ],
    hi: [
      'खुश', 'खुशी', 'प्रेम', 'शांति', 'आराम', 'कृतज्ञ', 'आशा', 'विश्वास', 'मजबूत', 'बेहतर',
      'अच्छा', 'सुंदर', 'सकारात्मक', 'उम्मीद', 'चंगाई', 'प्रगति', 'सहायता', 'देखभाल', 'आराम',
      'ध्यान', 'योग', 'व्यायाम', 'श्वास', 'विश्राम', 'समर्थन', 'मदद'
    ]
  },
  negative: {
    en: [
      'sad', 'depressed', 'anxious', 'worried', 'scared', 'afraid', 'panic', 'stress', 'overwhelmed',
      'hopeless', 'helpless', 'lonely', 'isolated', 'empty', 'numb', 'tired', 'exhausted', 'pain',
      'hurt', 'suffering', 'crisis', 'suicidal', 'self-harm', 'cutting', 'death', 'dying', 'end',
      'terrible', 'awful', 'horrible', 'worst', 'hate', 'angry', 'rage', 'frustrated', 'confused'
    ],
    hi: [
      'दुखी', 'उदास', 'चिंतित', 'डरा', 'भयभीत', 'घबराहट', 'तनाव', 'परेशान', 'निराश',
      'असहाय', 'अकेला', 'खाली', 'थका', 'दर्द', 'पीड़ा', 'संकट', 'आत्महत्या', 'मौत',
      'भयानक', 'बुरा', 'गुस्सा', 'क्रोध', 'निराशा', 'भ्रम', 'परेशानी'
    ]
  }
};

// Mood tracking data
export interface MoodEntry {
  id: number;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5;
  notes: string;
  activities: string[];
}

export const moodHistory: MoodEntry[] = [
  {
    id: 1,
    date: '2024-01-15',
    mood: 3,
    notes: 'Feeling okay today, had some work stress',
    activities: ['work', 'reading']
  },
  {
    id: 2,
    date: '2024-01-14',
    mood: 4,
    notes: 'Good day! Went for a walk and called a friend',
    activities: ['exercise', 'socializing']
  },
  {
    id: 3,
    date: '2024-01-13',
    mood: 2,
    notes: 'Feeling down, struggled to get out of bed',
    activities: ['rest']
  },
  {
    id: 4,
    date: '2024-01-12',
    mood: 5,
    notes: 'Excellent day! Meditation and yoga helped a lot',
    activities: ['meditation', 'yoga']
  }
];