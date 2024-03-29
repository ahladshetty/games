import express from 'express';

import { createList } from '../controllers/listController.js'
import userAuth from '../middleware/auth.js'

const router = express.Router();

router.post('/createlist', createList);

export default router;


