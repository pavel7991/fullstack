import { getAllArticles, getArticleById } from '../models/articles.mjs'

const getArticlesHandler = (req, res) => {
	const articles = getAllArticles()
	res.status(200).json(articles)
}

const getArticlesByIdHandler = (req, res) => {
	const { articleId } = req.params
	const article = getArticleById(articleId)

	res.status(200).json(article)
}

export { getArticlesHandler, getArticlesByIdHandler }
