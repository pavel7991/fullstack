import express from 'express'
import {
	deleteArticleByIdHandler,
	getArticlesByIdHandler,
	getArticlesHandler,
	getArticlesStatsHandler,
	postArticleHandler
} from '../controllers/articles.mjs'
import authentication from '../middlewares/authentication.mjs'
import { optionalAuthentication } from '../middlewares/optionalAuthentication .mjs'

const articlesRouter = express.Router()

articlesRouter.route('/').get(getArticlesHandler).post(authentication, postArticleHandler)
articlesRouter.route('/stats').get(getArticlesStatsHandler)
articlesRouter
	.route('/:articleId')
	.get(optionalAuthentication, getArticlesByIdHandler)
	.delete(authentication, deleteArticleByIdHandler)

export default articlesRouter
