import { Router } from 'express';
import { getBalance } from './wallet.controller.js';

const router = Router();

//GET
router.get('/balance', getBalance);

export default router;