import { Router } from 'express';
import { getBalance } from './wallet.controller.js';
import { getBalanceValidator } from '../../middlewares/wallet-validators.js';
import { validateJWT } from '../../middlewares/auth-validators.js';

const router = Router();

//GET
router.get('/balance', validateJWT, getBalanceValidator, getBalance);

export default router;