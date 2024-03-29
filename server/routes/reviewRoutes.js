import express from 'express'

import { addReview } from '../controllers/reviewController.js'
import userAuth from '../middleware/auth.js'

const router = express.Router()

router.post('/addReview/:gameId',userAuth, addReview)
// router.delete('/deleteReview/:reviewId', userAuth, deleteReview); //also add at top


export default router