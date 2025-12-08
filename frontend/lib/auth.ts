/**
 * Authentication Service
 *
 * Handles JWT token management and authenticated API requests.
 * Automatically fetches and caches tokens, refreshing when needed.
 * Includes timeout handling for mobile/offline compatibility.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class AuthService {
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  /**
   * Get a valid authentication token.
   * Returns cached token if valid, otherwise fetches a new one.
   */
  async getToken(): Promise<string> {
    // Check if existing token is still valid
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    // Fetch new token from backend
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token?client_id=demo_client`, {
        method: 'POST',
        signal: AbortSignal.timeout(5000) // 5 second timeout for mobile/offline
      });

      if (!response.ok) {
        throw new Error('Failed to obtain authentication token');
      }

      const data = await response.json();
      this.token = data.access_token;
      // Set expiry 1 minute before actual expiry for safety margin
      this.tokenExpiry = Date.now() + ((data.expires_in - 60) * 1000);

      console.log('[Auth] Token obtained successfully');
      
      // Type guard: ensure token is not null before returning
      if (!this.token) {
        throw new Error('Token was not set properly');
      }
      
      return this.token;
    } catch (error) {
      console.error('[Auth] Token fetch error:', error);
      throw new Error('Authentication service unavailable');
    }
  }

  /**
   * Make an authenticated fetch request.
   * Automatically includes Authorization header with JWT token.
   * Handles 401 errors by refreshing token and retrying once.
   */
  async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = await this.getToken();

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      }
    });

    // If 401, token might have expired - try once more with fresh token
    if (response.status === 401) {
      console.log('[Auth] 401 received, refreshing token and retrying...');
      this.token = null; // Invalidate cached token
      this.tokenExpiry = null;

      const freshToken = await this.getToken();

      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${freshToken}`
        }
      });
    }

    return response;
  }

  /**
   * Clear cached token (useful for logout or token invalidation)
   */
  clearToken(): void {
    this.token = null;
    this.tokenExpiry = null;
    console.log('[Auth] Token cleared');
  }
}

export const authService = new AuthService();
