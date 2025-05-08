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

export const getAllArticles = async () => {
	return await Article.find().populate('author', 'username _id').sort({ createdAt: -1 })
}
export const getArticlesByUserId = async (userId) => await Article.find({ author: userId }).sort({ createdAt: -1 })

export const getArticlesStats = async () => {
	const stats = await Article.aggregate([
		{
			$group: {
				_id: null,
				totalArticles: { $sum: 1 },
				avgContentLength: { $avg: { $strLenCP: '$content' } },
				minContentLength: { $min: { $strLenCP: '$content' } },
				maxContentLength: { $max: { $strLenCP: '$content' } },
				uniqueAuthors: { $addToSet: '$author' },
				latestArticleDate: { $max: '$createdAt' },
				oldestArticleDate: { $min: '$createdAt' }
			}
		},
		{
			$project: {
				_id: 0,
				totalArticles: 1,
				avgContentLength: 1,
				minContentLength: 1,
				maxContentLength: 1,
				uniqueAuthorsCount: { $size: '$uniqueAuthors' },
				latestArticleDate: 1,
				oldestArticleDate: 1
			}
		}
	])
	return stats[0] || {}
}
