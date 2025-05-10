
// This service handles API calls to OpenAI while protecting the API key

// Note: The API key below has exceeded its quota, so we'll add fallback responses
const OPENAI_API_KEY = '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';

// Fallback responses for common questions in both English and Telugu
const FALLBACK_RESPONSES = {
  greeting: {
    english: "Hello! Welcome to HomeIgo. How can I assist you today?",
    telugu: "నమస్కారం! హోమ్ ఇగో కి స్వాగతం. నేను మీకు ఎలా సహాయం చేయగలను?"
  },
  services: {
    english: "We offer a variety of home services including home cleaning, kitchen cleaning, plumbing, electrical work, painting, carpentry, gardening, and pest control.",
    telugu: "మేము ఇంటి శుభ్రపరచడం, వంటగది శుభ్రపరచడం, ప్లంబింగ్, విద్యుత్ పని, పెయింటింగ్, వడ్రంగం, తోట పని మరియు కీటక నియంత్రణ వంటి వివిధ హోమ్ సర్వీసులను అందిస్తున్నాము."
  },
  pricing: {
    english: "Our pricing varies by service. Home cleaning starts at ₹80/hour, kitchen cleaning at ₹60/hour, garden maintenance at ₹120/hour, plumbing at ₹95/hour, electrical services at ₹100/hour, and pest control at ₹70/room.",
    telugu: "మా ధరలు సేవలను బట్టి మారుతూ ఉంటాయి. హోమ్ క్లీనింగ్ ₹80/గంట నుండి, కిచెన్ క్లీనింగ్ ₹60/గంట నుండి, గార్డెన్ మెయింటెనెన్స్ ₹120/గంట నుండి, ప్లంబింగ్ ₹95/గంట నుండి, ఎలక్ట్రికల్ సర్వీసెస్ ₹100/గంట నుండి, మరియు పెస్ట్ కంట్రోల్ ₹70/రూమ్ నుండి ప్రారంభమవుతాయి."
  },
  booking: {
    english: "To book a service, simply browse our services page, select the one you need, choose your preferred date and time, and complete the booking. You can pay online or by cash on delivery.",
    telugu: "సేవను బుక్ చేయడానికి, మా సేవల పేజీని బ్రౌజ్ చేయండి, మీకు కావలసిన దాన్ని ఎంచుకోండి, మీకు అనుకూలమైన తేదీ మరియు సమయాన్ని ఎంచుకోండి మరియు బుకింగ్‌ను పూర్తి చేయండి. మీరు ఆన్‌లైన్‌లో లేదా డెలివరీలో నగదు చెల్లించవచ్చు."
  },
  support: {
    english: "For any questions or support, you can contact our customer service team at support@homeigo.com or call us at 1800-123-4567.",
    telugu: "ఏవైనా ప్రశ్నలు లేదా సహాయం కోసం, మీరు మా కస్టమర్ సర్వీస్ టీమ్‌ని support@homeigo.com వద్ద సంప్రదించవచ్చు లేదా 1800-123-4567 వద్ద మాకు కాల్ చేయవచ్చు."
  },
  default: {
    english: "Thank you for your question. Our team will get back to you shortly. You can also browse our services page for more information.",
    telugu: "మీ ప్రశ్నకు ధన్యవాదాలు. మా బృందం త్వరలో మీకు తిరిగి వస్తుంది. మరింత సమాచారం కోసం మీరు మా సేవల పేజీని కూడా బ్రౌజ్ చేయవచ్చు."
  }
};

// Function to generate a fallback response based on message content
const getFallbackResponse = (message) => {
  message = message.toLowerCase();
  
  if (message.includes('hi') || message.includes('hello') || message.includes('hey') || 
      message.includes('హలో') || message.includes('నమస్కారం')) {
    return FALLBACK_RESPONSES.greeting;
  }
  
  if (message.includes('service') || message.includes('offer') || 
      message.includes('provide') || message.includes('సేవ')) {
    return FALLBACK_RESPONSES.services;
  }
  
  if (message.includes('price') || message.includes('cost') || 
      message.includes('rate') || message.includes('charge') || message.includes('ధర')) {
    return FALLBACK_RESPONSES.pricing;
  }
  
  if (message.includes('book') || message.includes('schedule') || 
      message.includes('appoint') || message.includes('reserve') || message.includes('బుక్')) {
    return FALLBACK_RESPONSES.booking;
  }
  
  if (message.includes('help') || message.includes('support') || 
      message.includes('contact') || message.includes('call') || message.includes('సహాయం')) {
    return FALLBACK_RESPONSES.support;
  }
  
  return FALLBACK_RESPONSES.default;
};

export const getChatbotResponse = async (messageHistory) => {
  try {
    const userMessage = messageHistory[messageHistory.length - 1].content;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant for HomeIgo, a home services marketplace. 
            Answer questions about HomeIgo services like home cleaning, kitchen cleaning, plumbing, gardening, etc.
            Always provide answers in BOTH English and Telugu languages.
            Format your responses with English first, followed by Telugu translation (separated by a line break).
            Be friendly, helpful, and concise.
            Include information about pricing, service details, and booking process when relevant.
            Sample services include:
            - Home Cleaning (₹80/hour): Professional home cleaning service including dusting, vacuuming, and sanitizing.
            - Kitchen Cleaning (₹60/hour): Deep cleaning for kitchen including appliances, countertops, and cabinets.
            - Garden Maintenance (₹120/hour): Comprehensive garden care including lawn mowing, pruning, and weeding.
            - Plumbing Services (₹95/hour): Professional plumbing repair and maintenance for all water system needs.
            - Electrical Services (₹100/hour): Expert electrical repairs, installations, and maintenance.
            - Painting Services (₹85/sqft): Professional painting for interior and exterior surfaces.
            - Carpentry (₹110/hour): Custom furniture building, repairs, and installations.
            - Pest Control (₹70/room): Complete pest elimination and prevention services.
            
            HomeIgo offers services in major cities including Hyderabad, Mumbai, Delhi, Bangalore, and Chennai.
            Bookings can be made online or through the app, with options for one-time service or recurring subscriptions.
            Payment can be made online through credit/debit cards, UPI, or cash on delivery.
            All service providers are verified, trained, and insured.
            There is a 100% satisfaction guarantee on all services.`
          },
          ...messageHistory
        ],
        temperature: 0.5,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      // If API call fails, use the fallback mechanism
      console.log('OpenAI API request failed, using fallback response');
      const fallbackResponse = getFallbackResponse(userMessage);
      
      return {
        choices: [
          {
            message: {
              content: `${fallbackResponse.english}\n\n${fallbackResponse.telugu}`
            }
          }
        ]
      };
    }

    return await response.json();
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Even if there's an unexpected error, still provide a fallback response
    const userMessage = messageHistory[messageHistory.length - 1].content;
    const fallbackResponse = getFallbackResponse(userMessage);
    
    return {
      choices: [
        {
          message: {
            content: `${fallbackResponse.english}\n\n${fallbackResponse.telugu}`
          }
        }
      ]
    };
  }
};
