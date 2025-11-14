import { Router } from 'express'
import { play } from '../controllers/player.controller'

const router = Router()

router.put('/play', play)

export default router
