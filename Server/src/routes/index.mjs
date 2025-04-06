import express from 'express'
import rootRouter from './root.mjs'
import articlesRouter from './articles.mjs'
import authRouter from './auth.mjs'

const router = express.Router()

router.use('/', rootRouter)
router.use('/articles', articlesRouter)
router.use('/auth', authRouter)

export default router
