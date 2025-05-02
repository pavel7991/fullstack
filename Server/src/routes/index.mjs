import express from 'express'
import rootRouter from './root.mjs'
import articlesRouter from './articles.mjs'
import authRouter from './auth.mjs'
import usersRouter from './users.mjs'

const router = express.Router()

router.use('/', rootRouter)
router.use('/articles', articlesRouter)
router.use('/auth', authRouter)
router.use('/users', usersRouter)

export default router
