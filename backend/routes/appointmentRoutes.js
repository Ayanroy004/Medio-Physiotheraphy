const express = require('express');
const {
  createAppointment,
  getAvailability,
  getAppointments,
  getAppointment,
  updateAppointmentStatus,
  getMetrics,
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');
const { appointmentRules, statusUpdateRules, validate } = require('../middleware/validators');

const router = express.Router();

// Public booking flow
router.post('/', appointmentRules, validate, createAppointment);
router.get('/availability', getAvailability);

// Admin management
router.get('/metrics', protect, authorize('admin', 'therapist'), getMetrics);
router.get('/', protect, authorize('admin', 'therapist'), getAppointments);
router.get('/:id', protect, authorize('admin', 'therapist'), getAppointment);
router.patch(
  '/:id/status',
  protect,
  authorize('admin', 'therapist'),
  statusUpdateRules,
  validate,
  updateAppointmentStatus
);

module.exports = router;
