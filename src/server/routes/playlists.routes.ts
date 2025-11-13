import { Router } from 'express'
import { getPlaylists, getPlaylistTracks } from '../controllers/playlists.controller'

const router = Router()

router.get('/playlists', getPlaylists)
router.get('/playlists/:id', getPlaylistTracks)

export default router
