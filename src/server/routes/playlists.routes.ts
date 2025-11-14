import { Router } from 'express'
import { getPlaylists, getPlaylistTracks } from '../controllers/playlists.controller'

const router = Router()

router.get('/', getPlaylists)
router.get('/:id', getPlaylistTracks)

export default router
