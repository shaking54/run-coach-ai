/**
 * Custom React Hooks for API Calls
 * Provides reusable hooks with loading and error states
 */
import { useState, useEffect } from 'react';
import { api, userManager } from '@/lib/api';
import type { User, RunningSession, Conversation, HealthCheck } from '@/lib/api';

// ============================================================================
// useUser Hook
// ============================================================================

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userId = await userManager.ensureUser();
        const userData = await api.getUser(userId);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}

// ============================================================================
// useRunningSessions Hook
// ============================================================================

export function useRunningSessions(userId: number | null) {
  const [sessions, setSessions] = useState<RunningSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchSessions = async () => {
      try {
        setLoading(true);
        const data = await api.getSessions(userId);
        setSessions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load sessions');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  return { sessions, loading, error, refetch: () => {} };
}

// ============================================================================
// useConversations Hook
// ============================================================================

export function useConversations(userId: number | null) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchConversations = async () => {
      try {
        setLoading(true);
        const data = await api.getConversations(userId);
        setConversations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [userId]);

  return { conversations, loading, error };
}

// ============================================================================
// useHealthCheck Hook
// ============================================================================

export function useHealthCheck() {
  const [health, setHealth] = useState<HealthCheck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setLoading(true);
        const data = await api.healthCheck();
        setHealth(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Health check failed');
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  return { health, loading, error };
}

