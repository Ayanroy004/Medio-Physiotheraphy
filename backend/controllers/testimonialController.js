import asyncHandler from 'express-async-handler';
import Testimonial from '../models/Testimonial.js';

// @desc    Get all testimonials (public can filter to featured only)
// @route   GET /api/testimonials?featured=true
// @access  Public
export const getTestimonials = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.featured === 'true') filter.isFeatured = true;

  const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
});

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: testimonial });
});

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  res.status(200).json({ success: true, data: testimonial });
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }
  await testimonial.deleteOne();
  res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
});
