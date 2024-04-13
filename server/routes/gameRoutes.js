import express from 'express';

import { showGames, gameInfo } from '../controllers/gameController.js'

const router = express.Router();

router.get('/games/show', showGames);
router.get('/games/gameinfo/:id', gameInfo);

export default router
