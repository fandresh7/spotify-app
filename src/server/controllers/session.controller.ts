import { Request, Response } from 'express'
import { generateRandomString } from '../utils/random'
import { env } from '../config/env.config'

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
