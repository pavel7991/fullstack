import { getAllUsers, getUserById } from '../models/users.mjs'
import { getArticlesByUserId } from '../models/articles.mjs'

export const getAllUsersHandler = async (req, res) => {
	const usersList = await getAllUsers()
	res.status(200).json(usersList)
}

export const getUserAndArticlesHandler = async (req, res) => {
	try {
		const { userId } = req.params
		const user = await getUserById(userId)

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		const articles = await getArticlesByUserId(userId)
		res.status(200).json({
			user,
			articles
		})
	} catch (error) {
		res.status(500).json({ message: 'Server error', error })
	}
}
