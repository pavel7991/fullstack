import express from 'express'
import { getArticlesByIdHandler, getArticlesHandler } from '../controllers/articles.mjs'

const articlesRouter = express.Router()

articlesRouter.route('/').get(getArticlesHandler)

articlesRouter.route('/:articleId').get(getArticlesByIdHandler)

export default articlesRouter
