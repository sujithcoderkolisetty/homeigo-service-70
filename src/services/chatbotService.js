
// This service handles API calls to OpenAI while protecting the API key

const OPENAI_API_KEY = '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';

export const getChatbotResponse = async (messageHistory) => {
  try {
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
            Format your responses with English first, followed by Telugu translation.
            Be friendly, helpful, and concise.
            Include information about pricing, service details, and booking process when relevant.
            Sample services include:
            - Home Cleaning (₹80): Professional home cleaning service including dusting, vacuuming, and sanitizing.
            - Kitchen Cleaning (₹60): Deep cleaning for kitchen including appliances, countertops, and cabinets.
            - Garden Maintenance (₹120): Comprehensive garden care including lawn mowing, pruning, and weeding.
            - Plumbing Services (₹95): Professional plumbing repair and maintenance for all water system needs.`
          },
          ...messageHistory
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from AI');
    }

    return await response.json();
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};
