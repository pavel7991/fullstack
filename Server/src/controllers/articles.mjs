import Article, { createArticle, getAllArticles, getArticleById, getArticlesStats } from '../models/articles.mjs'
import { log } from '../utils/logger.mjs'

export const getArticlesHandler = async (req, res) => {
	const articles = await getAllArticles()
	res.status(200).json(articles)
}

export const getArticlesByIdHandler = async (req, res) => {
	const { articleId } = req.params
	const article = await getArticleById(articleId)
	res.status(200).json(article)
}

export const postArticleHandler = async (req, res, next) => {
	try {
		const { title, content, img, userID } = req.body
		const newArticle = await createArticle({ title, content, img, userID })

		log(`New article created! id:${newArticle.id}, name:${newArticle.title}`, 'green')
		res.status(201).json(newArticle)
	} catch (error) {
		res.status(500).json({ error: 'Failed to create article' })
	}
}

export const getArticlesStatsHandler = async (req, res) => {
	try {
		const stats = await getArticlesStats()
		res.status(200).json(stats)
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch article stats' })
	}
}

export const getArticlesCursorHandler = async (req, res) => {
	try {
		const limit = parseInt(req.query.limit) || 5
		const cursor = req.query.cursor

		const query = {}
		if (cursor) {
			query._id = { $lt: cursor }
		}
		const articles = await Article.find(query)
			.sort({ createdAt: -1 })
			.limit(limit + 1)
			.populate('author', 'username _id')

		const hasNextPage = articles.length > limit
		if (hasNextPage) articles.pop()

		const nextCursor = hasNextPage ? articles[articles.length - 1]._id : null

		res.status(200).json({
			articles,
			nextCursor
		})
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch articles', error })
	}
}
