/**
 * Application Constants
 * Centralized configuration and constant values
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  TIMEOUT: 30000, // 30 seconds
} as const;

// Application Metadata
export const APP_INFO = {
  NAME: 'Running AI Coach',
  VERSION: '1.0.0',
  AI_MODEL: 'Google Gemini',
  DESCRIPTION: 'AI-powered running guidance',
} as const;

// Color Palette
export const COLORS = {
  PRIMARY: '#009688', // Teal
  SECONDARY: '#8BC34A', // Soft Green
  ACCENT: '#FF6F61', // Coral
  BACKGROUND: '#FAFAFA', // Soft White
  TEXT_GRAY: '#757575',
  INJURY_RED: '#E53935',
} as const;

// Muscle Groups
export const MUSCLE_GROUPS = {
  QUADRICEPS: 'quadriceps',
  HAMSTRINGS: 'hamstrings',
  CALVES: 'calves',
  GLUTES: 'glutes',
  HIP_FLEXORS: 'hip-flexors',
  IT_BAND: 'it-band',
  ACHILLES: 'achilles',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_ID: 'running_coach_user_id',
  USERNAME: 'running_coach_username',
  THEME: 'running_coach_theme',
} as const;

// UI Messages
export const MESSAGES = {
  LOADING: 'Loading...',
  ERROR: 'Something went wrong. Please try again.',
  NO_DATA: 'No data available.',
  CONNECTION_ERROR: 'Unable to connect to the server.',
  AI_THINKING: 'AI Coach is thinking...',
} as const;

