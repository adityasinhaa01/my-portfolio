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

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

/**
 * Send a chat prompt to the backend portfolio assistant
 */
export async function sendAssistantMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<AssistantResponse> {
  const endpoint = `${API_BASE_URL}/assistant/chat`;

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
      reply: "The portfolio backend is currently unreachable. Please verify that the API server is running on port 5000, or reach Aditya directly at adityasinhaa001@gmail.com.",
      error: errorMessage
    };
  }
}

/**
 * Submit contact inquiry to the backend
 */
export async function submitContactForm(payload: ContactSubmissionPayload): Promise<ContactResponse> {
  const endpoint = `${API_BASE_URL}/contact`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

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
  const endpoint = `${API_BASE_URL}/health`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
