import express from 'express';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect, authorize } from '../middleware/auth.js';
import { testimonialRules, validate } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, authorize('admin', 'therapist'), testimonialRules, validate, createTestimonial);
router.put('/:id', protect, authorize('admin', 'therapist'), testimonialRules, validate, updateTestimonial);
router.delete('/:id', protect, authorize('admin'), deleteTestimonial);

module.exports = router;
