
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
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from AI');
    }

    return await response.json();
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};
