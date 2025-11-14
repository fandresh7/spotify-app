import { Request, Response, NextFunction } from 'express'

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  // Check both session and signed cookies for Vercel compatibility
  const hasAuth = req.session?.accessToken || req.signedCookies?.['spotify_access_token']

  if (!hasAuth) {
    return res.status(401).json({ error: 'No autenticado' })
  }

  next()
  return
}
