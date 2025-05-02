import mongoose, { Schema } from 'mongoose'
import { safeFindOneById } from '../utils/dbHelpers.mjs'

const articlesSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		img: { type: String },

		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
)

const Article = mongoose.model('Article', articlesSchema)

export const createArticle = async ({ title, content, img, userID }) => {
	const newArticle = new Article({
		title,
		content,
		img,
		author: userID
	})

	await newArticle.save()

	return newArticle
}

export const getArticleById = async (articleId) => await safeFindOneById(Article, articleId)
export const getAllArticles = async () => await Article.find().sort({ createdAt: -1 })
export const getArticlesByUserId = async (userId) => await Article.find({ author: userId }).sort({ createdAt: -1 })

export default Article
