import express from 'express';

import { createList, getLists, getListById, updateList, deleteList } from '../controllers/listController.js';
import userAuth from '../middleware/auth.js'

const router = express.Router();

router.post('/createlist', createList);

router.get('/lists', getLists);
router.get('/listinfo/:id', getListById);

router.patch('/updatelist/:id', updateList); // for partial update

router.delete('/deletelist/:id', deleteList);

export default router;
