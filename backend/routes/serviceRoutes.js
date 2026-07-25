const express = require('express');
const {
  getServices,
  getServiceByIdOrSlug,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');
const { serviceRules, validate } = require('../middleware/validators');

const router = express.Router();

router.get('/', getServices);
router.get('/:idOrSlug', getServiceByIdOrSlug);

router.post('/', protect, authorize('admin', 'therapist'), serviceRules, validate, createService);
router.put('/:id', protect, authorize('admin', 'therapist'), serviceRules, validate, updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;
