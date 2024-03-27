import express from 'express'

import { addReview } from '../controllers/reviewController.js'
import userAuth from '../middleware/auth.js'

const router = express.Router()

router.post('/addReview/:gameId',userAuth, addReview)


export default router