export interface ChatMessage {
  role: 'user' | 'assistant' | 'model';
  content: string;
}

export interface AssistantResponse {
  success: boolean;
  reply: string;
  provider?: string;
  isFallback?: boolean;
  note?: string;
  error?: string;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  stored?: boolean;
  emailed?: boolean;
  directEmail?: string;
  error?: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  services: {
    geminiConfigured: boolean;
    geminiModel: string;
    database: {
      configured: boolean;
      connected: boolean;
    };
  };
}

/**
 * Resolves the backend API base URL with smart normalization.
 * Handles:
 * 1. Omitted / empty env var -> defaults to '/api' (local Vite proxy or same-domain deployment)
 * 2. Full URL without /api (e.g. 'https://api.onrender.com') -> appends '/api'
 * 3. Full URL with /api (e.g. 'https://api.onrender.com/api') -> preserved
 * 4. Strips trailing slashes cleanly
 */
export function getApiBaseUrl(): string {
  const envUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
  if (envUrl) {
    const cleaned = envUrl.replace(/\/+$/, '');
    return cleaned.endsWith('/api') ? cleaned : `${cleaned}/api`;
  }
  return '/api';
}

/**
 * Send a chat prompt to the backend portfolio assistant
 */
export async function sendAssistantMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<AssistantResponse> {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/assistant/chat`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        history: history.map((m) => ({
          role: m.role,
          content: m.content
        }))
      })
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await response.text();
      console.warn(`[API] Received non-JSON response from ${endpoint} (HTTP ${response.status}):`, text.slice(0, 200));

      // Handle Render free tier cold-start gateway errors
      if (response.status === 502 || response.status === 503 || response.status === 504) {
        return {
          success: false,
          reply: "The portfolio backend is currently waking up from idle (Render free tier spin-up takes ~30-50s). Please wait a moment and try again, or reach Aditya directly at adityasinhaa001@gmail.com.",
          error: `Gateway status ${response.status}`
        };
      }

      // Check if SPA rewrite caught the request and served index.html
      if (text.includes('<!DOCTYPE') || text.includes('<html')) {
        return {
          success: false,
          reply: "The portfolio backend is currently unreachable. If hosted on Render, ensure VITE_API_BASE_URL is set in your frontend Static Site environment variables to your backend API URL, and trigger a manual redeploy.",
          error: "Received HTML instead of JSON. Ensure VITE_API_BASE_URL is correctly set."
        };
      }

      return {
        success: false,
        reply: `Server returned an invalid response (HTTP ${response.status}).`,
        error: `Invalid content type: ${contentType}`
      };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        reply: data?.error || `Server responded with status ${response.status}`,
        error: data?.error || 'Failed to communicate with assistant service.'
      };
    }

    return data;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Network connection error';
    console.warn(`[API] Assistant fetch error: ${errorMessage}`);

    return {
      success: false,
      reply: "The portfolio backend is currently unreachable. If the backend is hosted on Render's free tier, it may be waking up from idle. Please wait a moment and try again, or reach Aditya directly at adityasinhaa001@gmail.com.",
      error: errorMessage
    };
  }
}

/**
 * Submit contact inquiry to the backend
 */
export async function submitContactForm(payload: ContactSubmissionPayload): Promise<ContactResponse> {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/contact`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return {
        success: false,
        message: 'Unable to reach the contact server. Please email adityasinhaa001@gmail.com directly.',
        error: `Invalid response format from server (HTTP ${response.status})`
      };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.error || 'Failed to submit contact message.',
        error: data?.error
      };
    }

    return data;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Network connection error';
    return {
      success: false,
      message: 'Unable to reach the server. Please email adityasinhaa001@gmail.com directly.',
      error: errorMessage
    };
  }
}

/**
 * Check backend health status
 */
export async function checkBackendHealth(): Promise<HealthResponse | null> {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/health`;

  try {
    const response = await fetch(endpoint);
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || !contentType.includes('application/json')) return null;
    return await response.json();
  } catch {
    return null;
  }
}
