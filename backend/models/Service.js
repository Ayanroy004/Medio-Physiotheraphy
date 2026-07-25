const mongoose = require('mongoose');
const slugify = require('slugify');

const SERVICE_CATEGORIES = [
  'Sports Rehab',
  'Post-Op Recovery',
  'Chronic Pain',
  'Neurological',
  'Pediatric',
  'Geriatric Care',
  'Manual Therapy',
];

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    durationMinutes: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [10, 'Duration must be at least 10 minutes'],
      max: [240, 'Duration cannot exceed 240 minutes'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      enum: SERVICE_CATEGORIES,
      required: [true, 'Category is required'],
    },
    icon: {
      type: String, // lucide-react icon name, e.g. "Activity"
      default: 'Activity',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

serviceSchema.pre('validate', function generateSlug(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

serviceSchema.index({ category: 1 });

module.exports = mongoose.model('Service', serviceSchema);
module.exports.SERVICE_CATEGORIES = SERVICE_CATEGORIES;
