/**
 * Auth API Client for NovaPulse backend service.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Perform login request
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: object, token?: string, error?: string, message?: string}>}
 */
export async function loginApi(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Authentication Failed',
        message: data.message || `Server responded with status ${response.status}`,
      };
    }

    return {
      success: true,
      token: data.token,
      user: data.user,
      message: data.message,
    };
  } catch (err) {
    console.error('Login network error:', err);
    return {
      success: false,
      error: 'Connection Refused',
      message: 'Unable to communicate with authentication server. Ensure the backend server is running on port 5001.',
    };
  }
}

/**
 * Check backend health
 */
export async function checkHealthApi() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Fetch available demo accounts
 */
export async function fetchDemoUsersApi() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/demo-users`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.users || [];
  } catch (err) {
    console.warn('Could not fetch demo users from backend, fallback available', err);
    return [];
  }
}

