import { getAllArticles } from '../models/articles.mjs'

const getArticlesHandler = (req, res) => {
	const articles = getAllArticles()
	res.status(200).json(articles)
}

export { getArticlesHandler }
