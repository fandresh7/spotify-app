import { Request, Response } from 'express'
import { generateRandomString } from '../utils/random'
import { env } from '../config/env.config'

export const status = async (req: Request, res: Response) => {
  const authenticated = !!req.session.accessToken
  res.json({ authenticated })
}

export const authorize = async (req: Request, res: Response) => {
  const state = generateRandomString(16)

  const { SPOTIFY_CLIENT_ID, SPOTIFY_URI, FRONTEND_URL, SPOTIFY_SCOPE } = env

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: SPOTIFY_SCOPE,
    redirect_uri: FRONTEND_URL,
    state
  })

  const url = `${SPOTIFY_URI}/authorize?${params.toString()}`
  return res.json({ url })
}

export const getToken = async (req: Request, res: Response) => {
  const code = req.body.code

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_URI, FRONTEND_URL } = env
  const authorization = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')

  const body = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: FRONTEND_URL
  }

  try {
    const response = await fetch(`${SPOTIFY_URI}/api/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authorization}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(body)
    })

    const data = await response.json()

    if (!response.ok) {
      res.status(response.status).json(data)
      return
    }

    req.session.accessToken = data.access_token
    req.session.refreshToken = data.refresh_token
    req.session.expiresAt = Date.now() + data.expires_in * 1000

    res.json({
      success: true,
      expiresIn: data.expires_in
    })
  } catch (error) {
    console.error('Error fetching token:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  // En angular usar include en todas las peticiones
  const { refreshToken } = req.session

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_URI } = env
  const authorization = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')

  if (!refreshToken) {
    res.status(400).json({ error: 'Refresh token not found' })
    return
  }

  const body = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  }

  try {
    const response = await fetch(`${SPOTIFY_URI}/api/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authorization}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(body)
    })

    const data = await response.json()

    if (!response.ok) {
      res.status(response.status).json(data)
      return
    }

    req.session.accessToken = data.access_token
    req.session.refreshToken = data.refresh_token
    req.session.expiresAt = Date.now() + data.expires_in * 1000

    res.json({
      success: true,
      expiresIn: data.expires_in
    })
  } catch (error) {
    console.error('Error fetching token:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
