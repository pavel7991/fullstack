import { createArticle, getAllArticles, getArticleById } from '../models/articles.mjs'
import { log } from '../utils/logger.mjs'

const getArticlesHandler = (req, res) => {
	const articles = getAllArticles()
	res.status(200).json(articles)
}

const getArticlesByIdHandler = (req, res) => {
	const { articleId } = req.params
	const article = getArticleById(articleId)
	res.status(200).json(article)
}

const postArticleHandler = (req, res) => {
	const { title, content, img } = req.body

	const newArticle = createArticle({ title, content, img })
	log(`New article create! id:${newArticle.id}, name:${newArticle.title}`, 'green')
	res.status(201).json(newArticle)
}

export { getArticlesHandler, getArticlesByIdHandler, postArticleHandler }
