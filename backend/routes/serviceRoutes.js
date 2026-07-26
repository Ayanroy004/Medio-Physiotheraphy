import express from 'express';
import {
  getServices,
  getServiceByIdOrSlug,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/auth.js';
import { serviceRules, validate } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:idOrSlug', getServiceByIdOrSlug);

router.post('/', protect, authorize('admin', 'therapist'), serviceRules, validate, createService);
router.put('/:id', protect, authorize('admin', 'therapist'), serviceRules, validate, updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;
