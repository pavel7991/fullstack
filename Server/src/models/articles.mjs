import { dataArticles, counterArticles } from '../data/dataArticles.mjs'
import { findObjectById } from '../utils/arrayUtils.mjs'

const getAllArticles = () => [...dataArticles].reverse()
const getArticleById = (articleId) => findObjectById(dataArticles, articleId)

const createArticle = ({ title, content, img }) => {
	const newArticle = {
		id: ++counterArticles.id,
		title,
		content,
		img
	}
	dataArticles.push(newArticle)

	return newArticle
}

export { getAllArticles, getArticleById, createArticle }
