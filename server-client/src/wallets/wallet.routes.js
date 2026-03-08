import { Router } from 'express';
import { getBalance, initializeWallet, rechargeWallet } from './wallet.controller.js';
import { getBalanceValidator } from '../../middlewares/wallet-validators.js';
import { validateJWT } from '../../middlewares/auth-validators.js';

const router = Router();

// Middleware de Seguridad Interna (S2S)
const verifyInternalSecret = (req, res, next) => {
    const secret = req.headers['x-internal-secret'];
    if (secret !== process.env.INTERNAL_SECRET) {
        return res.status(403).json({ success: false, message: 'Acceso denegado. Exclusivo para S2S.' });
    }
    next();
};

// GET: Uso público mediante JWT
router.get('/balance', validateJWT, getBalanceValidator, getBalance);

// POST: Uso interno S2S protegido por API Key
router.post('/initialize', verifyInternalSecret, initializeWallet);
router.post('/recharge', verifyInternalSecret, rechargeWallet);

export default router;