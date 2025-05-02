import express from 'express'
import {
	getArticlesByIdHandler,
	getArticlesCursorHandler,
	getArticlesHandler,
	getArticlesStatsHandler,
	postArticleHandler
} from '../controllers/articles.mjs'
import authentication from '../middlewares/authentication.mjs'

const articlesRouter = express.Router()

articlesRouter.route('/').get(getArticlesHandler).post(authentication, postArticleHandler)
articlesRouter.route('/stats').get(getArticlesStatsHandler)
articlesRouter.route('/cursor').get(getArticlesCursorHandler)
articlesRouter.route('/:articleId').get(getArticlesByIdHandler)

export default articlesRouter
