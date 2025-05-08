import {
	createArticle,
	deleteArticleById,
	getAllArticles,
	getArticleById,
	getArticlesStats,
	updateArticleById
} from '../models/articles.mjs'
import { log } from '../utils/logger.mjs'

export const getArticlesHandler = async (req, res) => {
	const articles = await getAllArticles()
	res.status(200).json(articles)
}

export const getArticlesByIdHandler = async (req, res) => {
	const { articleId } = req.params
	const article = await getArticleById(articleId)

	if (!article) {
		return res.status(404).json({ message: 'Article not found' })
	}

	let isOwner = false
	if (req.user) {
		isOwner = article.author.toString?.() === req.user.id.toString?.()
	}

	res.status(200).json({ article, isOwner })
}

export const deleteArticleByIdHandler = async (req, res) => {
	try {
		const { articleId } = req.params
		const article = await getArticleById(articleId)
		if (!article) {
			return res.status(404).json({ message: 'Article not found' })
		}

		if (article.author.toString() !== req.user.id) {
			return res.status(403).json({ message: 'You are not authorized to delete this article' })
		}

		await deleteArticleById(articleId)
		res.status(200).json({ message: 'Article deleted successfully' })
	} catch (error) {
		res.status(500).json({ message: 'Failed to delete article' })
	}
}

export const putArticleByIdHandler = async (req, res) => {
	try {
		const { articleId } = req.params
		const body = req.body
		const article = await getArticleById(articleId)

		if (!article) {
			return res.status(404).json({ message: 'Article not found' })
		}
		if (!req.user || article.author.toString() !== req.user.id) {
			return res.status(403).json({ message: 'You are not authorized to update this article' })
		}

		const updatedArticle = await updateArticleById(articleId, body)
		res.status(200).json({ message: 'Article updated successfully', article: updatedArticle })
	} catch (error) {
		res.status(500).json({ message: 'Failed to update article' })
	}
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
