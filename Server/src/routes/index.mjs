import express from 'express'
import rootRouter from './root.mjs'
import articlesRouter from './articles.mjs'

const router = express.Router()

router.use('/', rootRouter)
router.use('/articles', articlesRouter)

export default router
