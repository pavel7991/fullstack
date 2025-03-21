import express from 'express'
import { getRootHandler } from '../controllers/root.mjs'

const rootRouter = express.Router()

rootRouter.route('/').get(getRootHandler)

export default rootRouter
