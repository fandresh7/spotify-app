import { Router } from 'express'
import { getPlaylists, getPlaylistTracks, updatePlaylistTracks } from '../controllers/playlists.controller'

const router = Router()

router.get('/', getPlaylists)
router.get('/:id', getPlaylistTracks)
router.put('/:id/tracks', updatePlaylistTracks)

export default router
