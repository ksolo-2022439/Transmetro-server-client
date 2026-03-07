import { Router } from 'express';
import { planTour } from './tour.controller.js';
import { planTourValidator } from '../../middlewares/tour-validators.js';
import { validateJWT } from '../../middlewares/auth-validators.js';
const router = Router();

// POST
router.post('/plan', validateJWT, planTourValidator, planTour);

export default router;