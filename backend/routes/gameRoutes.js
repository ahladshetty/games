import express from 'express';

import { showGames, gameInfo } from '../controllers/gameController.js'

const router = express.Router();

router.get('/games', showGames);
router.get('/gameinfo', gameInfo);

export default router
