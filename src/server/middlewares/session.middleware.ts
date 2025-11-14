import session from 'express-session'
import { env } from '../config/env.config'

// For Vercel serverless, we need to use cookies to store session data
// since memory store doesn't persist across function invocations
export const sessionMiddleware = session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    // For Vercel, we need to ensure cookies work across serverless functions
    path: '/'
  },
  // Store session data in the cookie itself (for serverless compatibility)
  // This works for small session data like tokens
  name: 'spotify_session'
})
