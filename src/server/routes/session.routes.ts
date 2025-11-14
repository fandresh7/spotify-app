import { Router } from 'express'
import { status, authorize, getToken, refreshToken, getAccessToken } from '../controllers/session.controller'

const router = Router()

router.get('/status', status)
router.get('/authorize', authorize)
router.get('/access-token', getAccessToken)
router.post('/token', getToken)
router.post('/refresh_token', refreshToken)

export default router
