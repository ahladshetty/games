import express from 'express'

import { addReview, showReviews, deleteReview } from '../controllers/reviewController.js'
import userAuth from '../middleware/auth.js'

const router = express.Router()

router.post('/reviews/addreview/:gameId', userAuth, addReview)
router.get('/reviews/showreviews/:gameId', showReviews)
router.delete('/reviews/deletereview/:reviewId', userAuth, deleteReview)

export default router