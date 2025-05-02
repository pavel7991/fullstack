import express from 'express'
import { getArticlesByIdHandler, getArticlesHandler, postArticleHandler } from '../controllers/articles.mjs'
import authentication from '../middlewares/authentication.mjs'

const articlesRouter = express.Router()

articlesRouter.route('/').get(getArticlesHandler).post(authentication, postArticleHandler)

articlesRouter.route('/:articleId').get(getArticlesByIdHandler)

export default articlesRouter
