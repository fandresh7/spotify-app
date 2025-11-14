import { Request, Response } from 'express'
import { env } from '../config/env.config'

export const play = async (req: Request, res: Response) => {
  const token = req.session?.accessToken || req.signedCookies?.['spotify_access_token']
  const { deviceId, uris } = req.body

  const { SPOTIFY_URI_API } = env

  try {
    const response = await fetch(`${SPOTIFY_URI_API}/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris })
    })

    if (!response.ok) {
      const data = await response.json()
      res.status(response.status).json(data)
      return
    }

    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
