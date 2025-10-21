import { Router } from 'express'
import { authorize, getToken, refreshToken } from '../controllers/session.controller'

const router = Router()

router.get('/authorize', authorize)
router.post('/token', getToken)
router.post('/refresh_token', refreshToken)

export default router
