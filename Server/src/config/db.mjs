import mongoose from 'mongoose'
import { log } from '../utils/logger.mjs'

const connectDB = async () => {
	try {
		const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/AppDB'
		await mongoose.connect(mongoUri)
		log('MongoDB connected', 'green')
	} catch (err) {
		log(`MongoDB connection error: ${err.message}`, 'red')
		process.exit(1)
	}
}

export default connectDB
