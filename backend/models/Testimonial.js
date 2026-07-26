import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    conditionTreated: {
      type: String,
      required: [true, 'Condition treated is required'],
      trim: true,
      maxlength: [100, 'Condition cannot exceed 100 characters'],
    },
    reviewText: {
      type: String,
      required: [true, 'Review text is required'],
      maxlength: [800, 'Review cannot exceed 800 characters'],
    },
    rating: {
      type: Number,
      required: true,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

testimonialSchema.index({ isFeatured: 1 });

export default mongoose.model('Testimonial', testimonialSchema);