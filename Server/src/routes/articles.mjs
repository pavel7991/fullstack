import express from 'express'
import { getArticlesByIdHandler, getArticlesHandler, postArticleHandler } from '../controllers/articles.mjs'

const articlesRouter = express.Router()

articlesRouter.route('/').get(getArticlesHandler).post(postArticleHandler)

articlesRouter.route('/:articleId').get(getArticlesByIdHandler)

export default articlesRouter
