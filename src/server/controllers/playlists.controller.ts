import { Request, Response } from 'express'
import { env } from '../config/env.config'

export const getPlaylists = async (req: Request, res: Response) => {
  const token = req.session.accessToken

  const { SPOTIFY_URI_API } = env

  try {
    const response = await fetch(`${SPOTIFY_URI_API}/me/playlists`, {
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
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getPlaylistTracks = async (req: Request, res: Response) => {
  const token = req.session.accessToken
  const { id } = req.params
  const { limit = '50', offset = '0' } = req.query

  const { SPOTIFY_URI_API } = env

  try {
    const url = new URL(`${SPOTIFY_URI_API}/playlists/${id}/tracks`)
    url.searchParams.set('limit', limit as string)
    url.searchParams.set('offset', offset as string)

    const response = await fetch(url.toString(), {
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
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updatePlaylistTracks = async (req: Request, res: Response) => {
  const token = req.session.accessToken
  const { id } = req.params
  const { uris } = req.body

  const { SPOTIFY_URI_API } = env

  try {
    const response = await fetch(`${SPOTIFY_URI_API}/playlists/${id}/tracks`, {
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

    res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
