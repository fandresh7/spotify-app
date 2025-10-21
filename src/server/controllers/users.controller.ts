import { Request, Response } from 'express'
import { env } from '../config/env.config'

export const getMe = async (req: Request, res: Response) => {
  const token = req.session.accessToken

  const { SPOTIFY_URI_API } = env

  try {
    const response = await fetch(`${SPOTIFY_URI_API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      res.status(response.status).json(data)
      return
    }

    res.json(data)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
