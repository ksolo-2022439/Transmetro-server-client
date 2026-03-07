import { Router } from 'express';
import { planTour } from './tour.controller.js';
import { planTourValidator } from '../../middlewares/tour-validators.js';

const router = Router();

// POST
router.post('/plan', planTourValidator, planTour);

export default router;