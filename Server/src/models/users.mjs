import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { safeFindOneById } from '../utils/dbHelpers.mjs'

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
})

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next()

	try {
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
	} catch (err) {
		next(err)
	}
})

const User = mongoose.model('User', userSchema)

export const getAllUsers = async () => await User.find().select('_id username').sort({ createdAt: -1 })
export const getUserById = async (userId) => await safeFindOneById(User, userId, ['username', 'email'])

export default User
