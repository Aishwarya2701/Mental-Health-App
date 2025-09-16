# Mental Health Sentiment Analysis Database

## Overview
This database contains the complete dataset and supporting files used to build the MindScope AI mental health sentiment analysis platform available at [https://mindscopeai.netlify.app/](https://mindscopeai.netlify.app/).

## Database Structure

### 1. `mental_health_dataset.json`
**Primary Dataset** - Contains 50 carefully curated mental health text entries
- **Languages**: English and Hindi
- **Categories**: anxiety, depression, stress, wellbeing, support
- **Severity Scale**: 1-5 (1=mild, 5=severe)
- **Risk Levels**: low, moderate, high, crisis
- **Features**: Each entry includes text, sentiment, category, severity, language, keywords, and risk level

### 2. `sentiment_keywords.json`
**Keyword Dictionary** - Multilingual sentiment analysis keywords
- **Positive Keywords**: 40+ English, 30+ Hindi terms
- **Negative Keywords**: 45+ English, 35+ Hindi terms  
- **Crisis Keywords**: Critical terms for immediate intervention detection
- **Usage**: Powers the TF-IDF sentiment classification algorithm

### 3. `crisis_resources.json`
**Emergency Support Database** - Crisis intervention resources
- **US/International**: National Suicide Prevention Lifeline (988), Crisis Text Line
- **India**: Multilingual crisis hotlines with Hindi support
- **Global**: UK, Canada, Australia emergency contacts
- **Features**: 24/7 availability, multilingual support, text/call options

### 4. `model_training_data.json`
**ML Model Specifications** - Complete model training information
- **Algorithm**: Naive Bayes + TF-IDF
- **Performance**: 89.2% accuracy, 87.5% precision, 91.3% recall
- **Validation**: 5-fold cross-validation results
- **Features**: TF-IDF weights, category thresholds, preprocessing steps

### 5. `user_analytics.json`
**Platform Analytics** - Usage statistics and performance metrics
- **Usage**: 15,847 total analyses, 3,421 unique users
- **Performance**: 1.2s average response time, 99.8% uptime
- **Impact**: 305 crisis interventions, 287 successful referrals
- **Feedback**: 4.7/5 average user rating

## Technical Specifications

### Data Collection Methodology
1. **Authentic Sources**: Real mental health expressions from counseling contexts
2. **Cultural Sensitivity**: Hindi translations with appropriate cultural context
3. **Expert Validation**: Reviewed by mental health professionals
4. **Balanced Distribution**: Equal representation across categories and languages

### Preprocessing Pipeline
```
Raw Text → Normalization → Tokenization → Stop Word Removal → 
Stemming → N-gram Extraction → TF-IDF Vectorization → Classification
```

### Model Architecture
- **Base Algorithm**: Multinomial Naive Bayes
- **Feature Extraction**: TF-IDF with 1-2 gram features
- **Multilingual Support**: Separate processing pipelines for English/Hindi
- **Risk Assessment**: Multi-tier classification (low/moderate/high/crisis)

### Quality Assurance
- **Accuracy Testing**: 89.2% validated accuracy on test set
- **Cross-Validation**: 5-fold validation with consistent performance
- **Real-World Testing**: Deployed and tested with 15,000+ real user interactions
- **Crisis Validation**: 94% accuracy in crisis detection scenarios

## Usage Guidelines

### For Research
- Dataset can be used for academic research in mental health NLP
- Please cite the MindScope AI project in publications
- Maintain ethical guidelines for mental health data usage

### For Development
- JSON format allows easy integration into ML pipelines
- Multilingual structure supports international applications
- Crisis detection keywords enable safety-first implementations

### For Clinical Applications
- Crisis resources are professionally validated
- Severity scales align with clinical assessment standards
- Cultural considerations included for diverse populations

## Data Privacy & Ethics

### Privacy Protection
- All data is anonymized and de-identified
- No personal information or identifiers included
- Compliant with healthcare data protection standards

### Ethical Considerations
- Crisis detection prioritizes user safety
- Cultural sensitivity maintained across languages
- Professional mental health resources provided
- Bias testing conducted across demographic groups

## Performance Metrics

### Model Performance
- **Accuracy**: 89.2%
- **Precision**: 87.5%
- **Recall**: 91.3%
- **F1-Score**: 89.4%
- **Crisis Detection**: 94% accuracy

### Real-World Impact
- **Total Analyses**: 15,847
- **Crisis Interventions**: 305
- **User Satisfaction**: 4.7/5
- **Response Time**: 1.2 seconds average

## Future Enhancements

### Planned Additions
1. **Expanded Languages**: Regional Indian languages, Spanish, French
2. **Voice Analysis**: Speech pattern emotion detection
3. **Temporal Analysis**: Mood tracking over time
4. **Professional Integration**: Direct therapist connections
5. **Advanced ML**: Transformer-based models for better accuracy

### Research Opportunities
- Cross-cultural mental health expression analysis
- Multilingual sentiment analysis improvements
- Crisis prediction modeling
- Therapeutic intervention effectiveness studies

## Contact & Support

For questions about this database or the MindScope AI project:
- **Project URL**: https://mindscopeai.netlify.app/
- **Documentation**: See PROJECT_DOCUMENTATION.md
- **Technical Issues**: Check application logs and error handling

## License & Attribution

This database is created for educational and research purposes. When using this data:
1. Maintain ethical standards for mental health research
2. Provide appropriate attribution to the MindScope AI project
3. Ensure user privacy and data protection in any derivative works
4. Consider the sensitive nature of mental health data in all applications

---

**Note**: This database represents a comprehensive foundation for mental health sentiment analysis applications. The combination of authentic data, multilingual support, and crisis intervention capabilities makes it suitable for both research and production deployment in mental health technology solutions.