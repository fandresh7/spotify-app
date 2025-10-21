import session from 'express-session'
import FileStore from 'session-file-store'
import { env } from '../config/env.config'

const FileStoreSession = FileStore(session)

export const sessionMiddleware = session({
  store: new FileStoreSession({
    path: './sessions',
    ttl: 60 * 60 * 24 * 7, // 7 días en segundos
    retries: 0
  }),
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'lax'
  }
})
