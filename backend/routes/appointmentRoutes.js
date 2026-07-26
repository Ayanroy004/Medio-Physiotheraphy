import express from 'express';
import {
  createAppointment,
  getAvailability,
  getAppointments,
  getAppointment,
  updateAppointmentStatus,
  getMetrics,
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { appointmentRules, statusUpdateRules, validate } from '../middleware/validators.js';

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

export default router;
