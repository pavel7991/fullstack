import { articlesData } from '../data/dataArticles.mjs'
import { findObjectById } from '../utils/arrayUtils.mjs'

const getAllArticles = () => articlesData
const getArticleById = (articleId) => findObjectById(articlesData, articleId)

export { getAllArticles, getArticleById }
