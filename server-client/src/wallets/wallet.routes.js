import { Router } from 'express';
import { getBalance } from './wallet.controller.js';
import { getBalanceValidator, rechargeWalletValidator } from '../../middlewares/wallet-validators.js';
import { validateJWT } from '../../middlewares/auth-validators.js';

const router = Router();

//GET
router.get('/balance', validateJWT, getBalanceValidator, getBalance);


// POST
// Endpoint INTERNO (consumido por .NET) para recargar
// router.post('/recharge', validateJWT, rechargeWalletValidator, [controlador]);

export default router;