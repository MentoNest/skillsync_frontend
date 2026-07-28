/**
 * API module exports
 * Centralized export point for all API-related functionality
 */

export { api, ApiError } from './client';
export { authApi } from './auth';
export type { LoginCredentials, RegisterData, AuthResponse } from './auth';
