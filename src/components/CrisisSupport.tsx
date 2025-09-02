import React, { useState } from 'react';
import { Phone, MessageCircle, Globe, AlertTriangle, Heart, Shield } from 'lucide-react';
import { crisisResources } from '../data/mentalHealthData';

export function CrisisSupport() {
  const [selectedCountry, setSelectedCountry] = useState<'en' | 'hi'>('en');

  const emergencyTips = {
    en: [
      "If you're in immediate danger, call emergency services (911)",
      "Reach out to a trusted friend, family member, or counselor",
      "Remove any means of self-harm from your immediate environment",
      "Go to the nearest emergency room or urgent care center",
      "Use grounding techniques: name 5 things you can see, 4 you can touch, 3 you can hear",
      "Remember: This feeling is temporary and will pass"
    ],
    hi: [
      "यदि आप तत्काल खतरे में हैं, तो आपातकालीन सेवाओं को कॉल करें (100/108)",
      "किसी विश्वसनीय मित्र, परिवारजन या परामर्शदाता से संपर्क करें",
      "अपने आसपास से आत्म-नुकसान के साधनों को हटा दें",
      "निकटतम आपातकालीन कक्ष या तत्काल देखभाल केंद्र जाएं",
      "ग्राउंडिंग तकनीक का उपयोग करें: 5 चीजें जो आप देख सकते हैं, 4 जिन्हें छू सकते हैं, 3 जो सुन सकते हैं",
      "याद रखें: यह भावना अस्थायी है और बीत जाएगी"
    ]
  };

  const copingStrategies = {
    en: [
      "Practice deep breathing exercises",
      "Use the 5-4-3-2-1 grounding technique",
      "Listen to calming music or nature sounds",
      "Take a warm bath or shower",
      "Write in a journal about your feelings",
      "Engage in light physical activity like walking",
      "Call a crisis helpline to talk to someone",
      "Use a mental health app for guided support"
    ],
    hi: [
      "गहरी सांस लेने का अभ्यास करें",
      "5-4-3-2-1 ग्राउंडिंग तकनीक का उपयोग करें",
      "शांत संगीत या प्राकृतिक ध्वनियां सुनें",
      "गर्म स्नान करें",
      "अपनी भावनाओं के बारे में डायरी में लिखें",
      "हल्की शारीरिक गतिविधि जैसे टहलना करें",
      "संकट हेल्पलाइन पर कॉल करके किसी से बात करें",
      "मानसिक स्वास्थ्य ऐप का उपयोग करें"
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold text-red-800">Crisis Support & Emergency Resources</h2>
        </div>
        
        <div className="bg-red-100 rounded-lg p-4 mb-4">
          <p className="text-red-800 font-medium">
            🚨 If you're having thoughts of self-harm or suicide, please reach out for help immediately. 
            You are not alone, and support is available 24/7.
          </p>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <Globe className="w-5 h-5 text-gray-600" />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value as 'en' | 'hi')}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="en">🇺🇸 United States / International</option>
            <option value="hi">🇮🇳 India / भारत</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {crisisResources[selectedCountry].map((resource, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-gray-800">{resource.name}</h3>
              </div>
              <div className="text-2xl font-bold text-red-600 mb-2">{resource.phone}</div>
              <p className="text-sm text-gray-600">{resource.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedCountry === 'hi' ? 'तत्काल सहायता के लिए कदम' : 'Immediate Help Steps'}
            </h3>
          </div>
          <ul className="space-y-3">
            {emergencyTips[selectedCountry].map((tip, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-orange-500 font-bold mt-1">{index + 1}.</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedCountry === 'hi' ? 'तत्काल राहत की रणनीतियां' : 'Immediate Coping Strategies'}
            </h3>
          </div>
          <ul className="space-y-2">
            {copingStrategies[selectedCountry].map((strategy, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-gray-700">{strategy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800">
            {selectedCountry === 'hi' ? 'याद रखें' : 'Remember'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
          <div>
            <h4 className="font-semibold mb-2">
              {selectedCountry === 'hi' ? '🌟 आप अकेले नहीं हैं' : '🌟 You Are Not Alone'}
            </h4>
            <p className="text-sm">
              {selectedCountry === 'hi' 
                ? 'लाखों लोग मानसिक स्वास्थ्य की चुनौतियों का सामना करते हैं। सहायता मांगना साहस का प्रतीक है।'
                : 'Millions of people face mental health challenges. Seeking help is a sign of strength, not weakness.'
              }
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              {selectedCountry === 'hi' ? '💚 यह अस्थायी है' : '💚 This Is Temporary'}
            </h4>
            <p className="text-sm">
              {selectedCountry === 'hi'
                ? 'आपकी वर्तमान भावनाएं और परिस्थितियां बदल सकती हैं। उपचार और सहायता उपलब्ध है।'
                : 'Your current feelings and circumstances can change. Treatment and support are available.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}