/**
 * Centralized environment configuration
 * All environment variables should be accessed through this file
 */

export const env = {
  // Server
  NODE_ENV: process.env['NODE_ENV'] || 'development',

  // Session
  SESSION_SECRET: process.env['SESSION_SECRET'] || 'private-key',

  // Spotify API
  SPOTIFY_CLIENT_ID: process.env['SPOTIFY_CLIENT_ID'] || '',
  SPOTIFY_CLIENT_SECRET: process.env['SPOTIFY_CLIENT_SECRET'] || '',
  SPOTIFY_URI: process.env['SPOTIFY_URI'] || '',
  SPOTIFY_SCOPE: process.env['SPOTIFY_SCOPE'] || '',

  // URLs
  FRONTEND_URL: process.env['FRONTEND_URL'] || ''
} as const
