import { Router } from 'express';
import { planTour } from './tour.controller.js';

const router = Router();

// POST
router.post('/plan', planTour);

export default router;