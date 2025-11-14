import { Request, Response } from 'express'
import { env } from '../config/env.config'

export const getPlaylists = async (req: Request, res: Response) => {
  const token = req.session?.accessToken || req.signedCookies?.['spotify_access_token']

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
  const token = req.session?.accessToken || req.signedCookies?.['spotify_access_token']
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
  const token = req.session?.accessToken || req.signedCookies?.['spotify_access_token']
  const { id } = req.params
  const { uris } = req.body

  const { SPOTIFY_URI_API } = env

  if (!uris || !Array.isArray(uris)) {
    res.status(400).json({ error: 'uris must be an array' })
    return
  }

  try {
    // First, clear the playlist by replacing with empty array
    const clearResponse = await fetch(`${SPOTIFY_URI_API}/playlists/${id}/tracks`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris: [] })
    })

    if (!clearResponse.ok) {
      const data = await clearResponse.json()
      console.error('Spotify API error clearing playlist:', data)
      res.status(clearResponse.status).json(data)
      return
    }

    // Spotify API limit is 100 tracks per request
    // Split uris into chunks of 100
    const chunkSize = 100
    const chunks: string[][] = []

    for (let i = 0; i < uris.length; i += chunkSize) {
      chunks.push(uris.slice(i, i + chunkSize))
    }

    // Add tracks in chunks
    for (const chunk of chunks) {
      const response = await fetch(`${SPOTIFY_URI_API}/playlists/${id}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uris: chunk })
      })

      if (!response.ok) {
        const data = await response.json()
        console.error('Spotify API error adding tracks:', data)
        res.status(response.status).json(data)
        return
      }
    }

    res.status(200).json({ success: true, tracksAdded: uris.length })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
