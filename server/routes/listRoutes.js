import express from 'express';

import { createList, getLists, getListById, updateList, deleteList } from '../controllers/listController.js';
import userAuth from '../middleware/auth.js'

const router = express.Router();

router.post('/lists/createlist', createList);

router.get('/lists/show', getLists);
router.get('/lists/listinfo/:id', getListById);

router.patch('/lists/updatelist/:id', updateList); // for partial update

router.delete('/lists/deletelist/:id', deleteList);

export default router;
