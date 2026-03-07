import { Router } from 'express';
import { getBalance } from './wallet.controller.js';
import { getBalanceValidator } from '../../middlewares/wallet-validators.js';

const router = Router();

//GET
router.get('/balance', getBalanceValidator, getBalance);

export default router;