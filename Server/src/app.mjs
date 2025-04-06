import express from 'express'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import corsOptions from './config/cors.mjs'
import router from './routes/index.mjs'
import { logRequests } from './middlewares/logRequest.mjs'
import dotenv from 'dotenv'
import session from 'express-session'
import { log } from './utils/logger.mjs'
import connectDB from './config/db.mjs'
import errorHandler from './middlewares/errorHandler.mjs'

dotenv.config()

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 5000

app.use(cors(corsOptions))
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(logRequests)

connectDB().catch()

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true
	})
)

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
	log(`Server is running on http://localhost:${PORT}`, 'yellow')
})
