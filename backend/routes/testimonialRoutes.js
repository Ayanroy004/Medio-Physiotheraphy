const express = require('express');
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect, authorize } = require('../middleware/auth');
const { testimonialRules, validate } = require('../middleware/validators');

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, authorize('admin', 'therapist'), testimonialRules, validate, createTestimonial);
router.put('/:id', protect, authorize('admin', 'therapist'), testimonialRules, validate, updateTestimonial);
router.delete('/:id', protect, authorize('admin'), deleteTestimonial);

module.exports = router;
