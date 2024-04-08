import express from 'express'

import { addreview, showreviews, deletereview } from '../controllers/reviewController.js'
import userAuth from '../middleware/auth.js'

const router = express.Router()

router.post('/addreview/:gameId', userAuth, addReview)
router.get('/showreviews/:gameId', userAuth, showReviews)
router.delete('/deletereview/:reviewId', userAuth, deleteReview)

export default router