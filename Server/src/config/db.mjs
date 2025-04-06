import mongoose from 'mongoose'
import { log } from '../utils/logger.mjs'

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI)
		log('MongoDB connected', 'green')
	} catch (err) {
		log(`MongoDB connection error: ${err.message}`, 'red')
		process.exit(1)
	}
}

export default connectDB
