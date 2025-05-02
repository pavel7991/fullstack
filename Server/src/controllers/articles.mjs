import { createArticle, getAllArticles, getArticleById } from '../models/articles.mjs'
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
		console.log('BODY:', req.body)

		const newArticle = await createArticle({ title, content, img, userID })
		log(`New article created! id:${newArticle.id}, name:${newArticle.title}`, 'green')
		res.status(201).json(newArticle)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Failed to create article' })
	}
}
