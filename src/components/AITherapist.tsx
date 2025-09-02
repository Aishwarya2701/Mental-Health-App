import React, { useState, useEffect } from 'react';
import { Bot, Send, Sparkles, Heart, Brain, MessageCircle } from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
}

export function AITherapist() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm your AI mental health companion. I'm here to listen, support, and guide you through your emotional journey. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
      emotion: 'supportive'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const therapistResponses = {
    anxiety: [
      "I can sense the anxiety in your words, and I want you to know that what you're feeling is completely valid. Anxiety often feels like a storm, but remember - you are not the storm, you are the observer of it. Let's try a powerful grounding technique: Can you tell me 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste?",
      "Anxiety has a way of making our minds race into the future, creating scenarios that may never happen. You've navigated difficult moments before, and that shows incredible resilience. What's one small thing that has helped you feel more grounded in the past? Even the tiniest coping mechanism can be our anchor.",
      "Your nervous system is trying to protect you, but sometimes it gets a bit overprotective. Think of anxiety as a smoke alarm that's too sensitive - it's doing its job, but maybe too enthusiastically. Let's work together on some breathing techniques that can help reset your nervous system. Would you like to try the 4-7-8 breathing method with me?",
      "I notice you're carrying a lot of worry right now. Imagine for a moment that you could set down this heavy backpack of anxiety - what would that feel like? Sometimes just acknowledging that we're carrying too much is the first step toward relief. What's one worry you'd be willing to set down, even just for the next few minutes?"
    ],
    depression: [
      "I can feel the weight in your words, and I want you to know that reaching out takes tremendous courage. Depression often whispers lies about our worth, but here's the truth: you matter deeply, your feelings are valid, and this darkness is not permanent. You're not broken - you're human, experiencing something incredibly difficult.",
      "When depression clouds our vision, even small tasks can feel like climbing mountains. But here's what I see: you're here, you're communicating, you're still fighting. That's not nothing - that's everything. What's one tiny spark of light, however small, that you've noticed recently? Maybe a song, a pet, a warm cup of tea?",
      "Depression can make us feel invisible, like we're watching life through thick glass. But I see you, I hear you, and your pain matters. Sometimes healing isn't about feeling better immediately - it's about learning to be gentle with ourselves in the darkness. What would it look like to treat yourself with the same kindness you'd show a dear friend?",
      "The fact that you're here, sharing these feelings, tells me something important about your strength. Depression tries to convince us we're alone, but connection - even this moment between us - is proof that isolation is an illusion. You're part of a larger human story of struggle and resilience."
    ],
    stress: [
      "I can sense the pressure you're under - it's like trying to hold too many balls in the air at once. Stress has a way of making everything feel urgent and overwhelming. Let's take a step back together. What if we could sort your stressors into three piles: things you can control today, things you can influence over time, and things you need to release? Which pile feels heaviest right now?",
      "Your nervous system is in overdrive, and that's exhausting. Imagine stress as a river - you can't stop the water, but you can learn to navigate it more skillfully. What would it look like to be your own best friend today? How would you comfort someone you love who was feeling exactly what you're feeling?",
      "Stress often comes from our mind's attempt to solve everything at once. But our brains aren't designed to carry the weight of every possible future scenario. Let's practice something called 'temporal grounding' - what's one thing you can do in the next 10 minutes that would bring you even a small sense of accomplishment or peace?",
      "I notice you're in survival mode right now, and that takes incredible energy. Your body is working overtime to keep you going. What's one way you could send a signal to your nervous system that you're safe in this moment? Maybe through gentle movement, deep breathing, or even just placing your hand on your heart?"
    ],
    positive: [
      "There's such beautiful energy radiating from your words! It's like sunshine breaking through clouds. This positive state you're in - it's not just a fleeting moment, it's evidence of your capacity for joy and resilience. What's the secret ingredient that's contributing to this wonderful feeling? I'd love to help you bottle this magic.",
      "Your positive energy is absolutely contagious! I can feel the lightness and hope in what you're sharing. This is your natural state shining through. How can we create a blueprint for maintaining this beautiful momentum? What practices, thoughts, or connections are feeding this positive flame?",
      "What a gift to witness you in this space of wellbeing! Your words carry such life and vitality. This isn't just 'feeling good' - this is you accessing your inner wisdom and strength. What would it look like to remember this feeling during challenging times? How can we anchor this positive state?",
      "The joy in your message is palpable, and it reminds me that healing and happiness are always possible. You're living proof that our emotional landscape can shift toward light. What practices or mindset shifts have contributed to this beautiful state? Your insights could be incredibly valuable for your future self."
    ],
    general: [
      "Thank you for trusting me with your thoughts and feelings. There's something profound about the act of putting our inner experience into words - it's the first step toward understanding and healing. Your willingness to share shows incredible courage. What feels most important for you to explore right now?",
      "I'm honored that you've chosen to open up here. Every feeling you're experiencing is valid and deserves attention. Sometimes we need to explore and understand, other times we need practical tools and strategies. What would serve you best in this moment - deeper exploration of what you're feeling, or some concrete coping techniques?",
      "The fact that you're here, reaching out and sharing, speaks volumes about your strength and self-awareness. Many people struggle in silence, but you're choosing connection and support. That's not just brave - it's wise. What's weighing most heavily on your heart today? I'm here to listen without judgment.",
      "I can sense there's a lot happening beneath the surface of your words. Sometimes our feelings are like icebergs - what we express is just the tip, and there's so much more underneath. I'm here to help you navigate whatever you're experiencing. What would feel most supportive right now - having someone truly listen, getting some perspective, or learning some new coping tools?"
    ]
  };

  const detectEmotion = (text: string): keyof typeof therapistResponses => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('panic') || lowerText.includes('nervous')) {
      return 'anxiety';
    }
    if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('hopeless') || lowerText.includes('empty')) {
      return 'depression';
    }
    if (lowerText.includes('stress') || lowerText.includes('overwhelmed') || lowerText.includes('pressure') || lowerText.includes('tired')) {
      return 'stress';
    }
    if (lowerText.includes('happy') || lowerText.includes('good') || lowerText.includes('great') || lowerText.includes('better')) {
      return 'positive';
    }
    return 'general';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const emotion = detectEmotion(inputText);
    const responses = therapistResponses[emotion];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const aiMessage: ChatMessage = {
      id: messages.length + 2,
      text: randomResponse,
      sender: 'ai',
      timestamp: new Date(),
      emotion
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Bot className="w-8 h-8" />
          <h2 className="text-2xl font-bold">AI Mental Health Companion</h2>
        </div>
        <p className="text-white/90">Your personal AI therapist trained on mental health conversations. Available 24/7 for support, guidance, and emotional wellness.</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 shadow-md border'
                }`}
              >
                {message.sender === 'ai' && (
                  <div className="flex items-center space-x-2 mb-1">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-medium text-purple-600">AI Therapist</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 shadow-md border px-4 py-2 rounded-lg max-w-xs">
                <div className="flex items-center space-x-2 mb-1">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-medium text-purple-600">AI Therapist</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t bg-white">
          <div className="flex space-x-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... I'm here to listen and support you."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={2}
              maxLength={500}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {inputText.length}/500 characters • Press Enter to send
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Empathetic AI</h3>
          </div>
          <p className="text-sm text-blue-700">Trained on therapeutic conversations to provide compassionate responses</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Intelligent Analysis</h3>
          </div>
          <p className="text-sm text-green-700">Analyzes emotional patterns and provides personalized coping strategies</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-purple-800">24/7 Support</h3>
          </div>
          <p className="text-sm text-purple-700">Always available when you need someone to talk to</p>
        </div>
      </div>
    </div>
  );
}