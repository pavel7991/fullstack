import express from 'express'
import { getAllUsersHandler, getUserAndArticlesHandler } from '../controllers/users.mjs'

const usersRouter = express.Router()

export default usersRouter

usersRouter.route('/').get(getAllUsersHandler)
usersRouter.route('/:userId').get(getUserAndArticlesHandler)
