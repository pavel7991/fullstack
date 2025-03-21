import express from 'express'
import { getArticlesHandler } from '../controllers/articles.mjs'

const articlesRouter = express.Router()

articlesRouter.route('/').get(getArticlesHandler)

export default articlesRouter
