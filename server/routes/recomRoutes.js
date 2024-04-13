import express from 'express';
import { findSimilarGames, findRecommendations } from '../controllers/recomController.js';

const router = express.Router();

// Route to compute similarity between games
router.get('/similiargames/:gameId', findSimilarGames);
router.post('/recomgames', findRecommendations);

export default router;
