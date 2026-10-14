const config = require('../config');
const { SYSTEM_INSTRUCTION, generateGroundedFallback } = require('../data/portfolioData');

/**
 * Generate a response from the portfolio assistant.
 * If GEMINI_API_KEY is configured, calls the Google Gemini API with system instructions.
 * If not configured or if an error occurs, falls back to the verified grounded knowledge base.
 *
 * @param {string} message - User message
 * @param {Array<{role: string, content: string}>} [history=[]] - Prior conversation messages
 * @returns {Promise<{success: boolean, reply: string, provider: string, isFallback: boolean, message?: string}>}
 */
async function generateAssistantReply(message, history = []) {
  if (!config.gemini.isConfigured) {
    const localReply = generateGroundedFallback(message);
    return {
      success: true,
      reply: localReply,
      provider: 'local-grounded-fallback',
      isFallback: true,
      note: 'GEMINI_API_KEY is not configured in server environment. This response was generated from verified portfolio data.'
    };
  }

  const model = config.gemini.model;
  const apiKey = config.gemini.apiKey;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  // Format valid conversation history (up to last 10 messages)
  const safeHistory = Array.isArray(history) ? history.slice(-10) : [];
  const contents = [
    ...safeHistory
      .filter((m) => m && m.content && typeof m.content === 'string')
      .map((m) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: String(m.content).trim() }]
      })),
    {
      role: 'user',
      parts: [{ text: message.trim() }]
    }
  ];

  const payload = {
    contents,
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }]
    },
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 800
    }
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second timeout

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      console.error(`[AI Service] Gemini API returned status ${response.status}: ${errBody.slice(0, 200)}`);
      
      const fallbackReply = generateGroundedFallback(message);
      return {
        success: true,
        reply: fallbackReply,
        provider: 'local-grounded-fallback',
        isFallback: true,
        note: `AI provider returned error (${response.status}). Serving verified portfolio knowledge base response.`
      };
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText || typeof candidateText !== 'string') {
      const fallbackReply = generateGroundedFallback(message);
      return {
        success: true,
        reply: fallbackReply,
        provider: 'local-grounded-fallback',
        isFallback: true,
        note: 'AI provider returned empty response. Serving verified portfolio knowledge base response.'
      };
    }

    return {
      success: true,
      reply: candidateText.trim(),
      provider: 'gemini',
      model,
      isFallback: false
    };
  } catch (error) {
    clearTimeout(timeoutId);
    const isTimeout = error.name === 'AbortError';
    console.warn(`[AI Service] ${isTimeout ? 'Request timed out' : 'Network/service error'}: ${error.message}`);

    const fallbackReply = generateGroundedFallback(message);
    return {
      success: true,
      reply: fallbackReply,
      provider: 'local-grounded-fallback',
      isFallback: true,
      note: `AI provider connection failed (${isTimeout ? 'timeout' : 'network error'}). Serving verified portfolio knowledge base response.`
    };
  }
}

module.exports = {
  generateAssistantReply
};
