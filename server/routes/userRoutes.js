import express from 'express'

import { addUser, loginUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/auth/adduser',addUser)

router.post('/auth/loginuser',loginUser)

export default router