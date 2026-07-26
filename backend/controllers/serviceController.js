import asyncHandler from 'express-async-handler';
import Service from '../models/Service.js';


// @desc    Get all services (optionally filter by category, active only for public)
// @route   GET /api/services
// @access  Public
export const getServices = asyncHandler(async (req, res) => {
  const { category, includeInactive } = req.query;
  const filter = {};

  if (category) filter.category = category;
  // Public callers only see active services unless explicitly requested (admin use)
  if (!includeInactive || !req.user) filter.isActive = true;

  const services = await Service.find(filter).sort({ category: 1, title: 1 });
  res.status(200).json({ success: true, count: services.length, data: services });
});

// @desc    Get a single service by id or slug
// @route   GET /api/services/:idOrSlug
// @access  Public
export const getServiceByIdOrSlug = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const isObjectId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);

  const service = isObjectId
    ? await Service.findById(idOrSlug)
    : await Service.findOne({ slug: idOrSlug });

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  res.status(200).json({ success: true, data: service });
});

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Admin
export const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  Object.assign(service, req.body);
  await service.save(); // triggers slug regeneration via pre-validate hook

  res.status(200).json({ success: true, data: service });
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  await service.deleteOne();
  res.status(200).json({ success: true, message: 'Service deleted successfully' });
});
