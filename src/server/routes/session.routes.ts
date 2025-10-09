import { Router } from 'express'
import { authorize } from '../controllers/session.controller'

const router = Router()

router.get('/authorize', authorize)

export default router
