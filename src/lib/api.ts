/**
 * API Service
 * Centralized API client for backend communication
 */
import { API_CONFIG, STORAGE_KEYS } from './constants';

// ============================================================================
// Types
// ============================================================================

export interface User {
  id: number;
  name: string;
  created_at: string;
}

export interface RunningSession {
  id: number;
  user_id: number;
  distance?: number;
  duration?: number;
  pace?: string;
  notes?: string;
  created_at: string;
}

export interface ChatRequest {
  user_id: number;
  message: string;
}

export interface ChatResponse {
  response: string;
  agent_state?: {
    intent?: string;
  };
}

export interface Conversation {
  id: number;
  user_id: number;
  message: string;
  response: string;
  agent_state: any;
  created_at: string;
}

export interface HealthCheck {
  status: string;
  version: string;
  ai_model: string;
}

// ============================================================================
// API Service Class
// ============================================================================

class APIService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // ============================================================================
  // User Endpoints
  // ============================================================================

  async createUser(name: string): Promise<User> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
  }

  async getUser(userId: number): Promise<User> {
    return this.request<User>(`/users/${userId}`);
  }

  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  // ============================================================================
  // Running Session Endpoints
  // ============================================================================

  async createSession(
    session: Omit<RunningSession, 'id' | 'created_at'>
  ): Promise<RunningSession> {
    return this.request<RunningSession>('/sessions', {
      method: 'POST',
      body: JSON.stringify(session),
    });
  }

  async getSessions(userId: number): Promise<RunningSession[]> {
    return this.request<RunningSession[]>(`/sessions/${userId}`);
  }

  // ============================================================================
  // Chat Endpoint
  // ============================================================================

  async chat(request: ChatRequest): Promise<ChatResponse> {
    return this.request<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // ============================================================================
  // Conversation History
  // ============================================================================

  async getConversations(userId: number): Promise<Conversation[]> {
    return this.request<Conversation[]>(`/conversations/${userId}`);
  }

  // ============================================================================
  // Health Check
  // ============================================================================

  async healthCheck(): Promise<HealthCheck> {
    return this.request<HealthCheck>('/health');
  }
}

// ============================================================================
// User Manager
// ============================================================================

class UserManager {
  getUserId(): number | null {
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
    return userId ? parseInt(userId, 10) : null;
  }

  setUserId(userId: number): void {
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId.toString());
  }

  getUsername(): string | null {
    return localStorage.getItem(STORAGE_KEYS.USERNAME);
  }

  setUsername(username: string): void {
    localStorage.setItem(STORAGE_KEYS.USERNAME, username);
  }

  clearUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    localStorage.removeItem(STORAGE_KEYS.USERNAME);
  }

  async ensureUser(): Promise<number> {
    let userId = this.getUserId();

    if (!userId) {
      // Create a new user with timestamp-based name
      const username = `Runner_${Date.now()}`;
      const user = await api.createUser(username);
      userId = user.id;
      this.setUserId(userId);
      this.setUsername(username);
    }

    return userId;
  }
}

// ============================================================================
// Exports
// ============================================================================

export const api = new APIService(API_CONFIG.BASE_URL);
export const userManager = new UserManager();
